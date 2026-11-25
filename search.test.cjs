const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");
const context = vm.createContext({});
for (const file of ["data.js", "workflow.js", "search.js", "variables.js"]) {
  vm.runInContext(readFileSync(join(__dirname, file), "utf8"), context, { filename: file });
}
const { cards, categories, tools, sources, syntaxReviews } = context.FieldnotesData;
const { searchCards, splitMatches, splitCommandMatches } = context.FieldnotesSearch;
const { prepareVariables, fillCommand, remainingPlaceholders, commandSegments } = context.FieldnotesVariables;
const { findings, findingGroups, findingsForService, stages, services, cardStage, cardServices, browseCards, alternatives } = context.FieldnotesWorkflow;

test("a tool opens its full reference and separates enumeration, troubleshooting, and advanced entries", () => {
  const gobuster = browseCards(cards, { tool: "gobuster" });
  assert.ok(gobuster.some(card => card.id === "gobuster-session"));
  assert.ok(gobuster.every(card => card.tags.includes("gobuster")));
  const enumeration = browseCards(cards, { tool: "gobuster", stage: "enumeration" });
  assert.ok(enumeration.some(card => card.id === "gobuster-directories"));
  assert.ok(enumeration.some(card => card.id === "gobuster-vhosts"));
  assert.ok(enumeration.some(card => card.id === "gobuster-dns"));
  assert.ok(enumeration.every(card => cardStage(card) === "enumeration"));
  const advanced = browseCards(cards, { tool: "gobuster", stage: "advanced" });
  assert.deepEqual(Array.from(advanced, card => card.id), ["gobuster-session"]);
  assert.ok(browseCards(cards, { tool: "gobuster", stage: "troubleshooting" }).some(card => card.id === "gobuster-timeouts"));
  assert.deepEqual(Array.from(browseCards(cards), card => card.id), Array.from(cards, card => card.id));
});

test("service and stage filters keep SMB enumeration distinct from permitted access and feature notes", () => {
  const enumeration = browseCards(cards, { service: "smb", stage: "enumeration" });
  const access = browseCards(cards, { service: "smb", stage: "exploitation" });
  assert.ok(enumeration.some(card => card.id === "smb-shares"));
  assert.ok(!enumeration.some(card => card.id === "impacket-psexec"));
  assert.ok(access.some(card => card.id === "impacket-psexec"));
  assert.ok(access.some(card => card.id === "smb-lab-write-proof"));
  assert.ok(!access.some(card => card.id === "smb-shares"));
  assert.ok(browseCards(cards, { service: "smb", tool: "nxc", stage: "advanced" }).some(card => card.id === "nxc-feature-boundaries"));
  const webGobuster = browseCards(cards, { service: "web", tool: "gobuster" });
  assert.ok(webGobuster.some(card => card.id === "gobuster-vhosts"));
  assert.ok(!webGobuster.some(card => card.id === "gobuster-dns"));
  assert.equal(browseCards(cards, { service: "smb", tool: "gobuster" }).length, 0);
  assert.throws(() => browseCards(cards, { service: "unknown" }), /Unknown service/);
  assert.throws(() => browseCards(cards, { stage: "unknown" }), /Unknown stage/);
});

test("all browsing metadata and failure alternatives resolve without duplicate default entries", () => {
  const grouped = services.flatMap(service => cards.filter(card => cardServices(card)[0] === service.id));
  assert.equal(grouped.length, cards.length);
  assert.equal(new Set(grouped.map(card => card.id)).size, cards.length);
  for (const card of cards) {
    assert.ok(stages.some(stage => stage.id === cardStage(card)), card.id);
    assert.ok(cardServices(card).every(id => services.some(service => service.id === id)), card.id);
  }
  for (const [id, related] of Object.entries(alternatives)) {
    assert.ok(cards.some(card => card.id === id), id);
    for (const target of related) assert.ok(target !== id && cards.some(card => card.id === target), target);
  }
  assert.throws(() => cardStage({ ...cards[0], stage: "unknown" }), /Unknown stage/);
  assert.throws(() => cardServices({ ...cards[0], services: ["unknown"] }), /Unknown service/);
});

