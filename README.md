# OSCP command cheatsheet

Standalone static app in `Downloads/cheatsheet`, ready to open locally or upload
to its own GitHub Pages repository. The original project copy is left untouched.

A GitHub-style document with dark and light themes and original chemistry-inspired green accents,
system-font body text, and green monospace commands. Commands use bright green
in dark mode and deeper green in light mode.
Within commands, target IP/FQDN placeholders and their substituted values are
red; `<USER>`, `<USERNAME>`, `<PASS>`, and `<PASSWORD>` placeholders are orange.
Other addresses and list/file placeholders retain green. Search highlighting
preserves these colors, and copies contain only the original command text.
The page starts with a search prompt instead of a long command list.
All 312 entries remain in one searchable reference, browsable by service and stage in a full-width
readable column, without narrow command/notes tables or a redundant sidebar.
Each entry shows its use, full-width commands, and collapsible **Notes** for the flags and
arguments used in those commands, workflow, cautions, and documentation links.
Bundled options, case-sensitive switches, positional arguments, and shell
redirection are explained where used. Flag explanations are searchable.
Entries without runnable commands retain their
method/restriction notes without introducing new command recipes. Search
titles, commands, tags, flag explanations, cautions, and methods; combine keywords with service, tool, and stage filters.
The Tool dropdown lists every named tool when no service is selected, and narrows
to the selected service's tools rather than protocol tags. It offers both the
Impacket family and individual Impacket clients. Selections
match explicit tool tags, not incidental mentions in a caution or method.
Copy buttons copy the displayed command with any valid values you have supplied.
Commands are never executed.
No runtime AI/chatbot features, APIs, analytics, storage, login, or backend.
There is no command/tool editor, import/export interface, Print/Save button,
collection switcher, Topic dropdown, or bulk reading-mode selector.
Existing static personal entries still load read-only; only repository writers
can change published files. The former editor pages have been removed.
External reference links contact
their destinations only when opened.

## Navigation and reading

