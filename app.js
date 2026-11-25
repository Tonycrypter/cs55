"use strict";

let referenceData = globalThis.FieldnotesData;
try {
  referenceData = globalThis.FieldnotesCustomTools.extendData(referenceData, globalThis.FieldnotesCustom);
} catch (error) {
  const message = document.querySelector("#custom-error");
  message.textContent = `Custom entries could not be loaded: ${error.message} Only the built-in reference is shown.`;
  message.hidden = false;
}
const { cards, categories, tools, sources } = referenceData;
const { findings, findingGroups, findingsForService, services, stages, cardServices, cardStage, browseCards, alternatives } = globalThis.FieldnotesWorkflow;
const cardById = new Map(cards.map(card => [card.id, card]));
const toolKeyByName = new Map(Object.keys(tools).map(key => [key.toLowerCase(), key]));
const { searchCards, splitMatches, splitCommandMatches } = globalThis.FieldnotesSearch;
const { prepareVariables, fillCommand, remainingPlaceholders, commandSegments } = globalThis.FieldnotesVariables;
const searchInput = document.querySelector("#search");
const entriesContainer = document.querySelector("#entries");
const toolSelect = document.querySelector("#tool");
const status = document.querySelector("#copy-status");
const variableInputs = Object.fromEntries(
  ["target", "listener", "dc", "domain"].map(field => [field, document.querySelector(`#${field}`)])
);
let selectedCategory = "All topics";
let selectedTool = "All tools";
let selectedService = "all";
let selectedStage = "all";
const serviceSelect = document.querySelector("#service");
const stageSelect = document.querySelector("#stage");
const filterStatus = document.querySelector("#filter-status");
const findingSelect = document.querySelector("#finding");
const findingOutput = document.querySelector("#finding-output");
const entryStates = new Map();
const findingStates = new Map();
let activeEntryId = "";
let matchingEntryIds = [];
const entryChoice = document.querySelector("#entry-choice");
const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme !== "light";
  document.documentElement.dataset.theme = light ? "light" : "dark";
  document.querySelector('meta[name="color-scheme"]').content = light ? "light" : "dark";
  themeToggle.textContent = light ? "Dark theme" : "Light theme";
});

