const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");
const context = vm.createContext({ URL, TextEncoder });
for (const file of ["data.js", "workflow.js", "custom-data.js", "custom.js", "search.js", "variables.js"]) {
  vm.runInContext(readFileSync(join(__dirname, file), "utf8"), context, { filename: file });
}
const data = context.FieldnotesData;
const { validateCollection, readCollection, serializeCollection, extendData, maxFileSize } = context.FieldnotesCustomTools;
const { searchCards } = context.FieldnotesSearch;
const { prepareVariables, fillCommand } = context.FieldnotesVariables;
const entry = {
  id: "my-dns-query",
  category: "Enumeration",
  title: "DNS: query records",
  description: "Check an authorized hostname's DNS records.",
  tags: ["DIG", "my-dns-tool"],
  aliases: ["my lookup", "custom DNS query"],
  commands: ["dig @<DC_IP> <DOMAIN> A"],
  steps: ["Check the DNS server and the returned records."],
  flags: ["@<DC_IP> selects the DNS server; A requests IPv4 records."],
  caution: "Verify syntax and authorization first.",
  sourceLabel: "dig documentation",
  sourceUrl: "https://bind9.readthedocs.io/en/latest/manpages.html"
};
const collection = entries => ({ version: 1, entries });

test("custom service and stage metadata round-trip and organize a new tool without breaking old exports", () => {
  const scoped = { ...entry, service: "dns", stage: "troubleshooting" };
  const imported = readCollection(serializeCollection(validateCollection(collection([scoped]), data)), data);
  assert.equal(imported.entries[0].service, "dns");
  assert.equal(imported.entries[0].stage, "troubleshooting");
  const extended = extendData(data, imported);
  assert.equal(context.FieldnotesWorkflow.browseCards(extended.cards,
    { service: "dns", tool: "my-dns-tool", stage: "troubleshooting" })[0].id, "custom-my-dns-query");
  assert.equal(validateCollection(collection([entry]), data).entries[0].service, undefined);
  assert.throws(() => validateCollection(collection([{ ...scoped, service: "unknown" }]), data), /known service/);
  assert.throws(() => validateCollection(collection([{ ...scoped, stage: "unknown" }]), data), /known stage/);
});

test("custom exports round-trip through JSON without evaluating scripts", () => {
  const content = { ...entry, title: "</script><img src=x onerror=alert(1)>", aliases: ["[x]", "a.b"] };
  const validated = validateCollection(collection([content]), data);
  const exported = serializeCollection(validated);
  assert.ok(!exported.includes("</script>"));
  assert.equal(readCollection(exported, data).entries[0].title, content.title);
  assert.equal(readCollection(JSON.stringify(collection([entry])), data).entries[0].id, entry.id);
  for (const script of [
    "globalThis.pwned = true;",
    `globalThis.FieldnotesCustom = ${JSON.stringify(collection([entry]))}; globalThis.pwned = true;`,
    `globalThis.FieldnotesCustom = (() => { globalThis.pwned = true; return {}; })();`
  ]) {
    assert.throws(() => readCollection(script, data), /scripts are never evaluated/);
    assert.equal(context.pwned, undefined);
  }
});

test("custom tools, aliases, command values, and references join the existing library without mutating it", () => {
  const count = data.cards.length;
  const extended = extendData(data, collection([entry]));
  const custom = extended.cards.at(-1);
  assert.equal(custom.id, "custom-my-dns-query");
  assert.equal(extended.tools["my-dns-tool"], "my-dns-tool");
  assert.equal(custom.tags[0], "dig");
  assert.equal(extended.sources[custom.source][1], entry.sourceUrl);
  assert.equal(searchCards(extended.cards, "my lookup", "Enumeration", "my-dns-tool")[0].id, custom.id);
  assert.equal(searchCards(extended.cards, "my lookup", "Web testing").length, 0);
  assert.equal(searchCards(extended.cards, "my lookup", "Enumeration", "nxc").length, 0);
  assert.equal(fillCommand(custom.commands[0], prepareVariables({ dc: "192.0.2.30", domain: "corp.example" }).replacements),
    "dig @192.0.2.30 corp.example A");
  assert.equal(data.cards.length, count);
  assert.equal(Object.hasOwn(data.tools, "my-dns-tool"), false);
  assert.equal(Object.hasOwn(data.sources, custom.source), false);
  assert.equal(data.syntaxReviews[custom.id], undefined);
  assert.ok(context.FieldnotesWorkflow.browseCards(extended.cards).includes(custom));
});

test("malformed custom entries fail explicitly instead of dropping fields or replacing built-ins", () => {
  for (const [change, expected] of [
    [{ id: "Bad ID" }, /ID must use/],
    [{ category: "No such topic" }, /existing topic/],
    [{ tags: [] }, /at least one tool/],
    [{ tags: ["__proto__"] }, /invalid tool/],
    [{ tags: ["All tools"] }, /invalid tool/],
    [{ commands: "dig" }, /must be a list/],
    [{ commands: ["dig\nwhoami"] }, /one item per line/],
    [{ flags: [] }, /flag or argument/],
    [{ steps: [] }, /workflow or method/],
    [{ sourceUrl: "javascript:alert(1)" }, /HTTPS/],
    [{ sourceUrl: "https://user:password@example.com" }, /without credentials/],
    [{ title: "x".repeat(161) }, /exceeds 160/],
    [{ run: "whoami" }, /unsupported fields/]
  ]) {
    assert.throws(() => validateCollection(collection([{ ...entry, ...change }]), data), expected);
  }
  assert.throws(() => validateCollection(collection([entry, entry]), data), /ID is already in use/);
  assert.throws(() => validateCollection({ version: 2, entries: [] }, data), /version 1/);
  assert.throws(() => validateCollection(collection(Array.from({ length: 201 }, () => entry)), data), /at most 200/);
  assert.throws(() => readCollection("x".repeat(maxFileSize + 1), data), /no larger than 1 MB/);
  assert.throws(() => readCollection("\u00e9".repeat(maxFileSize / 2 + 1), data), /no larger than 1 MB/);
  const larger = Array.from({ length: 150 }, (_, index) => ({
    ...entry, id: `large-${index}`, description: "\u00e9".repeat(2000), caution: "\u00e9".repeat(2000)
  }));
  assert.throws(() => validateCollection(collection(larger), data), /1 MB limit/);
  assert.throws(() => extendData({ ...data, cards: [...data.cards, { id: "custom-my-dns-query" }] }, collection([entry])),
    /ID is already in use/);
});

test("method-only entries work and new tool names are canonical across drafts", () => {
  const method = { ...entry, id: "my-method", commands: [], flags: [], tags: ["MY-DNS-TOOL"] };
  const extended = extendData(data, collection([entry, method]));
  assert.equal(extended.cards.at(-1).commands.length, 0);
  assert.deepEqual(Array.from(extended.cards.at(-1).tags), ["my-dns-tool"]);
  assert.equal(searchCards(extended.cards, "", "Enumeration", "my-dns-tool").length, 2);
  assert.equal(extendData(data, context.FieldnotesCustom).cards.length, data.cards.length);
});