test("Gobuster failure variants use mode-specific options and compatible status filtering", () => {
  const status = cards.find(card => card.id === "gobuster-status-filter");
  assert.match(status.commands[0], /\s-s '[^']+'\s-b ''/);
  assert.ok(searchCards(browseCards(cards, { tool: "gobuster", stage: "troubleshooting" }), "soft-404")
    .some(card => card.id === "gobuster-baseline-filter"));
  const vhost = cards.find(card => card.id === "gobuster-vhosts").commands[0];
  assert.match(vhost, /^gobuster vhost .*--append-domain/);
  const dns = cards.find(card => card.id === "gobuster-dns").commands[0];
  assert.match(dns, /^gobuster dns -d <DOMAIN>/);
  assert.doesNotMatch(dns, /-u |--append-domain/);
  assert.ok(alternatives["gobuster-directories"].some(id => cards.find(card => card.id === id).tags.includes("ffuf")));
});

test("browsing and searching use the complete reference without hidden collections or mutation", () => {
  const originalIds = cards.map(card => card.id).join(",");
  const reference = browseCards(cards);
  assert.equal(reference.length, cards.length);
  assert.ok(searchCards(reference, "fast scan").some(card => card.id === "nmap-fast"));
  assert.ok(searchCards(reference, "certipy").some(card => card.id === "syr0-certipy"));
  assert.ok(browseCards(cards, { stage: "advanced" }).some(card => card.id === "syr0-certipy"));
  assert.equal(cards.map(card => card.id).join(","), originalIds);
});

test("finding paths resolve to real commands, valid branches, and public source references", () => {
  const ids = new Set(findings.map(finding => finding.id));
  assert.equal(ids.size, findings.length);
  for (const finding of findings) {
    assert.ok(finding.title && finding.caution && finding.checks.length && finding.sources.length, finding.id);
    assert.ok(findingGroups.some(group => group.id === finding.group), finding.id);
    for (const check of finding.checks) {
      assert.ok(check.text && check.entries.length, finding.id);
      for (const id of check.entries) assert.ok(cards.some(card => card.id === id), `${finding.id}: ${id}`);
    }
    for (const branch of finding.next) {
      assert.ok(branch.when && ids.has(branch.finding), `${finding.id}: ${branch.finding}`);
    }
    for (const key of finding.sources) assert.equal(new URL(sources[key][1]).protocol, "https:", key);
  }
  const start = findings.find(finding => finding.id === "start");
  assert.ok(searchCards(browseCards(cards), "fast scan").some(card => card.id === start.checks[0].entries[0]));
  assert.ok(findings.some(finding => finding.checks.some(check =>
    check.entries.some(id => cardStage(cards.find(card => card.id === id)) === "advanced"))));
});

test("service-scoped finding choices include relevant observations and shared reassessment paths", () => {
  const originalIds = findings.map(finding => finding.id).join(",");
  assert.deepEqual(Array.from(findingsForService(), finding => finding.id), Array.from(findings, finding => finding.id));
  const web = findingsForService("web");
  assert.ok(web.some(finding => finding.id === "wp-no-plugins"));
  assert.ok(web.some(finding => finding.id === "web-soft404"));
  assert.ok(web.some(finding => finding.id === "recheck"));
  assert.ok(!web.some(finding => finding.id === "linux-sudo"));
  const smb = findingsForService("smb");
  assert.ok(smb.some(finding => finding.id === "smb-denied"));
  assert.ok(!smb.some(finding => finding.group === "wordpress"));
  for (const service of services) {
    const scoped = findingsForService(service.id);
    assert.ok(scoped.some(finding => finding.id === "recheck"), service.id);
    assert.ok(scoped.every(finding => {
      const group = findingGroups.find(group => group.id === finding.group);
      return !group.services.length || group.services.includes(service.id);
    }), service.id);
  }
  for (const group of findingGroups) {
    assert.ok(group.services.every(id => services.some(service => service.id === id)), group.id);
  }
  assert.throws(() => findingsForService("unknown"), /Unknown finding service/);
  assert.equal(findings.map(finding => finding.id).join(","), originalIds);
});