function topicId(category) {
  return `topic-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function highlightedElement(tag, className, text) {
  const node = element(tag, className);
  for (const part of splitMatches(text, searchInput.value)) {
    node.append(part.match ? element("mark", "", part.text) : document.createTextNode(part.text));
  }
  return node;
}

function renderFindingChoices(selectedId = findingSelect.value) {
  const visible = findingsForService(selectedService);
  const selected = selectedId ? findings.find(item => item.id === selectedId) : undefined;
  if (selectedId && !selected) throw new Error(`Unknown finding: ${selectedId}`);
  const placeholder = element("option", "", `Choose your observation (${visible.length} paths)`);
  placeholder.value = "";
  findingSelect.replaceChildren(placeholder);
  for (const group of findingGroups) {
    const items = visible.filter(finding => finding.group === group.id);
    if (!items.length) continue;
    const options = element("optgroup");
    options.label = group.label;
    for (const finding of items) {
      const option = element("option", "", finding.title);
      option.value = finding.id;
      options.append(option);
    }
    findingSelect.append(options);
  }
  if (selected && !visible.includes(selected)) {
    const linked = element("optgroup");
    linked.label = "Linked check / other service";
    const option = element("option", "", selected.title);
    option.value = selected.id;
    linked.append(option);
    findingSelect.append(linked);
  }
  findingSelect.value = selectedId;
}

function renderFinding() {
  const previous = findingStates.get(findingOutput.dataset.findingId);
  if (previous) {
    previous.nextOpen = findingOutput.querySelector(".guide-next")?.open ?? false;
    previous.notesOpen = findingOutput.querySelector(".guide-notes")?.open ?? false;
  }
  findingOutput.replaceChildren();
  findingOutput.dataset.findingId = findingSelect.value;
  findingOutput.hidden = !findingSelect.value;
  document.querySelector(".finding-guide").dataset.selected = String(Boolean(findingSelect.value));
  if (!findingSelect.value) return;
  const finding = findings.find(item => item.id === findingSelect.value);
  if (!finding) {
    const error = element("p", "field-error", "Unknown finding. Choose one of the fixed observations.");
    error.setAttribute("role", "alert");
    findingOutput.append(error);
    return;
  }
  if (!findingStates.has(finding.id)) findingStates.set(finding.id, { step: 0, nextOpen: false, notesOpen: false });
  const state = findingStates.get(finding.id);
  const heading = element("h2", "", finding.title);
  heading.tabIndex = -1;
  findingOutput.append(heading);
  const progress = element("p", "reading-progress", `Check ${state.step + 1} of ${finding.checks.length}`);
  progress.id = "finding-progress";
  progress.setAttribute("role", "status");
  findingOutput.append(progress);
  const list = element("ol", "guide-checks");
  list.start = state.step + 1;
  const check = finding.checks[state.step];
  const checkItem = element("li");
  const text = element("p", "current-check", check.text);
  text.tabIndex = -1;
  text.setAttribute("aria-describedby", progress.id);
  checkItem.append(text);
  const links = element("div", "guide-links");
  for (const id of check.entries) {
    const card = cardById.get(id);
    if (!card) {
      links.append(element("p", "field-error", `Reference unavailable: ${id}`));
      continue;
    }
    const link = element("a", "", card.title);
    link.href = `#entry-${id}`;
    link.dataset.entryId = id;
    links.append(link);
  }
  checkItem.append(links);
  list.append(checkItem);
  findingOutput.append(list);
  const navigation = element("div", "reading-buttons");
  for (const [label, direction] of [["Previous check", -1], ["Next check", 1]]) {
    const button = element("button", "", label);
    button.type = "button";
    button.disabled = direction === -1 ? state.step === 0 : state.step === finding.checks.length - 1;
    button.addEventListener("click", () => {
      state.step += direction;
      renderFinding();
      findingOutput.querySelector(".current-check").focus({ preventScroll: true });
      findingOutput.querySelector(".current-check").scrollIntoView({ block: "nearest" });
    });
    navigation.append(button);
  }
  findingOutput.append(navigation);
  const nextDetails = element("details", "guide-next");
  nextDetails.open = state.nextOpen;
  nextDetails.append(element("summary", "", "Next observations / when to move on"));
  if (finding.next.length) {
    nextDetails.append(element("h3", "", "Only if you observe this"));
    const next = element("ul", "guide-branches");
    for (const branch of finding.next) {
      const destination = findings.find(item => item.id === branch.finding);
      const item = element("li");
      if (!destination) {
        item.append(element("p", "field-error", `Finding unavailable: ${branch.finding}`));
      } else {
        const button = element("button", "", destination.title);
        button.type = "button";
        button.addEventListener("click", () => {
          renderFindingChoices(destination.id);
          renderFinding();
          findingOutput.querySelector("h2").focus({ preventScroll: true });
          findingOutput.scrollIntoView({ block: "start" });
        });
        item.append(element("span", "", `${branch.when}: `), button);
      }
      next.append(item);
    }
    nextDetails.append(next);
  }
  if (finding.exit) {
    nextDetails.append(element("h3", "", "When to move on"), element("p", "caution", finding.exit));
  }
  if (finding.next.length || finding.exit) findingOutput.append(nextDetails);
  const notes = element("details", "guide-notes");
  notes.open = state.notesOpen;
  notes.append(element("summary", "", "Cautions and sources"), element("p", "caution", finding.caution));
  const references = element("div", "guide-sources");
  references.append(element("span", "", "Method references: "));
  for (const key of finding.sources) {
    const [label, url] = sources[key];
    const link = element("a", "", label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    references.append(link);
  }
  notes.append(references);
  findingOutput.append(notes);
}