- Search and filters scroll away while reading, leaving the current entry/check
  as the main focus. Press **/** to return focus to search.
- Use **Light theme / Dark theme** in the header to switch the screen appearance.
  Dark remains the default on reload; the choice is not stored. Switching themes
  does not reset search, filters, entered values, or open Notes.
- Search also matches curated entry aliases such as **445**, **Samba shares**,
  **Windows remote shell**, **directory busting**, and **offline password
  cracking**. Aliases are ordinary local keywords, not AI or fuzzy suggestions.
  An exact multi-word alias matches that alias or the literal phrase, rather than
  scattered words in unrelated entries. Other keywords still combine with AND
  semantics; service, tool, and stage filters always apply. Matches that only
  occur in an alias may have no visible highlighted text. Common-port aliases
  are discovery aids, not guarantees that a service uses its default port.
- Choose a service or tool, or enter search words to show matching entries.
  Searches include the complete reference, with no separate everyday/advanced
  collections. Clearing all filters returns to the initial prompt.
- Read **one matching entry at a time**. **Previous entry**, **Next entry**, and
  **Choose a matching entry** navigate the full set without a long command wall.
  The counter shows your current position. A still-matching entry stays selected
  when you edit search/values; a new first match is selected if it no longer matches.
  Direct links select the requested entry, keeping current filters when it already
  matches. All 312 entries remain searchable.
- Expand **Finding → next check** for 52 fixed paths. It starts collapsed to
  keep commands nearer the top of the page. Select your actual observation
  to see **one check at a time**, with **Previous check / Next check** and a position
  indicator. These buttons change reading position, not completion status.
  **Next observations / when to move on** and **Cautions and sources** start
  collapsed and can be opened at any check, without forcing a sequence.
  These are fixed reference paths, not AI, output parsing, or automatic decision
  making. Command links reveal their entries; **Clear guide**
  clears only the guide and its remembered reading positions. Positions and open
  disclosures are retained in memory until cleared or reloaded, never stored or
  included in URLs. External methodology links are preparation references,
  not copied walkthrough solutions or a guarantee of exam permission.
  Observations are grouped by subject; the existing Service filter narrows the
  choices, while Start/stuck/evidence remain available everywhere. Selecting a
  different service clears an unrelated guide selection with a status announcement.
  A conditional branch can open a check outside the current service; it remains
  visible under **Linked check / other service** without changing command filters.
  Opening a command can change its service/tool context but keeps the selected guide.
- **Reset filters** is always available beside the search hint, even
  when results exist. It clears keywords and all filters, preserving command values.
- Search matches are highlighted literally in titles, uses, commands, workflow,
  flags, and cautions. Copied commands contain the original text, not markup.
- Each command shows its **unique remaining placeholders** after substitution.
  A repeated placeholder counts once per command. No remaining placeholders does
  not imply that a command is safe, appropriate, or ready to execute.
- Entries initially show commands or methods. Collapse **Commands and notes** or
  **Method and notes** individually; Notes remain independently collapsible. Changing values/search
  preserves individual open/closed states for the current session only.
- Each entry's **Link** uses its stable ID in a URL fragment. No entered values,
  keywords, credentials, or reading state are serialized. Opening a link reveals
  that entry and expands it; if filters hide it, its service/tool reference is opened
  without clearing command values. Unknown fragments are ignored.

### Service and tool browsing

1. Choose **Service**, for example **SMB / RPC** or **Web / HTTP / HTTPS**.
2. Optionally choose a **Tool** to see only its entries. Without a service filter,
   all 321 named tool choices are available directly.
3. Choose **Stage**:
   **Enumeration**, **Exploitation / access**, **Troubleshooting / alternatives**,
   **Advanced / feature notes**, and **Preparation / evidence**.

Service/tool pages include all matching entries in a stage-grouped entry selector
and show only the currently selected entry. Empty stages are unavailable in the selector, not populated
with invented commands. Changing service clears search/tool/topic/stage; changing
tool clears search/topic/stage but retains service. Both preserve command values.
After selecting your context, keywords can further narrow it.
Reset clears all filters and returns to the initial search prompt.
Search is still literal/alias-based and local, never an AI recommendation.

Global search results use service headings. Legacy topic fragments still work,
and direct entry/alternative links open the relevant service/tool and expand the
requested entry. **If this fails / alternatives** links connect common discovery
and SMB checks to relevant variants or other clients without duplicating commands.
Use an entry's **Link** for a stable external bookmark.

Text and commands are larger with more line spacing. Entry/check navigation has
clear labels, visible keyboard focus, and disabled boundary buttons. Supporting
notes remain optional disclosures. Nothing auto-advances; there are no countdowns,
animations, new storage, or runtime AI features.

The latest batch adds **18 entries**. Gobuster now has ten entries: basic paths,
extensions, virtual hosts (hostname or explicit IP/domain), DNS, status-filter
conflicts, soft-404 lengths, slower timeouts, authenticated sessions, a clearly
limited self-signed-lab TLS exception, and installed mode help. ffuf calibration/
vhost alternatives and curl/SMB failure triage complement existing feroxbuster,
dirsearch, Wfuzz, Impacket, and SMBMap examples. Always confirm installed help;
the Gobuster 3.6 README contains some older help snapshots.

Manual lab examples cover a permitted benign SMB write/cleanup fixture, one
non-sensitive path-boundary fixture, a numeric SQL Boolean control pair, two
designated accounts' access to a test-owned object, and an explicitly allowed sudo
identity command. **Exploitation / access** includes both manual validation and
already-authorized access; a login, writable share, or response difference is not
automatically a vulnerability. No automatic exploitation, secret harvesting,
payload deployment, shell-escape chain, or exam-restricted automation was added.
Restricted/unreviewed tool features remain method-only advanced notes.

This is a curated, expandable reference, **not every possible command or flag for
every tool**. No examples are execution-tested or guaranteed exam-approved.

### Nmap quick reference

Eight additional templates cover a fast `-F` first pass (normally the top 100
TCP ports), top-200 ports, light service identification, blocked host discovery,
selected SYN/UDP ports, saved output/resume, and the explicit `http-headers`
script. The existing `-p-` scan remains the full TCP follow-up (ports 1–65535).
Top-port lists are frequency-ranked, not consecutive ranges, and custom service
data may change fast-scan selection. Rate limits bound average host-discovery/port-scan
sending, allow temporary bursts, and are not guaranteed completion times or
blanket service/script request limits. UDP `open|filtered` remains uncertain.
The resume example uses normal/grepable output for compatibility; the current
rolling manual also lists XML, so verify your installed version before using that format.
No broad vulnerability script selection or forced minimum scan rate was added.
New templates remain syntax-review pending and have not been execution-tested.

### Finding guide: WordPress and dead ends

The guide now includes seven WordPress observations: confirm the actual site,
missing plugin detection, component/version prerequisites, login-only leads,
dashboard capabilities, unavailable API data, and an unsupported WordPress lead.
Additional paths cover hostname routing, empty discovery, soft-404 responses,
timeouts, authorization boundaries, permitted files, SQL control comparisons,
unknown ports, incomplete coverage, SMB failures, DNS/time context, AD permissions,
local privilege prerequisites, database dead ends, and an unreliable existing terminal.

Each new path has two or three linked checks, observation-dependent branches, and
**When to move on** guidance. Moving on means recording the unresolved or disproved
prerequisite and choosing another observed lead, not deciding that the target is
invulnerable. There is no timer, output parser, generated recommendation, runtime AI,
or automatic exploit selection. WordPress detection does not imply a WordPress
exploit is the intended route; passive detection and missing API data are incomplete
evidence, not proof that components or vulnerabilities are absent.

Research on **2026-11-25** reviewed public reconnaissance sections and summaries
from 0xdf's [Backdoor](https://0xdf.gitlab.io/2022/04/23/htb-backdoor.html),
[Soccer](https://0xdf.gitlab.io/2023/06/10/htb-soccer.html),
[Active](https://0xdf.gitlab.io/2018/12/08/htb-active.html), and
[Forest](https://0xdf.gitlab.io/2020/03/21/htb-forest.html), alongside
[WordPress security guidance](https://developer.wordpress.org/advanced-administration/security/hardening/),
[WPScan documentation](https://github.com/wpscanteam/wpscan/blob/master/README.md),
and [OWASP methodology](https://wstg.owasp.org/latest/).
This is a representative source review, not all internet walkthroughs or a claim
that an exam machine will match a practice box. Only original general checklists
and reference links were added: no copied solutions, credentials, lab addresses,
exploit scripts, aggressive scanning recipes, or restricted automation.

The WordPress command Notes explicitly distinguish passive component detection
from all network activity. WPScan can inherit API tokens/configuration; review
those separately before using the external tool. The cheatsheet itself never
fetches scanner data or walkthroughs at runtime. References are preparation links,
not exam-permission guarantees.

## Syntax review status

Command Notes include dated documentation-review evidence and the version or
rolling manual used. Reviewed release baselines include Impacket 0.12.0,
NetExec 1.4.0, SMBMap 1.10.7, Evil-WinRM 3.7, enum4linux-ng 1.3.4, dirsearch
0.4.3, ffuf 2.1.0, Gobuster 3.6.0, Chisel 1.10.1, Kerbrute 1.0.3, ProxyChains-NG
4.17, FreeRDP 3.10.3, Python 3.12, PostgreSQL 16, and MySQL 8.4.
Other reviewed tools use explicitly labeled rolling references, not invented
release guarantees. Entries without evidence explicitly say version-specific
review is pending. Some reviews cover only the stated behavior, such as
feroxbuster's rate-limit scope or FreeRDP 3.x rather than its legacy alternative.

No tools were installed or templates executed against targets during this
review. Documentation checks are not execution tests, blanket version support,
or OffSec approval. Always compare your installed help, configuration, target
permissions, and current exam instructions before use. External documentation
was retrieved during development only; the app does not fetch reviews at runtime.

## Use locally / offline

Open `index.html` in your browser. Keep the entire folder together; scripts and
styles use relative paths and work without a server. The library and search work
offline; external documentation links do not. Clipboard permissions vary on local
files: on failure, the page displays an error and selects the command for manual copying.
No service worker is used, so a hosted page is not guaranteed to work offline;
download the folder before your exam.

Optional HTTP preview, from this folder:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080`; stop the preview with Ctrl+C.

## Publish to GitHub Pages

Recommended: create a separate repository and upload the contents of this folder
to its root. This folder contains only the standalone cheatsheet.

1. Commit the static files to `main`.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`, then save.
4. Visit the URL GitHub shows. Relative asset paths support project Pages URLs.

When updating an existing deployment, also delete the former `editor.html` and
`editor.js` from the repository. Uploading replacement files alone does not
delete old editor pages.

No build or Actions workflow is needed. Check GitHub Pages availability/visibility
for your repository and account. Treat all uploaded files as potentially public:
never include credentials, flags, exam information, reports, confidential course
material, or private notes.

## Fill command values

Enter a target IPv4/hostname, your VPN/listener IPv4, a DC/AD IPv4/hostname, and/or
an AD DNS domain. Displayed commands, search results, and copies
update immediately. No DNS lookup, command execution, storage, URL parameters, or
network requests are used. Reloading or **Clear values** restores empty fields.
Expand **Target / connection values** to use the four optional inputs, then
**How placeholders work** for substitution details. Collapsing the panel preserves
entered values; invalid inputs reopen it so errors are visible.

- Target fills `<TARGET_IP>`; an IPv4 also fills `<TARGET_IPV4>` and a hostname
  fills `<HOSTNAME>`.
- Listener fills `<VPN_IP>`.
- DC fills `<DC_IP>` and `<DNS_IP>`; an IPv4 also fills `<DC_IPV4>` and a hostname
  fills `<DC_HOSTNAME>`. Tools requiring a literal DNS-server IP keep that
  placeholder manual when you supply only a hostname.
- Domain fills `<DOMAIN>` and derives `<BASE_DN>`, e.g.
  `corp.example` becomes `DC=corp,DC=example`; `<REALM>` becomes `CORP.EXAMPLE`.
- Invalid values show an error and are not inserted. IPv6, URLs, ports, and shell
  characters are not accepted. Hostnames use ASCII DNS labels.
- IP-only fields within `curl --resolve` remain manual when the target is a
  hostname. A DC IP never guesses a TLS hostname.
- Ports, usernames, pivot/destination hosts, paths, and other placeholders remain
  manual. **Reset filters** clears keywords and all selectors but
  preserves command values. **Clear values** preserves all search filters.

Copied commands contain the entered addresses/domain. Keep those
outputs private; do not publish exam-specific values or reports to GitHub.

## Supplied references

Coverage and organization draw on the user's
[affilares gist](https://gist.github.com/affilares/eb240d00663e60e1366b8b29c8f1c136),
[LeonardoE95 cheatsheet](https://github.com/LeonardoE95/OSCP/blob/main/cheatsheet.org),
and [Gabb4r notes](https://gabb4r.gitbook.io/oscp-notes), plus the
[0xsyr0/OSCP reference](https://github.com/0xsyr0/OSCP).
The site contains original summaries and conventional command templates, not
copied chapters. These external resources are not exam-approval lists; spoofing
and Metasploit/Meterpreter recipes from the references are not imported.
Added coverage includes DNS, SNMP, NFS, FTP, MySQL, content discovery, hash auditing,
and remote SSH forwarding. Every entry includes a use and verification cautions.
The standalone page omits the bottom bibliography and exam-guide sections;
source attribution and general exam-policy documentation remain here.

### 0xsyr0 source expansion

Inventoried on **2026-11-25** against revision
[`d66ac28d7a54c2ed1e9af1e607322d6f97138e95`](https://github.com/0xsyr0/OSCP/blob/d66ac28d7a54c2ed1e9af1e607322d6f97138e95/README.md).
The expansion adds **179 original entries**, including **32 command-bearing
entries** with flag/argument explanations. Existing content is retained, giving
286 entries at that stage (312 after Nmap and alternative/manual-lab additions). The reference includes new service clients, NetExec protocol
checks, Impacket ticket/RPC clients, local preparation utilities, and searchable
method notes for the source's named AD, certificate, credential, and exploitation
tool families.
All **111 distinct names** from the source's main tool/reference catalogue are
searchable; dedicated command sections contribute additional clients and aliases.
The full reference has 321 named tool choices, including command clients, libraries,
and clearly labeled reference resources.

`FieldnotesData.sourceCoverage` records the pinned source and explicitly tracked
tool keys. Its scope is the named tool/reference catalogue, dedicated CLI tool
sections, Impacket clients, and named coercion/escalation families—not every
incidental shell utility, generated payload, or line of the upstream document.
GUI tools, libraries, reference collections, legacy/fork-specific clients, and
unreviewed sensitive features are deliberately **method-only**. The CVE index
records source-listed names without independently validating their claims.

The upstream chapters, embedded scripts, credentials, lab IPs, bundled exploit
source, executables, and payloads are not copied into this app. Descriptions,
workflows, and templates are original; short tool names, conventional CLI syntax,
and documentation links provide the reference coverage. Method-only does not mean
that an entire tool is universally forbidden; it means no runnable recipe is
provided here without a separate feature/scope review.

New command templates remain visibly **syntax review pending**, not execution
tested or blanket exam-approved. Verify the installed client's help, especially
legacy clients, NetExec NFS support, and fork-dependent Impacket commands. No
assessment tools are installed or run, and no targets are contacted by the app.

## Walkthrough tool coverage

All ten user-supplied local walkthroughs were reviewed for tool names in commands,
output, and prose. The reconciled inventory contains **78 tool/command families**;
every identified family has a searchable entry or alias. Names found only in
prose/output are included for reference, not presented as proof of execution.
The original walkthroughs, their text, target details, credentials, hashes,
screenshots, and lab-specific solutions are not included or uploaded.

Coverage now includes NetExec/nxc and legacy CrackMapExec/cme, multiple Impacket
clients, SMBMap/rpcclient/enum4linux-ng, BloodHound/SharpHound, web discovery tools,
remote desktop clients, transfer tools, credential-format helpers, and tunneling.
The `Tool notes and restricted features` topic covers sensitive or restricted
tools without runnable attack chains. SQLmap is explicitly excluded from exam
use. Relay, ticket-forging, credential-memory, automated/uncertain features, and
Metasploit are not treated as generally approved simply because a walkthrough
mentions them.

Templates are original and checked against public documentation where relevant;
they have not been executed against the supplied labs. Check installed tool
versions, CLI syntax, underlying features, and current exam rules before use.
No pentesting tools were installed or run, and no lab targets were contacted or
walkthrough commands executed while building this reference.

## Maintaining the reference source

There is no in-app editing feature. Content changes require editing the static
source files and publishing through your repository account.

Edit [data.js](./data.js). Add a source label/URL in `sources` and an entry in `cards` with:

- Unique `id` and an existing `category`.
- `title`, `description`, and searchable `tags`.
- Optional `aliases`: additional task names, spellings, and associated common
  ports. Keep them specific to the entry; aliases do not populate the Tool filter.
- `commands`: an array of literal command strings (empty for a method-only entry).
- `flags`: explanations of the flags and arguments in those commands, including
  bundled options and command-specific meanings. Omit for method-only entries;
  commands without flags should explain their subcommands/arguments instead.
- `steps`: a concise manual workflow.
- `caution`: prerequisites, risks, and policy boundaries.
- `source`: a key from `sources`.
- Optional `services`: known service keys (first is its overview placement), and
  `stage`: a known stage key; see [workflow.js](./workflow.js). Existing entries
  use explicit overrides plus topic/tag classification, not free-text inference.

All entries are searchable together; no collection membership is needed.
[workflow.js](./workflow.js) holds service/stage classifications, authored finding
paths, real entry links, conditional branches, and source keys.
Keep all references valid; tests check full-reference access, browsing, and guide links.
Existing [custom-data.js](./custom-data.js) content remains a validated, read-only
compatibility source. Invalid content displays an error without hiding built-in entries.

Record completed syntax checks in `reviewGroups` with explicit entry IDs,
the reference version, public URL, review scope/limitations, and actual review
date in `syntaxReviews`. Do not mark an entry reviewed merely because a related
tool or another entry was checked.

For tool filtering, include the tool's exact key from `tools` in the entry's
`tags`. For a new tool, add its key and display label to `tools`; only keys
used by an entry appear in the dropdown.

Use original summaries and your own authorized notes, not copied website chapters
or course/exam content. Add links to relevant documentation. Replace
`<PLACEHOLDERS>` yourself before running a command. This starter uses Linux/Kali,
cmd.exe, or PowerShell as indicated; tool versions and target configuration vary.
Reference links are for further verification, not claims that every recipe has
been executed against all platforms.

## Exam boundaries

Policy reviewed **2026-11-24** against the
[official exam guide](https://help.offsec.com/hc/en-us/articles/360040165632-OSCP-Exam-Guide)
and [AI policy](https://help.offsec.com/hc/en-us/articles/35549468971156-AI-Usage-Policy-in-OffSec-Exams).
This is not OffSec-approved material or a guarantee of compliance.

- Do not use Copilot or any interactive AI/LLM assistance during the OSCP/OSCP+ exam.
- Recheck current rules, feature restrictions, and control-panel instructions.
- No automatic exploitation, mass vulnerability scanning, spoofing, or commercial
  tool/service recipes are included. A tool's name is not blanket feature approval.
- Metasploit/Meterpreter recipes are excluded. Auxiliary, Exploit, Post modules
  and Meterpreter are restricted to one chosen target, including checks and failed
  attempts. No Metasploit pivoting; the guide separately permits multi/handler
  and msfvenom across targets while retaining the Meterpreter restriction.
- Use only in authorized scope. Do not paste exam data into searches or publish it.
- Confirm prepared-material questions with OffSec before your exam if uncertain.

## Validate changes

With Node.js installed, from this folder:

```sh
node --test search.test.cjs custom.test.cjs
node --check app.js
node --check workflow.js
node --check custom.js
node --check custom-data.js
node --check data.js
node --check search.js
node --check variables.js
```

Also verify the initial prompt, search, filters, copy success/failure, empty-state reset,
keyboard focus, direct/alternative links, and narrow-screen layout in a browser. Tests validate search and content structure,
not exploitation results or exam authorization.
For the guide, check grouped service choices, cross-service branches, move-on
guidance, preserved values, Clear guide, same-fragment command links, and browser
Back/Forward. Following a command and immediately changing service must not reopen
the previous command through a delayed fragment event.
Also verify every matching entry is reachable through the selector/pager, one
entry/check is visible at a time, boundary buttons are disabled, and reading
positions survive switching observations without advancing automatically.
For existing static personal content, verify validation errors, tool filters, and
substitution after replacing the source file. No browser editor or export is available.