test("WordPress dead ends have independent checks, alternatives, and exits to other observed services", () => {
  const byId = new Map(findings.map(finding => [finding.id, finding]));
  const noPlugins = byId.get("wp-no-plugins");
  assert.ok(noPlugins.checks.some(check => check.entries.includes("wpscan-passive")));
  assert.ok(noPlugins.checks.some(check => check.entries.includes("web-discovery-triage")));
  assert.ok(noPlugins.next.some(branch => branch.finding === "web-soft404"));
  assert.ok(noPlugins.next.some(branch => branch.finding === "wp-stuck"));
  const stuck = byId.get("wp-stuck");
  assert.ok(stuck.next.some(branch => branch.finding === "service-unknown"));
  assert.ok(stuck.next.some(branch => branch.finding === "recheck"));
  assert.match(byId.get("wp-api").checks.map(check => check.text).join(" "), /missing.*data|missing API/i);
  for (const finding of findings.filter(finding => finding.group === "wordpress")) {
    assert.ok(finding.checks.length >= 2 && finding.checks.length <= 3, finding.id);
    assert.ok(finding.exit && finding.next.length, finding.id);
  }
});

test("fast Nmap searches expose a bounded first pass without replacing full-port follow-up", () => {
  const results = searchCards(browseCards(cards), "fast scan", "Enumeration", "nmap");
  assert.deepEqual(Array.from(results, card => card.id), ["nmap-fast"]);
  const command = fillCommand(results[0].commands[0], prepareVariables({ target: "192.0.2.10" }).replacements);
  assert.match(command, /(?:^|\s)-F(?:\s|$)/);
  const rate = command.match(/--max-rate (\d+)/);
  assert.ok(rate && Number(rate[1]) > 0 && Number(rate[1]) <= 300);
  assert.match(command, /192\.0\.2\.10$/);
  assert.doesNotMatch(command, /--min-rate|-p-|--script/);
  assert.match(results[0].flags.join(" "), /100 ports/);
  assert.ok(browseCards(cards, { tool: "nmap" }).some(card => card.commands.some(command => command.includes("-p-"))));
  const outputs = cards.find(card => card.id === "nmap-output").commands;
  assert.match(outputs[0], /-oA <OUTPUT_PREFIX>/);
  assert.equal(outputs[1], "nmap --resume <NORMAL_OR_GREPABLE_FILE>");
});

test("command colors follow placeholder roles, not coincidentally matching addresses or words", () => {
  const template = "tool <TARGET_IP> <VPN_IP> <USER>:<PASSWORD> <USER_LIST> --user <HOSTNAME>";
  const replacements = prepareVariables({ target: "192.0.2.10", listener: "192.0.2.10" }).replacements;
  const segments = commandSegments(template, replacements);
  assert.equal(segments.map(part => part.text).join(""), fillCommand(template, replacements));
  assert.deepEqual(Array.from(segments.filter(part => part.role), part => [part.text, part.role]),
    [["192.0.2.10", "target"], ["<USER>", "credential"], ["<PASSWORD>", "credential"], ["<HOSTNAME>", "target"]]);
  const fqdn = commandSegments("curl --resolve <HOSTNAME>:443:<TARGET_IP> https://<HOSTNAME>/",
    prepareVariables({ target: "app.corp.example" }).replacements);
  assert.deepEqual(Array.from(fqdn.filter(part => part.role), part => part.text),
    ["app.corp.example", "<TARGET_IP>", "app.corp.example"]);
});

test("search highlights span colored command boundaries without changing copied text", () => {
  const template = "tool '<USER>:<PASSWORD>@<TARGET_IP>'";
  const parts = splitCommandMatches(commandSegments(template, { TARGET_IP: "192.0.2.10" }),
    "<USER>:<PASSWORD>@192.0.2.10");
  assert.equal(parts.map(part => part.text).join(""), "tool '<USER>:<PASSWORD>@192.0.2.10'");
  assert.equal(parts.filter(part => part.match).map(part => part.text).join(""), "<USER>:<PASSWORD>@192.0.2.10");
  assert.deepEqual(Array.from(parts.filter(part => part.match && part.role), part => [part.text, part.role]),
    [["<USER>", "credential"], ["<PASSWORD>", "credential"], ["192.0.2.10", "target"]]);
  assert.deepEqual(Array.from(splitCommandMatches(commandSegments(""), "user")), []);
});

test("highlighting preserves literal text and merges overlapping matches", () => {
  for (const [text, query, expected] of [
    ["NMAP -sV", "nmap -SV", ["NMAP", "-sV"]],
    ["--shares", "shares --shares", ["--shares"]],
    ["a.b [x] <USER>", ". [x] <user>", [".", "[x]", "<USER>"]],
    ["nxc nxc", "nxc nxc", ["nxc", "nxc"]],
    ["plain", "  ", []]
  ]) {
    const parts = splitMatches(text, query);
    assert.equal(parts.map(part => part.text).join(""), text);
    assert.deepEqual(Array.from(parts.filter(part => part.match), part => part.text), expected);
  }
});