async function copyCommand(command, button, title) {
  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Clipboard access is unavailable in this browser or context.");
    }
    await navigator.clipboard.writeText(command);
    button.parentElement.querySelector(".copy-error")?.remove();
    button.textContent = "Copied";
    status.textContent = `Copied command for ${title}. Check any remaining placeholders before use.`;
  } catch (error) {
    button.textContent = "Select manually";
    const range = document.createRange();
    range.selectNodeContents(button.parentElement.querySelector("code"));
    const selection = globalThis.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = `Copy failed: ${error.message} Command selected; use your system copy shortcut.`;
    const message = button.parentElement.querySelector(".copy-error") || element("p", "copy-error");
    message.textContent = "Clipboard unavailable or denied. Command selected; press Ctrl+C / Cmd+C.";
    button.parentElement.append(message);
  }
}

function renderEntry(card, replacements) {
  const entry = element("article", "entry");
  entry.id = `entry-${card.id}`;
  const heading = highlightedElement("h3", "", card.title);
  heading.id = `title-${card.id}`;
  heading.setAttribute("aria-describedby", "count");
  entry.setAttribute("aria-labelledby", heading.id);
  const header = element("div", "entry-heading");
  const link = element("a", "entry-link", "Link");
  const permalink = new URL(globalThis.location.href);
  permalink.search = "";
  permalink.hash = entry.id;
  link.href = permalink.href;
  link.dataset.entryId = card.id;
  link.setAttribute("aria-label", `Direct link to ${card.title}`);
  header.append(heading, link);
  const body = element("details", "entry-body");
  body.open = entryStates.get(entry.id)?.body ?? true;
  body.append(element("summary", "", card.commands.length ? "Commands and notes" : "Method and notes"));
  const commands = element("div", "command-list");
  card.commands.forEach((command, index) => {
    const block = element("div", "command");
    const pre = element("pre");
    const code = element("code");
    for (const part of splitCommandMatches(commandSegments(card.commandTemplates[index], replacements), searchInput.value)) {
      const content = part.match ? element("mark", "", part.text) : document.createTextNode(part.text);
      if (part.role) {
        const span = element("span", `command-${part.role}`);
        span.append(content);
        code.append(span);
      } else code.append(content);
    }
    pre.append(code);
    const button = element("button", "copy", "Copy");
    button.type = "button";
    button.setAttribute("aria-label", `Copy command ${index + 1} for ${card.title}`);
    button.addEventListener("click", () => copyCommand(command, button, card.title));
    const placeholders = remainingPlaceholders(command);
    const indicator = element("p", "placeholder-status",
      placeholders.length ? `${placeholders.length} ${placeholders.length === 1 ? "value" : "values"} still needed: ${placeholders.map(key => `<${key}>`).join(", ")}` :
        "No template placeholders remaining; verify the command before use.");
    block.append(pre, button, indicator);
    commands.append(block);
  });
  const list = element("ol");
  card.steps.forEach(step => list.append(highlightedElement("li", "", step)));
  if (card.commands.length === 0) {
    list.className = "method";
    commands.append(list);
  }
  const details = element("details", "entry-notes");
  details.open = entryStates.get(entry.id)?.notes ?? false;
  details.append(element("summary", "", "Notes"));
  if (card.flags?.length) {
    const flags = element("ul", "flag-notes");
    card.flags.forEach(flag => flags.append(highlightedElement("li", "", flag)));
    details.append(element("h4", "", "Flags and arguments"), flags);
  }
  if (card.commands.length > 0) details.append(element("h4", "", "Workflow"), list);
  details.append(highlightedElement("p", "caution", card.caution));
  if (card.commands.length) {
    const review = globalThis.FieldnotesData.syntaxReviews?.[card.id];
    const reviewText = review ?
      `Documentation reviewed ${review.date} against ${review.version}. ${review.note} Not execution-tested; verify your installed help.` :
      "Version-specific syntax review pending. Template not execution-tested; verify the linked documentation and your installed help before use.";
    details.append(element("h4", "", "Syntax review"), element("p", "syntax-review", reviewText));
    if (review) {
      const evidence = element("a", "", "Reviewed CLI reference");
      evidence.href = review.url;
      evidence.target = "_blank";
      evidence.rel = "noopener noreferrer";
      details.append(evidence, document.createTextNode(" / "));
    }
  }
  const [label, url] = sources[card.source];
  const source = element("a", "", label);
  source.href = url;
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  details.append(source);
  body.append(commands, details);
  if (alternatives[card.id]) {
    const related = element("details", "entry-alternatives");
    related.open = entryStates.get(entry.id)?.alternatives ?? false;
    related.append(element("summary", "", "If this fails / alternatives"));
    const links = element("div", "guide-links");
    for (const id of alternatives[card.id]) {
      const alternative = cardById.get(id);
      if (!alternative) {
        links.append(element("p", "field-error", `Reference unavailable: ${id}`));
        continue;
      }
      const link = element("a", "", alternative.title);
      link.href = `#entry-${id}`;
      link.dataset.entryId = id;
      links.append(link);
    }
    related.append(links);
    body.append(related);
  }
  entry.append(header);
  if (card.custom) entry.append(element("p", "custom-label", "Custom entry / verify before use"));
  entry.append(highlightedElement("p", "use", card.description), body);
  return entry;
}

