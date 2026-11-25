(function (root) {
  "use strict";
  const maxFileSize = 1000000;
  const maxEntries = 200;
  const prefix = "globalThis.FieldnotesCustom = ";
  const fields = new Set([
    "id", "category", "title", "description", "tags", "aliases", "commands",
    "steps", "flags", "caution", "sourceLabel", "sourceUrl", "service", "stage"
  ]);

  function text(value, name, limit, optional = false) {
    if (optional && value === undefined) return "";
    if (typeof value !== "string") throw new Error(`${name} must be text.`);
    const result = value.trim();
    if (!optional && !result) throw new Error(`${name} is required.`);
    if (result.length > limit) throw new Error(`${name} exceeds ${limit} characters.`);
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(result)) {
      throw new Error(`${name} contains unsupported control characters.`);
    }
    return result;
  }

  function lines(value, name, limit, optional = false) {
    if (optional && value === undefined) return [];
    if (!Array.isArray(value) || value.length > 50) {
      throw new Error(`${name} must be a list of at most 50 lines.`);
    }
    return [...new Set(value.map((line, index) => {
      const result = text(line, `${name}, line ${index + 1}`, limit);
      if (/[\r\n]/.test(result)) throw new Error(`${name} must use one item per line.`);
      return result;
    }))];
  }

  function validateCollection(value, data) {
    if (!value || typeof value !== "object" || Array.isArray(value) ||
        value.version !== 1 || !Array.isArray(value.entries)) {
      throw new Error("Expected a version 1 custom entry collection.");
    }
    if (Object.keys(value).some(key => !["version", "entries"].includes(key))) {
      throw new Error("The collection contains unsupported fields.");
    }
    if (value.entries.length > maxEntries) throw new Error(`Use at most ${maxEntries} custom entries.`);
    const ids = new Set(data.cards.map(card => card.id));
    const knownTools = new Map(Object.keys(data.tools).map(key => [key.toLowerCase(), key]));
    const entries = value.entries.map((entry, index) => {
      const name = `Entry ${index + 1}`;
      if (!entry || typeof entry !== "object" || Array.isArray(entry) ||
          Object.keys(entry).some(key => !fields.has(key))) {
        throw new Error(`${name} contains unsupported fields.`);
      }
      const id = text(entry.id, `${name} ID`, 80);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        throw new Error(`${name} ID must use lowercase letters, numbers, and single hyphens.`);
      }
      if (ids.has(`custom-${id}`)) throw new Error(`${name} ID is already in use.`);
      ids.add(`custom-${id}`);
      const category = text(entry.category, `${name} topic`, 100);
      if (!data.categories.includes(category)) throw new Error(`${name} needs an existing topic.`);
      const service = text(entry.service, `${name} service`, 64, true);
      const stage = text(entry.stage, `${name} stage`, 64, true);
      if (service && !root.FieldnotesWorkflow.services.some(item => item.id === service)) {
        throw new Error(`${name} needs a known service.`);
      }
      if (stage && !root.FieldnotesWorkflow.stages.some(item => item.id === stage)) {
        throw new Error(`${name} needs a known stage.`);
      }
      const tags = [...new Set(lines(entry.tags, `${name} tools`, 64).map(tag => {
        if (/^(?:__proto__|constructor|prototype|all tools)$/i.test(tag) || tag.includes(",")) {
          throw new Error(`${name} contains an invalid tool name.`);
        }
        const lower = tag.toLowerCase();
        if (!knownTools.has(lower)) knownTools.set(lower, tag);
        return knownTools.get(lower);
      }))];
      if (!tags.length) throw new Error(`${name} needs at least one tool.`);
      const commands = lines(entry.commands, `${name} commands`, 4000);
      const steps = lines(entry.steps, `${name} workflow`, 2000);
      const flags = lines(entry.flags, `${name} flags`, 2000, true);
      if (!steps.length) throw new Error(`${name} needs a workflow or method.`);
      if (commands.length && !flags.length) throw new Error(`${name} needs flag or argument explanations.`);
      const sourceUrl = text(entry.sourceUrl, `${name} documentation URL`, 2000);
      let url;
      try {
        url = new URL(sourceUrl);
      } catch {
        throw new Error(`${name} documentation must be a valid HTTPS URL.`);
      }
      if (url.protocol !== "https:" || url.username || url.password) {
        throw new Error(`${name} documentation must use HTTPS without credentials.`);
      }
      return {
        id, category, tags, commands, steps, flags,
        ...(service ? { service } : {}), ...(stage ? { stage } : {}),
        title: text(entry.title, `${name} title`, 160),
        description: text(entry.description, `${name} use`, 2000),
        aliases: lines(entry.aliases, `${name} search aliases`, 160, true),
        caution: text(entry.caution, `${name} caution`, 2000),
        sourceLabel: text(entry.sourceLabel, `${name} documentation label`, 160),
        sourceUrl: url.href
      };
    });
    const result = { version: 1, entries };
    if (new TextEncoder().encode(serializeCollection(result)).length > maxFileSize) {
      throw new Error("Custom content exceeds the 1 MB limit.");
    }
    return result;
  }

  function serializeCollection(collection) {
    const json = JSON.stringify(collection, null, 2)
      .replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    return `${prefix}${json};\n`;
  }

  function readCollection(value, data) {
    if (typeof value !== "string" || new TextEncoder().encode(value).length > maxFileSize) {
      throw new Error("Import a custom entry file no larger than 1 MB.");
    }
    let json = value.trim();
    if (json.startsWith(prefix)) {
      json = json.slice(prefix.length);
      if (json.endsWith(";")) json = json.slice(0, -1);
    }
    let collection;
    try {
      collection = JSON.parse(json);
    } catch {
      throw new Error("Import JSON or an exported custom-data.js file; scripts are never evaluated.");
    }
    return validateCollection(collection, data);
  }

  function extendData(data, value) {
    const collection = validateCollection(value, data);
    const tools = { ...data.tools };
    const sources = { ...data.sources };
    const customCards = collection.entries.map(entry => {
      const id = `custom-${entry.id}`;
      sources[id] = [entry.sourceLabel, entry.sourceUrl];
      for (const tag of entry.tags) {
        if (!Object.hasOwn(tools, tag)) tools[tag] = tag;
      }
      const { sourceLabel, sourceUrl, ...card } = entry;
      return { ...card, id, source: id, custom: true };
    });
    return { ...data, cards: [...data.cards, ...customCards], tools, sources };
  }

  const helpers = { maxFileSize, maxEntries, validateCollection, readCollection, serializeCollection, extendData };
  if (typeof module !== "undefined" && module.exports) module.exports = helpers;
  else root.FieldnotesCustomTools = helpers;
})(globalThis);