test("remaining-value indicators count unique placeholders after substitution", () => {
  const template = "curl --resolve <HOSTNAME>:<PORT>:<TARGET_IP> http://<HOSTNAME>:<PORT>/<PATH>";
  assert.deepEqual(Array.from(remainingPlaceholders(template)), ["HOSTNAME", "PORT", "TARGET_IP", "PATH"]);
  const fqdn = prepareVariables({ target: "app.corp.example" });
  assert.deepEqual(Array.from(remainingPlaceholders(fillCommand(template, fqdn.replacements))),
    ["PORT", "TARGET_IP", "PATH"]);
  assert.deepEqual(Array.from(remainingPlaceholders("find / -perm -4000 </dev/null; x < 3")), []);
  assert.deepEqual(Array.from(remainingPlaceholders(fillCommand("nmap <TARGET_IP>", prepareVariables({ target: "192.0.2.10" }).replacements))), []);
});

test("dated syntax evidence only refers to runnable entries and public references", () => {
  assert.ok(Object.keys(syntaxReviews).length > 0);
  for (const [id, review] of Object.entries(syntaxReviews)) {
    const card = cards.find(card => card.id === id);
    assert.ok(card?.commands.length > 0, id);
    assert.match(review.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(review.version && review.note);
    assert.equal(new URL(review.url).protocol, "https:");
  }
  assert.ok(!syntaxReviews["sqlmap-review"]);
});

test("finds tool names, command flags, and multi-word methods case insensitively", () => {
  assert.deepEqual(Array.from(searchCards(cards, "  NMAP   -sV "), card => card.id),
    ["service-versions", "nmap-light-versions", "nmap-http-headers"]);
  assert.deepEqual(Array.from(searchCards(cards, "sudo -l"), card => card.id), ["sudo-review", "sudo-lab-identity"]);
  assert.ok(searchCards(cards, "port forwarding").some(card => card.id === "ssh-local"));
  assert.ok(searchCards(cards, "SQL injection").some(card => card.id === "web-input-method"));
});

test("curated port and task aliases return relevant entries without weakening filters", () => {
  assert.deepEqual(Array.from(searchCards(cards, "  WINDOWS remote SHELL "), card => card.id),
    ["impacket-psexec", "impacket-wmi", "evil-winrm-session"]);
  assert.deepEqual(Array.from(searchCards(cards, "445 shares", "Enumeration", "nxc"), card => card.id),
    ["nxc-smb-shares"]);
  assert.ok(searchCards(cards, "Samba shares").some(card => card.id === "smbmap-access"));
  assert.deepEqual(Array.from(searchCards(cards, "directory busting", "Web testing", "ffuf"), card => card.id),
    ["web-directories"]);
  assert.deepEqual(Array.from(searchCards(cards, "offline password cracking", "Password auditing"), card => card.id),
    ["hashcat-formats", "john-wordlist"]);
  assert.equal(searchCards(cards, "Windows remote shell", "Enumeration").length, 0);
  assert.equal(searchCards(cards, "445", "All topics", "john").length, 0);
  const notes = [{ title: "Example", category: "Example", description: "", caution: "", tags: [], commands: [], steps: [] }];
  assert.equal(searchCards(notes, "Example").length, 1);
  assert.equal(searchCards(notes, "Windows remote shell").length, 0);
});

test("combines category and query without leaking other categories", () => {
  const results = searchCards(cards, "permissions", "Windows privilege escalation");
  assert.ok(results.length > 0);
  assert.ok(results.every(card => card.category === "Windows privilege escalation"));
  assert.equal(searchCards(cards, "nmap", "Active Directory").length, 0);
});

test("tool filtering matches explicit tags instead of incidental mentions", () => {
  const results = searchCards(cards, "", "All topics", "nxc");
  assert.ok(results.length > 0);
  assert.ok(results.every(card => card.tags.includes("nxc")));
  assert.ok(!results.some(card => card.id === "cme-legacy"));
  assert.deepEqual(Array.from(searchCards(cards, "", "All topics", "impacket-psexec"), card => card.id),
    ["impacket-psexec"]);
  assert.ok(!searchCards(cards, "", "All topics", "nmap").some(card => card.id === "ncat-listener"));
});

test("search, topic, and tool filters intersect and default tool preserves results", () => {
  assert.deepEqual(Array.from(searchCards(cards, "shares", "Enumeration", "nxc"), card => card.id),
    ["nxc-smb-shares", "nxc-nfs-list"]);
  assert.equal(searchCards(cards, "", "Web testing", "nxc").length, 0);
  assert.equal(searchCards(cards, "", "All topics", "missing-tool").length, 0);
  assert.equal(searchCards(cards, "", "All topics", "All tools").length, cards.length);
  for (const tool of Object.keys(tools)) {
    assert.ok(searchCards(cards, "", "All topics", tool).length > 0, tool);
  }
});

test("empty search returns all notes and unknown queries return none", () => {
  assert.equal(searchCards(cards, " \n ").length, cards.length);
  assert.equal(searchCards(cards, "no-such-tool-xyz").length, 0);
  assert.equal(searchCards(cards, "<script>alert(1)</script>").length, 0);
});

test("reference topics are searchable by command and purpose", () => {
  for (const [query, id] of [
    ["dig AXFR", "dns-records"],
    ["snmpwalk system", "snmp-system"],
    ["NFS exports", "nfs-exports"],
    ["ffuf wordlist", "web-directories"],
    ["hashcat Net-NTLMv2", "hashcat-formats"],
    ["ssh remote forwarding", "ssh-remote"]
  ]) {
    assert.ok(searchCards(cards, query).some(card => card.id === id), query);
  }
});

test("every command entry explains its options, including bundled flags", () => {
  for (const card of cards.filter(card => card.commands.length > 0)) {
    assert.ok(Array.isArray(card.flags) && card.flags.length > 0, card.id);
    const explanations = card.flags.join(" ");
    for (const command of card.commands) {
      for (const [option] of command.matchAll(/(?<![\w/])(--?[A-Za-z][A-Za-z0-9_-]*)/g)) {
        assert.ok(explanations.includes(option), `${card.id}: missing ${option}`);
      }
    }
  }
  for (const [id, options] of [
    ["freerdp-session", ["/v", "/u", "/d", "/dynamic-resolution"]],
    ["robocopy-preview", ["/L", "/R:0", "/W:0"]],
    ["windows-tasks", ["/query", "/fo", "/v"]],
    ["ad-context", ["/all", "/domain", "/dsgetdc:"]]
  ]) {
    const explanations = cards.find(card => card.id === id).flags.join(" ");
    for (const option of options) assert.ok(explanations.includes(option), `${id}: ${option}`);
  }
});

test("flag meanings are searchable while method-only entries need no flags", () => {
  assert.deepEqual(Array.from(searchCards(cards, "per second per directory", "Web testing", "feroxbuster"), card => card.id),
    ["feroxbuster-paths"]);
  assert.deepEqual(Array.from(searchCards(cards, "single-threaded", "Active Directory", "kerbrute"), card => card.id),
    ["kerbrute-users"]);
  assert.ok(searchCards(cards, "shell operator", "Password auditing", "zip2john").some(card => card.id === "john-extractors"));
  assert.ok(searchCards(cards, "SQLmap").some(card => card.commands.length === 0));
});

test("entries have unique IDs, visible uses, methods, and references", () => {
  assert.equal(new Set(cards.map(card => card.id)).size, cards.length);
  for (const category of categories) assert.ok(cards.some(card => card.category === category));
  for (const card of cards) {
    assert.ok(categories.includes(card.category));
    assert.ok(card.title && card.description && card.caution);
    assert.ok(card.steps.length > 0 && card.tags.length > 0);
    assert.ok(Array.isArray(card.commands));
    assert.equal(new URL(sources[card.source][1]).protocol, "https:");
  }
});

test("fills role-specific addresses and domain without changing other placeholders", () => {
  const { replacements, errors } = prepareVariables({
    target: "192.0.2.10", listener: "192.0.2.20", dc: "192.0.2.30", domain: " Corp.Example. "
  });
  assert.equal(Object.keys(errors).length, 0);
  assert.equal(fillCommand("nmap <TARGET_IP>; listener <VPN_IP>; dc <DC_IP>; dns <DNS_IP>; '<DOMAIN>' '<BASE_DN>'; <USER> <PIVOT_IP>", replacements),
    "nmap 192.0.2.10; listener 192.0.2.20; dc 192.0.2.30; dns 192.0.2.30; 'corp.example' 'DC=corp,DC=example'; <USER> <PIVOT_IP>");
  assert.equal(fillCommand("ldaps://<DC_HOSTNAME>", replacements), "ldaps://<DC_HOSTNAME>");
});

test("handles FQDNs without substituting hostnames into curl resolve address slots", () => {
  const { replacements } = prepareVariables({ target: "App.Corp.Example.", dc: "dc.corp.example" });
  assert.equal(fillCommand("curl http://<TARGET_IP>/", replacements), "curl http://app.corp.example/");
  assert.equal(fillCommand("curl --resolve <HOSTNAME>:443:<TARGET_IP> https://<HOSTNAME>/", replacements),
    "curl --resolve app.corp.example:443:<TARGET_IP> https://app.corp.example/");
  assert.equal(fillCommand("ldaps://<DC_HOSTNAME>", replacements), "ldaps://dc.corp.example");
});

test("rejects malformed inputs and shell characters with explicit errors", () => {
  for (const value of ["256.0.0.1", "192.0.2.1:80", "https://host.example", "host;id", "$(id)", "host\nid", "-host", "::1", "host..example", "01.2.3.4"]) {
    const { replacements, errors } = prepareVariables({ target: value });
    assert.ok(errors.target, value);
    assert.equal(fillCommand("nmap <TARGET_IP>", replacements), "nmap <TARGET_IP>");
  }
  assert.ok(prepareVariables({ listener: "vpn.example" }).errors.listener);
  assert.ok(prepareVariables({ domain: "corp" }).errors.domain);
  assert.ok(prepareVariables({ domain: "192.0.2.1" }).errors.domain);
  const mixed = prepareVariables({ target: "bad;input", dc: "192.0.2.30" });
  assert.equal(fillCommand("<TARGET_IP> <DC_IP>", mixed.replacements), "<TARGET_IP> 192.0.2.30");
});

test("empty values preserve templates and filled addresses are searchable", () => {
  const original = cards.find(card => card.id === "tcp-discovery").commands[0];
  assert.equal(fillCommand(original, prepareVariables({}).replacements), original);
  const { replacements } = prepareVariables({ target: "192.0.2.10" });
  const filled = cards.map(card => ({ ...card, commands: card.commands.map(command => fillCommand(command, replacements)) }));
  assert.ok(searchCards(filled, "nmap 192.0.2.10").some(card => card.id === "tcp-discovery"));
  assert.equal(cards.find(card => card.id === "tcp-discovery").commands[0], original);
});

test("all 78 identified walkthrough tool families resolve to a relevant entry", () => {
  const tools = [
    "7z", "awk", "bash", "bloodhound", "cat", "certutil", "chisel", "chmod",
    "cme", "curl", "diskshadow", "dirsearch", "evil-winrm", "exiftool",
    "feroxbuster", "find", "ftp", "getcap", "git", "gobuster", "grep", "hashcat",
    "hydra", "impacket-GetUserSPNs", "impacket-mssqlclient", "impacket-ntlmrelayx",
    "impacket-psexec", "impacket-secretsdump", "impacket-smbserver",
    "impacket-ticketer", "impacket-wmiexec", "ipconfig", "java", "john",
    "keepass2john", "ligolo-ng", "linpeas", "lsassy", "mimikatz", "msfconsole",
    "meterpreter", "msfvenom", "mysql", "netcat", "ncat", "netexec", "Nmap",
    "nltest", "openssl", "powershell", "proxychains4", "psql", "python", "reg",
    "rlwrap", "robocopy", "rubeus", "scp", "searchsploit", "sharphound",
    "smbclient", "socat", "snmpwalk", "ssh", "ssh2john", "sudo",
    "targetedKerberoast.py", "tcpdump", "tftp", "vim", "vncviewer", "weevely",
    "wget", "whoami", "winpeas", "wsgidav", "xfreerdp3", "zip2john"
  ];
  for (const tool of tools) {
    const results = searchCards(cards, tool);
    assert.ok(results.some(card => card.tags.some(tag => tag.toLowerCase() === tool.toLowerCase())), tool);
  }
});

test("restricted-feature entries remain searchable without runnable recipes", () => {
  for (const tool of ["sqlmap", "ntlmrelayx", "ticketer", "msfconsole", "mimikatz", "targetedKerberoast.py"]) {
    const entry = searchCards(cards, tool).find(card => card.tags.some(tag => tag.toLowerCase() === tool.toLowerCase()));
    assert.ok(entry, tool);
    assert.equal(entry.commands.length, 0, tool);
    assert.ok(entry.caution, tool);
  }
});

test("new protocol templates use matching addresses and leave secrets manual", () => {
  const { replacements } = prepareVariables({
    target: "192.0.2.10", listener: "192.0.2.20", dc: "192.0.2.30", domain: "corp.example"
  });
  const nxc = cards.find(card => card.id === "nxc-smb-shares").commands[0];
  assert.equal(fillCommand(nxc, replacements),
    "nxc smb 192.0.2.10 -d corp.example -u '<USER>' -p '<PASSWORD>' --shares");
  const bloodhound = cards.find(card => card.id === "bloodhound-directory").commands[0];
  assert.equal(fillCommand(bloodhound, replacements),
    "bloodhound-python -d corp.example -u '<USER>' -c DCOnly -ns 192.0.2.30 -dc <DC_HOSTNAME> --zip");
  const fqdn = prepareVariables({ dc: "dc.corp.example", domain: "corp.example" });
  assert.ok(fillCommand(bloodhound, fqdn.replacements).includes("-ns <DC_IPV4> -dc dc.corp.example"));
  assert.equal(fillCommand("<TARGET_IPV4> <REALM>", replacements), "192.0.2.10 CORP.EXAMPLE");
});

test("source-derived clients support exact tool/topic intersections and local substitutions", () => {
  for (const [query, topic, tool, id] of [
    ["exports", "Enumeration", "nxc", "nxc-nfs-list"],
    ["directory", "Enumeration", "nxc", "nxc-ftp-list"],
    ["context", "Enumeration", "redis-cli", "redis-context"],
    ["read-only", "Enumeration", "sqlite3", "sqlite-readonly"],
    ["FUZZ", "Web testing", "wfuzz", "wfuzz-paths"],
    ["SPN", "Active Directory", "impacket-getST", "impacket-service-ticket"],
    ["candidate", "Password auditing", "username-anarchy", "username-anarchy-prep"]
  ]) {
    assert.ok(searchCards(cards, query, topic, tool).some(card => card.id === id), id);
    assert.equal(searchCards(cards, query, "Evidence and reporting", tool).length, 0, id);
  }
  const replacements = prepareVariables({ target: "192.0.2.10", dc: "192.0.2.30", domain: "corp.example" }).replacements;
  assert.equal(fillCommand(cards.find(card => card.id === "netbios-names").commands[0], replacements), "nbtscan 192.0.2.10");
  assert.equal(fillCommand(cards.find(card => card.id === "impacket-tgt").commands[0], replacements),
    "impacket-getTGT -dc-ip 192.0.2.30 'corp.example/<USER>'");
});

test("source tool families stay searchable without creating executable sensitive chains", () => {
  for (const tool of [
    "certipy", "bloodyad", "donpapi", "pkinittools", "responder", "mitm6",
    "petitpotam", "redis-rce", "phpggc", "godpotato", "impacket-dacledit"
  ]) {
    const results = searchCards(cards, "", "All topics", tool);
    assert.ok(results.length > 0, tool);
    assert.ok(results.every(card => card.commands.length === 0), tool);
  }
  assert.ok(searchCards(cards, "gettgtpkinit.py").some(card => card.id === "syr0-pkinittools"));
  assert.ok(searchCards(cards, "Moriaty").some(card => card.id === "syr0-moriarty"));
  assert.ok(searchCards(cards, "ESC17").some(card => card.id === "syr0-adcs"));
  assert.ok(searchCards(cards, "CVE-2025-55182").some(card => card.id === "source-cve-research"));
  assert.ok(searchCards(cards, "", "All topics", "impacket").some(card => card.id === "syr0-impacket-dacledit"));
  for (const key of context.FieldnotesData.sourceCoverage.keys) {
    assert.ok(searchCards(cards, "", "All topics", key).length > 0, key);
  }
});