function render() {
  renderFindingChoices();
  for (const entry of entriesContainer.querySelectorAll(".entry")) {
    entryStates.set(entry.id, {
      body: entry.querySelector(".entry-body").open,
      notes: entry.querySelector(".entry-notes").open,
      alternatives: entry.querySelector(".entry-alternatives")?.open ?? false
    });
  }
  const values = Object.fromEntries(Object.entries(variableInputs).map(([field, input]) => [field, input.value]));
  const { replacements, errors } = prepareVariables(values);
  for (const [field, input] of Object.entries(variableInputs)) {
    const error = errors[field] || "";
    input.setCustomValidity(error);
    input.setAttribute("aria-invalid", String(Boolean(error)));
    const message = document.querySelector(`#${field}-error`);
    message.textContent = error;
    message.hidden = !error;
  }
  document.querySelector("#variables-status").textContent = Object.keys(errors).length > 0 ?
    "Invalid values were not applied. Correct the marked fields; their placeholders remain." :
    "Replace any remaining <PLACEHOLDERS> before running.";
  if (Object.keys(errors).length > 0) document.querySelector("#values-panel").open = true;
  const filledCards = cards.map(card => ({
    ...card,
    commandTemplates: card.commands,
    commands: card.commands.map(command => fillCommand(command, replacements))
  }));
  const scope = { service: selectedService, tool: selectedTool, category: selectedCategory };
  const scopedCards = browseCards(filledCards, scope);
  const focused = selectedService !== "all" || selectedTool !== "All tools" || selectedCategory !== "All topics";
  const hasSelection = focused || selectedStage !== "all" || Boolean(searchInput.value.trim());
  const serviceCards = selectedService === "all" ? filledCards :
    filledCards.filter(card => cardServices(card).includes(selectedService));
  toolSelect.replaceChildren(element("option", "", "All tools"));
  Object.entries(tools)
    .filter(([tool]) => serviceCards.some(card => card.tags.some(tag => tag.toLowerCase() === tool.toLowerCase())))
    .sort((a, b) => a[1].localeCompare(b[1], "en"))
    .forEach(([tool, label]) => {
      const option = element("option", "", label);
      option.value = tool;
      toolSelect.append(option);
    });
  stageSelect.replaceChildren(element("option", "", "All stages"));
  stageSelect.firstElementChild.value = "all";
  for (const stage of stages) {
    const count = scopedCards.filter(card => cardStage(card) === stage.id).length;
    const option = element("option", "", `${stage.shortLabel} (${count})`);
    option.value = stage.id;
    option.disabled = count === 0;
    stageSelect.append(option);
  }
  const results = hasSelection ?
    searchCards(browseCards(filledCards, { ...scope, stage: selectedStage }), searchInput.value) : [];
  const groupDefinitions = focused ? stages.map(stage => ({ ...stage, entries: results.filter(card => cardStage(card) === stage.id) })) :
    services.map(service => ({ ...service, entries: results.filter(card => cardServices(card)[0] === service.id) }));
  matchingEntryIds = groupDefinitions.flatMap(group => group.entries.map(card => card.id));
  if (!matchingEntryIds.includes(activeEntryId)) activeEntryId = matchingEntryIds[0] ?? "";
  entryChoice.replaceChildren();
  for (const group of groupDefinitions) {
    if (!group.entries.length) continue;
    const options = element("optgroup");
    options.label = group.label;
    for (const card of group.entries) {
      const option = element("option", "", card.title);
      option.value = card.id;
      options.append(option);
    }
    entryChoice.append(options);
  }
  entryChoice.value = activeEntryId;
  const activeIndex = matchingEntryIds.indexOf(activeEntryId);
  document.querySelector("#entry-navigation").hidden = matchingEntryIds.length < 2;
  document.querySelector("#previous-entry").disabled = activeIndex <= 0;
  document.querySelector("#next-entry").disabled = activeIndex < 0 || activeIndex === matchingEntryIds.length - 1;
  const groups = groupDefinitions.flatMap(group => {
    const active = group.entries.find(card => card.id === activeEntryId);
    if (!active) return [];
    const section = element("section", "topic");
    const heading = element("h2", "", group.label);
    heading.id = `${focused ? "stage" : "service"}-${group.id}`;
    heading.tabIndex = -1;
    section.setAttribute("aria-labelledby", heading.id);
    section.append(heading);
    section.append(renderEntry(active, replacements));
    return [section];
  });
  if (selectedCategory !== "All topics") {
    const heading = element("h2", "topic-scope", selectedCategory);
    heading.id = topicId(selectedCategory);
    heading.tabIndex = -1;
    groups.unshift(heading);
  }
  entriesContainer.replaceChildren(...groups);
  const label = [
    selectedService === "all" ? "" : services.find(service => service.id === selectedService).label,
    selectedTool === "All tools" ? "" : tools[selectedTool],
    selectedCategory === "All topics" ? "" : selectedCategory
  ].filter(Boolean).join(" / ");
  document.querySelector("#results-title").textContent = focused ?
    `${label} / ${selectedStage === "all" ? "all stages" : stages.find(stage => stage.id === selectedStage).label}` :
    selectedStage === "all" ? "Commands" : stages.find(stage => stage.id === selectedStage).label;
  document.querySelector("#count").textContent = hasSelection ?
    results.length ? `Entry ${activeIndex + 1} of ${results.length} matches` : "0 matching entries" :
    `${cards.length} entries available`;
  document.querySelector("#start").hidden = hasSelection;
  document.querySelector("#empty").hidden = !hasSelection || results.length !== 0;
  toolSelect.value = selectedTool;
  serviceSelect.value = selectedService;
  stageSelect.value = selectedStage;
}

