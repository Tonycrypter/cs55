(function (root) {
  "use strict";
  const enumerationIds = [
    "nmap-fast", "nmap-top-ports", "tcp-discovery", "nmap-light-versions", "service-versions",
    "nmap-discovery-blocked", "nmap-syn-ports", "nmap-specific-udp", "udp-discovery",
    "nxc-smb-info", "nxc-smb-shares", "smb-shares", "smbmap-access", "rpcclient-accounts",
    "dns-records", "netbios-names", "snmp-system", "nfs-exports", "nxc-nfs-list",
    "ftp-list", "ftp-client", "nxc-ftp-list", "ssh-scp-access", "nxc-ssh-check",
    "mysql-context", "postgres-client", "redis-context", "mongodb-context", "sqlite-readonly",
    "http-basics", "virtual-host", "web-map", "web-directories", "gobuster-directories",
    "http-form", "nmap-http-headers", "web-input-method",
    "ad-context", "ldap-root", "ldap-users", "nxc-domain-info", "nxc-ldap-users",
    "kerberos-cache", "clock-inspection",
    "linux-context", "sudo-review", "linux-scheduled", "linux-listeners",
    "windows-context", "windows-services", "windows-tasks", "windows-connectivity",
    "file-http", "file-powershell", "shell-terminal",
    "exiftool-metadata", "archive-inspection", "nmap-output", "tmux-notes",
    "linux-evidence", "windows-evidence", "report-method"
  ];
  const enumerationEntries = new Set(enumerationIds);
  const stages = [
    { id: "enumeration", label: "Enumeration", shortLabel: "Enumeration", note: "Identify services, paths, accounts, and permissions before choosing further checks." },
    { id: "exploitation", label: "Exploitation / access", shortLabel: "Exploitation", note: "Manual, scoped validation or authorized access only. Access commands are not automatically vulnerability exploits; check prerequisites and cleanup." },
    { id: "troubleshooting", label: "Troubleshooting / alternatives", shortLabel: "Troubleshooting", note: "Use the actual failure to choose a different mode, filter, client, or connection check." },
    { id: "advanced", label: "Advanced / feature notes", shortLabel: "Advanced", note: "More involved commands and method-only restricted or unreviewed features. A listed tool is not blanket exam approval." },
    { id: "reference", label: "Preparation / evidence", shortLabel: "Preparation", note: "Local preparation, output handling, research, and reporting." }
  ];
  const services = [
    { id: "network", label: "Network scans", tags: ["nmap", "ping", "iproute2", "tcpdump", "sparta"] },
    { id: "smb", label: "SMB / RPC", tags: ["smb", "smbclient", "smbmap", "rpcclient", "enum4linux-ng", "nbtscan", "nmblookup", "impacket-smbclient", "impacket-psexec", "impacket-wmiexec"] },
    { id: "web", label: "Web / HTTP / HTTPS", category: "Web testing", tags: ["http", "https", "web", "ffuf", "gobuster", "dirsearch", "feroxbuster", "wfuzz", "whatweb", "wpscan", "nikto", "fpmvuln", "jwt", "jwt_tool", "jwtlens", "leaky-paths", "php-filter-chain-generator", "phpggc", "wpprobe", "gittools", "sqli-reference", "payloadsallthethings"] },
    { id: "ad", label: "AD / LDAP / Kerberos", category: "Active Directory", tags: ["ldap", "kerberos", "active directory", "bloodhound", "sharphound", "certipy", "ad cs", "adcs", "adcskiller", "adcstemplate", "adminer-ad", "adpeas", "bloodyad", "certify", "certipy-merged", "rubeus", "powerview", "powerview.py", "pywhisker", "whisker", "pkinittools", "rusthound", "rusthound-ce", "krbrelay", "krbrelayup", "krbrelayx", "lapsdumper", "passthecert", "pspkiaudit", "dnstool", "impacket-dacledit", "impacket-owneredit", "impacket-findDelegation", "impacket-addcomputer", "sharpsuccessor"] },
    { id: "ssh", label: "SSH", tags: ["ssh", "scp", "nxc-ssh"] },
    { id: "remote", label: "WinRM / RDP / VNC", tags: ["winrm", "evil-winrm", "rdp", "xfreerdp3", "vnc", "vncviewer"] },
    { id: "ftp", label: "FTP / TFTP", tags: ["ftp", "tftp"] },
    { id: "nfs", label: "NFS", tags: ["nfs", "showmount"] },
    { id: "dns", label: "DNS", tags: ["dns", "dig"] },
    { id: "snmp", label: "SNMP", tags: ["snmp", "snmpwalk"] },
    { id: "database", label: "Databases / Redis / Memcached", tags: ["mysql", "postgresql", "psql", "mongodb", "mongosh", "redis", "redis-cli", "sqlite3", "mssql", "sqsh", "memcached"] },
    { id: "linux", label: "Linux local checks", category: "Linux privilege escalation", tags: ["linux", "sudo", "getcap", "linpeas", "peass-ng", "linenum", "linux-exploit-suggester", "pspy", "logrotten", "rbash", "gtfobins", "shocker"] },
    { id: "windows", label: "Windows local checks", category: "Windows privilege escalation", tags: ["windows", "systeminfo", "icacls", "ipconfig", "mimikatz", "pypykatz", "donpapi", "nanodump", "ppldump", "powerup", "privesccheck", "seatbelt", "sherlock", "watson", "wesng", "winpeas", "godpotato", "juicypotato", "juicypotatong", "printspoofer", "sharpefspotato", "runascs"] },
    { id: "files", label: "Files / transfers / hashes", categories: ["File transfers and shells", "Password auditing"], tags: ["hashcat", "john", "exiftool", "7z"] },
    { id: "tunnels", label: "Forwarding / tunnels", category: "Tunneling and pivoting", tags: ["chisel", "ligolo-ng", "proxychains", "proxychains4", "socat", "sshuttle", "tunnel", "forwarding"] },
    { id: "mail", label: "Mail / SMTP", tags: ["smtp", "swaks"] },
    { id: "reference", label: "Preparation / other references", category: "Evidence and reporting", tags: [] }
  ];
  const serviceOverrides = {
    "ssh-scp-access": ["ssh", "files"], "freerdp-session": ["remote"], "vnc-session": ["remote"],
    "ssh-local": ["tunnels", "ssh"], "ssh-remote": ["tunnels", "ssh"], "ssh-dynamic": ["tunnels", "ssh"],
    "windows-connectivity": ["windows", "network"], "linux-listeners": ["linux", "network"],
    "nmap-http-headers": ["web", "network"], "nmap-specific-udp": ["network", "dns", "snmp"],
    "nmap-output": ["network", "reference"], "clock-inspection": ["ad", "network"],
    "nxc-ssh-check": ["ssh"], "nxc-ftp-list": ["ftp"], "nxc-nfs-list": ["nfs"],
    "nxc-mssql-context": ["database"], "impacket-mssql": ["database"],
    "file-http": ["files", "web"], "file-powershell": ["files", "windows"],
    "nxc-feature-boundaries": ["smb", "ad", "ssh", "ftp", "nfs", "database", "remote"],
    "impacket-relay-review": ["smb", "ad"], "lsassy-review": ["smb", "windows"],
    "syr0-responder": ["smb", "ad"], "syr0-mitm6": ["ad", "network"],
    "syr0-lazagne": ["windows", "files"], "syr0-petitpotam": ["smb", "ad"],
    "syr0-dfscoerce": ["smb", "ad"], "syr0-shadowcoerce": ["smb", "ad"],
    "syr0-printerbug": ["smb", "ad"]
  };
  const stageOverrides = Object.fromEntries([
    ["exploitation", ["impacket-psexec", "impacket-wmi", "evil-winrm-session", "freerdp-session", "vnc-session", "ssh-scp-access", "nxc-local-auth", "nxc-hash-auth", "nxc-winrm-auth"]],
    ["troubleshooting", ["nmap-discovery-blocked"]],
    ["reference", ["nmap-output", "linux-evidence", "windows-evidence", "report-method", "exploit-research", "source-cve-research", "tmux-notes", "python-env-prep", "runtime-checks", "git-local-review"]],
    ["advanced", ["web-input-method", "nmap-syn-ports", "nmap-http-headers", "suid-capabilities"]]
  ].flatMap(([stage, ids]) => ids.map(id => [id, stage])));
  function cardServices(card) {
    const explicit = card.services ?? (card.service !== undefined ? [card.service] : serviceOverrides[card.id]);
    if (explicit !== undefined) {
      if (!Array.isArray(explicit) || !explicit.length || explicit.some(id => !services.some(service => service.id === id))) {
        throw new Error(`Unknown service on entry ${card.id}.`);
      }
      return [...new Set(explicit)];
    }
    const tags = new Set(card.tags.map(tag => tag.toLowerCase()));
    const matches = services.filter(service =>
      service.category === card.category || service.categories?.includes(card.category) ||
      service.tags.some(tag => tags.has(tag.toLowerCase())));
    const categoryMatch = matches.find(service => service.category === card.category || service.categories?.includes(card.category));
    const ids = matches.map(service => service.id);
    return categoryMatch ? [categoryMatch.id, ...ids.filter(id => id !== categoryMatch.id)] :
      ids.length ? ids : ["reference"];
  }
  function cardStage(card) {
    if (card.stage !== undefined) {
      if (!stages.some(stage => stage.id === card.stage)) throw new Error(`Unknown stage on entry ${card.id}.`);
      return card.stage;
    }
    if (stageOverrides[card.id]) return stageOverrides[card.id];
    if (!card.commands.length) return "advanced";
    if (card.category === "Evidence and reporting") return "reference";
    return enumerationEntries.has(card.id) || ["Enumeration", "Web testing"].includes(card.category) ?
      "enumeration" : "advanced";
  }
  function browseCards(cards, { service = "all", tool = "All tools", category = "All topics", stage = "all" } = {}) {
    if (service !== "all" && !services.some(item => item.id === service)) throw new Error("Unknown service filter.");
    if (stage !== "all" && !stages.some(item => item.id === stage)) throw new Error("Unknown stage filter.");
    return cards.filter(card =>
      (service === "all" || cardServices(card).includes(service)) &&
      (category === "All topics" || card.category === category) &&
      (tool === "All tools" || card.tags.some(tag => tag.toLowerCase() === tool.toLowerCase())) &&
      (stage === "all" || cardStage(card) === stage));
  }
  const alternatives = {
    "gobuster-directories": ["gobuster-baseline-filter", "gobuster-timeouts", "ffuf-calibration"],
    "gobuster-baseline-filter": ["web-discovery-triage", "ffuf-calibration", "gobuster-status-filter"],
    "gobuster-timeouts": ["web-discovery-triage", "dirsearch-paths", "feroxbuster-paths"],
    "gobuster-vhosts": ["ffuf-vhosts", "virtual-host"],
    "gobuster-dns": ["dns-records", "gobuster-help"],
    "web-directories": ["ffuf-calibration", "gobuster-directories", "feroxbuster-paths"],
    "smb-shares": ["impacket-smbclient", "smbmap-access", "smb-connect-triage"],
    "smb-connect-triage": ["smb-shares", "impacket-smbclient", "nxc-smb-info"]
  };
  const findings = [
    {
      id: "start", group: "general", title: "Starting with one authorized host",
      checks: [
        { text: "Verify the target and connection, then use the fast first pass.", entries: ["nmap-fast"] },
        { text: "Expand to all TCP ports; a short scan cannot rule out non-standard services.", entries: ["tcp-discovery"] },
        { text: "Identify the actual protocols on found ports and keep the output.", entries: ["nmap-light-versions", "nmap-output"] }
      ],
      next: [{ when: "The scan reports open ports", finding: "ports" }, { when: "The host seems down", finding: "unreachable" }],
      caution: "Choose the branch from your actual observation. Nothing here scans, interprets output, or generates a recommendation.",
      sources: ["nmap_ports", "nmap_timing"]
    },
    {
      id: "unreachable", group: "general", title: "Host seems down or scans return no useful results",
      checks: [
        { text: "Check VPN/interface, route, address, and scope before changing scan timing.", entries: ["ping-one-host", "windows-connectivity"] },
        { text: "If discovery is blocked but the host is known reachable, probe a small explicit TCP port list.", entries: ["nmap-discovery-blocked"] },
        { text: "Retry uncertain results with normal timing; add selected UDP checks when justified.", entries: ["nmap-top-ports", "nmap-specific-udp"] }
      ],
      next: [{ when: "A service answers", finding: "ports" }, { when: "Everything is still silent", finding: "recheck" }],
      caution: "No ping reply or a filtered state is not proof of absence. Do not compensate with an indiscriminate high-rate scan.",
      sources: ["nmap_timing"]
    },
    {
      id: "ports", group: "general", title: "Open ports found",
      checks: [
        { text: "Identify the actual service; a port number is only a hint.", entries: ["nmap-light-versions"] },
        { text: "Confirm using that protocol's client and note hostnames or redirects.", entries: ["http-basics", "nxc-smb-info", "dns-records"] },
        { text: "Save findings and choose the matching service branch below.", entries: ["nmap-output"] }
      ],
      next: [
        { when: "HTTP/HTTPS answers", finding: "http" }, { when: "SMB answers", finding: "smb" },
        { when: "SSH answers", finding: "ssh" }, { when: "FTP answers", finding: "ftp" },
        { when: "NFS/RPC answers", finding: "nfs" }, { when: "DNS or SNMP answers", finding: "udp" },
        { when: "LDAP/Kerberos suggests a domain", finding: "ad" }, { when: "A database answers", finding: "database" },
        { when: "A port is open but its protocol is unknown", finding: "service-unknown" }
      ],
      caution: "Service identity must be confirmed. These branches are a fixed reference, not an attack-path detector.",
      sources: ["nmap"]
    },
    {
      id: "http", group: "web", title: "HTTP/HTTPS service found",
      checks: [
        { text: "Read a normal response, headers, and redirects before crawling.", entries: ["http-basics", "nmap-http-headers"] },
        { text: "If a hostname is disclosed, compare its virtual-host response and validate TLS.", entries: ["virtual-host", "openssl-tls"] },
        { text: "Map endpoints and inputs, then perform bounded path discovery and verify matches manually.", entries: ["web-map", "web-directories"] }
      ],
      next: [{ when: "WordPress indicators are present", finding: "wp-confirm" }, { when: "The site redirects to a hostname", finding: "web-hostname" }, { when: "Discovery produces no useful paths", finding: "web-empty" }, { when: "An input or access boundary looks unusual", finding: "web-input" }, { when: "A specific file is available for an authorized read", finding: "artifact" }],
      caution: "Inspect redirect scope before following it. Status codes, scanner findings, and exposed banners are not vulnerability proof.",
      sources: ["curl", "ffuf"]
    },
    {
      id: "web-input", group: "web", title: "Interesting web input, error, or access boundary",
      checks: [
        { text: "Capture a baseline and change one harmless input at a time.", entries: ["web-map", "web-input-method"] },
        { text: "Identify whether the issue concerns paths, templates, XML, SQL, or authorization before any further test.", entries: ["source-web-techniques"] },
        { text: "Document the expected boundary and the minimal observed difference.", entries: ["report-method"] }
      ],
      next: [{ when: "A SQL-related difference is reproducible", finding: "web-sql" }, { when: "Two designated accounts see an unexpected boundary", finding: "web-authz" }, { when: "You need a better baseline", finding: "http" }, { when: "No repeatable difference remains", finding: "web-stuck" }],
      caution: "Do not use automated exploitation, deploy payloads, or assume an error proves a vulnerability.",
      sources: ["curl", "syr0"]
    },
    {
      id: "smb", group: "smb", title: "SMB service found",
      checks: [
        { text: "Record host/domain information and permitted share visibility.", entries: ["nxc-smb-info", "smb-shares"] },
        { text: "With one approved account, inspect shares and the access reported for that identity.", entries: ["nxc-smb-shares", "smbmap-access"] },
        { text: "Inspect only relevant permitted paths; correlate names and policy with domain context.", entries: ["rpcclient-accounts", "nxc-domain-info"] }
      ],
      next: [{ when: "Shares can be read without credentials", finding: "smb-anonymous" }, { when: "A connection or access check fails", finding: "smb-denied" }, { when: "An authorized file is relevant", finding: "smb-file" }, { when: "A domain is confirmed", finding: "ad" }],
      caution: "A visible share is not permission to copy everything. Do not spray passwords, change files, or collect secrets by default.",
      sources: ["smb", "nxc"]
    },
    {
      id: "ad", group: "ad", title: "LDAP/Kerberos or an AD domain is confirmed",
      checks: [
        { text: "Establish the domain, controller, naming context, DNS, and clock first.", entries: ["ad-context", "ldap-root", "clock-inspection"] },
        { text: "With approved credentials and trusted TLS, query relevant users and memberships.", entries: ["ldap-users", "nxc-domain-info"] },
        { text: "Use scoped directory context to review permissions; certificate/graph features require their own feature review.", entries: ["syr0-adcs", "syr0-bloodhound-legacy", "nxc-feature-boundaries"] }
      ],
      next: [{ when: "Kerberos reports DNS or time errors", finding: "ad-clock" }, { when: "Memberships or permissions look interesting", finding: "ad-rights" }, { when: "You are confirming a designated account's access", finding: "credentials" }],
      caution: "Read operations, certificate enrollment, delegation changes, and credential collection are different activities. No modification or impersonation chain is selected for you.",
      sources: ["oxdf_ldap", "ldap", "nxc"]
    },
    {
      id: "ssh", group: "ssh", title: "SSH service found",
      checks: [
        { text: "Confirm the service identity and trusted host key.", entries: ["nmap-light-versions", "ssh-scp-access"] },
        { text: "Use a single approved account only; do not guess credentials.", entries: ["ssh-scp-access"] },
        { text: "Once a permitted session is established, confirm the operating system and current user.", entries: ["linux-context", "windows-context"] }
      ],
      next: [{ when: "You have a Linux shell", finding: "linux" }, { when: "You have a Windows shell", finding: "windows" }],
      caution: "A version banner is not proof of an exploit. No brute force, key theft, or host-key bypass is included.",
      sources: ["ssh"]
    },
    {
      id: "ftp", group: "ftp", title: "FTP service found",
      checks: [
        { text: "Inspect a permitted directory with appropriate anonymous or approved-account access.", entries: ["ftp-list", "ftp-client"] },
        { text: "Record filenames and read permissions without uploading anything.", entries: ["nxc-ftp-list"] },
        { text: "Review only a specifically authorized file and its provenance.", entries: ["exiftool-metadata", "archive-inspection"] }
      ],
      next: [{ when: "A permitted file is worth inspecting", finding: "artifact" }, { when: "Listing fails or yields nothing useful", finding: "ftp-stuck" }, { when: "A hostname or URL points to a scoped web service", finding: "http" }],
      caution: "FTP may expose credentials in plaintext. Visible files and write access do not authorize bulk downloads or payload uploads.",
      sources: ["curl", "syr0"]
    },
    {
      id: "nfs", group: "nfs", title: "NFS/RPC exports found",
      checks: [
        { text: "List exports and their advertised allowed clients.", entries: ["nfs-exports", "nxc-nfs-list"] },
        { text: "Check your scope and actual read permissions before accessing an export.", entries: ["nfs-exports"] },
        { text: "Inspect a relevant permitted artifact without modifying account or system files.", entries: ["exiftool-metadata", "archive-inspection"] }
      ],
      next: [{ when: "An advertised export cannot be accessed", finding: "nfs-denied" }, { when: "A permitted file is relevant", finding: "artifact" }, { when: "A Linux session is separately established", finding: "linux" }],
      caution: "Export visibility is not unrestricted filesystem access. No root filesystem escape or password-file editing is included.",
      sources: ["nfs", "nxc"]
    },
    {
      id: "udp", group: "network", title: "DNS, NTP, or SNMP answers",
      checks: [
        { text: "Confirm the protocol using a small explicit query; open|filtered alone is uncertain.", entries: ["nmap-specific-udp", "dns-records", "snmp-system"] },
        { text: "Correlate permitted hostnames, interfaces, and time with known services.", entries: ["dns-records", "clock-inspection"] },
        { text: "Follow only findings that stay within the authorized scope.", entries: ["nmap-light-versions"] }
      ],
      next: [{ when: "A DNS name is disclosed or fails to resolve", finding: "dns-name" }, { when: "A scoped web hostname is disclosed", finding: "http" }, { when: "A domain/controller is identified", finding: "ad" }],
      caution: "Do not use spoofing, amplification, or broad community-string guessing.",
      sources: ["dig", "snmp", "nmap"]
    },
    {
      id: "database", group: "database", title: "Database service and approved account available",
      checks: [
        { text: "Choose the actual database client and confirm authenticated identity.", entries: ["mysql-context", "postgres-client", "mongodb-context", "redis-context"] },
        { text: "Inspect visible schema or server metadata before querying specific application data.", entries: ["sqlite-readonly", "nxc-mssql-context"] },
        { text: "Record scope and findings without writes or operating-system command execution.", entries: ["report-method"] }
      ],
      next: [{ when: "The connection or login fails", finding: "db-denied" }, { when: "Access works but no useful lead appears", finding: "db-stuck" }, { when: "A permitted file or hash artifact needs local inspection", finding: "artifact" }],
      caution: "No full database dump, user reset, module loading, or command-execution enablement is included.",
      sources: ["mysql", "postgres", "syr0"]
    },
    {
      id: "credentials", group: "access", title: "One approved account or credential is available",
      checks: [
        { text: "Confirm account identity, intended service, and permission for a single access check.", entries: ["ssh-scp-access", "nxc-local-auth", "nxc-winrm-auth"] },
        { text: "For a domain account, establish domain context and relevant memberships.", entries: ["ldap-users", "nxc-domain-info"] },
        { text: "If a permitted session is already established, inspect that session's actual user and platform.", entries: ["linux-context", "windows-context"] }
      ],
      next: [{ when: "A Linux session is established", finding: "linux" }, { when: "A Windows session is established", finding: "windows" }, { when: "Only domain read access is established", finding: "ad" }],
      caution: "Do not test the credential indiscriminately across hosts or protocols. Failed logins can lock accounts; keep credentials out of files and URLs.",
      sources: ["ssh", "nxc", "ldap"]
    },
    {
      id: "linux", group: "linux", title: "An authorized Linux shell is established",
      checks: [
        { text: "Confirm identity, groups, platform, and local services.", entries: ["linux-context", "linux-listeners"] },
        { text: "Read sudo policy and scheduled-job inputs; verify actual permissions.", entries: ["sudo-review", "linux-scheduled"] },
        { text: "Investigate unusual privileged files only after confirming ownership and access.", entries: ["suid-capabilities"] }
      ],
      next: [{ when: "A sudo rule looks useful", finding: "linux-sudo" }, { when: "A scheduled job or writable input looks interesting", finding: "linux-jobs" }, { when: "The terminal is unreliable", finding: "shell-unstable" }, { when: "A service is only listening locally", finding: "local-service" }, { when: "Sufficient permitted proof is available", finding: "evidence" }],
      caution: "An unusual binary, NOPASSWD rule, or writable path is a lead, not proof of escalation. Do not modify jobs or run unrelated exploits.",
      sources: ["linux", "sudo"]
    },
    {
      id: "windows", group: "windows", title: "An authorized Windows shell is established",
      checks: [
        { text: "Confirm current token, group membership, OS, and network context.", entries: ["windows-context"] },
        { text: "Inspect relevant service configuration, executable paths, and ACLs.", entries: ["windows-services"] },
        { text: "Review scheduled tasks and their inputs without changing them.", entries: ["windows-tasks"] }
      ],
      next: [{ when: "Service paths or permissions look unusual", finding: "windows-service" }, { when: "A token privilege or group looks interesting", finding: "windows-token" }, { when: "Domain membership is confirmed", finding: "ad" }, { when: "Sufficient permitted proof is available", finding: "evidence" }],
      caution: "Privileges may be disabled and path spaces alone prove nothing. No token-abuse, service-replacement, or task-triggering chain is supplied.",
      sources: ["windows"]
    },
    {
      id: "local-service", group: "tunnels", title: "A service is reachable only from the current host",
      checks: [
        { text: "Confirm the listening address, port, and process where permissions allow.", entries: ["linux-listeners", "windows-connectivity"] },
        { text: "Verify permission to forward exactly that service before creating a loopback-bound tunnel.", entries: ["ssh-local"] },
        { text: "Use the actual protocol client through the approved endpoint.", entries: ["http-basics", "postgres-client"] }
      ],
      next: [{ when: "The endpoint is a web service", finding: "http" }, { when: "The endpoint is a database", finding: "database" }],
      caution: "Do not broaden routing, expose forwards on all interfaces, or use an unapproved pivot.",
      sources: ["ssh", "linux"]
    },
    {
      id: "artifact", group: "files", title: "A specifically permitted file, archive, or hash is relevant",
      checks: [
        { text: "Verify provenance and inspect a local copy's type/metadata without executing it.", entries: ["exiftool-metadata", "archive-inspection"] },
        { text: "For an authorized hash audit, identify the format before choosing an offline tool.", entries: ["hashcat-formats", "john-wordlist"] },
        { text: "Record only the evidence needed and keep sensitive outputs private.", entries: ["report-method"] }
      ],
      next: [{ when: "A designated credential is recovered in an approved audit", finding: "credentials" }, { when: "The artifact sufficiently supports a finding", finding: "evidence" }],
      caution: "Do not execute untrusted files, harvest unrelated secrets, or upload artifacts/hashes to online services. Download and artifact rules still apply.",
      sources: ["exiftool", "archive", "hashcat"]
    },
    {
      id: "version", group: "general", title: "A version string or configuration looks interesting",
      checks: [
        { text: "Corroborate the product/version and distinguish backported fixes from apparent age.", entries: ["nmap-light-versions", "http-basics"] },
        { text: "Research local references and authoritative advisories, then verify actual prerequisites.", entries: ["exploit-research", "source-cve-research"] },
        { text: "Document a hypothesis separately from a confirmed finding.", entries: ["report-method"] }
      ],
      next: [{ when: "More service evidence is needed", finding: "ports" }, { when: "Sufficient permitted evidence is available", finding: "evidence" }],
      caution: "No exploit is selected or executed. A matching CVE label or banner does not prove vulnerability.",
      sources: ["nmap", "searchsploit"]
    },
    {
      id: "recheck", group: "general", title: "Stuck / rabbit hole: review other confirmed leads",
      checks: [
        { text: "Record the current hypothesis, evidence, failed check, and missing prerequisite. Repeating a command is useful only if something relevant changed.", entries: ["report-method", "tmux-notes"] },
        { text: "Choose an unverified observed lead: an unknown open port, another hostname/application, or a permitted artifact. Do not rank a lead solely by an old version banner.", entries: ["nmap-light-versions", "virtual-host", "exiftool-metadata"] },
        { text: "Revisit incomplete scan coverage or earlier assumptions once with corrected settings; then follow the actual confirmed service.", entries: ["tcp-discovery", "nmap-specific-udp", "http-basics"] }
      ],
      next: [{ when: "An open port is still unidentified", finding: "service-unknown" }, { when: "Scan coverage was incomplete", finding: "scan-incomplete" }, { when: "A different scoped application is identified", finding: "http" }],
      exit: "Park a lead when its prerequisites are disproved, or independent checks produce no new evidence. Note what would justify returning. Do not invent a fixed time limit or assume another box's solution applies.",
      caution: "This is a fixed recheck list, not a recommendation based on your output or a guarantee of a path forward.",
      sources: ["nmap", "curl"]
    },
    {
      id: "evidence", group: "general", title: "Sufficient permitted proof is available",
      checks: [
        { text: "Capture the required proof in the original authorized target session.", entries: ["linux-evidence", "windows-evidence"] },
        { text: "Keep exact commands, prerequisite observations, and screenshots for a reproducible report.", entries: ["report-method", "nmap-output"] },
        { text: "Stop unnecessary testing and follow required cleanup/report instructions.", entries: ["report-method"] }
      ],
      next: [],
      caution: "This app does not assess exam success or report compliance. Keep proofs, credentials, and target-specific output off GitHub.",
      sources: ["offsec"]
    },
    {
      id: "wp-confirm", group: "wordpress", title: "WordPress found: establish the actual site and components",
      checks: [
        { text: "Verify the canonical hostname and installation directory. A root IP response may not be the same application as the redirected site.", entries: ["http-basics", "virtual-host"] },
        { text: "Read public page source and linked assets for wp-content plugin/theme paths; compare those observations with passive identification.", entries: ["web-map", "wpscan-passive"] },
        { text: "Separate core, plugin, and theme leads; record exact observed components before researching a matching issue.", entries: ["exploit-research", "source-cve-research"] }
      ],
      next: [{ when: "No plugins are detected", finding: "wp-no-plugins" }, { when: "Vulnerability API data is unavailable", finding: "wp-api" }, { when: "A component/version is identified", finding: "wp-version" }, { when: "Only a login page is interesting", finding: "wp-login" }],
      exit: "Do not spend all your time on the WordPress label. If no component or reachable behavior supports a lead, inspect the other confirmed services.",
      caution: "Component identification is not vulnerability proof. Do not copy a walkthrough's exploit just because it also used WordPress.",
      sources: ["wordpress_security", "wpscan_docs", "oxdf_backdoor"]
    },
    {
      id: "wp-no-plugins", group: "wordpress", title: "WPScan finds no plugins or misses an observed component",
      checks: [
        { text: "Check the exact URL, subdirectory, redirects, and installed detection settings. Passive results cover what was observed, not every installed component.", entries: ["wpscan-passive", "http-basics"] },
        { text: "Compare public HTML, CSS, and JavaScript links with a few evidence-derived plugin/theme paths. Inspect a known path manually before choosing a discovery tool.", entries: ["web-map", "web-discovery-triage"] },
        { text: "If bounded path discovery is justified, use the relevant directory and a small relevant list; compare unknown-path responses instead of launching an all-plugin sweep.", entries: ["gobuster-directories", "ffuf-calibration"] }
      ],
      next: [{ when: "A component is corroborated", finding: "wp-version" }, { when: "Unknown paths all look valid", finding: "web-soft404" }, { when: "No component evidence emerges", finding: "wp-stuck" }],
      exit: "An empty passive scan is inconclusive, but that is not a reason for endless plugin guessing. Park it after the URL and public assets have been checked.",
      caution: "A 403 on a plugin directory does not confirm a vulnerable version. Avoid broad aggressive scans and inherited API settings without review.",
      sources: ["wpscan_docs", "oxdf_backdoor", "wstg"]
    },
    {
      id: "wp-version", group: "wordpress", title: "A WordPress plugin/theme or CVE looks promising",
      checks: [
        { text: "Corroborate the component and installed version using independent public evidence; a readme stable tag may describe a packaged release, not the deployed code.", entries: ["web-map", "wpscan-passive"] },
        { text: "Check affected/fixed versions, required authentication, endpoint, configuration, and platform against authoritative documentation.", entries: ["exploit-research", "source-cve-research"] },
        { text: "If prerequisites hold, choose a minimal authorized manual validation of the specific behavior, with a baseline and control. Do not start by running downloaded exploit code.", entries: ["web-input-method", "source-web-techniques"] }
      ],
      next: [{ when: "The relevant behavior involves a path boundary", finding: "web-files" }, { when: "A SQL-related response needs validation", finding: "web-sql" }, { when: "Required version or access is absent", finding: "wp-stuck" }],
      exit: "Move on when the affected version, reachable endpoint, or required role is disproved. Record unknown prerequisites rather than marking the site vulnerable.",
      caution: "Outdated does not mean exploitable. Walkthroughs may use restricted automation or different versions; those commands are not imported here.",
      sources: ["wordpress_security", "wpscan_docs", "oxdf_backdoor"]
    },
    {
      id: "wp-login", group: "wordpress", title: "WordPress login page or public usernames, but no access",
      checks: [
        { text: "Distinguish a display name, login identity, and administrator role; public authorship proves none of the latter permissions.", entries: ["web-map"] },
        { text: "If you already have a designated authorized account, check the actual login flow and session behavior once; otherwise keep the login as a prerequisite, not an attack plan.", entries: ["http-form"] },
        { text: "Return to public components, disclosed hostnames, other services, and specifically permitted files instead of guessing credentials.", entries: ["wpscan-passive", "virtual-host", "exiftool-metadata"] }
      ],
      next: [{ when: "An approved dashboard session exists", finding: "wp-admin" }, { when: "A public component is found", finding: "wp-version" }, { when: "No approved account is available", finding: "wp-stuck" }],
      exit: "A login form or username alone is not progress toward access. Park the account-dependent lead until legitimate evidence provides the prerequisite.",
      caution: "No password spraying, brute force, XML-RPC amplification, or account lockout bypass is selected.",
      sources: ["wordpress_security", "wstg"]
    },
    {
      id: "wp-admin", group: "wordpress", title: "WordPress dashboard access works: verify actual permissions",
      checks: [
        { text: "Confirm the current user's actual role and visible capabilities; dashboard access is not automatically administrator access.", entries: ["web-map"] },
        { text: "Record visible component versions and relevant settings without saving changes. File editing and installation may be deliberately disabled.", entries: ["wpscan-passive", "web-input-method"] },
        { text: "Investigate a specific observed permission boundary only with designated test accounts and permitted fixtures.", entries: ["web-lab-object-access", "report-method"] }
      ],
      next: [{ when: "A component has a supported lead", finding: "wp-version" }, { when: "A test-owned object crosses a role boundary", finding: "web-authz" }, { when: "The next step requires unavailable capabilities", finding: "wp-stuck" }],
      exit: "A disabled editor or missing capability is a failed prerequisite, not a prompt to cycle through upload tricks. Return to evidence-backed components or other services.",
      caution: "Do not install plugins, edit themes, deploy shells, reset accounts, or change production-like settings by default.",
      sources: ["wordpress_security", "wstg"]
    },
    {
      id: "wp-api", group: "wordpress", title: "WPScan API unavailable, quota reached, or configuration unclear",
      checks: [
        { text: "Separate missing vulnerability data from failed site/component detection. WPScan can identify components without receiving API vulnerability records.", entries: ["wpscan-passive"] },
        { text: "Inspect inherited configuration and environment tokens before running the tool. Prepare approved local documentation before the exam instead of sending target data to another service.", entries: ["runtime-checks", "exploit-research"] },
        { text: "Corroborate observed versions with locally prepared advisories and manual application evidence; missing API records are not a clean bill of health.", entries: ["web-map", "source-cve-research"] }
      ],
      next: [{ when: "A component/version is available", finding: "wp-version" }, { when: "The scan also lacks component evidence", finding: "wp-no-plugins" }],
      exit: "Do not keep rerunning the scanner for absent vulnerability data or embed API tokens in your cheatsheet. Continue from the evidence you already have.",
      caution: "This app makes no API requests. External scanner updates and API access require their own rule/privacy review.",
      sources: ["wpscan_docs"]
    },
    {
      id: "wp-stuck", group: "wordpress", title: "WordPress rabbit hole: no supported route after the baseline",
      checks: [
        { text: "Write down what is confirmed: correct site, observed components, actual account role, and prerequisites that failed. Separate those from scanner guesses.", entries: ["report-method", "wpscan-passive"] },
        { text: "Check another observed hostname, application directory, or web port once with the correct context. A failed wordlist search does not rule out an undiscovered application.", entries: ["virtual-host", "web-map", "nmap-light-versions"] },
        { text: "Revisit unknown open ports or a specifically permitted artifact; use new evidence to return to WordPress only when it changes a prerequisite.", entries: ["tcp-discovery", "exiftool-metadata"] }
      ],
      next: [{ when: "Another application/hostname is observed", finding: "web-hostname" }, { when: "An open port remains unexplained", finding: "service-unknown" }, { when: "No new lead is confirmed", finding: "recheck" }],
      exit: "Park WordPress when the remaining ideas depend on absent credentials, an unconfirmed component, or a disproved version. Do not equate a familiar CMS with the intended path.",
      caution: "Backdoor and Soccer illustrate different routes, not predictions for your target or permission to copy their exploit chains.",
      sources: ["oxdf_backdoor", "oxdf_soccer", "wordpress_security"]
    },
    {
      id: "web-hostname", group: "web", title: "Redirect, certificate, or page reveals another hostname",
      checks: [
        { text: "Record the scheme, hostname, port, and path; verify that the destination belongs to the authorized scope before following it.", entries: ["http-basics", "openssl-tls"] },
        { text: "Compare the known Host response with the IP/default site. Use the discovered name rather than guessing that a default page is the whole application.", entries: ["virtual-host", "ffuf-vhosts"] },
        { text: "Map the resulting application's routes and assets, keeping separate notes for each confirmed endpoint.", entries: ["web-map", "gobuster-vhosts"] }
      ],
      next: [{ when: "The new application is WordPress", finding: "wp-confirm" }, { when: "The correct site still has no useful paths", finding: "web-empty" }, { when: "The name does not resolve as expected", finding: "dns-name" }],
      exit: "Stop guessing names when the observed hostname is verified and no new evidence remains. A failed wordlist is not proof that no other site exists.",
      caution: "DNS names and certificate alternatives can point outside scope. Do not follow every redirect or discovered name automatically.",
      sources: ["curl", "oxdf_soccer", "wstg"]
    },
    {
      id: "web-empty", group: "web", title: "Directory discovery returns no useful results",
      checks: [
        { text: "Verify hostname, port, base directory, and a known valid route. Compare a nonexistent route before blaming the scanner.", entries: ["http-basics", "web-discovery-triage"] },
        { text: "Read public links, forms, scripts, and relevant extension hints. Use a small application-relevant list rather than repeatedly changing giant wordlists.", entries: ["web-map", "gobuster-extensions"] },
        { text: "Only switch tools for a specific limitation or error; manually verify one candidate with an alternative client.", entries: ["dirsearch-paths", "feroxbuster-paths", "ffuf-calibration"] }
      ],
      next: [{ when: "Unknown paths look like valid pages", finding: "web-soft404" }, { when: "Requests are failing or timing out", finding: "web-timeouts" }, { when: "The verified baseline yields no new evidence", finding: "web-stuck" }],
      exit: "Do not rerun equivalent scans with unchanged URL, filters, and wordlist assumptions. Move to another observed service or application.",
      caution: "No results may reflect coverage, authentication, or filtering; they do not prove absence of an application.",
      sources: ["gobuster36", "ffuf", "wstg"]
    },
    {
      id: "web-soft404", group: "web", title: "Every path returns 200, 403, or the same redirect",
      checks: [
        { text: "Compare a known valid path and multiple nonexistent paths: status, response body, length, and redirect destination.", entries: ["web-discovery-triage", "http-basics"] },
        { text: "Choose a measured filter or calibration and retain a known-valid control. Repeated lengths can also belong to genuine pages.", entries: ["gobuster-baseline-filter", "ffuf-calibration"] },
        { text: "Resolve status allowlist/default blacklist conflicts separately from soft-404 responses.", entries: ["gobuster-status-filter", "gobuster-help"] }
      ],
      next: [{ when: "A distinct meaningful route remains", finding: "http" }, { when: "Responses vary because the service is unstable", finding: "web-timeouts" }, { when: "Corrected filters still yield nothing", finding: "web-stuck" }],
      exit: "If the scanner only reproduces the application's fallback page, stop treating its list as discovered content. Document the baseline and change leads.",
      caution: "Filtering everything or forcing a precheck does not validate discovery; preserve positive controls.",
      sources: ["gobuster36", "ffuf"]
    },
    {
      id: "web-timeouts", group: "web", title: "Web scanner times out, fails TLS, or loses the session",
      checks: [
        { text: "Make one normal request and separate connection, TLS hostname/trust, authentication, and response errors.", entries: ["http-basics", "openssl-tls", "web-discovery-triage"] },
        { text: "For overload, lower concurrency and add delay; verify one known route before a new scan. For an approved session, check expiry and current permissions.", entries: ["gobuster-timeouts", "gobuster-session"] },
        { text: "Use a verified lab-only certificate exception only when appropriate; otherwise fix trust/context. Use another client to corroborate behavior, not hide errors.", entries: ["gobuster-lab-tls", "dirsearch-paths"] }
      ],
      next: [{ when: "The corrected baseline works", finding: "web-empty" }, { when: "Failures persist with a normal request", finding: "unreachable" }],
      exit: "Stop increasing concurrency or rotating scanners while the baseline request fails. Resume only after a relevant condition changes.",
      caution: "Do not bypass authentication or globally disable TLS checks. Delays are not universal hard request-rate limits.",
      sources: ["curl", "gobuster36"]
    },
    {
      id: "web-authz", group: "web", title: "A page is forbidden or an object crosses an account boundary",
      checks: [
        { text: "Establish the expected role and object owner. A 401/403 response may be the intended authorization boundary.", entries: ["web-map", "http-form"] },
        { text: "If permitted, compare the same test-owned object using two designated test accounts and an unauthenticated control.", entries: ["web-lab-object-access"] },
        { text: "Record a repeatable boundary difference without requesting unrelated users' objects or changing their state.", entries: ["report-method", "web-input-method"] }
      ],
      next: [{ when: "A test boundary is reproducibly crossed", finding: "evidence" }, { when: "Access is denied as designed", finding: "web-stuck" }],
      exit: "Without authorized test identities or a reproducible boundary failure, park the lead. A forbidden directory is not a reason to try arbitrary bypasses.",
      caution: "Do not enumerate other users' records or assume changing an identifier is authorized.",
      sources: ["wstg"]
    },
    {
      id: "web-files", group: "web", title: "A file listing, backup hint, or path-handling lead appears",
      checks: [
        { text: "Confirm the exact route, advertised file, and permitted data scope. A directory listing does not authorize downloading its entire contents.", entries: ["http-basics", "web-map"] },
        { text: "For a suspected path boundary, use only an explicitly authorized non-sensitive fixture and a normal control request.", entries: ["web-lab-path-check", "web-input-method"] },
        { text: "Inspect a specifically permitted local artifact's type, metadata, and relevant text without executing it.", entries: ["exiftool-metadata", "archive-inspection", "text-inspection"] }
      ],
      next: [{ when: "A permitted artifact has a concrete lead", finding: "artifact" }, { when: "A fixture confirms a boundary failure", finding: "evidence" }, { when: "The claim does not reproduce", finding: "web-stuck" }],
      exit: "Do not turn a filename hint into broad secret-file harvesting. Park unconfirmed paths or unavailable fixtures.",
      caution: "No credential/configuration exfiltration payload or remote file execution chain is supplied.",
      sources: ["wstg", "oxdf_backdoor"]
    },
    {
      id: "web-sql", group: "web", title: "A SQL error or response difference looks interesting",
      checks: [
        { text: "Repeat the normal request, then vary one harmless input. Identify whether the difference is SQL-related or ordinary validation.", entries: ["web-input-method", "web-map"] },
        { text: "For an explicitly authorized numeric lab fixture, compare the documented Boolean controls against the unchanged baseline.", entries: ["web-lab-sql-boolean"] },
        { text: "Record stable, repeatable differences and the exact input context before considering any further separately authorized assessment.", entries: ["report-method", "source-web-techniques"] }
      ],
      next: [{ when: "The authorized control pair supports a finding", finding: "evidence" }, { when: "The response difference disappears", finding: "web-stuck" }],
      exit: "An error alone is not proof. Stop cycling through payload lists when the baseline/control comparison does not support the hypothesis.",
      caution: "No automated SQL exploitation, data dumping, delay-based load generation, or operating-system execution is added.",
      sources: ["wstg"]
    },
    {
      id: "web-stuck", group: "web", title: "Web rabbit hole: tested ideas produce no new evidence",
      checks: [
        { text: "Separate confirmed routes, account capabilities, and reproducible differences from banner/CVE guesses and duplicate scanner results.", entries: ["report-method", "web-map"] },
        { text: "Review known hostnames, distinct web ports, and unexamined public application links before repeating content discovery.", entries: ["virtual-host", "nmap-light-versions"] },
        { text: "Pick another confirmed service or relevant permitted artifact and state the single unanswered question you will test next.", entries: ["tcp-discovery", "exiftool-metadata"] }
      ],
      next: [{ when: "A new hostname is observed", finding: "web-hostname" }, { when: "A different open service needs identification", finding: "service-unknown" }, { when: "No new web evidence remains", finding: "recheck" }],
      exit: "Return to this application only when a new observation, authorized account, or corrected prerequisite makes a different check meaningful.",
      caution: "A familiar web technology need not be the initial-access route. Negative wordlist results are limited evidence.",
      sources: ["wstg", "oxdf_soccer"]
    },
    {
      id: "service-unknown", group: "network", title: "An open port does not reveal its actual protocol",
      checks: [
        { text: "Record the open port and the actual probe response; a service-name database label is only a guess.", entries: ["nmap-light-versions", "service-versions"] },
        { text: "If the response suggests HTTP or TLS, verify it with the relevant client; do not send arbitrary payloads to an unidentified service.", entries: ["http-basics", "openssl-tls"] },
        { text: "Correlate later permitted process/listener information or application clues with the port; keep an unanswered port in your notes.", entries: ["linux-listeners", "windows-connectivity", "report-method"] }
      ],
      next: [{ when: "HTTP is confirmed", finding: "http" }, { when: "A database is confirmed", finding: "database" }, { when: "No protocol evidence appears", finding: "recheck" }],
      exit: "Park the port after bounded identification attempts; revisit it when another observation identifies the process or protocol.",
      caution: "Do not use the port number as proof of software or run a matching exploit by name alone.",
      sources: ["nmap", "oxdf_backdoor", "oxdf_soccer"]
    },
    {
      id: "scan-incomplete", group: "network", title: "Only common ports were checked or scan results conflict",
      checks: [
        { text: "Distinguish a fast/common-port pass from complete TCP coverage, and record errors, dropped probes, or filtered uncertainty.", entries: ["nmap-fast", "nmap-top-ports", "nmap-output"] },
        { text: "Use the bounded full TCP follow-up and corroborate found ports with service identification; do not compensate with a forced high minimum rate.", entries: ["tcp-discovery", "nmap-light-versions"] },
        { text: "Check selected UDP services only when justified and keep open|filtered separate from confirmed responses.", entries: ["nmap-specific-udp", "dns-records", "snmp-system"] }
      ],
      next: [{ when: "A previously missed port is confirmed", finding: "ports" }, { when: "Connectivity itself is unreliable", finding: "unreachable" }],
      exit: "Once coverage and uncertainty are documented, move to the confirmed services rather than rerunning equivalent scans.",
      caution: "A completed scanner process is not proof of complete or reliable coverage.",
      sources: ["nmap_ports", "nmap_timing", "oxdf_forest"]
    },
    {
      id: "smb-anonymous", group: "smb", title: "SMB permits anonymous share visibility or reads",
      checks: [
        { text: "Distinguish share listing from actual read access; verify one relevant directory with a direct client.", entries: ["smb-shares", "impacket-smbclient"] },
        { text: "Inspect a specifically permitted file or policy path, recording host/domain and file provenance without recursive harvesting.", entries: ["smbmap-access", "rpcclient-accounts"] },
        { text: "Corroborate meaningful domain or artifact clues instead of treating an enumeration tool's many errors as total failure.", entries: ["nxc-smb-info", "exiftool-metadata"] }
      ],
      next: [{ when: "A relevant permitted file appears", finding: "smb-file" }, { when: "Domain context is confirmed", finding: "ad" }, { when: "Direct reads are denied", finding: "smb-denied" }],
      exit: "If visibility does not yield permitted relevant reads, record that boundary and move on; do not assume every advertised share is useful.",
      caution: "No bulk share download, credential harvesting, or write probe is requested.",
      sources: ["smb", "oxdf_active"]
    },
    {
      id: "smb-denied", group: "smb", title: "SMB says access denied, login failed, or client negotiation failed",
      checks: [
        { text: "Separate TCP reachability, negotiation, account authentication, and share permissions using the exact error.", entries: ["smb-connect-triage", "nxc-smb-info"] },
        { text: "For one approved account, verify domain/local identity and the selected share. Authentication success does not imply read or administrative execution rights.", entries: ["nxc-local-auth", "nxc-smb-shares"] },
        { text: "Corroborate the same scoped check with another client when the first client's behavior is unclear.", entries: ["impacket-smbclient", "smbmap-access"] }
      ],
      next: [{ when: "A direct permitted read works", finding: "smb-file" }, { when: "Only domain read access is established", finding: "ad" }, { when: "Authentication/permission is still absent", finding: "recheck" }],
      exit: "Do not keep trying the same identity or change protocols without evidence. Record the missing permission and choose another confirmed lead.",
      caution: "Avoid password guessing, weakening negotiation/security, or treating a failed aggregate tool as proof that every SMB check failed.",
      sources: ["smb", "nxc", "oxdf_active"]
    },
    {
      id: "smb-file", group: "smb", title: "A readable SMB file or policy artifact looks relevant",
      checks: [
        { text: "Record the share, path, permissions, and intended data scope before retrieving one explicitly permitted file.", entries: ["smb-shares", "impacket-smbclient"] },
        { text: "Inspect a local copy's metadata and relevant text, keeping provenance and sensitive values out of the published reference.", entries: ["exiftool-metadata", "text-inspection", "archive-inspection"] },
        { text: "Treat a disclosed account/domain/application name as a scoped clue; establish its context before any separate authorized access check.", entries: ["ad-context", "nxc-domain-info"] }
      ],
      next: [{ when: "A designated credential is legitimately available", finding: "credentials" }, { when: "Domain information is useful", finding: "ad" }, { when: "The file supports no new hypothesis", finding: "recheck" }],
      exit: "Stop collecting similar files once the relevant question is answered. A readable share is not a request to search every user's documents.",
      caution: "Historical walkthroughs can expose credentials; their secrets and harvesting sequences are not copied into this guide.",
      sources: ["smb", "oxdf_active"]
    },
    {
      id: "ad-clock", group: "ad", title: "Kerberos fails with clock, hostname, realm, or DNS errors",
      checks: [
        { text: "Confirm the actual DNS domain/controller and distinguish a hostname from a realm or NetBIOS name.", entries: ["ad-context", "dns-records", "ldap-root"] },
        { text: "Compare local and domain time and record the exact error before changing anything; do not confuse a time failure with bad credentials.", entries: ["clock-inspection", "kerberos-cache"] },
        { text: "Inspect your own ticket-cache context and requested service identity. Retry a designated account only after a verified relevant correction.", entries: ["kerberos-cache", "impacket-tgt", "impacket-service-ticket"] }
      ],
      next: [{ when: "Authenticated directory access works", finding: "ad-rights" }, { when: "The approved account still lacks access", finding: "recheck" }],
      exit: "Stop cycling passwords or clients while DNS/time prerequisites are unresolved. The same failed prerequisite will affect several tools.",
      caution: "No controller clock change, forged ticket, credential spray, or trust bypass is included.",
      sources: ["ldap", "oxdf_forest", "nxc"]
    },
    {
      id: "ad-rights", group: "ad", title: "An AD group, graph edge, or permission looks useful",
      checks: [
        { text: "Confirm the current identity, relevant memberships, object, and actual permission using scoped directory evidence.", entries: ["ldap-users", "nxc-domain-info", "impacket-ad-users"] },
        { text: "If approved graph data exists, verify its age and collection scope; do not treat a displayed path as confirmed effective access.", entries: ["bloodhound-directory", "sharphound-directory"] },
        { text: "Review the exact feature's prerequisites and restrictions before any separately permitted state-changing test.", entries: ["syr0-ad-attack-reference", "syr0-adcs", "nxc-feature-boundaries"] }
      ],
      next: [{ when: "A designated account's service access is permitted", finding: "credentials" }, { when: "Required effective permission is absent", finding: "recheck" }],
      exit: "Park stale graph edges, incomplete prerequisites, and permissions that cannot be corroborated. Do not force a remembered domain attack chain.",
      caution: "No automatic path selection, ACL modification, certificate enrollment, impersonation, or credential replication chain is added.",
      sources: ["ldap", "bloodhound", "oxdf_forest"]
    },
    {
      id: "linux-sudo", group: "linux", title: "A sudo rule looks promising but the expected technique fails",
      checks: [
        { text: "Read the exact allowed executable, arguments, RunAs identity, password requirement, and environment restrictions.", entries: ["sudo-review"] },
        { text: "Confirm the installed program/version and permitted arguments before using a reference; a similarly named binary or NOPASSWD label is not enough.", entries: ["runtime-checks", "syr0-gtfobins", "linux-file-context"] },
        { text: "Use only a harmless identity command when that exact command is explicitly permitted; otherwise document the configuration without attempting an escape.", entries: ["sudo-lab-identity", "report-method"] }
      ],
      next: [{ when: "Another scheduled/writable input is observed", finding: "linux-jobs" }, { when: "The rule's prerequisites do not match", finding: "recheck" }, { when: "Sufficient permitted evidence is collected", finding: "evidence" }],
      exit: "Stop trying shell-escape variants when the actual rule, version, or arguments do not match. Return only with new corroborating evidence.",
      caution: "No sudo shell-escape or exploit chain is supplied. A reference site's technique is not blanket permission.",
      sources: ["sudo", "linux"]
    },
    {
      id: "linux-jobs", group: "linux", title: "A cron job, service input, or writable path looks interesting",
      checks: [
        { text: "Identify the job's execution identity, schedule, executable, inputs, and whether the observed configuration is actually active.", entries: ["linux-scheduled", "linux-listeners"] },
        { text: "Check ownership and effective access on the relevant file and parent directories; a writable file matters only if a privileged process actually consumes it.", entries: ["linux-file-context", "suid-capabilities"] },
        { text: "Document the causal connection and any unresolved prerequisite instead of editing jobs or waiting indefinitely for an assumed trigger.", entries: ["report-method"] }
      ],
      next: [{ when: "The job exposes a local-only service", finding: "local-service" }, { when: "The privileged consumption hypothesis is unsupported", finding: "recheck" }],
      exit: "Move on when execution identity, effective write access, or actual use of the input cannot be established. Do not keep waiting for a speculative trigger.",
      caution: "No privileged-file replacement, task modification, or payload execution is requested.",
      sources: ["linux"]
    },
    {
      id: "windows-service", group: "windows", title: "A Windows service path or ACL looks unusual",
      checks: [
        { text: "Record the exact service executable/arguments, service account, current state, and relevant file ACLs.", entries: ["windows-services", "windows-access-review"] },
        { text: "Separate a path containing spaces from an actual unquoted command line; then verify effective permissions on each relevant path.", entries: ["windows-services", "powershell-local-files"] },
        { text: "Identify missing prerequisites such as effective modification rights or a permitted restart condition; document without replacing files.", entries: ["report-method", "windows-context"] }
      ],
      next: [{ when: "Token context explains the apparent rights", finding: "windows-token" }, { when: "A local service is the next observed lead", finding: "local-service" }, { when: "The permission/path hypothesis is disproved", finding: "recheck" }],
      exit: "Do not cycle service-replacement techniques when the required path, ACL, or execution condition is absent.",
      caution: "No executable replacement, service configuration change, or forced restart is selected.",
      sources: ["windows"]
    },
    {
      id: "windows-token", group: "windows", title: "A Windows privilege or group is present but access still fails",
      checks: [
        { text: "Confirm the actual token, enabled/disabled privileges, group attributes, and session context rather than relying on the account name.", entries: ["windows-context"] },
        { text: "Compare effective access to the exact resource with the reported membership; remote and local sessions can have different restrictions.", entries: ["windows-access-review", "nxc-winrm-auth"] },
        { text: "Review version/service prerequisites of any referenced feature without running token-abuse tools by default.", entries: ["syr0-windows-privesc-reference", "nxc-feature-boundaries"] }
      ],
      next: [{ when: "Domain permissions are the actual lead", finding: "ad-rights" }, { when: "Service permissions are corroborated", finding: "windows-service" }, { when: "The token does not confer the required access", finding: "recheck" }],
      exit: "A privilege name or administrator membership alone is not an escalation plan. Park techniques whose token or service prerequisites fail.",
      caution: "No token impersonation, UAC bypass, credential dumping, or automated escalation is added.",
      sources: ["windows", "nxc"]
    },
    {
      id: "db-denied", group: "database", title: "Database connection, TLS, authentication, or schema access fails",
      checks: [
        { text: "Identify the actual database protocol and separate TCP reachability, trusted TLS, account authentication, and database permissions.", entries: ["nmap-light-versions", "openssl-tls"] },
        { text: "Use the matching client: MySQL, PostgreSQL, MSSQL, MongoDB, or Redis; confirm port, database, authentication database, and intended account.", entries: ["mysql-context", "postgres-client", "impacket-mssql", "mongodb-context", "redis-context"] },
        { text: "A successful login may still lack schema access. Record the precise error and current identity before changing the hypothesis.", entries: ["nxc-mssql-context", "sqsh-context", "report-method"] }
      ],
      next: [{ when: "Approved read access works", finding: "db-stuck" }, { when: "Network connectivity fails", finding: "unreachable" }, { when: "The account lacks the necessary permission", finding: "recheck" }],
      exit: "Do not rotate clients or guess passwords without a protocol/configuration reason. Missing permissions are not client bugs.",
      caution: "No broad credential testing, TLS bypass, account reset, or database write is selected.",
      sources: ["mysql", "postgres", "nxc", "syr0"]
    },
    {
      id: "db-stuck", group: "database", title: "Database reads work but no useful next lead appears",
      checks: [
        { text: "Record the current identity, database, visible schema, and read scope; ask a specific application-related question rather than dumping everything.", entries: ["mysql-context", "postgres-client", "mongodb-context"] },
        { text: "Correlate permitted metadata with a known application or hostname. Inspect a specifically authorized local SQLite artifact read-only if relevant.", entries: ["sqlite-readonly", "web-map"] },
        { text: "Keep evidence separate from escalation assumptions; restricted file/OS features are not the default next step after a successful login.", entries: ["report-method", "nxc-feature-boundaries"] }
      ],
      next: [{ when: "An application/hostname is corroborated", finding: "web-hostname" }, { when: "A specifically permitted artifact is relevant", finding: "artifact" }, { when: "The scoped question is answered without a new lead", finding: "recheck" }],
      exit: "Stop broadening queries once the scoped question is answered. Database access need not be the route to operating-system access.",
      caution: "No database-wide dump, OS-command enablement, module loading, or credential harvesting is included.",
      sources: ["mysql", "postgres", "wstg"]
    },
    {
      id: "shell-unstable", group: "access", title: "An existing Linux shell is difficult to use",
      checks: [
        { text: "Distinguish terminal/PTY limitations from lost connectivity or missing permissions; confirm the current user and platform first.", entries: ["linux-context", "linux-file-context"] },
        { text: "Use the existing shell's terminal-improvement reference only when supported by the remote environment; verify local/remote terminal context.", entries: ["shell-terminal", "runtime-checks"] },
        { text: "If an approved SSH account already exists, prefer its normal session rather than creating another access mechanism.", entries: ["ssh-scp-access"] }
      ],
      next: [{ when: "The session is usable", finding: "linux" }, { when: "Connectivity is the actual failure", finding: "unreachable" }],
      exit: "Do not repeatedly launch additional listeners or tools when the problem is terminal settings or unavailable runtimes.",
      caution: "This concerns an already authorized session; no new payload, persistence, or access bypass is supplied.",
      sources: ["pty", "ssh"]
    },
    {
      id: "dns-name", group: "dns", title: "A discovered hostname fails to resolve or reaches the wrong site",
      checks: [
        { text: "Verify the actual authorized DNS server, queried record type, and spelling; distinguish missing records from resolver/connectivity errors.", entries: ["dns-records", "ad-context"] },
        { text: "For a known in-scope web name, compare the response using the explicit host mapping without guessing that every name resolves publicly.", entries: ["virtual-host", "openssl-tls"] },
        { text: "Keep DNS resolution, HTTP Host routing, and TLS server identity as separate checks.", entries: ["http-basics", "web-discovery-triage"] }
      ],
      next: [{ when: "The correct web application responds", finding: "web-hostname" }, { when: "A controller/domain is confirmed", finding: "ad" }, { when: "The name has no corroborated target", finding: "recheck" }],
      exit: "Stop switching resolvers or guessing names without evidence; use the observed name and an approved resolver/mapping.",
      caution: "Do not send exam-specific names to public resolvers or follow names outside scope by default.",
      sources: ["dig", "curl", "oxdf_forest"]
    },
    {
      id: "nfs-denied", group: "nfs", title: "NFS advertises an export but access is denied",
      checks: [
        { text: "Separate RPC/export advertisement from actual protocol/version and allowed-client access.", entries: ["nfs-exports", "nxc-nfs-list"] },
        { text: "Verify the exact export and permitted client context; advertised clients do not automatically include your host.", entries: ["nfs-exports"] },
        { text: "Record the boundary and correlate only allowed visible information with other confirmed services.", entries: ["report-method", "nmap-light-versions"] }
      ],
      next: [{ when: "A relevant permitted artifact becomes readable", finding: "artifact" }, { when: "Client/export prerequisites remain absent", finding: "recheck" }],
      exit: "Do not keep mounting variants or changing identities to defeat an allowed-client or filesystem boundary.",
      caution: "No identity spoofing, permission changes, privileged file writes, or root filesystem escape is supplied.",
      sources: ["nfs", "nxc"]
    },
    {
      id: "ftp-stuck", group: "ftp", title: "FTP login/listing fails or files provide no useful clue",
      checks: [
        { text: "Distinguish account authentication from the separate FTP data connection; a successful login with a hanging listing may be a connection-mode problem.", entries: ["ftp-client", "ftp-list"] },
        { text: "Compare one permitted directory using the documented client modes and record the actual error, without uploading files.", entries: ["ftp-client", "nxc-ftp-list"] },
        { text: "Inspect only a relevant authorized artifact; if none exists, return to other observed protocols or hostnames.", entries: ["exiftool-metadata", "nmap-light-versions"] }
      ],
      next: [{ when: "A specific permitted file is relevant", finding: "artifact" }, { when: "A web hostname is disclosed", finding: "web-hostname" }, { when: "No relevant permitted read exists", finding: "recheck" }],
      exit: "Do not guess credentials, cycle modes indefinitely, or upload payloads because a directory happens to be writable.",
      caution: "FTP credentials and file contents can be plaintext; review permissions and keep outputs private.",
      sources: ["curl", "syr0"]
    }
  ];
  const findingGroups = [
    { id: "general", label: "Start / stuck / evidence", services: [] },
    { id: "wordpress", label: "WordPress", services: ["web"] },
    { id: "web", label: "Web / discovery / input", services: ["web"] },
    { id: "network", label: "Network / scan coverage", services: ["network", "dns", "snmp"] },
    { id: "smb", label: "SMB / RPC", services: ["smb"] },
    { id: "ad", label: "AD / LDAP / Kerberos", services: ["ad"] },
    { id: "ssh", label: "SSH", services: ["ssh"] },
    { id: "ftp", label: "FTP", services: ["ftp"] },
    { id: "nfs", label: "NFS", services: ["nfs"] },
    { id: "dns", label: "DNS / hostname context", services: ["dns", "ad", "web"] },
    { id: "database", label: "Databases", services: ["database"] },
    { id: "linux", label: "Linux local checks", services: ["linux"] },
    { id: "windows", label: "Windows local checks", services: ["windows", "remote"] },
    { id: "tunnels", label: "Local-only services / forwarding", services: ["tunnels", "linux", "windows"] },
    { id: "files", label: "Permitted files / artifacts", services: ["files", "web", "smb", "ftp", "nfs", "linux", "windows", "database", "ad"] },
    { id: "access", label: "Account / existing session", services: ["ssh", "remote", "ad", "smb", "ftp", "database", "web", "linux", "windows"] }
  ];
  function findingsForService(service = "all") {
    if (service !== "all" && !services.some(item => item.id === service)) throw new Error("Unknown finding service.");
    return findings.filter(finding => {
      const group = findingGroups.find(item => item.id === finding.group);
      if (!group) throw new Error(`Unknown finding group on ${finding.id}.`);
      return service === "all" || !group.services.length || group.services.includes(service);
    });
  }
  root.FieldnotesWorkflow = { findings, findingGroups, findingsForService, stages, services, cardServices, cardStage, browseCards, alternatives };
})(globalThis);