function resetFilters() {
  searchInput.value = "";
  selectedCategory = "All topics";
  selectedTool = "All tools";
  selectedService = "all";
  selectedStage = "all";
  activeEntryId = "";
}

function revealCard(card) {
  const id = `entry-${card.id}`;
  if (!document.getElementById(id)) {
    const alreadyMatched = matchingEntryIds.includes(card.id);
    if (!alreadyMatched) {
      resetFilters();
      selectedService = cardServices(card)[0];
      selectedTool = card.tags.map(tag => toolKeyByName.get(tag.toLowerCase())).find(key => key && key !== "impacket") || "All tools";
    }
    activeEntryId = card.id;
    render();
    filterStatus.textContent = alreadyMatched ? "Opened the matching entry; filters and values kept." :
      "Opened the reference in its service/tool stages. Blocking filters reset; values kept.";
  }
  const entry = document.getElementById(id);
  entry.querySelector(".entry-body").open = true;
  const heading = entry.querySelector("h3");
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  entry.scrollIntoView({ block: "start" });
}

function followHash() {
  const hash = globalThis.location.hash.slice(1);
  const card = hash.startsWith("entry-") ? cardById.get(hash.slice(6)) : undefined;
  if (card) revealCard(card);
  else if (categories.some(category => topicId(category) === hash)) {
    if (!document.getElementById(hash)) {
      resetFilters();
      const category = categories.find(category => topicId(category) === hash);
      selectedCategory = category;
      filterStatus.textContent = "Opened the topic. Filters reset; values kept.";
      render();
    }
    const heading = document.getElementById(hash);
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ block: "start" });
  } else if (/^(stage|service)-/.test(hash)) {
    if (!document.getElementById(hash)) {
      const [kind, ...parts] = hash.split("-");
      const key = parts.join("-");
      const matching = matchingEntryIds.find(id => {
        const entry = cardById.get(id);
        return kind === "stage" ? cardStage(entry) === key : cardServices(entry)[0] === key;
      });
      if (matching) {
        activeEntryId = matching;
        render();
      }
    }
    const heading = document.getElementById(hash);
    if (heading) {
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ block: "start" });
    }
  }
}

findingSelect.addEventListener("change", renderFinding);
document.querySelector("#reset-finding").addEventListener("click", () => {
  findingStates.clear();
  renderFindingChoices("");
  renderFinding();
});
function followReferenceLink(event) {
  const link = event.target.closest("a[data-entry-id]");
  if (!link) return;
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const card = cardById.get(link.dataset.entryId);
  if (!card) {
    status.textContent = `Reference unavailable: ${link.dataset.entryId}`;
    return;
  }
  event.preventDefault();
  if (globalThis.location.href !== link.href) globalThis.history.pushState(null, "", link.href);
  revealCard(card);
}
findingOutput.addEventListener("click", followReferenceLink);
entriesContainer.addEventListener("click", followReferenceLink);
for (const service of services) {
  if (!cards.some(card => cardServices(card).includes(service.id))) continue;
  const option = element("option", "", service.label);
  option.value = service.id;
  serviceSelect.append(option);
}
serviceSelect.addEventListener("change", () => {
  selectedService = serviceSelect.value;
  selectedTool = "All tools";
  selectedCategory = "All topics";
  selectedStage = "all";
  searchInput.value = "";
  const clearedFinding = Boolean(findingSelect.value) &&
    !findingsForService(selectedService).some(finding => finding.id === findingSelect.value);
  if (clearedFinding) findingSelect.value = "";
  render();
  renderFinding();
  filterStatus.textContent = `Service selected. Search, tool, topic, and stage reset; values kept. Guide narrowed to this service.${clearedFinding ? " Unrelated guide selection cleared." : ""}`;
});
stageSelect.addEventListener("change", () => {
  selectedStage = stageSelect.value;
  render();
});
toolSelect.addEventListener("change", () => {
  selectedTool = toolSelect.value;
  selectedCategory = "All topics";
  selectedStage = "all";
  searchInput.value = "";
  render();
  filterStatus.textContent = "Tool selected. Search, topic, and stage reset; service and values kept.";
});
searchInput.addEventListener("input", render);
function changeReadingEntry(id) {
  activeEntryId = id;
  render();
  const entry = document.getElementById(`entry-${activeEntryId}`);
  const heading = entry.querySelector("h3");
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  entry.scrollIntoView({ block: "start" });
}
entryChoice.addEventListener("change", () => changeReadingEntry(entryChoice.value));
for (const [id, direction] of [["previous-entry", -1], ["next-entry", 1]]) {
  document.querySelector(`#${id}`).addEventListener("click", () => {
    changeReadingEntry(matchingEntryIds[matchingEntryIds.indexOf(activeEntryId) + direction]);
  });
}
Object.values(variableInputs).forEach(input => input.addEventListener("input", render));
document.querySelector("#clear-values").addEventListener("click", () => {
  Object.values(variableInputs).forEach(input => { input.value = ""; });
  render();
});
document.querySelector("#reset").addEventListener("click", () => {
  resetFilters();
  render();
  filterStatus.textContent = "Search and filters reset; values kept.";
  searchInput.focus();
});
globalThis.addEventListener("hashchange", followHash);
document.addEventListener("keydown", event => {
  const target = event.target;
  if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey &&
      !target.matches("input, textarea, select") && !target.isContentEditable) {
    event.preventDefault();
    searchInput.focus();
  }
});
renderFinding();
render();
followHash();
