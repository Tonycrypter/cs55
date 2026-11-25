(function (root) {
  "use strict";
  const categories = [
    "Enumeration", "Web testing", "Linux privilege escalation",
    "Windows privilege escalation", "Active Directory", "Password auditing",
    "File transfers and shells", "Tunneling and pivoting", "Evidence and reporting",
    "Tool notes and restricted features"
  ];
  const tools = {
    "7z": "7-Zip / 7z", awk: "awk", bash: "Bash", bloodhound: "BloodHound",
    "burp free": "Burp Suite (Community)", cat: "cat", cd: "cd",
    certutil: "certutil", chisel: "Chisel", chmod: "chmod", chown: "chown",
    cron: "cron",
    crackmapexec: "CrackMapExec / cme", curl: "curl", dig: "dig",
    dirsearch: "dirsearch", diskshadow: "Diskshadow",
    "enum4linux-ng": "enum4linux-ng", "evil-winrm": "Evil-WinRM",
    exiftool: "ExifTool", feroxbuster: "feroxbuster", ffuf: "ffuf", find: "find",
    ftp: "FTP client", getcap: "getcap", git: "Git", gobuster: "Gobuster",
    grep: "grep", groups: "groups", hashcat: "Hashcat", hydra: "Hydra",
    icacls: "icacls", id: "id", ip: "iproute2 / ip",
    impacket: "Impacket (all tools)",
    "impacket-GetADUsers": "Impacket: GetADUsers",
    "impacket-GetNPUsers": "Impacket: GetNPUsers",
    "impacket-GetUserSPNs": "Impacket: GetUserSPNs",
    "impacket-mssqlclient": "Impacket: mssqlclient",
    "impacket-ntlmrelayx": "Impacket: ntlmrelayx",
    "impacket-psexec": "Impacket: psexec",
    "impacket-secretsdump": "Impacket: secretsdump",
    "impacket-smbclient": "Impacket: smbclient",
    "impacket-smbserver": "Impacket: smbserver",
    "impacket-ticketer": "Impacket: ticketer",
    "impacket-wmiexec": "Impacket: wmiexec",
    ipconfig: "ipconfig", java: "Java", john: "John the Ripper",
    keepass2john: "keepass2john", kerbrute: "Kerbrute", ldapsearch: "ldapsearch",
    "ligolo-ng": "Ligolo-ng", linpeas: "LinPEAS", ls: "ls", lsassy: "Lsassy",
    meterpreter: "Meterpreter", mimikatz: "Mimikatz", msfconsole: "Metasploit",
    mount: "mount", msfvenom: "msfvenom", mysql: "MySQL client", ncat: "Ncat",
    net: "Windows net",
    nc: "Netcat / nc", nxc: "NetExec / nxc", nikto: "Nikto", nltest: "nltest",
    nmap: "Nmap", openssl: "OpenSSL", powershell: "PowerShell",
    proxychains4: "ProxyChains", psql: "PostgreSQL / psql", pwd: "pwd", python: "Python",
    reg: "reg", rlwrap: "rlwrap", robocopy: "Robocopy", rpcclient: "rpcclient",
    rpcinfo: "rpcinfo", rubeus: "Rubeus", "sc.exe": "Windows sc.exe",
    schtasks: "schtasks", scp: "SCP", searchsploit: "SearchSploit", sed: "sed",
    sharphound: "SharpHound", smbclient: "Samba smbclient", smbmap: "SMBMap",
    showmount: "showmount", snmpwalk: "snmpwalk", socat: "socat", ss: "ss",
    ssh: "SSH", ssh2john: "ssh2john", stty: "stty", su: "su", sudo: "sudo",
    systemd: "systemd", systeminfo: "systeminfo",
    "targetedKerberoast.py": "targetedKerberoast",
    tcpdump: "tcpdump", tftp: "TFTP client", type: "Windows type", uname: "uname",
    vim: "Vim", vncviewer: "VNC viewer",
    weevely: "Weevely", wget: "Wget", whoami: "whoami", winpeas: "WinPEAS",
    wsgidav: "WsgiDAV", xfreerdp: "FreeRDP", zip2john: "zip2john", sqlmap: "SQLmap"
  };
  const sources = {
    wordpress_security: ["WordPress security guidance", "https://developer.wordpress.org/advanced-administration/security/hardening/"],
    wpscan_docs: ["WPScan usage and API documentation", "https://github.com/wpscanteam/wpscan/blob/master/README.md"],
    wstg: ["OWASP web testing methodology", "https://wstg.owasp.org/latest/"],
    oxdf_backdoor: ["0xdf: Backdoor reconnaissance lessons", "https://0xdf.gitlab.io/2022/04/23/htb-backdoor.html"],
    oxdf_soccer: ["0xdf: Soccer reconnaissance lessons", "https://0xdf.gitlab.io/2023/06/10/htb-soccer.html"],
    oxdf_active: ["0xdf: Active SMB enumeration lessons", "https://0xdf.gitlab.io/2018/12/08/htb-active.html"],
    oxdf_forest: ["0xdf: Forest domain reconnaissance lessons", "https://0xdf.gitlab.io/2020/03/21/htb-forest.html"],
    nmap: ["Nmap reference", "https://nmap.org/book/man.html"],
    curl: ["curl manual", "https://curl.se/docs/manpage.html"],
    linux: ["Linux manual pages", "https://man7.org/linux/man-pages/"],
    windows: ["Windows command reference", "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands"],
    smb: ["smbclient manual", "https://www.samba.org/samba/docs/current/man-html/smbclient.1.html"],
    ssh: ["OpenSSH manual", "https://man.openbsd.org/ssh"],
    python: ["Python HTTP server documentation", "https://docs.python.org/3/library/http.server.html"],
    pty: ["Python PTY documentation", "https://docs.python.org/3/library/pty.html"],
    powershell: ["PowerShell utility reference", "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/"],
    sudo: ["sudo manual", "https://www.sudo.ws/docs/man/sudo.man/"],
    ldap: ["ldapsearch manual", "https://www.openldap.org/software/man.cgi?query=ldapsearch"],
    offsec: ["OffSec exam guide", "https://help.offsec.com/hc/en-us/articles/360040165632-OSCP-Exam-Guide"],
    dig: ["BIND dig reference", "https://bind9.readthedocs.io/en/latest/manpages.html#dig-dns-lookup-utility"],
    snmp: ["Net-SNMP snmpwalk manual", "https://www.net-snmp.org/docs/man/snmpwalk.html"],
    nfs: ["Gabb4r: NFS enumeration", "https://gabb4r.gitbook.io/oscp-notes/service-enumeration/nfs-enumeration-port-111-2049"],
    mysql: ["MySQL client reference", "https://dev.mysql.com/doc/refman/8.4/en/mysql.html"],
    ffuf: ["ffuf documentation", "https://github.com/ffuf/ffuf"],
    nikto: ["Nikto documentation", "https://github.com/sullo/nikto/wiki"],
    hashcat: ["Hashcat example hash formats", "https://hashcat.net/wiki/doku.php?id=example_hashes"],
    john: ["John the Ripper options", "https://www.openwall.com/john/doc/OPTIONS.shtml"],
    searchsploit: ["SearchSploit manual", "https://www.exploit-db.com/searchsploit"],
    netcat: ["OpenBSD nc manual", "https://man.openbsd.org/nc"],
    network: ["PowerShell Test-NetConnection reference", "https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection"],
    nxc: ["NetExec documentation", "https://www.netexec.wiki/"],
    impacket: ["Impacket example tools", "https://github.com/fortra/impacket/tree/master/examples"],
    smbmap: ["SMBMap documentation", "https://github.com/ShawnDEvans/smbmap"],
    rpcclient: ["rpcclient manual", "https://www.samba.org/samba/docs/current/man-html/rpcclient.1.html"],
    enum4linux: ["enum4linux-ng documentation", "https://github.com/cddmp/enum4linux-ng"],
    winrm: ["Evil-WinRM documentation", "https://github.com/Hackplayers/evil-winrm"],
    bloodhound: ["BloodHound.py collector documentation", "https://github.com/dirkjanm/BloodHound.py"],
    kerbrute: ["Kerbrute documentation", "https://github.com/ropnop/kerbrute"],
    gobuster: ["Gobuster documentation", "https://github.com/OJ/gobuster"],
    chisel: ["Chisel documentation", "https://github.com/jpillora/chisel"],
    proxychains: ["ProxyChains-NG documentation", "https://github.com/rofl0r/proxychains-ng"],
    socat: ["socat manual", "https://www.dest-unreach.org/socat/doc/socat.html"],
    ligolo: ["Ligolo-ng quickstart", "https://docs.ligolo.ng/Quickstart/"],
    cme: ["CrackMapExec repository", "https://github.com/byt3bl33d3r/CrackMapExec"],
    dirsearch: ["dirsearch documentation", "https://github.com/maurosoria/dirsearch"],
    feroxbuster: ["feroxbuster documentation", "https://github.com/epi052/feroxbuster"],
    exiftool: ["ExifTool documentation", "https://exiftool.org/"],
    freerdp: ["FreeRDP documentation", "https://github.com/FreeRDP/FreeRDP/wiki"],
    vnc: ["TigerVNC viewer manual", "https://tigervnc.org/doc/vncviewer.html"],
    wsgidav: ["WsgiDAV documentation", "https://wsgidav.readthedocs.io/"],
    peass: ["PEASS-ng documentation", "https://github.com/peass-ng/PEASS-ng"],
    sharphound: ["SharpHound documentation", "https://bloodhound.specterops.io/collect-data/ce-collection/sharphound"],
    hydra: ["Hydra documentation", "https://github.com/vanhauser-thc/thc-hydra"],
    archive: ["7-Zip documentation", "https://7-zip.org/"],
    tcpdump: ["tcpdump manual", "https://www.tcpdump.org/manpages/tcpdump.1.html"],
    mimikatz: ["Mimikatz repository", "https://github.com/gentilkiwi/mimikatz"],
    rubeus: ["Rubeus repository", "https://github.com/GhostPack/Rubeus"],
    postgres: ["psql documentation", "https://www.postgresql.org/docs/current/app-psql.html"],
    openssl: ["OpenSSL command reference", "https://docs.openssl.org/3.0/man1/openssl/"],
    git: ["Git reference", "https://git-scm.com/docs"],
    wget: ["GNU Wget manual", "https://www.gnu.org/software/wget/manual/wget.html"],
    lsassy: ["Lsassy documentation", "https://github.com/Hackndo/lsassy"],
    targeted: ["targetedKerberoast repository", "https://github.com/ShutdownRepo/targetedKerberoast"]
  };
  const cards = [
    {
      id: "postgres-client", category: "Enumeration", title: "PostgreSQL / psql: inspect database access",
      aliases: ["postgres login", "database connection", "5432"],
      tags: ["psql", "PostgreSQL", "database", "5432"],
      description: "Connect with an authorized database account and inspect the current connection and tables.",
      flags: [
        "psql --host: selects the database server; --port=5432 selects its TCP port.",
        "psql --username: selects the login role; --dbname selects the database.",
        "psql --password: prompts for a password; do not append a password value.",
        "\\conninfo reports the connection; \\dt lists tables visible in the current search path. SELECT reads the current user and database; these are client/SQL commands, not shell flags."
      ],
      commands: [
        "psql --host=<TARGET_IP> --port=5432 --username=<USER> --dbname=<DATABASE> --password",
        "SELECT current_user, current_database();\n\\conninfo\n\\dt"
      ],
      steps: ["Enter the password when prompted; the second block belongs in psql.", "Confirm database/user context and visible schema before making further queries.", "Configure certificate-verified TLS for sensitive connections using your trusted client configuration."],
      caution: "Do not dump entire databases, run writes, or invoke server-side execution by default. A successful login is not administrative access.",
      source: "postgres"
    },
    {
      id: "openssl-tls", category: "Enumeration", title: "OpenSSL: inspect TLS and certificates",
      tags: ["openssl", "TLS", "certificate", "s_client", "x509"],
      description: "Inspect a TLS endpoint or read a local certificate's identity and validity dates.",
      flags: [
        "openssl s_client: -connect selects host:port; -servername sends the TLS SNI hostname.",
        "-verify_return_error stops on certificate-chain verification errors; it does not itself enable hostname matching.",
        "openssl x509: -in selects a local certificate; -noout suppresses the encoded certificate output.",
        "-subject shows the certificate identity; -issuer shows its signer; -dates shows not-before and not-after dates.",
        "</dev/null supplies empty standard input so s_client does not wait for interactive input; this is shell redirection, not an OpenSSL flag."
      ],
      commands: [
        "openssl s_client -connect <TARGET_IP>:<PORT> -servername <HOSTNAME> -verify_return_error </dev/null",
        "openssl x509 -in <CERT_FILE> -noout -subject -issuer -dates"
      ],
      steps: ["Supply the actual TLS hostname; the target IP does not infer SNI.", "Use trusted CA configuration and investigate verification failures instead of ignoring them.", "The second command reads a local certificate and does not connect to a server."],
      caution: "A certificate name/version is a lead, not proof of ownership or a vulnerability. This does not disable verification.",
      source: "openssl"
    },
    {
      id: "ssh-scp-access", category: "File transfers and shells", title: "SSH / SCP: authorized login and one-file transfer",
      aliases: ["secure shell", "SSH login", "22"],
      tags: ["ssh", "scp", "login", "file transfer", "22"],
      description: "Use authenticated SSH access or copy one permitted remote file.",
      flags: [
        "No flags are used here. SSH's USER@HOST selects the account and server.",
        "SCP's USER@HOST:REMOTE_FILE identifies the remote source; DESTINATION is the local output path. The colon separates the host from its path."
      ],
      commands: ["ssh '<USER>@<TARGET_IP>'", "scp '<USER>@<TARGET_IP>:<REMOTE_FILE>' <DESTINATION>"],
      steps: ["Verify the SSH host key against a trusted reference; do not disable host-key checks.", "Enter authorized credentials when prompted or use a deliberately configured key.", "Choose a destination and transfer only the file necessary for the exercise."],
      caution: "SCP can overwrite the destination. Exam download restrictions apply; an accessible file is not automatically permitted to download.",
      source: "ssh"
    },
    {
      id: "wget-file", category: "File transfers and shells", title: "Wget: download a specific lab file",
      tags: ["wget", "HTTP", "HTTPS", "download", "file transfer"],
      description: "Download one known permitted file to an explicit destination.",
      commands: ["wget --output-document=<DESTINATION> http://<VPN_IP>:<PORT>/<FILE>"],
      flags: ["wget --output-document selects the output file instead of using the URL's filename; an existing destination can be overwritten. The URL identifies the single file to retrieve."],
      steps: ["Use a dedicated server directory and inspect the intended file before transfer.", "Confirm the destination is writable and not an existing file you need to keep.", "Verify a checksum from the trusted source before any execution."],
      caution: "This overwrites DESTINATION and uses plaintext HTTP. No recursive download or certificate-ignore option is enabled.",
      source: "wget"
    },
    {
      id: "git-local-review", category: "Enumeration", title: "Git: inspect an authorized local repository",
      tags: ["git", "repository", "history", "source review"],
      description: "Read repository state and recent history without publishing or executing repository contents.",
      commands: ["git -C <REPOSITORY_PATH> status --short\ngit -C <REPOSITORY_PATH> log --oneline -n 5"],
      flags: [
        "git -C runs the following Git command in REPOSITORY_PATH without changing your shell's working directory.",
        "status --short uses compact index/worktree status lines.",
        "log --oneline prints an abbreviated commit ID and subject per commit; -n 5 limits the log to five commits."
      ],
      steps: ["Use a repository you are authorized to inspect.", "Review filenames and commit subjects as context for code inspection.", "Treat discovered secrets as sensitive findings, not strings to copy into a public cheatsheet."],
      caution: "These are local reads, not push/clone operations. Do not upload private code, exam data, or repository secrets.",
      source: "git"
    },
    {
      id: "text-inspection", category: "Enumeration", title: "grep / awk / sed: inspect local text",
      tags: ["grep", "awk", "sed", "cat", "text", "output"],
      description: "Search or display selected parts of a permitted local text file.",
      commands: ["grep -n -- '<PATTERN>' <FILE>", "awk '{print $1}' <FILE>", "sed -n '1,80p' <FILE>"],
      flags: [
        "grep -n prefixes matches with line numbers; -- ends option parsing so a pattern beginning with '-' is not treated as a flag.",
        "awk '{print $1}' prints the first whitespace-delimited field from each line; $1 belongs to awk, not the shell, because the program is single-quoted.",
        "sed -n disables automatic printing; '1,80p' explicitly prints lines 1 through 80. It does not edit the file."
      ],
      steps: ["Use grep to locate matches with line numbers, awk to inspect a field, and sed to show a limited range.", "Quote patterns so the shell does not expand them unexpectedly.", "Adjust the displayed range or field deliberately; these examples do not edit the file."],
      caution: "File contents can include credentials and private data. Do not use in-place editing or publish raw output accidentally.",
      source: "linux"
    },
    {
      id: "linux-file-context", category: "Enumeration", title: "Linux shell: identity, paths, permissions",
      tags: ["bash", "cat", "cd", "pwd", "ls", "chmod", "chown", "id", "su", "whoami"],
      description: "Inspect your shell context and set executable permission only on a file you own and intend to run.",
      commands: ["pwd\nid\nwhoami\nls -l <FILE>", "chmod u+x <FILE>"],
      flags: [
        "ls -l uses the long listing format to show permissions, owner, group, size, and timestamps.",
        "chmod u+x adds execute permission for the file's owner only; u+x is a permission expression, not a flag.",
        "pwd, id, and whoami use no flags here: they show the working directory, user/group IDs, and effective username."
      ],
      steps: ["Run in the target or local shell as appropriate and record which host produced the output.", "Read file content with cat or a text viewer before executing it.", "cd changes working directory; su changes account context when authorized. Do not use chown or privilege changes without understanding their effects."],
      caution: "chmod changes permissions; the first block is read-only. An executable permission bit does not make code safe.",
      source: "linux"
    },
    {
      id: "runtime-checks", category: "Enumeration", title: "Python / Java: check installed runtimes",
      tags: ["Python", "python", "python2", "python3", "java", "runtime"],
      description: "Check available runtimes before considering a script or compiled tool.",
      commands: ["python3 --version\njava -version"],
      flags: ["python3 --version reports the Python interpreter version; java -version reports the Java runtime version. These commands do not run a script or class."],
      steps: ["Confirm the exact version required by the code you intend to inspect.", "Older walkthroughs may refer to python or Python 2, which is end-of-life; do not assume the command selects Python 3.", "Review code and dependencies before running it. Avoid installing arbitrary packages or executing downloaded scripts blindly."],
      caution: "Missing runtimes should be handled deliberately. This entry does not convert or execute an exploit script.",
      source: "python"
    },
    {
      id: "vim-editing", category: "Enumeration", title: "Vim: inspect or edit your local notes",
      tags: ["vim", "editor", "notes"],
      description: "Open a file in a terminal editor and deliberately choose whether to save changes.",
      commands: ["vim <FILE>"],
      flags: ["No command-line flags are used. FILE is the file to open; :q and :wq are editor commands for quitting and saving/quitting, respectively."],
      steps: ["Use a file you own or are authorized to edit.", "Press Esc then :q to quit an unchanged file; :wq saves and quits.", "Review changes before saving, especially scripts, service files, and configuration."],
      caution: "An editor can modify files and run shell commands. Do not overwrite target files merely to inspect them.",
      source: "linux"
    },
    {
      id: "windows-registry", category: "Windows privilege escalation", title: "Windows reg: inspect a chosen registry key",
      tags: ["reg", "reg.exe", "registry", "Windows", "cmd.exe", "net"],
      description: "Read configuration values from a specific registry key in cmd.exe.",
      commands: ["reg query \"<REGISTRY_KEY>\""],
      flags: ["No flags are used. reg query reads the selected registry key and its values; the quoted key is a path argument, not an export or modification request."],
      steps: ["Select only the key relevant to the authorized configuration review.", "Distinguish missing keys from access-denied results.", "Use normal Windows net/whoami commands to confirm account context separately."],
      caution: "Registry values can contain secrets. This does not export SAM/SYSTEM hives, change keys, or bypass access controls.",
      source: "windows"
    },
    {
      id: "lsassy-review", category: "Tool notes and restricted features", title: "Lsassy: remote credential-collection review",
      tags: ["LSASSY", "lsassy", "LSASS", "credential collection"],
      description: "Identify credential-collection tooling without importing a walkthrough's collection or execution sequence.",
      commands: [],
      steps: ["Review the exact collection/execution method, required privileges, and authorized data scope.", "Do not assume a successful administrative login permits collecting all users' memory credentials.", "Check current exam feature restrictions and minimize sensitive output."],
      caution: "No LSASS dump, evasion, credential-theft chain, or automatic remote collection command is provided.",
      source: "lsassy"
    },
    {
      id: "targeted-kerberoast-review", category: "Tool notes and restricted features", title: "targetedKerberoast: directory-change review",
      tags: ["targetedKerberoast.py", "targetedKerberoast", "Kerberos", "SPN", "ACL"],
      description: "Recognize a targeted service-ticket audit tool that can modify directory attributes.",
      commands: [],
      steps: ["Review the account permissions and exact directory changes involved.", "Prefer the read/query-only SPN enumeration entry before any directory modification.", "Any lab test must have explicit authorization, controlled scope, and a verified restoration plan."],
      caution: "No SPN-modification or credential-extraction chain is included. The presence of this tool in a walkthrough does not approve its features for an exam.",
      source: "targeted"
    },
    {
      id: "cme-legacy", category: "Enumeration", title: "CrackMapExec / cme: legacy SMB enumeration",
      aliases: ["SMB shares", "Samba shares", "445", "139"],
      tags: ["crackmapexec", "cme", "NetExec", "SMB", "shares"],
      description: "Recognize older walkthrough commands and list shares with a known account on one host.",
      commands: ["crackmapexec smb <TARGET_IP> -d <DOMAIN> -u '<USER>' -p '<PASSWORD>' --shares"],
      flags: [
        "smb selects the SMB protocol and TARGET_IP selects the host.",
        "CrackMapExec -d selects the authentication domain; -u supplies the username; -p supplies the password in the command line.",
        "--shares requests a share listing and reported access; it is not a recursive download."
      ],
      steps: ["Older installations may expose cme as an alias; current tooling often uses nxc instead.", "Check your installed version and protocol help rather than copying module names between forks.", "Use the NetExec share entry for the current equivalent where appropriate."],
      caution: "CrackMapExec is a legacy tool, not a blanket-approved exam feature set. Passwords and outputs are sensitive; no modules, spraying, or automatic exploitation are enabled.",
      source: "cme"
    },
    {
      id: "impacket-psexec", category: "File transfers and shells", title: "Impacket: PsExec-style remote session",
      aliases: ["Windows remote shell", "SMB remote session", "445"],
      tags: ["impacket", "impacket-psexec", "psexec.py", "psexec", "SMB", "shell"],
      description: "Open an authorized administrative session through SMB and remote service creation.",
      commands: ["impacket-psexec '<DOMAIN>/<USER>@<TARGET_IP>'"],
      flags: ["No flags are used. DOMAIN/USER@TARGET_IP selects the authentication domain, user, and remote host; omitting a password from this identity causes a password prompt. The tool itself still uploads a service binary."],
      steps: ["Enter the password at the prompt; confirm administrative SMB/service-control access.", "Inspect the resulting identity and host before issuing further commands.", "Understand the uploaded executable and service created by this client; end the session normally and verify cleanup."],
      caution: "This changes the target by uploading a binary and creating a service. Do not use it as an unapproved exploit or assume every target permits it.",
      source: "impacket"
    },
    {
      id: "impacket-secretsdump-local", category: "Password auditing", title: "Impacket: inspect local SAM/SYSTEM copies",
      tags: ["impacket", "impacket-secretsdump", "secretsdump.py", "secretsdump", "SAM", "SYSTEM", "NTLM"],
      description: "Extract account hash data offline from registry-hive files you are explicitly authorized to possess.",
      commands: ["impacket-secretsdump -sam <SAM_FILE> -system <SYSTEM_FILE> LOCAL"],
      flags: [
        "impacket-secretsdump -sam selects the local SAM hive; -system selects the matching SYSTEM hive used to derive the boot key.",
        "LOCAL selects offline processing of supplied files rather than a remote target; it is a positional mode argument."
      ],
      steps: ["Keep the input files and results in a private working directory.", "Use matching hive files from the same authorized system.", "Identify output formats and audit only accounts within scope. Do not infer remote dumping permission from this local example."],
      caution: "This is not a remote NTDS/DCSync recipe. Exam file-download restrictions apply even to files useful for credential auditing.",
      source: "impacket"
    },
    {
      id: "impacket-smbserver", category: "File transfers and shells", title: "Impacket: dedicated SMB transfer share",
      aliases: ["SMB file server", "SMB share hosting", "445"],
      tags: ["impacket", "impacket-smbserver", "smbserver.py", "smbserver", "SMB", "file transfer"],
      description: "Serve a dedicated transfer directory with a chosen lab username and password.",
      commands: ["impacket-smbserver -smb2support -ip <VPN_IP> -username '<USER>' -password '<PASSWORD>' <SHARE> <TRANSFER_DIRECTORY>"],
      flags: [
        "impacket-smbserver -smb2support enables SMB2 support; -ip selects the listener's bind address.",
        "-username and -password configure the share's authentication credentials; the password is exposed in process arguments.",
        "SHARE is the exported share name; TRANSFER_DIRECTORY is the local directory being served. These arguments do not make the share read-only."
      ],
      steps: ["Check the server's help for version-specific options.", "Use a directory containing only files you intend to expose and restrict host/firewall access to your lab.", "Connect the intended client, transfer only permitted files, then stop the server."],
      caution: "The share can allow writes and the command exposes a password. Binding the default port 445 may require privileges. This is not a capture, relay, or forced-authentication setup; do not serve sensitive files.",
      source: "impacket"
    },
    {
      id: "dirsearch-paths", category: "Web testing", title: "dirsearch: web path discovery",
      aliases: ["directory busting", "web directories", "hidden paths", "80", "443"],
      tags: ["dirsearch", "dirsearch.py", "directory", "web", "wordlist"],
      description: "Test a chosen path list and relevant file extensions against one application.",
      commands: ["dirsearch -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> -e <EXTENSIONS>"],
      flags: [
        "dirsearch -u selects the base URL; -w selects the path wordlist.",
        "-e selects comma-separated extensions, such as php,html. Extension expansion depends on the wordlist's placeholders and installed version."
      ],
      steps: ["Choose extensions appropriate to the application, such as php,html.", "Use dirsearch -h or the source dirsearch.py help to check concurrency and configuration defaults.", "Compare candidate paths with baseline responses; do not enable recursion or out-of-scope redirects blindly."],
      caution: "Current dirsearch also exposes APIs/MCP integrations. This recipe is a CLI content-discovery reference, not an AI-assisted or automatic-exploitation workflow.",
      source: "dirsearch"
    },
    {
      id: "feroxbuster-paths", category: "Web testing", title: "feroxbuster: bounded content discovery",
      aliases: ["directory busting", "web directories", "hidden paths", "80", "443"],
      tags: ["feroxbuster", "directory", "web", "recursion", "wordlist"],
      description: "Discover candidate paths without recursive expansion.",
      commands: ["feroxbuster -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> --no-recursion --threads 5 --rate-limit 20"],
      flags: [
        "feroxbuster -u selects the starting URL; -w selects the wordlist.",
        "--no-recursion prevents automatic scanning of newly discovered directories.",
        "--threads 5 limits concurrent scanning workers to five; --rate-limit 20 limits requests to 20 per second per directory, not an unconditional global traffic limit."
      ],
      steps: ["Read installed help and confirm how request limits apply.", "Use a small relevant wordlist and inspect soft-404 behavior.", "Manually verify results before extending depth or trying additional roots."],
      caution: "The disabled recursion avoids automatic depth expansion, not every possible traffic risk. Content discovery is not proof of a vulnerability or blanket exam approval.",
      source: "feroxbuster"
    },
    {
      id: "exiftool-metadata", category: "Enumeration", title: "ExifTool: inspect document metadata",
      tags: ["exiftool", "metadata", "PDF", "documents", "authors"],
      description: "Read metadata from a file you are authorized to have.",
      commands: ["exiftool <FILE>"],
      flags: ["No flags are used. FILE is the local document to inspect; ExifTool prints readable metadata rather than setting or deleting tags."],
      steps: ["Use a local permitted file, not a bulk download from an exam host.", "Check author, application, timestamps, and other metadata as leads.", "Correlate metadata carefully; fields can be missing, stale, or user-controlled."],
      caution: "Metadata may contain private identities and paths. This read-only example does not modify the file and does not grant download permission.",
      source: "exiftool"
    },
    {
      id: "freerdp-session", category: "File transfers and shells", title: "FreeRDP: graphical RDP session",
      aliases: ["Windows remote desktop", "RDP login", "3389"],
      tags: ["xfreerdp", "xfreerdp3", "FreeRDP", "RDP", "3389"],
      description: "Connect to an authorized Windows desktop with a known account.",
      commands: ["xfreerdp /v:<TARGET_IP> /u:'<USER>' /d:<DOMAIN> /dynamic-resolution", "xfreerdp3 /v:<TARGET_IP> /u:'<USER>' /d:<DOMAIN> /dynamic-resolution"],
      flags: [
        "FreeRDP /v selects the server; /u selects the username; /d selects the authentication domain. The ':' separates an option from its value.",
        "/dynamic-resolution requests desktop resolution updates when the client window is resized, if the server supports them.",
        "No /p option is supplied: enter the password at the prompt rather than exposing it in command arguments."
      ],
      steps: ["Use the command name installed on your client, not both.", "Enter the password when prompted and verify certificate trust before accepting a new host.", "Confirm the account has RDP rights. Clipboard and drive redirection should be enabled only deliberately."],
      caution: "Do not use blanket certificate-ignore flags or expose local drives by default. RDP login is not proof of administrative privilege.",
      source: "freerdp"
    },
    {
      id: "vnc-session", category: "File transfers and shells", title: "VNC viewer: remote desktop",
      aliases: ["VNC login", "remote desktop", "5900"],
      tags: ["vncviewer", "VNC", "5900", "remote desktop"],
      description: "Connect a compatible VNC viewer to one authorized desktop endpoint.",
      commands: ["vncviewer <TARGET_IP>::<PORT>"],
      flags: ["No flags are used. In TigerVNC's HOST::PORT syntax, the double colon selects an explicit TCP port rather than a VNC display number."],
      steps: ["TigerVNC-style syntax uses double colon for an explicit TCP port; check your viewer's help.", "Authenticate with the intended account/session credentials.", "If the server does not provide transport security, use an authorized SSH tunnel instead of exposing VNC traffic."],
      caution: "Different VNC implementations have different security and address syntax. Do not assume passwords or screen traffic are encrypted.",
      source: "vnc"
    },
    {
      id: "rlwrap-listener", category: "File transfers and shells", title: "rlwrap: local input editing for a listener",
      tags: ["rlwrap", "nc", "netcat", "listener", "terminal"],
      description: "Add local line editing to a compatible netcat listener.",
      commands: ["rlwrap nc -lvn <VPN_IP> <LISTEN_PORT>"],
      flags: [
        "rlwrap wraps the nc process for local line editing; no rlwrap flags are supplied.",
        "nc -lvn combines -l (listen), -v (verbose diagnostics), and -n (do not resolve host or service names).",
        "VPN_IP is the bind address and LISTEN_PORT is the local port in this OpenBSD nc syntax."
      ],
      steps: ["Confirm the nc syntax matches your installed implementation.", "Use only an intended lab interface and connection.", "rlwrap improves local input history/editing; it does not create a remote PTY or elevate privileges."],
      caution: "Local line history can contain sensitive commands. This listener has no authentication or encryption and is not proof of an interactive target shell.",
      source: "netcat"
    },
    {
      id: "ncat-listener", category: "File transfers and shells", title: "Ncat: lab TCP listener",
      tags: ["ncat", "Nmap Ncat", "netcat", "TCP", "listener"],
      description: "Listen on one lab address with Nmap's Ncat implementation.",
      commands: ["ncat -lv <VPN_IP> <LISTEN_PORT>"],
      flags: ["Ncat -lv combines -l (listen for connections) and -v (verbose diagnostics). VPN_IP and LISTEN_PORT select the local bind address and TCP port; no command-execution option is used."],
      steps: ["Read ncat --help instead of assuming nc options are interchangeable.", "Use an unused unprivileged port on your lab interface.", "Stop the listener after the intended connection."],
      caution: "This template uses plain TCP and does not execute a shell. Configure authentication/encryption separately when required.",
      source: "nmap"
    },
    {
      id: "wsgidav-transfer", category: "File transfers and shells", title: "WsgiDAV: authenticated WebDAV transfer",
      tags: ["wsgidav", "WebDAV", "file transfer", "HTTP"],
      description: "Expose a dedicated directory through WebDAV with an explicit authentication configuration.",
      commands: ["wsgidav --host=<VPN_IP> --port=<PORT> --root=<TRANSFER_DIRECTORY> --auth=pam-login"],
      flags: [
        "wsgidav --host selects the bind address; --port selects the HTTP listener port.",
        "--root selects the directory exposed through WebDAV.",
        "--auth=pam-login selects PAM-backed local-account authentication; it requires the relevant Linux support and does not enable TLS."
      ],
      steps: ["This example targets Linux with WsgiDAV's PAM-login support installed; check platform and package requirements.", "Serve only a dedicated transfer directory and configure TLS/trust if sensitive credentials are used.", "Review read/write permissions and stop the service after the transfer."],
      caution: "PAM authentication without TLS can expose credentials in transport. Do not serve your home directory or enable anonymous write access.",
      source: "wsgidav"
    },
    {
      id: "ftp-client", category: "Enumeration", title: "FTP client: inspect a permitted directory",
      aliases: ["FTP login", "FTP listing", "21"],
      tags: ["ftp", "FTP", "21", "files"],
      description: "Open an interactive FTP client and inspect directories with authorized credentials.",
      commands: ["ftp <TARGET_IP>", "pwd\nls\nbye"],
      flags: ["No flags are used. ftp TARGET_IP opens the server connection. Inside the client, pwd shows the remote working directory, ls lists it, and bye closes the session."],
      steps: ["Run the first command locally; enter credentials at the client prompts.", "The second block consists of FTP client commands after login.", "Choose transfers individually and respect exam file-download restrictions."],
      caution: "Plain FTP does not encrypt credentials or data. Prefer trusted encrypted transport when available.",
      source: "curl"
    },
    {
      id: "tftp-transfer", category: "File transfers and shells", title: "TFTP: transfer a specific permitted file",
      tags: ["tftp", "UDP", "69", "file transfer"],
      description: "Fetch a specifically named file from an authorized TFTP service.",
      commands: ["tftp <TARGET_IP>", "binary\nget <FILE> <DESTINATION>\nquit"],
      flags: [
        "No flags are used. tftp TARGET_IP selects the server.",
        "Inside the client, binary selects octet transfer mode; get FILE DESTINATION downloads the named remote file to the local path; quit exits."
      ],
      steps: ["Run the first command locally; the second block is entered inside the TFTP client.", "TFTP does not provide normal directory listing or account authentication.", "Verify the file and record why the download was necessary."],
      caution: "TFTP is unencrypted and unauthenticated. Use only a controlled lab service; do not guess or download unrelated sensitive files.",
      source: "linux"
    },
    {
      id: "john-extractors", category: "Password auditing", title: "John format extractors: ZIP, KeePass, SSH",
      tags: ["john", "zip2john", "keepass2john", "ssh2john", "ssh2john.py", "7z", "ZIP", "KeePass"],
      description: "Convert an authorized encrypted container/key to a format suitable for a local password audit.",
      flags: [
        "No extractor flags are supplied. ARCHIVE_FILE, DATABASE_FILE, and KEY_FILE are input paths; SSH2JOHN_PATH is the installed Python script's path.",
        "> HASH_FILE redirects standard output into a file and overwrites an existing file. It is a shell operator, not an extractor option."
      ],
      commands: [
        "zip2john <ARCHIVE_FILE> > <HASH_FILE>",
        "keepass2john <DATABASE_FILE> > <HASH_FILE>",
        "python3 <SSH2JOHN_PATH> <KEY_FILE> > <HASH_FILE>"
      ],
      steps: ["Use only the extractor appropriate for the input type; ZIP is not the same format as 7z.", "Locate the installed ssh2john.py script and use its supported Python version.", "Inspect the result format, then use a compatible John build and a scoped wordlist."],
      caution: "Each command overwrites HASH_FILE. Keep outputs private; never overwrite the source key/database or assume container downloads are allowed.",
      source: "john"
    },
    {
      id: "archive-inspection", category: "Enumeration", title: "7-Zip / 7z: inspect an archive",
      tags: ["7z", "7zz", "7-Zip", "archive"],
      description: "List or test a local archive before deciding whether to extract it.",
      commands: ["7z l <ARCHIVE_FILE>", "7z t <ARCHIVE_FILE>"],
      flags: ["No flags are used. 7z l lists archive entries; 7z t tests archive integrity without extracting. l and t are subcommands, and ARCHIVE_FILE selects the input archive."],
      steps: ["Use a file you are authorized to possess.", "l lists entries; t tests archive integrity and may ask for a password.", "If extracting later, use a dedicated directory and inspect paths/content before running anything."],
      caution: "Testing does not prove contents are safe. Archives may contain malicious code or sensitive documents.",
      source: "archive"
    },
    {
      id: "tcpdump-lab", category: "Enumeration", title: "tcpdump: scoped connectivity troubleshooting",
      tags: ["tcpdump", "packet capture", "TCP", "VPN", "network"],
      description: "Capture a bounded number of packets for one authorized host on your lab interface.",
      commands: ["sudo tcpdump -ni <INTERFACE> -c 50 host <TARGET_IPV4>"],
      flags: [
        "tcpdump -ni combines -n (do not resolve addresses to hostnames) and -i INTERFACE (capture on that interface). Use of -n alone does not suppress every service-name conversion.",
        "-c 50 stops after 50 captured packets; host TARGET_IPV4 is a capture filter restricting packets to that source or destination.",
        "sudo runs the capture with elevated local permissions; it does not broaden the intended capture scope."
      ],
      steps: ["Use the intended VPN/lab interface; TARGET_IPV4 is a literal target address.", "Trigger only the connection you intend to debug and inspect handshake/retransmission behavior.", "Stop promptly and do not retain unrelated traffic."],
      caution: "Packets may contain sensitive data. Do not capture other users' traffic or publish packet captures with exam information.",
      source: "tcpdump"
    },
    {
      id: "certutil-download", category: "File transfers and shells", title: "Windows certutil: download and verify a lab file",
      tags: ["certutil", "Windows", "download", "SHA256"],
      description: "Retrieve one permitted file and inspect its SHA256 in a cmd.exe session.",
      commands: ["certutil -urlcache -split -f http://<VPN_IP>:<PORT>/<FILE> <DESTINATION>", "certutil -hashfile <DESTINATION> SHA256"],
      flags: [
        "certutil -urlcache operates on the URL cache; supplying a URL and destination retrieves the resource to that file.",
        "-split permits embedded elements to be saved as separate files where applicable; it is not a concurrency or encryption option.",
        "-f forces retrieval/cache updating and can overwrite output; review DESTINATION before running.",
        "-hashfile computes the selected file's digest; SHA256 selects the algorithm. A hash match does not establish that a file is safe."
      ],
      steps: ["Choose a writable destination and only files you intend to transfer.", "Compare the resulting hash with the trusted source.", "Do not execute the downloaded file without examining it."],
      caution: "HTTP is plaintext and -f can overwrite an existing destination. Keep the transfer directory private and stop its server afterward.",
      source: "windows"
    },
    {
      id: "diskshadow-inspect", category: "Windows privilege escalation", title: "Diskshadow: inspect volume-shadow metadata",
      tags: ["diskshadow", "VSS", "Windows", "shadow copies"],
      description: "Inspect shadow-copy metadata from an authorized elevated Windows session.",
      commands: ["diskshadow", "list shadows all\nexit"],
      flags: ["No flags are used. Inside Diskshadow, list shadows all displays existing shadow-copy metadata and exit leaves the interpreter; these do not create or delete snapshots."],
      steps: ["Run Diskshadow only with authorized administrator permissions.", "The second block is entered in Diskshadow's interpreter, not cmd.exe.", "This entry lists existing metadata; creating, exposing, or deleting snapshots requires a separate deliberate decision."],
      caution: "No directory-database extraction or snapshot-change workflow is included. Snapshot files can contain highly sensitive data.",
      source: "windows"
    },
    {
      id: "robocopy-preview", category: "File transfers and shells", title: "Robocopy: preview a specific Windows copy",
      tags: ["robocopy", "Windows", "file copy", "dry run"],
      description: "Preview which files a Windows copy operation would select, without actually copying them.",
      commands: ["robocopy \"<SOURCE_DIRECTORY>\" \"<DESTINATION_DIRECTORY>\" \"<FILE_PATTERN>\" /L /R:0 /W:0"],
      flags: [
        "Robocopy /L lists the proposed operation without copying, deleting, or timestamping files.",
        "/R:0 sets zero retries on failed copies; /W:0 sets a zero-second wait between retries.",
        "SOURCE_DIRECTORY, DESTINATION_DIRECTORY, and FILE_PATTERN select the source, output directory, and filenames. Keep /L for this preview."
      ],
      steps: ["/L requests listing only; /R:0 avoids retries and /W:0 removes retry delays.", "Read the selected files and destination carefully.", "Perform an actual copy only when necessary and authorized, after reviewing flags and overwrite behavior."],
      caution: "Do not add /MIR or /PURGE casually: those can delete destination files. Backup-mode privileges do not grant permission to collect arbitrary files.",
      source: "windows"
    },
    {
      id: "peass-review", category: "Tool notes and restricted features", title: "LinPEAS / WinPEAS: local enumeration review",
      tags: ["linpeas", "linpeas.sh", "LinPEAS", "winpeas", "WinPEAS", "winPEASany.exe", "PEASS-ng"],
      description: "Understand local enumeration assistants before choosing a version and feature set.",
      commands: [],
      steps: ["Review the exact release and its checks before running it in a lab.", "Distinguish information collection from any active vulnerability checks or exploit features.", "Validate each highlighted configuration manually; colors or suggestions are not proof."],
      caution: "No blanket exam approval is implied. Some releases/options can perform active checks; do not run automatic exploitation or forbidden features. Keep output private.",
      source: "peass"
    },
    {
      id: "sharphound-directory", category: "Active Directory", title: "SharpHound: directory-only collection",
      tags: ["SharpHound", "SharpHound.exe", "BloodHound", "DCOnly", "AD"],
      description: "Collect directory relationships with a compatible Windows collector and authorized domain session.",
      commands: ["SharpHound.exe --CollectionMethods DCOnly"],
      flags: ["SharpHound --CollectionMethods DCOnly selects the DC-focused collection-method set instead of the default collection. It does not mean that collection performs no network requests or that every relationship is complete."],
      steps: ["Check the collector version and the BloodHound edition that will consume the output.", "Run from an authorized session with the intended domain/DC configuration.", "Review DCOnly's exact checks and import output only into a local analysis instance."],
      caution: "Graph collection is not automatic proof of an exploit path or universal exam approval. Keep directory output and archive files private.",
      source: "sharphound"
    },
    {
      id: "hydra-review", category: "Tool notes and restricted features", title: "Hydra: credential-testing boundaries",
      tags: ["hydra", "THC Hydra", "password", "bruteforce", "authentication"],
      description: "Recognize a service-login testing tool and the risk of repeated authentication attempts.",
      commands: [],
      steps: ["Identify the exact protocol, authentication context, and account lockout/rate-limit policy.", "Prefer validating known credentials before considering a password-audit plan.", "Check current exam rules and get explicit authorization for any repeated login testing."],
      caution: "No password-spray or brute-force recipe is included. Repeated failures can lock accounts or disrupt services.",
      source: "hydra"
    },
    {
      id: "mimikatz-review", category: "Tool notes and restricted features", title: "Mimikatz: Windows credential material",
      tags: ["mimikatz", "mimikatz.exe", "LSASS", "credential inspection"],
      description: "Identify a Windows credential-inspection tool without copying a walkthrough's credential-extraction chain.",
      commands: [],
      steps: ["Review the precise feature, OS prerequisites, permissions, and collection scope before lab use.", "Treat credential data as secrets, not ordinary enumeration output.", "Do not infer that administrative access permits collecting all users' credentials."],
      caution: "No credential-theft chain, logging suppression, memory-protection bypass, or ticket-forging recipe is included. Verify exam and academic-policy boundaries.",
      source: "mimikatz"
    },
    {
      id: "rubeus-review", category: "Tool notes and restricted features", title: "Rubeus: Kerberos feature review",
      tags: ["Rubeus", "Rubeus.exe", "Kerberos", "tickets"],
      description: "Recognize the Kerberos toolkit and distinguish ticket inspection/auditing from impersonation and attack features.",
      commands: [],
      steps: ["Check the exact release and intended action rather than using a blanket toolkit command.", "Validate domain, KDC, DNS, time, and account context.", "Treat ticket/key material as credentials and verify the current rules for the chosen action."],
      caution: "No forged-ticket, coercion, relay, or evasion workflow is included. A toolkit's presence in a lab walkthrough does not approve all features for an exam.",
      source: "rubeus"
    },
    {
      id: "impacket-relay-review", category: "Tool notes and restricted features", title: "Impacket ntlmrelayx: relay / spoofing boundary",
      tags: ["impacket", "ntlmrelayx", "ntlmrelayx.py", "impacket-ntlmrelayx", "relay", "poisoning"],
      description: "Identify relay tooling without providing an exam recipe.",
      commands: [],
      steps: ["Do not import a walkthrough's forced-authentication, poisoning, or relay chain into an exam plan.", "OffSec prohibits spoofing; evaluate every component and current instructions rather than only the tool name.", "Use allowed direct authentication and enumeration instead where appropriate."],
      caution: "No runnable relay, poisoning, or coercion commands are provided. This is a restriction-review note, not approval or a claim that every relay configuration is identically classified.",
      source: "offsec"
    },
    {
      id: "impacket-ticketer-review", category: "Tool notes and restricted features", title: "Impacket ticketer: ticket-forging review",
      tags: ["impacket", "ticketer", "ticketer.py", "impacket-ticketer", "Kerberos", "golden ticket", "silver ticket"],
      description: "Identify a ticket-construction utility and its sensitive impersonation features.",
      commands: [],
      steps: ["Do not copy domain keys, SIDs, or identities from walkthroughs.", "Check current exam guidance and authorization for any ticket-related action.", "Use normal authorized authentication or the ticket-audit entries for general preparation."],
      caution: "No forged-ticket command or key-material recipe is included. This note does not declare blanket permission or blanket prohibition for every use.",
      source: "impacket"
    },
    {
      id: "metasploit-review", category: "Tool notes and restricted features", title: "Metasploit / msfvenom / Meterpreter restrictions",
      tags: ["Metasploit", "msfconsole", "msfvenom", "Meterpreter", "payloads"],
      description: "Keep framework and payload-generation names searchable without an unrestricted exploitation recipe.",
      commands: [],
      steps: ["Auxiliary, Exploit, Post modules and Meterpreter are restricted to one chosen target, including checks and failed attempts.", "Do not use Metasploit for pivoting.", "The guide separately permits multi/handler and msfvenom across targets; Meterpreter remains one-target only. Recheck the current wording."],
      caution: "No automatic exploitation or payload-generation chain is included. Do not test multiple machines before choosing the restricted target.",
      source: "offsec"
    },
    {
      id: "weevely-review", category: "Tool notes and restricted features", title: "Weevely: web-shell boundary",
      tags: ["weevely", "web shell", "PHP"],
      description: "Recognize a web-shell management tool without publishing a lab payload or deployment sequence.",
      commands: [],
      steps: ["Review the exact feature and authorization before using web-shell tooling.", "Do not assume a web shell satisfies OffSec's interactive proof requirements.", "Collect exam proofs through the required interactive target shell and original file location."],
      caution: "No web-shell payload, obfuscated code, upload bypass, or automatic exploitation is included.",
      source: "offsec"
    },
    {
      id: "sqlmap-review", category: "Tool notes and restricted features", title: "SQLmap: automatic exploitation excluded",
      tags: ["sqlmap", "SQL injection", "automatic exploitation"],
      description: "Identify a tool explicitly listed as prohibited by the OSCP exam guide.",
      commands: [],
      steps: ["Do not use SQLmap on the exam.", "Use manual request comparison and a scoped non-destructive validation instead.", "A mention in a walkthrough or external cheatsheet does not override the official restrictions."],
      caution: "No SQLmap commands are provided.",
      source: "offsec"
    },
    {
      id: "nxc-smb-info", category: "Enumeration", title: "NetExec / nxc: SMB host information",
      aliases: ["SMB enumeration", "Samba host", "445", "139"],
      tags: ["nxc", "NetExec", "SMB", "signing", "445"],
      description: "Inspect one SMB endpoint's advertised host, domain, protocol, and signing information.",
      commands: ["nxc smb <TARGET_IP>"],
      flags: ["No flags are used. smb selects NetExec's SMB protocol and TARGET_IP selects the endpoint; this command does not supply credentials or request a module."],
      steps: ["Check nxc smb --help for your installed version.", "Read the host and domain information before selecting an authentication method.", "Signing information is a configuration observation, not permission to relay or spoof traffic."],
      caution: "Use a single scoped host. No relay generation, poisoning, automatic exploitation, or third-party modules are included.",
      source: "nxc"
    },
    {
      id: "nxc-smb-shares", category: "Enumeration", title: "NetExec / nxc: SMB shares",
      aliases: ["list SMB shares", "Samba shares", "share permissions", "445", "139"],
      tags: ["nxc", "NetExec", "SMB", "shares", "permissions"],
      description: "List shares and reported access using one known domain account.",
      commands: ["nxc smb <TARGET_IP> -d <DOMAIN> -u '<USER>' -p '<PASSWORD>' --shares"],
      flags: [
        "nxc -d selects the authentication domain; -u supplies the username; -p supplies the password in process arguments.",
        "--shares requests share names and reported access. smb selects the SMB protocol; it does not download share contents."
      ],
      steps: ["Use one authorized username/password pair, not files of candidate credentials.", "Read the share names and reported permissions.", "Inspect a specific relevant share with smbclient or SMBMap rather than recursively downloading everything."],
      caution: "The password appears in command history/process arguments and may be printed by nxc. Share-access checks can write probe files unless disabled in your version. Use private lab credentials and keep outputs private.",
      source: "nxc"
    },
    {
      id: "nxc-domain-info", category: "Active Directory", title: "NetExec / nxc: users, groups, password policy",
      aliases: ["domain enumeration", "SMB users", "SMB groups", "445"],
      tags: ["nxc", "NetExec", "SMB", "users", "groups", "password policy", "AD"],
      description: "Query a domain controller for account, group, and password-policy information.",
      flags: [
        "nxc -d selects the domain; -u supplies the username; -p supplies the command-line password. DC_IP identifies the server queried over SMB.",
        "--users requests user information; --groups requests group information; --pass-pol requests password and lockout policy. Run these as the separate queries shown."
      ],
      commands: [
        "nxc smb <DC_IP> -d <DOMAIN> -u '<USER>' -p '<PASSWORD>' --users",
        "nxc smb <DC_IP> -d <DOMAIN> -u '<USER>' -p '<PASSWORD>' --groups",
        "nxc smb <DC_IP> -d <DOMAIN> -u '<USER>' -p '<PASSWORD>' --pass-pol"
      ],
      steps: ["Run each query with a known authorized account against the intended DC.", "Distinguish domain memberships from local administrator access.", "Read lockout policy before any authentication testing; do not infer that spraying is safe."],
      caution: "CLI passwords and returned account information are sensitive. Available options and results depend on version and permissions.",
      source: "nxc"
    },
    {
      id: "nxc-ldap-users", category: "Active Directory", title: "NetExec / nxc: LDAP users",
      aliases: ["directory enumeration", "AD user listing", "389", "636"],
      tags: ["nxc", "NetExec", "LDAP", "AD", "users"],
      description: "Enumerate directory users through the LDAP protocol with known credentials.",
      commands: ["nxc ldap <DC_IP> -d <DOMAIN> -u '<USER>' -p '<PASSWORD>' --users"],
      flags: [
        "nxc -d selects the domain; -u supplies the username; -p supplies the command-line password.",
        "ldap selects the directory protocol; --users requests user enumeration on the specified DC."
      ],
      steps: ["Verify the directory endpoint, domain, and authentication requirements.", "Review returned users and compare relevant accounts with other enumeration.", "If authentication fails, investigate signing, channel binding, DNS, and account permissions rather than disabling protections blindly."],
      caution: "This is a user query, not a blanket approval of NetExec modules. Do not publish command history or account output.",
      source: "nxc"
    },
    {
      id: "nxc-local-auth", category: "Enumeration", title: "NetExec / nxc: local account authentication",
      aliases: ["local SMB login", "445"],
      tags: ["nxc", "NetExec", "SMB", "local-auth", "authentication"],
      description: "Test one known local account on one host, without treating it as a domain account.",
      commands: ["nxc smb <TARGET_IP> --local-auth -u '<USER>' -p '<PASSWORD>'"],
      flags: [
        "nxc --local-auth authenticates against the target host's local account database rather than treating the account as a domain account.",
        "-u supplies the local username; -p supplies its password. smb selects the protocol and TARGET_IP selects the host."
      ],
      steps: ["Confirm that the account belongs to the host's local account database.", "Read authentication success separately from administrative access indicators.", "Stop repeated failures and investigate the account context or lockout policy."],
      caution: "Local-account remote restrictions may prevent administrative actions even after authentication. Passwords appear in CLI arguments/output.",
      source: "nxc"
    },
    {
      id: "nxc-hash-auth", category: "Active Directory", title: "NetExec / nxc: authenticate with an authorized NT hash",
      aliases: ["PTH login", "NTLM hash authentication", "445"],
      tags: ["nxc", "NetExec", "SMB", "NTLM", "pass-the-hash", "authentication"],
      description: "Check one account's SMB authentication using an NT hash already available in your authorized exercise.",
      commands: ["nxc smb <TARGET_IP> -d <DOMAIN> -u '<USER>' -H '<NT_HASH>'"],
      flags: [
        "nxc -d selects the account's domain; -u supplies its username.",
        "-H supplies an NT hash for authentication instead of a plaintext password. In NetExec this is a credential option, not a host/header option.",
        "smb selects the protocol; the supplied hash is not collected by this command."
      ],
      steps: ["Use the NT portion of an identified NTLM credential, not an arbitrary password hash.", "Check that NTLM authentication is supported and the account context is correct.", "Validate authentication and authorization separately; this command does not acquire hashes."],
      caution: "An NT hash is a reusable credential. Keep it and any outputs private; no collection, relay, or spraying recipe is included.",
      source: "nxc"
    },
    {
      id: "nxc-winrm-auth", category: "File transfers and shells", title: "NetExec / nxc: check WinRM access",
      aliases: ["WinRM login check", "remote management authentication", "5985", "5986"],
      tags: ["nxc", "NetExec", "WinRM", "5985", "5986", "authentication"],
      description: "Check WinRM authentication for one known account before opening a remote session.",
      commands: ["nxc winrm <TARGET_IP> -d <DOMAIN> -u '<USER>' -p '<PASSWORD>'"],
      flags: [
        "nxc -d selects the domain; -u supplies the username; -p supplies its command-line password.",
        "winrm selects the remote-management protocol. No remote command or execution module is requested by this credential check."
      ],
      steps: ["Confirm the WinRM service is reachable.", "Check whether the account has remote-management access.", "If appropriate, use a separate interactive client such as Evil-WinRM; do not assume a successful credential check opens a shell."],
      caution: "Read installed protocol options for TLS/custom ports. This command places a password in CLI arguments and may display it.",
      source: "nxc"
    },
    {
      id: "impacket-smbclient", category: "Enumeration", title: "Impacket: interactive SMB client",
      aliases: ["SMB shares", "SMB listing", "445", "139"],
      tags: ["impacket", "impacket-smbclient", "smbclient.py", "SMB", "shares"],
      description: "Inspect shares with Impacket's SMB mini-shell, independently of Samba smbclient.",
      commands: ["impacket-smbclient '<DOMAIN>/<USER>@<TARGET_IP>'"],
      flags: ["No flags are used. DOMAIN/USER@TARGET_IP selects the account and SMB host, with the password entered at the prompt. help, shares, use, and ls are commands inside the SMB mini-shell."],
      steps: ["Enter the password when prompted.", "Use help to inspect supported mini-shell commands; shares, use, and ls navigate available shares.", "Keep any file transfers limited to what the authorized exercise requires."],
      caution: "Executable names vary by installation: Kali commonly uses impacket-* wrappers; source installations may use script names ending in .py.",
      source: "impacket"
    },
    {
      id: "impacket-ad-users", category: "Active Directory", title: "Impacket: GetADUsers",
      aliases: ["AD user listing", "directory enumeration", "389", "636"],
      tags: ["impacket", "impacket-GetADUsers", "GetADUsers.py", "LDAP", "users"],
      description: "Query directory user attributes such as email and logon/password timestamps.",
      commands: ["impacket-GetADUsers -all -dc-ip <DC_IP> '<DOMAIN>/<USER>'"],
      flags: [
        "GetADUsers -all includes disabled users and users without an email address, which the default query omits; it does not bypass directory access controls.",
        "-dc-ip selects the domain controller's address. DOMAIN/USER identifies the account; omitting its password requests a prompt."
      ],
      steps: ["Use an authorized account and enter its password at the prompt.", "-all includes accounts that would be omitted by the default email-based filter.", "Treat timestamps and attributes as research context, not proof of an exploitable credential."],
      caution: "Review LDAP/LDAPS requirements and installed version options. Returned user information belongs in private notes.",
      source: "impacket"
    },
    {
      id: "impacket-spns", category: "Active Directory", title: "Impacket: GetUserSPNs and service-ticket audit",
      aliases: ["SPN enumeration", "service account tickets", "88"],
      tags: ["impacket", "impacket-GetUserSPNs", "GetUserSPNs.py", "SPN", "Kerberoasting", "Kerberos"],
      description: "List service-account SPNs, or request tickets for a scoped offline password audit.",
      flags: [
        "GetUserSPNs -dc-ip selects the domain controller; DOMAIN/USER supplies the authorized account identity.",
        "-request requests service-ticket material for the returned service accounts; omitting it uses the listing form.",
        "-outputfile selects the file receiving the requested ticket audit material and also enables ticket requests in Impacket 0.12.0. Keep that file private."
      ],
      commands: [
        "impacket-GetUserSPNs -dc-ip <DC_IP> '<DOMAIN>/<USER>'",
        "impacket-GetUserSPNs -dc-ip <DC_IP> -request -outputfile <HASH_FILE> '<DOMAIN>/<USER>'"
      ],
      steps: ["Start with the listing command using an authorized domain account.", "Use the ticket-request form only when that credential-audit activity is in scope.", "Identify the actual ticket encryption/hash format before selecting a Hashcat or John mode."],
      caution: "Requests generate authentication activity and saved ticket material is sensitive. No forged-ticket, relay, or evasion features are included.",
      source: "impacket"
    },
    {
      id: "impacket-asrep", category: "Active Directory", title: "Impacket: GetNPUsers / AS-REP audit",
      aliases: ["ASREP roast", "Kerberos preauthentication audit", "88"],
      tags: ["impacket", "impacket-GetNPUsers", "GetNPUsers.py", "AS-REP", "ASREProast", "Kerberos"],
      description: "Request AS-REP material for a scoped list of accounts that may not require Kerberos preauthentication.",
      commands: ["impacket-GetNPUsers '<DOMAIN>/' -dc-ip <DC_IP> -no-pass -usersfile <USER_LIST> -format hashcat -outputfile <HASH_FILE>"],
      flags: [
        "GetNPUsers -dc-ip selects the KDC; DOMAIN/ identifies the domain without a login username.",
        "-no-pass disables prompting for a login password; -usersfile selects the candidate username list.",
        "-format hashcat selects Hashcat-compatible output; -outputfile selects the file for returned AS-REP audit material. These options do not make ineligible accounts return material."
      ],
      steps: ["Use a small authorized username list; this command is not a password spray.", "Only accounts configured without the relevant preauthentication requirement may return audit material.", "Check response errors and encryption type before performing an offline audit."],
      caution: "These are active KDC requests and produce sensitive output. Verify current exam feature restrictions before use.",
      source: "impacket"
    },
    {
      id: "impacket-wmi", category: "File transfers and shells", title: "Impacket: WMI remote session",
      aliases: ["Windows remote shell", "WMI remote execution", "135", "445"],
      tags: ["impacket", "impacket-wmiexec", "wmiexec.py", "WMI", "shell", "remote access"],
      description: "Open a WMI-based semi-interactive command session with authorized administrative credentials.",
      commands: ["impacket-wmiexec '<DOMAIN>/<USER>@<TARGET_IP>'"],
      flags: ["No flags are used. DOMAIN/USER@TARGET_IP selects the account and remote host and prompts for its password. WMI execution and remote output files are behavior of the client, not extra flags in this template."],
      steps: ["Enter the password at the prompt and confirm WMI/DCOM and SMB connectivity.", "Start with identity and host checks, such as whoami and hostname.", "Understand that this is a semi-interactive execution client, not a normal terminal. Do not assume it meets exam proof-shell requirements."],
      caution: "Administrative permissions are generally required and output handling writes temporary files to a remote share. Use only explicit authorized access; no automatic exploitation.",
      source: "impacket"
    },
    {
      id: "impacket-mssql", category: "Enumeration", title: "Impacket: MSSQL client",
      aliases: ["SQL Server login", "database connection", "1433"],
      tags: ["impacket", "impacket-mssqlclient", "mssqlclient.py", "MSSQL", "SQL Server", "1433"],
      description: "Connect to SQL Server with Windows authentication and inspect the current SQL identity.",
      commands: ["impacket-mssqlclient -windows-auth '<DOMAIN>/<USER>@<TARGET_IP>'", "SELECT SYSTEM_USER, USER_NAME();\nSELECT name FROM sys.databases;"],
      flags: [
        "mssqlclient -windows-auth selects Windows integrated authentication instead of a SQL Server login; DOMAIN/USER@TARGET_IP supplies the identity and server.",
        "The SELECT statements run inside the SQL client and inspect identity and database names; they are not command-line flags."
      ],
      steps: ["Enter the password at the prompt; run the SQL statements inside the client.", "Windows and SQL logins are distinct authentication methods; omit -windows-auth only for an intended SQL login.", "Review visible databases and permissions before any follow-up queries."],
      caution: "Do not enable xp_cmdshell or modify server configuration by default. Authenticated access alone does not imply administrative SQL privileges.",
      source: "impacket"
    },
    {
      id: "smbmap-access", category: "Enumeration", title: "SMBMap: shares and directory access",
      aliases: ["SMB shares", "Samba shares", "share permissions", "445", "139"],
      tags: ["smbmap", "SMB", "shares", "directories", "permissions"],
      description: "List share access or inspect a selected directory while skipping write checks.",
      flags: [
        "SMBMap -H selects the host; -d selects the domain; -u supplies the username.",
        "--prompt asks for the password interactively instead of putting it in process arguments.",
        "--no-write-check skips the file-write permission probe; reported access is not verified by a write test.",
        "-r SHARE/DIRECTORY selects the starting path for directory traversal. Current SMBMap defaults to depth 1; check installed help for recursion behavior. It does not download files."
      ],
      commands: [
        "smbmap -H <TARGET_IP> -d <DOMAIN> -u '<USER>' --prompt --no-write-check",
        "smbmap -H <TARGET_IP> -d <DOMAIN> -u '<USER>' --prompt --no-write-check -r '<SHARE>/<DIRECTORY>'"
      ],
      steps: ["Use --prompt instead of putting the password on the command line.", "--no-write-check prevents the usual write-permission probe; it does not prove a share is read-only.", "Keep directory exploration targeted. Avoid automatic-download patterns and recursive collection."],
      caution: "Check installed SMBMap options. No remote-execution, auto-download, file-content search, or deletion features are enabled here.",
      source: "smbmap"
    },
    {
      id: "rpcclient-accounts", category: "Enumeration", title: "rpcclient: users, groups, domain information",
      aliases: ["SMB user enumeration", "RPC account listing", "445", "139"],
      tags: ["rpcclient", "SMB", "RPC", "enumdomusers", "enumdomgroups", "querydominfo"],
      description: "Use Samba's RPC client to query domain account metadata with an authorized session.",
      commands: ["rpcclient <TARGET_IP> -U '<DOMAIN>/<USER>' -c 'enumdomusers; enumdomgroups; querydominfo'"],
      flags: [
        "rpcclient -U selects the domain/user identity and prompts for a password when none is embedded.",
        "-c runs the quoted, semicolon-separated client commands: enumdomusers lists users, enumdomgroups lists groups, and querydominfo reads domain information."
      ],
      steps: ["Let rpcclient prompt for the password.", "Use the returned RIDs and group identifiers only as metadata for further authorized queries.", "If access is denied, check whether the account can query the requested RPC interface."],
      caution: "This does not establish a shell or administrative access. Do not replace normal queries with spoofing or unconstrained RID cycling.",
      source: "rpcclient"
    },
    {
      id: "enum4linux-ng", category: "Enumeration", title: "enum4linux-ng: scoped SMB/RPC enumeration",
      aliases: ["SMB shares", "Samba enumeration", "445", "139"],
      tags: ["enum4linux-ng", "enum4linux-ng.py", "enum4linux", "SMB", "RPC"],
      description: "Collect users, groups, shares, and password-policy information through selected enumeration features.",
      commands: ["enum4linux-ng -U -G -S -P -u '<USER>' -p '<PASSWORD>' -w <DOMAIN> <TARGET_IP>"],
      flags: [
        "enum4linux-ng -U requests users; -G requests groups; -S requests shares; -P requests password policy.",
        "-u supplies the username; -p supplies the password; -w selects the domain/workgroup. Uppercase enumeration flags and lowercase credential flags have different meanings.",
        "TARGET_IP is the server to query; these switches do not select every available enumeration feature."
      ],
      steps: ["Use enum4linux-ng.py instead if your installation exposes the source script name.", "The selected switches request users, groups, shares, and password policy rather than every available feature.", "Review the wrapper's underlying Samba calls and keep findings local."],
      caution: "CLI passwords are visible in history/process arguments. The older enum4linux tool uses different flags; do not blindly interchange command names.",
      source: "enum4linux"
    },
    {
      id: "evil-winrm-session", category: "File transfers and shells", title: "Evil-WinRM: authorized remote PowerShell session",
      aliases: ["Windows remote shell", "PowerShell remoting", "WinRM login", "5985", "5986"],
      tags: ["evil-winrm", "WinRM", "PowerShell", "shell", "5985", "5986"],
      description: "Open a WinRM session with a known account that has remote-management permissions.",
      commands: ["evil-winrm -i <TARGET_IP> -u '<USER>'", "evil-winrm -i <TARGET_IP> -u '<USER>' -S -P 5986"],
      flags: [
        "Evil-WinRM -i selects the remote endpoint; -u selects the user. Omitting -p requests a password prompt.",
        "-S enables SSL/TLS transport; -P 5986 selects the HTTPS WinRM port. Capitalization matters: -P is a port, not the lowercase -p password option."
      ],
      steps: ["Omitting -p prompts for the password.", "The first command uses the default endpoint; the second requests the HTTPS endpoint.", "Check identity and permissions inside the session. Use only the basic remote-management features you understand."],
      caution: "This entry does not enable AMSI/ETW bypass, in-memory payload loading, or other evasion features. Review current exam limitations and the client's TLS trust behavior.",
      source: "winrm"
    },
    {
      id: "bloodhound-directory", category: "Active Directory", title: "BloodHound.py: directory-only collection",
      tags: ["bloodhound", "bloodhound-python", "bloodhound-ce-python", "AD", "ACL", "DCOnly"],
      description: "Collect directory relationships from the DC without querying sessions on every member host.",
      flags: [
        "BloodHound.py -d selects the AD DNS domain; -u supplies the user and the omitted password is prompted for.",
        "-c DCOnly selects the DC-focused collection-method set rather than member-host session collection.",
        "-ns selects the DNS server's literal address; -dc selects the DC hostname. They serve different purposes and are not interchangeable.",
        "--zip packages the output files into a ZIP archive; it does not encrypt or anonymize directory data."
      ],
      commands: [
        "bloodhound-python -d <DOMAIN> -u '<USER>' -c DCOnly -ns <DC_IPV4> -dc <DC_HOSTNAME> --zip",
        "bloodhound-ce-python -d <DOMAIN> -u '<USER>' -c DCOnly -ns <DC_IPV4> -dc <DC_HOSTNAME> --zip"
      ],
      steps: ["Choose exactly one collector: legacy bloodhound-python for compatible legacy BloodHound, or bloodhound-ce-python for CE.", "Use the actual DC hostname and literal DNS-server IPv4; enter credentials when prompted.", "Import the output only into a local compatible analysis instance and verify graph-derived assumptions manually."],
      caution: "Directory data and graph output are sensitive. DCOnly reduces member-host collection but does not grant exam approval or guarantee every relationship is complete.",
      source: "bloodhound"
    },
    {
      id: "kerbrute-users", category: "Active Directory", title: "Kerbrute: username enumeration",
      tags: ["kerbrute", "Kerberos", "userenum", "username", "88"],
      description: "Check a small scoped username list against the KDC without running a password spray.",
      commands: ["kerbrute userenum --dc <DC_IP> -d <DOMAIN> --safe --delay 200 <USER_LIST>"],
      flags: [
        "userenum selects username enumeration; USER_LIST is the input list, not a password list.",
        "Kerbrute --dc selects the KDC; -d selects the full domain name.",
        "--safe aborts on a reported account lockout; it is a stop condition, not a guarantee against disruption.",
        "--delay 200 waits 200 milliseconds between attempts and selects single-threaded operation."
      ],
      steps: ["Use only usernames relevant to the authorized exercise.", "Interpret principal-not-found separately from a preauthentication-required response.", "--safe stops on a reported lockout; --delay reduces the request rate. Neither makes arbitrary testing risk-free."],
      caution: "This is active enumeration. Password-spray/brute-force subcommands and forced encryption downgrades are not part of this recipe.",
      source: "kerbrute"
    },
    {
      id: "gobuster-directories", category: "Web testing", title: "Gobuster: directory discovery",
      aliases: ["directory busting", "web directories", "hidden paths", "80", "443"],
      tags: ["gobuster", "directories", "wordlist", "web", "content discovery"],
      description: "Discover candidate application paths using a chosen small wordlist.",
      commands: ["gobuster dir -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> -t 5 -o gobuster.txt"],
      flags: [
        "dir selects path discovery; Gobuster -u selects the base URL and -w selects the wordlist.",
        "-t 5 selects five concurrent workers, not five requests per second.",
        "-o gobuster.txt saves discovered results to the named output file."
      ],
      steps: ["Read gobuster dir --help for your installed version.", "Compare results with a known nonexistent path, including status, body, and length.", "Manually inspect meaningful paths; expand extensions or filters only when the application warrants them."],
      caution: "This is active content discovery, not vulnerability confirmation or automatic exploitation. Keep requests and redirects in scope.",
      source: "gobuster"
    },
    {
      id: "chisel-reverse", category: "Tunneling and pivoting", title: "Chisel: one reverse TCP forward",
      tags: ["chisel", "reverse", "port forwarding", "tunnel"],
      description: "Forward one loopback port on your Chisel server to a service reachable from an authorized client.",
      flags: [
        "chisel server: --host selects the bind address; --port selects the listener port; --reverse allows clients to request reverse forwards.",
        "--authfile loads credentials and permitted remote-address patterns from the private server configuration file.",
        "chisel client: --auth supplies USER:PASSWORD; --fingerprint pins the expected server public-key fingerprint.",
        "R:127.0.0.1:LOCAL_PORT:DESTINATION_HOST:DESTINATION_PORT requests a reverse listener on the server's loopback address; destination connections originate from the client."
      ],
      commands: [
        "chisel server --host <VPN_IP> --port <PORT> --reverse --authfile <AUTH_FILE>",
        "chisel client --auth '<USER>:<PASSWORD>' --fingerprint '<FINGERPRINT>' http://<VPN_IP>:<PORT> R:127.0.0.1:<LOCAL_PORT>:<DESTINATION_HOST>:<DESTINATION_PORT>"
      ],
      steps: ["Start the server on your lab host and the client on the authorized pivot.", "Create a private authfile that permits only the intended reverse listener, and verify the server fingerprint out of band.", "The destination is reached from the client. Connect to the server's loopback LOCAL_PORT and stop both processes when finished."],
      caution: "Client credentials are visible in arguments. Do not bind the forwarded listener to all interfaces or use wildcard tunnel authorization blindly.",
      source: "chisel"
    },
    {
      id: "proxychains-request", category: "Tunneling and pivoting", title: "ProxyChains-NG: route an explicit client request",
      tags: ["proxychains", "proxychains4", "SOCKS", "tunnel", "proxy"],
      description: "Run a compatible TCP client through a deliberately configured SOCKS proxy.",
      commands: ["socks5 127.0.0.1 <SOCKS_PORT>", "proxychains4 -f <PROXY_CONFIG> curl http://<INTERNAL_HOST>:<PORT>/"],
      flags: [
        "proxychains4 -f selects the configuration file, rather than relying on its default search paths.",
        "socks5 127.0.0.1 SOCKS_PORT is a ProxyList configuration entry, not an executable command or flag. It identifies the existing local SOCKS5 endpoint.",
        "curl and its URL are the wrapped client command; no curl flags are supplied in this example."
      ],
      steps: ["The first line belongs in the private configuration's ProxyList section, not in a shell.", "Use the full configuration format supplied by your installation and enable proxy DNS intentionally when needed.", "Start the underlying SSH/Chisel proxy first, then run the explicit client request."],
      caution: "ProxyChains is not a universal network tunnel: raw packets, many static binaries, ICMP, and UDP may bypass it or fail. Verify DNS and scope.",
      source: "proxychains"
    },
    {
      id: "socat-forward", category: "Tunneling and pivoting", title: "socat: loopback TCP forwarding",
      tags: ["socat", "TCP", "forward", "port forwarding"],
      description: "Listen locally and relay TCP connections to one chosen destination.",
      commands: ["socat TCP-LISTEN:<LOCAL_PORT>,bind=127.0.0.1,reuseaddr,fork TCP:<DESTINATION_HOST>:<DESTINATION_PORT>"],
      flags: [
        "TCP-LISTEN:LOCAL_PORT selects a TCP listening endpoint; bind=127.0.0.1 restricts it to loopback.",
        "reuseaddr permits reuse of the local socket address; fork handles connections in child processes while keeping the listener available.",
        "TCP:DESTINATION_HOST:DESTINATION_PORT selects the outgoing endpoint. These are socat address options, not hyphen-prefixed flags, and do not enable encryption."
      ],
      steps: ["Run this on the authorized machine that can reach the destination.", "Point the local client at 127.0.0.1:LOCAL_PORT.", "Stop the listener after use and verify no unnecessary connections remain."],
      caution: "Plain TCP forwarding adds no authentication or encryption. It is not a substitute for a scoped authenticated tunnel.",
      source: "socat"
    },
    {
      id: "ligolo-tunnel", category: "Tunneling and pivoting", title: "Ligolo-ng: scoped TUN tunnel",
      tags: ["ligolo-ng", "ligolo-proxy", "ligolo-agent", "proxy", "agent", "TUN", "pivot"],
      description: "Connect an authorized agent to your proxy and route a selected internal subnet through a TUN interface.",
      flags: [
        "ligolo-proxy -selfcert generates a self-signed certificate; verify its fingerprint before accepting it.",
        "ligolo-agent -connect selects the proxy address and port; -accept-fingerprint pins the expected certificate fingerprint rather than ignoring certificate checks.",
        "In the Ligolo console, interface_create --name selects the new interface name; session selects an agent session.",
        "tunnel_start --tun selects that TUN interface; interface_add_route --name selects the interface and --route selects the authorized destination CIDR."
      ],
      commands: [
        "ligolo-proxy -selfcert",
        "ligolo-agent -connect <VPN_IP>:11601 -accept-fingerprint '<FINGERPRINT>'",
        "interface_create --name <TUN_NAME>\nsession\ntunnel_start --tun <TUN_NAME>\ninterface_add_route --name <TUN_NAME> --route <INTERNAL_CIDR>"
      ],
      steps: ["Use the proxy and agent names provided by your installation; source releases may call them proxy and agent.", "On the proxy, obtain certificate_fingerprint and verify it before connecting the agent.", "The last block is entered in the Ligolo console, not a system shell. Select the correct session before starting the tunnel.", "Restrict routes to the authorized subnet; creating interfaces/routes requires local permissions. Stop the tunnel and remove only routes/interfaces you created."],
      caution: "Console commands vary by Ligolo version; these follow the current quickstart (interface commands require >=0.6). Do not ignore certificate verification or scan out-of-scope networks.",
      source: "ligolo"
    },
    {
      id: "dns-records", category: "Enumeration", title: "DNS records and zone transfer (53)",
      aliases: ["DNS lookup", "zone enumeration", "53"],
      tags: ["dig", "DNS", "AXFR", "zone transfer", "NS", "MX"],
      description: "Query the lab DNS server for nameservers, mail servers, or a zone transfer.",
      commands: ["dig @<DNS_IP> <DOMAIN> NS\ndig @<DNS_IP> <DOMAIN> MX", "dig @<DNS_IP> <DOMAIN> AXFR"],
      flags: [
        "No hyphen flags are used. @DNS_IP selects the DNS server; DOMAIN selects the name or zone.",
        "NS requests nameserver records; MX requests mail-exchanger records; AXFR requests a full zone transfer rather than a normal single-record lookup."
      ],
      steps: ["Use a domain and DNS server in your authorized scope.", "NS identifies nameservers; MX identifies mail destinations.", "AXFR requests the zone. A refused transfer is normal on a properly restricted server.", "Newly discovered names are leads; confirm each target is in scope before contacting it."],
      caution: "Querying a server is not DNS spoofing. Do not add spoofing or redirect traffic. AXFR typically uses TCP.",
      source: "dig"
    },
    {
      id: "snmp-system", category: "Enumeration", title: "SNMP system information (161/UDP)",
      tags: ["snmpwalk", "SNMP", "community", "sysDescr", "161"],
      description: "Read a small system-information subtree using an authorized community string.",
      commands: ["snmpwalk -v2c -c '<COMMUNITY>' <TARGET_IP> 1.3.6.1.2.1.1"],
      flags: [
        "snmpwalk -v2c selects SNMP version 2c; -c supplies the community string used for access.",
        "TARGET_IP selects the agent; 1.3.6.1.2.1.1 is the system-information subtree's OID. The walk is limited to that subtree."
      ],
      steps: ["Use a community string you are authorized to test; do not assume it is public.", "Inspect system description, hostname, and related returned values.", "Query only relevant subtrees rather than walking the entire directory without a reason."],
      caution: "SNMPv2c community strings travel in plaintext and this syntax places them in shell history. Use disposable lab values and never publish real strings.",
      source: "snmp"
    },
    {
      id: "nfs-exports", category: "Enumeration", title: "RPC services and NFS exports (111/2049)",
      aliases: ["NFS shares", "export listing", "111", "2049"],
      tags: ["rpcinfo", "showmount", "NFS", "mount", "exports"],
      description: "List RPC registrations and visible NFS exports without mounting or modifying them.",
      commands: ["rpcinfo -p <TARGET_IP>\nshowmount -e <TARGET_IP>"],
      flags: ["rpcinfo -p queries registered RPC programs and ports through the server's portmapper. showmount -e requests its advertised NFS export list; it does not mount the exports."],
      steps: ["Identify registered NFS and mount services.", "Record export paths and advertised client restrictions.", "Review actual access only with a scoped, deliberate follow-up; listing an export does not establish read or write access."],
      caution: "NFSv4-only servers may not expose mountd, so an empty or failed showmount response does not rule out NFS.",
      source: "nfs"
    },
    {
      id: "ftp-list", category: "Enumeration", title: "Inspect an FTP directory (21)",
      aliases: ["FTP listing", "FTP shares", "21"],
      tags: ["curl", "FTP", "anonymous", "files", "directory listing"],
      description: "List an FTP directory with an explicitly tested anonymous account or authorized user.",
      commands: ["curl --user 'anonymous:lab@example.invalid' --list-only ftp://<TARGET_IP>/", "curl --user '<USER>' --list-only ftp://<TARGET_IP>/<DIRECTORY>/"],
      flags: [
        "curl --user supplies USER:PASSWORD; when only USER is supplied, curl prompts for the password.",
        "--list-only requests an FTP name listing rather than a detailed listing or file download.",
        "The ftp:// URL selects the server and remote directory; these credentials are not encrypted by plain FTP."
      ],
      steps: ["The first command supplies a conventional anonymous login; acceptance depends on the server.", "The second command prompts for the named user's password.", "Inspect relevant filenames before deciding whether a specific download is necessary."],
      caution: "Plain FTP does not encrypt credentials. Avoid recursive mirrors; OffSec's exam file-download restrictions apply.",
      source: "curl"
    },
    {
      id: "mysql-context", category: "Enumeration", title: "Inspect MySQL access (3306)",
      aliases: ["MySQL login", "database connection", "3306"],
      tags: ["mysql", "database", "SQL", "SHOW GRANTS", "3306"],
      description: "Connect with an authorized account, identify the server, and inspect your grants.",
      commands: ["mysql --host=<TARGET_IP> --port=3306 --user=<USER> --password", "SELECT VERSION(), CURRENT_USER();\nSHOW GRANTS;\nSHOW DATABASES;"],
      flags: [
        "mysql --host selects the server; --port=3306 selects its TCP port; --user selects the login account.",
        "--password with no value prompts interactively. Do not append a secret to this flag.",
        "The SELECT and SHOW statements run inside MySQL to inspect version, identity, grants, and visible databases; they are not shell flags."
      ],
      steps: ["Run the first command from your client; --password without a value prompts for the password.", "Run the SQL statements inside the MySQL prompt.", "Review visible databases and grants before issuing further queries."],
      caution: "Do not dump databases or run writes by default. Configure TLS for sensitive credentials; available TLS options depend on the client.",
      source: "mysql"
    },
    {
      id: "web-directories", category: "Web testing", title: "Discover web paths with ffuf",
      aliases: ["directory busting", "web directories", "hidden paths", "80", "443"],
      tags: ["ffuf", "directory", "fuzzing", "content discovery", "wordlist"],
      description: "Try a chosen list of paths at a controlled request rate; verify matches manually.",
      commands: ["ffuf -u http://<TARGET_IP>:<PORT>/FUZZ -w <WORDLIST> -rate 20 -t 5 -mc all -o paths.json -of json"],
      flags: [
        "ffuf -u selects the URL template; FUZZ is the substitution marker filled with entries from the -w wordlist.",
        "-rate 20 limits requests to 20 per second; -t 5 selects five concurrent workers.",
        "-mc all matches all response status codes; it does not mean every result is a valid path.",
        "-o paths.json selects the output file; -of json selects JSON output format."
      ],
      steps: ["Choose a small relevant wordlist and establish a nonexistent-path baseline.", "Compare response status, length, and content; soft-404 pages can appear successful.", "Open plausible matches manually. Refine filters only after understanding the baseline."],
      caution: "This is content discovery, not automatic exploitation. No blanket exam approval is implied; check current feature restrictions. Do not follow out-of-scope links.",
      source: "ffuf"
    },
    {
      id: "nikto-web", category: "Web testing", title: "Check a web server with Nikto",
      tags: ["nikto", "HTTP", "web server", "configuration"],
      description: "Collect web-server test findings for manual follow-up.",
      commands: ["nikto -h http://<TARGET_IP>:<PORT> -output nikto.txt -Format txt"],
      flags: [
        "Nikto -h selects the target URL, including its scheme and port; it means host here, not help.",
        "-output nikto.txt selects the report file; -Format txt selects plain-text reporting."
      ],
      steps: ["Check the exact host and port before starting.", "Read reported paths and configuration observations.", "Manually reproduce each meaningful finding; scanner output is not a confirmed vulnerability."],
      caution: "Nikto is explicitly mentioned as usable in the guide, but understand the selected features. It sends many active requests and can be noisy.",
      source: "nikto"
    },
    {
      id: "http-form", category: "Web testing", title: "Send a form POST",
      tags: ["curl", "POST", "form", "urlencode", "request", "parameters"],
      description: "Send one URL-encoded form field and inspect the complete HTTP response.",
      commands: ["curl -i --data-urlencode '<FIELD>=<VALUE>' http://<TARGET_IP>:<PORT>/<PATH>"],
      flags: [
        "curl -i includes response headers alongside the body.",
        "--data-urlencode FIELD=VALUE URL-encodes the field value and supplies form data, selecting POST by default. Repeat it for additional fields."
      ],
      steps: ["--data-urlencode encodes the supplied field value and makes this a POST request.", "Add another --data-urlencode option for each required field.", "Reproduce any cookies or CSRF token required by the application, using your authorized session."],
      caution: "Do not put real credentials or session tokens into public notes or command history. Avoid replaying requests that modify data without understanding their effects.",
      source: "curl"
    },
    {
      id: "linux-listeners", category: "Linux privilege escalation", title: "Inspect local listening sockets",
      tags: ["ss", "sockets", "localhost", "services", "ports"],
      description: "Find listening TCP/UDP endpoints, including services bound only to loopback.",
      commands: ["ss -lntup"],
      flags: ["ss -lntup combines -l (listening sockets), -n (numeric addresses/ports), -t (TCP), -u (UDP), and -p (associated processes, where permissions allow). It is a local socket listing, not a remote scan."],
      steps: ["Run in the Linux target shell.", "Read local addresses: 127.0.0.1 and ::1 indicate loopback listeners.", "Process details may be limited by your permissions. Correlate endpoints with services and configuration."],
      caution: "A local listener is not itself an escalation path. Do not assume lack of process details means nothing is running.",
      source: "linux"
    },
    {
      id: "windows-connectivity", category: "Windows privilege escalation", title: "Test one TCP connection from Windows",
      tags: ["PowerShell", "Test-NetConnection", "TCP", "connectivity", "port"],
      description: "Check whether the Windows host can connect to one authorized destination port.",
      commands: ["Test-NetConnection -ComputerName <DESTINATION_HOST> -Port <PORT>"],
      flags: ["Test-NetConnection -ComputerName selects the destination host; -Port selects the TCP port to probe. These are PowerShell named parameters; use TcpTestSucceeded to interpret the TCP result."],
      steps: ["Run in PowerShell on the Windows host.", "Check TcpTestSucceeded, not just the ICMP result.", "Use this to verify a specific service or a proposed tunnel route; do not turn it into an indiscriminate network scan."],
      caution: "TCP reachability does not confirm protocol behavior, authorization, or an exploitable service.",
      source: "network"
    },
    {
      id: "hashcat-formats", category: "Password auditing", title: "Audit an authorized hash offline",
      aliases: ["offline password cracking", "dictionary audit"],
      tags: ["hashcat", "NTLM", "Net-NTLMv2", "AS-REP", "Kerberos", "KeePass", "cracking", "hash mode"],
      description: "Run a dictionary audit against a hash file whose format you have identified.",
      commands: ["hashcat -a 0 -m <HASH_MODE> <HASH_FILE> <WORDLIST>", "hashcat -m <HASH_MODE> <HASH_FILE> --show"],
      flags: [
        "Hashcat -a 0 selects straight/dictionary mode; -m selects the hash algorithm/format ID, not an attack mode.",
        "HASH_FILE supplies the hashes and WORDLIST supplies password candidates for the first command.",
        "--show displays already recovered entries from the potfile; it does not start another cracking run."
      ],
      steps: ["Example modes: 1000 = NTLM; 5600 = Net-NTLMv2; 18200 = Kerberos AS-REP etype 23; 13100 = Kerberos TGS etype 23; 13400 = supported KeePass formats.", "Choose the mode for the actual hash syntax and encryption type, not just its filename.", "The first command tests wordlist candidates; --show displays recovered entries from the potfile.", "Keep both hash material and recovered passwords private."],
      caution: "This does not collect hashes or automate exploitation. Check current exam rules. Do not use --force to hide runtime warnings; hashes can require preprocessing.",
      source: "hashcat"
    },
    {
      id: "john-wordlist", category: "Password auditing", title: "Audit a hash with John",
      aliases: ["offline password cracking", "dictionary audit"],
      tags: ["john", "John the Ripper", "wordlist", "cracking", "password"],
      description: "Test a local hash file using a chosen wordlist and review recovered entries.",
      commands: ["john --wordlist=<WORDLIST> <HASH_FILE>", "john --show <HASH_FILE>"],
      flags: ["John --wordlist selects the password-candidate file. --show displays saved recovered results for HASH_FILE rather than starting a new audit; the hash file is a positional input."],
      steps: ["Verify the file uses a format supported by your installed John build.", "Read format detection output; specify a format only after identifying it correctly.", "Use --show to review saved results. Some containers or key files need an appropriate extraction utility first."],
      caution: "Use only hash material you are authorized to audit. John build capabilities vary. Never include recovered passwords in this site or GitHub.",
      source: "john"
    },
    {
      id: "ssh-remote", category: "Tunneling and pivoting", title: "Remote SSH port forwarding",
      aliases: ["SSH tunnel", "reverse port forward", "22"],
      tags: ["ssh", "-R", "remote forwarding", "reverse tunnel", "pivot"],
      description: "Create a loopback listener on an SSH server that forwards to a service reachable from the SSH client.",
      commands: ["ssh -N -o ExitOnForwardFailure=yes -R 127.0.0.1:<SERVER_PORT>:<DESTINATION_HOST>:<DESTINATION_PORT> <USER>@<SSH_SERVER_IP>"],
      flags: [
        "SSH -N runs no remote command, keeping the connection for forwarding.",
        "-o ExitOnForwardFailure=yes exits if the requested forward cannot be established; it does not detect every later destination-connection failure.",
        "-R creates the listener on the SSH server at 127.0.0.1:SERVER_PORT; the destination is contacted from the SSH client machine."
      ],
      steps: ["Run this on the authorized machine that can reach DESTINATION_HOST.", "The listener is on the SSH server; destination connections are made from the SSH client machine.", "Connect to 127.0.0.1:SERVER_PORT on the server. Keep the SSH client running; stop with Ctrl+C when finished."],
      caution: "The server must permit remote forwarding and may override bind behavior. Verify the actual listener is loopback-only. No Metasploit pivoting.",
      source: "ssh"
    },
    {
      id: "netcat-listener", category: "File transfers and shells", title: "Listen for a lab TCP connection",
      tags: ["nc", "netcat", "listener", "TCP", "shell"],
      description: "Start an OpenBSD-style netcat listener on your intended lab interface.",
      commands: ["nc -lvn <VPN_IP> <LISTEN_PORT>"],
      flags: [
        "OpenBSD nc -lvn combines -l (listen), -v (verbose diagnostics), and -n (skip host/service-name resolution).",
        "VPN_IP and LISTEN_PORT are the local bind address and port. This syntax is not interchangeable with every netcat implementation."
      ],
      steps: ["Check nc -h first: option syntax differs across netcat implementations.", "Bind the listener to your lab interface and choose an unused unprivileged port.", "Make the intended authorized connection, inspect input, and stop with Ctrl+C when finished."],
      caution: "This listener does not authenticate or encrypt clients. It is not itself a shell or an escalation command.",
      source: "netcat"
    },
    {
      id: "exploit-research", category: "Enumeration", title: "Look up local exploit references",
      tags: ["searchsploit", "Exploit-DB", "exploit research", "version", "CVE"],
      description: "Search the local Exploit-DB index for an observed product/version and inspect a specific entry.",
      commands: ["searchsploit '<PRODUCT>' '<VERSION>'", "searchsploit -x <EDB_ID>"],
      flags: ["The first command uses positional product/version search terms. SearchSploit -x opens the entry identified by EDB_ID for examination; it does not execute that code."],
      steps: ["Use a product and version established by enumeration.", "Read platform, prerequisites, affected versions, and the complete code before considering a lab test.", "Treat a search match as a research lead. Save the original exploit URL for documentation."],
      caution: "This searches and displays references; it does not validate or execute them. Never run unknown code blindly.",
      source: "searchsploit"
    },
    {
      id: "tcp-discovery", category: "Enumeration", title: "Discover TCP ports",
      tags: ["nmap", "recon", "port scan", "TCP"],
      description: "Find listening TCP ports before choosing service-specific checks.",
      commands: ["nmap -sT -p- --open -oN tcp-ports.txt <TARGET_IP>"],
      flags: [
        "Nmap -sT uses a TCP connect scan through the operating system's connection API.",
        "-p- selects TCP ports 1 through 65535; --open limits displayed results to open or possibly open ports, not the ports actually scanned.",
        "-oN tcp-ports.txt saves normal human-readable output; TARGET_IP selects the authorized target."
      ],
      steps: ["Confirm the target is in your authorized scope.", "Read open ports and repeat ambiguous results before ruling out a service.", "Follow up on discovered ports with version detection; keep the output for your notes."],
      caution: "Avoid aggressive timing assumptions. Filtering, latency, and packet loss can hide services.",
      source: "nmap"
    },
    {
      id: "service-versions", category: "Enumeration", title: "Identify service versions",
      tags: ["nmap", "banner", "service", "enumeration"],
      description: "Inspect specific ports rather than treating an initial scan as a complete assessment.",
      commands: ["nmap -sV -p <PORT_LIST> -oN services.txt <TARGET_IP>"],
      flags: [
        "Nmap -sV probes services to identify their protocols/products/versions; it does not invoke NSE scripts in this command.",
        "-p PORT_LIST selects the comma-separated ports to scan; -oN services.txt saves normal text output."
      ],
      steps: ["Replace PORT_LIST with comma-separated discovered ports.", "Check banners against manual connections and application behavior.", "Research the exact product and version; a banner alone does not prove a vulnerability."],
      caution: "This recipe does not invoke NSE scripts. If adding scripts, understand their behavior and any external utilities first.",
      source: "nmap"
    },
    {
      id: "udp-discovery", category: "Enumeration", title: "Check common UDP services",
      tags: ["nmap", "UDP", "DNS", "SNMP"],
      description: "A TCP-only scan can miss UDP services.",
      commands: ["sudo nmap -sU --top-ports 20 -oN udp-ports.txt <TARGET_IP>"],
      flags: [
        "Nmap -sU selects a UDP scan; sudo supplies the local privileges needed for raw-packet scanning.",
        "--top-ports 20 selects the 20 highest-frequency ports in Nmap's service data, not UDP ports 1 through 20.",
        "-oN udp-ports.txt saves normal text output. An open|filtered result is still uncertain."
      ],
      steps: ["Use on your authorized lab target from Kali.", "Treat open|filtered as uncertain, not proof of an open port.", "Follow up with a protocol-specific request and expand the port selection when justified."],
      caution: "UDP scans may be slow. The top 20 ports are a starting point, not complete coverage.",
      source: "nmap"
    },
    {
      id: "smb-shares", category: "Enumeration", title: "List and inspect SMB shares",
      aliases: ["Samba shares", "SMB listing", "445", "139"],
      tags: ["smbclient", "SMB", "445", "shares", "anonymous"],
      description: "Check share visibility and read permissions without modifying remote files.",
      commands: ["smbclient -L //<TARGET_IP> -N", "smbclient //<TARGET_IP>/<SHARE> -U '<DOMAIN>/<USER>'"],
      flags: [
        "Samba smbclient -L requests the server's share listing.",
        "-N suppresses the password prompt for a passwordless attempt; it does not guarantee anonymous/guest access.",
        "-U selects the domain/user identity and prompts for its password when none is supplied. //HOST/SHARE selects an individual share."
      ],
      steps: ["Try anonymous listing only when appropriate; an access-denied response is useful evidence.", "Use authorized credentials if available; let smbclient prompt for the password.", "Inside a share, use ls and inspect relevant paths. Record permissions and findings."],
      caution: "Do not put passwords in public notes. Exam file-download restrictions still apply.",
      source: "smb"
    },
    {
      id: "http-basics", category: "Web testing", title: "Inspect HTTP responses",
      aliases: ["web headers", "HTTP enumeration", "80", "443"],
      tags: ["curl", "HTTP", "headers", "redirect", "web"],
      description: "See response headers, cookies, redirects, and the body.",
      commands: ["curl -i --max-time 15 http://<TARGET_IP>:<PORT>/", "curl -I --max-time 15 http://<TARGET_IP>:<PORT>/"],
      flags: [
        "curl -i includes response headers with the body of the normal GET response.",
        "-I issues a HEAD request and returns headers without a response body. Uppercase -I and lowercase -i are not equivalent.",
        "--max-time 15 limits the whole operation to 15 seconds, not just connection setup."
      ],
      steps: ["Compare status codes, server headers, and application content.", "Inspect a redirect destination before following it; it may be outside your scope.", "HEAD responses can differ from GET responses. Verify important findings using GET."],
      caution: "Do not assume a server banner is accurate or that every redirect is authorized.",
      source: "curl"
    },
    {
      id: "virtual-host", category: "Web testing", title: "Check a known virtual host",
      aliases: ["virtualhost", "vhost mapping", "80", "443"],
      tags: ["curl", "vhost", "hostname", "DNS", "Host header"],
      description: "Send a request to a known application hostname while connecting to the lab IP.",
      commands: ["curl --resolve <HOSTNAME>:80:<TARGET_IP> http://<HOSTNAME>/", "curl --resolve <HOSTNAME>:443:<TARGET_IP> https://<HOSTNAME>/"],
      flags: [
        "curl --resolve HOSTNAME:PORT:IP supplies a per-request DNS mapping for that exact hostname/port while connecting to the specified address.",
        "The URL hostname remains the HTTP host and HTTPS SNI/certificate hostname. The IP slot requires a literal address; this does not disable TLS verification."
      ],
      steps: ["Obtain a candidate hostname from permitted enumeration such as a redirect or certificate.", "Compare the hostname response with the direct-IP response.", "For HTTPS, --resolve supplies the hostname for both the request and TLS connection."],
      caution: "Keep TLS validation enabled. Handle lab certificate trust deliberately rather than hiding all errors with -k.",
      source: "curl"
    },
    {
      id: "web-map", category: "Web testing", title: "Map application behavior manually",
      tags: ["burp free", "proxy", "parameters", "authentication", "authorization", "IDOR"],
      description: "Build a small endpoint and parameter inventory before testing hypotheses.",
      commands: ["curl -i 'http://<TARGET_IP>:<PORT>/<PATH>?<PARAMETER>=<VALUE>'"],
      flags: [
        "curl -i includes response headers as well as the body; without a data option this is a GET request.",
        "PATH, PARAMETER, and VALUE form the URL path/query. Single quotes keep shell metacharacters in the URL literal; encode values as appropriate."
      ],
      steps: ["In Burp Community/Free, capture your own authorized requests and inspect them in Repeater.", "Record methods, parameters, cookies, roles, and normal responses.", "Change one input at a time; compare behavior using lab accounts you control.", "For suspected authorization flaws, confirm the expected access boundary rather than relying only on a changed status code."],
      caution: "Do not use commercial editions, automated exploitation, or AI-assisted features during the exam.",
      source: "curl"
    },
    {
      id: "web-input-method", category: "Web testing", title: "Investigate input handling",
      tags: ["SQL injection", "LFI", "path traversal", "command injection", "manual testing"],
      description: "A manual reasoning checklist for suspicious input behavior, not an auto-exploitation recipe.",
      commands: [],
      steps: ["Capture a baseline request and identify where each input is used.", "Change one input with a harmless marker or boundary value; record the full response.", "Distinguish validation errors, database errors, file-path handling, and shell-related behavior.", "Use a minimal non-destructive lab proof to validate the hypothesis. Document prerequisites and stop when sufficient evidence exists."],
      caution: "SQLmap, SQLninja, and similar automatic exploitation tools are prohibited by the exam guide. Errors alone are not proof.",
      source: "offsec"
    },
    {
      id: "linux-context", category: "Linux privilege escalation", title: "Establish Linux context",
      tags: ["id", "uname", "groups", "kernel", "whoami", "privesc"],
      description: "Know your account, platform, and network before considering escalation paths.",
      commands: ["id\nuname -a\ncat /etc/os-release\nip addr\nps aux"],
      flags: [
        "uname -a prints all available system/kernel identity fields.",
        "ps aux uses BSD-style options without a dash: a selects processes with terminals from all users, x adds processes without terminals, and u uses a user-oriented display.",
        "id and cat use no flags here; ip addr is the subcommand for displaying interface addresses."
      ],
      steps: ["Record current identity and supplementary groups.", "Identify operating system, running services, and service accounts.", "Prioritize configuration and permission weaknesses over speculative kernel exploits."],
      caution: "Version strings are research leads, not evidence that an exploit will work.",
      source: "linux"
    },
    {
      id: "sudo-review", category: "Linux privilege escalation", title: "Review sudo permissions",
      tags: ["sudo", "sudo -l", "permissions", "privesc"],
      description: "Find commands your account may execute as another user.",
      commands: ["sudo -l"],
      flags: ["sudo -l lists the current user's permitted and forbidden sudo commands under the configured policy; it does not execute those commands or grant unrestricted root access."],
      steps: ["Read run-as users, exact command paths, argument restrictions, and tags.", "Check the executable's ownership and whether inputs or supporting files are writable.", "Research the permitted program's behavior. Validate a specific path in a lab rather than trying unrelated commands."],
      caution: "NOPASSWD is not itself a vulnerability. Interactive programs and environment handling require careful review.",
      source: "sudo"
    },
    {
      id: "suid-capabilities", category: "Linux privilege escalation", title: "Find SUID files and capabilities",
      tags: ["find", "SUID", "SGID", "getcap", "capabilities"],
      description: "Identify privileged executables and unusual file capabilities.",
      commands: ["find / -type f \\( -perm -4000 -o -perm -2000 \\) -print", "getcap -r /"],
      flags: [
        "find / starts at the filesystem root; -type f restricts matches to regular files.",
        "-perm -4000 requires the SUID bit; -perm -2000 requires the SGID bit. The leading '-' on these permission masks means all specified bits must be set.",
        "-o is logical OR; the escaped parentheses group those permission tests; -print outputs matching paths.",
        "getcap -r recursively reports file capabilities below the supplied directory. Permission errors remain visible."
      ],
      steps: ["Run from the target shell; permission-denied messages indicate areas you could not inspect.", "Compare unusual paths, ownership, and permissions with expected packages.", "Research each relevant executable and capability; verify whether your user can actually reach a privileged behavior."],
      caution: "Keep errors visible. This reference deliberately does not hide unreadable paths with stderr redirection.",
      source: "linux"
    },
    {
      id: "linux-scheduled", category: "Linux privilege escalation", title: "Review scheduled jobs and writable inputs",
      tags: ["cron", "systemd", "timers", "PATH", "writable scripts"],
      description: "Trace elevated scheduled tasks to their commands and dependencies.",
      commands: ["cat /etc/crontab\nls -la /etc/cron.d\nsystemctl list-timers --all", "ls -l <SCRIPT_PATH>\nnamei -l <SCRIPT_PATH>"],
      flags: [
        "ls -la combines -l (long permission/ownership listing) and -a (include dot-prefixed entries); ls -l omits the extra -a selection.",
        "systemctl list-timers --all includes inactive timer units as well as active ones.",
        "namei -l shows permissions and ownership for each path component, helping inspect parent directories. cat uses no flags here."
      ],
      steps: ["Identify which account runs each relevant task.", "Inspect the script and every parent directory's ownership and permissions.", "Trace relative commands, environment variables, and writable supporting files before considering a lab validation."],
      caution: "Not all systems use systemd. Do not modify shared or production jobs; preserve originals when testing in a lab.",
      source: "linux"
    },
    {
      id: "windows-context", category: "Windows privilege escalation", title: "Establish Windows context",
      tags: ["whoami", "systeminfo", "privileges", "groups", "privesc"],
      description: "Record identity, group memberships, token privileges, and system details.",
      commands: ["whoami /all\nsysteminfo\nipconfig /all\nnet user <USER>"],
      flags: [
        "whoami /all shows the current token's user, groups, and privileges.",
        "ipconfig /all shows detailed adapter/IP configuration; it does not change the configuration.",
        "systeminfo uses no flags here; net user USER queries the named local account because /domain is not supplied."
      ],
      steps: ["Run these commands in cmd.exe on the target.", "Read whether privileges are present and enabled; membership alone may not reflect an elevated token.", "Correlate OS details with actual configuration and current patch information."],
      caution: "A named privilege is only a lead. Do not assume a particular escalation technique is applicable.",
      source: "windows"
    },
    {
      id: "windows-services", category: "Windows privilege escalation", title: "Inspect service configuration",
      tags: ["sc.exe", "icacls", "services", "unquoted service path", "permissions"],
      description: "Review a service's identity, binary path, and file permissions.",
      commands: ["sc.exe query state= all\nsc.exe qc <SERVICE_NAME>\nsc.exe sdshow <SERVICE_NAME>", "icacls \"<SERVICE_BINARY_PATH>\""],
      flags: [
        "sc.exe query state= all lists services in active and inactive states; preserve the space after state=.",
        "sc.exe qc reads service configuration; sdshow reads the service security descriptor in SDDL form.",
        "icacls PATH displays the file/directory ACL with no modification flags. Service ACLs and executable-file ACLs are distinct."
      ],
      steps: ["Use the internal service name, not its display label.", "Check SERVICE_START_NAME, BINARY_PATH_NAME, service ACLs, and relevant directory ACLs.", "For an unquoted path lead, verify spaces, actual path parsing, writable candidate locations, and your ability to trigger a restart."],
      caution: "Use sc.exe explicitly in PowerShell to avoid the sc alias. A path with spaces is not automatically exploitable.",
      source: "windows"
    },
    {
      id: "windows-tasks", category: "Windows privilege escalation", title: "Review scheduled tasks",
      tags: ["schtasks", "scheduled task", "icacls", "writable files"],
      description: "Identify elevated scheduled tasks and inspect their executable inputs.",
      commands: ["schtasks /query /fo LIST /v", "icacls \"<TASK_SCRIPT_PATH>\""],
      flags: [
        "schtasks /query lists scheduled tasks; /fo LIST selects a labeled list rather than table/CSV output; /v adds verbose task details.",
        "icacls TASK_SCRIPT_PATH displays that path's ACL without changing permissions; the quoted path is an argument, not a flag."
      ],
      steps: ["Read task actions, run-as account, trigger, and last-run information.", "Inspect executable, script, and parent-directory permissions.", "Confirm the task runs with the relevant privilege and consumes the writable input before testing a hypothesis."],
      caution: "Task visibility depends on your permissions. Do not replace files or trigger tasks without authorized lab scope.",
      source: "windows"
    },
    {
      id: "ad-context", category: "Active Directory", title: "Establish domain context",
      tags: ["AD", "domain", "net", "net user", "net group", "nltest", "Windows"],
      description: "Use built-in Windows commands from an authorized domain session.",
      commands: ["whoami /all\nnet user /domain\nnet group /domain\nnltest /dsgetdc:<DOMAIN>"],
      flags: [
        "whoami /all shows the user, groups, and privileges of the current token.",
        "net user /domain and net group /domain query the domain rather than the local account database; with no name supplied they list users/groups.",
        "nltest /dsgetdc:DOMAIN locates a domain controller for the named domain; the colon introduces its value."
      ],
      steps: ["Confirm the current user and domain; note the identified domain controller.", "Inventory visible users and groups, then investigate relevant memberships.", "Treat directory membership as context, not proof of local administrator access."],
      caution: "These commands depend on domain connectivity and your session permissions. Do not spray credentials or use spoofing.",
      source: "windows"
    },
    {
      id: "ldap-root", category: "Active Directory", title: "Query LDAP naming contexts",
      aliases: ["directory discovery", "AD naming contexts", "389", "636"],
      tags: ["ldapsearch", "LDAP", "rootDSE", "389", "636", "base DN"],
      description: "Discover directory naming contexts before scoped LDAP searches.",
      commands: ["ldapsearch -x -H ldap://<DC_IP> -s base -b '' namingContexts defaultNamingContext"],
      flags: [
        "ldapsearch -x selects simple authentication instead of SASL; without bind credentials this is an anonymous query.",
        "-H selects the LDAP URI; -s base restricts the search to the base object; -b '' selects rootDSE's empty base DN.",
        "namingContexts and defaultNamingContext are requested attributes, not filters or command-line flags."
      ],
      steps: ["Query rootDSE; anonymous visibility depends on server configuration.", "Use the returned defaultNamingContext as the search base for AD objects.", "If authentication is required, use a permitted authenticated session or a validated LDAPS connection."],
      caution: "Do not send real credentials over unencrypted simple binds. Denied anonymous access does not imply that LDAP is absent.",
      source: "ldap"
    },
    {
      id: "ldap-users", category: "Active Directory", title: "Enumerate users with an authenticated LDAP query",
      aliases: ["AD user listing", "directory enumeration", "389", "636"],
      tags: ["ldapsearch", "LDAPS", "users", "sAMAccountName", "AD enumeration"],
      description: "Run a bounded directory query with authorized credentials and TLS.",
      commands: ["ldapsearch -x -H ldaps://<DC_HOSTNAME> -D '<USER>@<DOMAIN>' -W -b '<BASE_DN>' '(&(objectCategory=person)(objectClass=user))' sAMAccountName memberOf"],
      flags: [
        "ldapsearch -x selects simple authentication; -H selects the LDAPS URI, using the certificate's actual hostname.",
        "-D supplies the bind identity; -W prompts for its password; -b supplies the search-base DN.",
        "The quoted LDAP filter requires person-category user objects; sAMAccountName and memberOf select returned attributes. The default search scope is subtree because no -s override is supplied."
      ],
      steps: ["Configure trust for the lab directory's certificate and resolve its hostname correctly.", "Use -W to prompt for the password rather than saving it in shell history.", "Record relevant users and memberships; servers may limit result counts. Query more narrowly when needed."],
      caution: "Do not disable certificate verification to bypass trust errors. LDAP enumeration does not establish an exploitable attack path.",
      source: "ldap"
    },
    {
      id: "file-http", category: "File transfers and shells", title: "Serve a dedicated transfer directory",
      tags: ["python", "http.server", "curl", "download", "file transfer"],
      description: "Move a permitted lab file without exposing your entire working directory.",
      commands: ["python3 -m http.server <PORT> --bind <VPN_IP> --directory <TRANSFER_DIRECTORY>", "curl --fail --show-error http://<VPN_IP>:<PORT>/<FILE> -o <DESTINATION>"],
      flags: [
        "python3 -m runs the http.server module; PORT selects the listener port.",
        "http.server --bind selects the listening address; --directory selects the directory being served instead of the current directory.",
        "curl --fail returns a failure on HTTP errors (normally status 400+) instead of treating an error page as a successful download.",
        "curl --show-error keeps error messages visible even if silent mode is configured; -o selects the output file and can overwrite it."
      ],
      steps: ["Create a dedicated directory containing only files you intend to share.", "Bind to the intended lab interface; download from the authorized target.", "Stop the server with Ctrl+C after the transfer and verify the downloaded file."],
      caution: "Python's server has no authentication and uses plaintext HTTP. Do not serve secrets or use it as a production service.",
      source: "python"
    },
    {
      id: "file-powershell", category: "File transfers and shells", title: "Download a lab file with PowerShell",
      tags: ["PowerShell", "Invoke-WebRequest", "Get-FileHash", "file transfer"],
      description: "Download a permitted file and compare a checksum.",
      commands: ["Invoke-WebRequest -Uri 'http://<VPN_IP>:<PORT>/<FILE>' -OutFile '<DESTINATION>'\nGet-FileHash -Algorithm SHA256 '<DESTINATION>'"],
      flags: [
        "Invoke-WebRequest -Uri selects the resource URL; -OutFile saves the response to the destination file rather than displaying it.",
        "Get-FileHash -Algorithm SHA256 selects the digest algorithm; its path argument selects the downloaded file. These are PowerShell named parameters."
      ],
      steps: ["Run in PowerShell and choose a destination your user can write.", "Compare the hash with the source file's known SHA256.", "Record the transfer and remove only your own lab artifacts after completing the exercise."],
      caution: "A matching hash verifies consistency, not trustworthiness. Do not fetch and execute unknown code blindly.",
      source: "powershell"
    },
    {
      id: "shell-terminal", category: "File transfers and shells", title: "Improve an existing Linux shell",
      tags: ["python", "PTY", "shell", "terminal", "stty"],
      description: "Give an existing authorized lab shell basic pseudo-terminal support.",
      commands: ["python3 -c 'import pty; pty.spawn(\"/bin/bash\")'", "export TERM=xterm\nstty size"],
      flags: [
        "python3 -c runs the quoted Python code string; pty.spawn('/bin/bash') starts Bash attached to a pseudo-terminal.",
        "export TERM=xterm sets the shell's terminal-type environment variable; stty size reports terminal rows/columns. Neither command uses flags here."
      ],
      steps: ["Confirm python3 and /bin/bash exist on the target.", "Spawn a PTY only after obtaining a shell through your authorized exercise.", "Check terminal behavior. Full job control may require local-terminal handling that depends on your listener and shell."],
      caution: "This does not elevate privileges or guarantee a fully interactive terminal. Never assume it satisfies evidence requirements without checking.",
      source: "pty"
    },
    {
      id: "ssh-local", category: "Tunneling and pivoting", title: "Forward one remote service over SSH",
      aliases: ["SSH tunnel", "local port forward", "22"],
      tags: ["ssh", "-L", "local forwarding", "port forwarding", "pivot"],
      description: "Expose a service reachable from an authorized SSH pivot to your loopback interface.",
      commands: ["ssh -N -o ExitOnForwardFailure=yes -L 127.0.0.1:<LOCAL_PORT>:<DESTINATION_HOST>:<DESTINATION_PORT> <USER>@<PIVOT_IP>"],
      flags: [
        "SSH -N runs no remote command; -o ExitOnForwardFailure=yes exits if the requested forwarding listener cannot be established.",
        "-L creates a listener on your client's loopback LOCAL_PORT. Connections to DESTINATION_HOST:DESTINATION_PORT originate from the SSH server/pivot, including destination DNS lookup.",
        "USER@PIVOT_IP selects the SSH account and server. Forward setup success does not guarantee the destination service is reachable."
      ],
      steps: ["DESTINATION_HOST is resolved and contacted from the pivot, not your local machine.", "For a service on the pivot itself, use 127.0.0.1 as DESTINATION_HOST.", "Connect your client to 127.0.0.1:LOCAL_PORT and keep SSH running. Stop with Ctrl+C when done."],
      caution: "Only forward destinations in your authorized scope. SSH server forwarding policy may reject the connection.",
      source: "ssh"
    },
    {
      id: "ssh-dynamic", category: "Tunneling and pivoting", title: "Use an SSH SOCKS proxy",
      aliases: ["SSH tunnel", "dynamic port forward", "22"],
      tags: ["ssh", "-D", "SOCKS", "socks5-hostname", "pivot", "curl"],
      description: "Route an explicit application request through an authorized SSH host.",
      commands: ["ssh -N -o ExitOnForwardFailure=yes -D 127.0.0.1:<SOCKS_PORT> <USER>@<PIVOT_IP>", "curl --socks5-hostname 127.0.0.1:<SOCKS_PORT> http://<INTERNAL_HOST>:<PORT>/"],
      flags: [
        "SSH -N runs no remote command; -o ExitOnForwardFailure=yes exits if the requested listener cannot be created.",
        "-D creates a local SOCKS proxy at 127.0.0.1:SOCKS_PORT for explicit client use.",
        "curl --socks5-hostname selects the SOCKS5 endpoint and delegates destination-name resolution to the proxy rather than resolving it locally."
      ],
      steps: ["Keep the SSH session running and configure each intended client explicitly.", "With --socks5-hostname, curl sends destination hostname resolution through the proxy.", "Confirm the destination is within scope; local connectivity alone does not grant permission."],
      caution: "SOCKS does not transparently proxy all traffic. Do not assume raw-packet scans or UDP tools will work through it. No Metasploit pivoting.",
      source: "ssh"
    },
    {
      id: "linux-evidence", category: "Evidence and reporting", title: "Capture Linux proof in the target shell",
      tags: ["proof", "local.txt", "proof.txt", "cat", "ip", "ip addr", "screenshot", "root"],
      description: "Prepare proof output and target identity for a required screenshot.",
      commands: ["id\nip addr\ncat <ORIGINAL_PROOF_PATH>"],
      flags: ["No flags are used. id shows account/group IDs, ip addr displays interface addresses, and cat ORIGINAL_PROOF_PATH displays that file's contents without relocating it."],
      steps: ["Use an interactive shell on the target, not a web shell.", "For full Linux administrative control, verify a root shell. Read the proof from its original location.", "Capture the proof contents and target IP in a screenshot; submit the proof in the control panel before the exam ends.", "Include commands, output, and reproducible steps in your private report."],
      caution: "Follow the current guide and control-panel instructions exactly. Do not copy proofs into public notes or GitHub.",
      source: "offsec"
    },
    {
      id: "windows-evidence", category: "Evidence and reporting", title: "Capture Windows proof in the target shell",
      tags: ["proof", "type", "ipconfig", "Administrator", "SYSTEM", "screenshot"],
      description: "Show the proof file and target address in an interactive Windows shell.",
      commands: ["whoami\nipconfig\ntype \"<ORIGINAL_PROOF_PATH>\""],
      flags: ["No flags are used. whoami shows the effective username, ipconfig shows basic IP configuration, and cmd.exe's type displays the original proof file. Quotes preserve a path containing spaces."],
      steps: ["Run in cmd.exe in an interactive target shell, not a web shell.", "Verify the administrative identity/privileges required by the guide for full points.", "Capture proof contents and target IP together, then submit the proof in the exam control panel before time expires.", "Keep screenshots and reports local and private."],
      caution: "In PowerShell, use cmd /c type or the appropriate shell command deliberately. Never move the proof to another location just for capture.",
      source: "offsec"
    },
    {
      id: "report-method", category: "Evidence and reporting", title: "Build a reproducible report trail",
      tags: ["report", "notes", "screenshots", "exploit modifications", "documentation"],
      description: "Document the reasoning and exact steps needed to reproduce each authorized finding.",
      commands: [],
      steps: ["Record target, timestamp, command, relevant output, and why you chose the next step.", "Document initial access and privilege escalation separately, including prerequisites.", "For an unmodified exploit, cite its original URL. For a modified exploit, include the changed code, original URL, highlighted changes, rationale, and any shellcode-generation command.", "Verify required screenshots, proof submissions, and the current report submission instructions before the deadline."],
      caution: "This site is not a report editor. Do not paste exam content into the search box or publish it as reference content.",
      source: "offsec"
    }
  ];
  sources.nmap_ports = ["Nmap port selection", "https://nmap.org/book/man-port-specification.html"];
  sources.nmap_timing = ["Nmap timing and performance", "https://nmap.org/book/man-performance.html"];
  sources.nmap_headers = ["Nmap http-headers script", "https://nmap.org/nsedoc/scripts/http-headers.html"];
  sources.oxdf_ldap = ["0xdf: LDAP methodology reference", "https://0xdf.gitlab.io/cheatsheets/ldap-enum"];
  cards.push(
    {
      id: "nmap-fast", category: "Enumeration", title: "Nmap: fast first pass",
      tags: ["nmap", "TCP", "fast scan"], aliases: ["fast scan", "quick nmap", "top 100"],
      description: "Check the 100 most common TCP ports first, then expand the scan instead of assuming coverage is complete.",
      commands: ["nmap -n -F -T4 --max-rate 300 --reason <TARGET_IP>"],
      flags: ["-n skips reverse DNS lookups; a supplied FQDN still needs to resolve.", "-F selects the top 100 ports with the standard nmap-services frequency data, rather than the default 1000.", "-T4 uses faster timing for a reasonably reliable network; --max-rate 300 limits average host-discovery/port-scan sending to 300 packets per second, with possible temporary bursts.", "--reason explains reported states. This rate is not a guaranteed scan duration or a limit on later service/script requests."],
      steps: ["Check only the selected authorized host.", "Record open, filtered, and uncertain results.", "Continue with the full TCP scan and service checks on discovered ports."],
      caution: "Fast means fewer ports and faster timing, not complete coverage. Retry with default timing on lossy links; custom service data can change -F's port selection.", source: "nmap_ports"
    },
    {
      id: "nmap-top-ports", category: "Enumeration", title: "Nmap: wider common-port pass",
      tags: ["nmap", "TCP", "top ports"], aliases: ["top 200"],
      description: "Check the top 200 TCP ports as an intermediate pass before all 65535 ports.",
      commands: ["nmap -n --top-ports 200 -T3 --max-rate 300 --reason <TARGET_IP>"],
      flags: ["-n skips reverse DNS; --top-ports 200 selects 200 highest-frequency ports from service data, not ports 1 through 200.", "-T3 uses normal timing; --max-rate 300 limits average host-discovery/port-scan sending to 300 packets per second, with possible temporary bursts.", "--reason reports the response behind each port state."],
      steps: ["Compare with the fast first pass.", "Do not conclude that non-standard services are absent; use the full TCP scan when needed."],
      caution: "The common-port list is a heuristic, not complete service coverage.", source: "nmap_ports"
    },
    {
      id: "nmap-light-versions", category: "Enumeration", title: "Nmap: identify services on found ports",
      tags: ["nmap", "service", "version detection"], aliases: ["light version scan"],
      description: "Use a lighter service-probe set on ports you already found.",
      commands: ["nmap -n -sV --version-light -p <PORT_LIST> --reason <TARGET_IP>"],
      flags: ["-n skips reverse DNS; -sV enables service/version probes.", "--version-light selects version intensity 2; -p takes the comma-separated discovered ports.", "--reason explains port states. This command does not request an NSE script scan."],
      steps: ["Replace PORT_LIST with found ports, such as 22,80,445.", "Confirm the actual protocol using its client, not only the service name guessed from a port number.", "Use fuller version detection if the lighter probes are inconclusive."],
      caution: "Versions and banners remain research leads, not confirmed vulnerabilities.", source: "nmap"
    },
    {
      id: "nmap-discovery-blocked", category: "Enumeration", title: "Nmap: check known ports when discovery is blocked",
      tags: ["nmap", "host discovery", "filtered", "TCP"], aliases: ["host seems down", "skip ping"],
      description: "Skip host-discovery probes only when you have reason to believe this one target is reachable.",
      commands: ["nmap -n -Pn -sT -p <PORT_LIST> --reason <TARGET_IP>"],
      flags: ["-n skips reverse DNS; -Pn treats the target as online and skips host discovery, not port scanning.", "-sT uses TCP connect; -p limits the scan to the selected ports; --reason reports state evidence."],
      steps: ["Verify VPN/interface, route, target address, and authorized scope first.", "Choose a small relevant port list.", "Compare with a direct protocol connection; do not interpret silence as proof of an open or absent service."],
      caution: "-Pn can make scans slow because offline hosts are still probed. Do not apply it blindly to large address ranges.", source: "nmap"
    },
    {
      id: "nmap-syn-ports", category: "Enumeration", title: "Nmap: SYN scan on selected TCP ports",
      tags: ["nmap", "SYN", "TCP"],
      description: "Use a privileged raw-packet SYN scan on an explicit set of ports.",
      commands: ["sudo nmap -n -sS -p <PORT_LIST> -T3 --reason <TARGET_IP>"],
      flags: ["sudo supplies local raw-packet privileges; -sS selects SYN scanning; -n skips reverse DNS.", "-p selects the ports; -T3 uses normal timing; --reason explains reported states."],
      steps: ["Use only where raw-packet scanning is supported and permitted.", "Use the TCP connect scan instead when you do not have those privileges."],
      caution: "A SYN scan is not invisible. Raw-packet support and firewall behavior can affect results.", source: "nmap"
    },
    {
      id: "nmap-specific-udp", category: "Enumeration", title: "Nmap: check DNS, NTP, and SNMP UDP ports",
      tags: ["nmap", "UDP", "DNS", "NTP", "SNMP"],
      description: "Start with three explicitly selected UDP services rather than a broad UDP scan.",
      commands: ["sudo nmap -n -sU -p 53,123,161 --max-rate 30 --reason <TARGET_IP>"],
      flags: ["sudo supplies raw-packet privileges; -n skips reverse DNS; -sU selects UDP.", "-p 53,123,161 selects those UDP ports; --max-rate 30 limits average host-discovery/port-scan sending to 30 packets per second, with possible temporary bursts.", "--reason explains state evidence; open|filtered is uncertain and needs a protocol-specific follow-up."],
      steps: ["Compare DNS with dig and SNMP with an authorized community/version query.", "Expand UDP port selection only when the target and findings justify it."],
      caution: "A silent UDP endpoint may be open or filtered. The three-port selection is not exhaustive.", source: "nmap_timing"
    },
    {
      id: "nmap-output", category: "Evidence and reporting", title: "Nmap: save output and resume an interrupted scan",
      tags: ["nmap", "output", "resume", "report"],
      description: "Keep text, XML, and grepable output for your own notes and resume a compatible interrupted scan.",
      commands: ["nmap -n -sT -p <PORT_LIST> -oA <OUTPUT_PREFIX> <TARGET_IP>", "nmap --resume <NORMAL_OR_GREPABLE_FILE>"],
      flags: ["-n skips reverse DNS; -sT uses TCP connect; -p selects the ports.", "-oA writes .nmap, .xml, and .gnmap files using the chosen prefix.", "--resume reloads the original arguments from the interrupted scan's output; do not append new scan options. This example uses normal/grepable output for compatibility; the current rolling manual also lists XML, but verify support in your installed version."],
      steps: ["Choose a private output path before starting.", "Read the saved scan header before resuming to confirm the original target and options."],
      caution: "Output can contain sensitive target information and may overwrite files. Resume repeats the saved scan configuration, not a newly specified one.", source: "nmap"
    },
    {
      id: "nmap-http-headers", category: "Web testing", title: "Nmap: request HTTP headers on found web ports",
      tags: ["nmap", "HTTP", "NSE", "headers"],
      description: "Use one explicit HTTP header script after identifying the web service.",
      commands: ["nmap -n -sV --version-light -p <PORT_LIST> --script http-headers <TARGET_IP>"],
      flags: ["-n skips reverse DNS; -sV --version-light uses a lighter service-probe set.", "-p selects known web ports; --script http-headers requests that named script rather than every default or vulnerability script.", "http-headers requests HEAD / by default and reports its response headers."],
      steps: ["Confirm these are authorized web endpoints first.", "Compare with a manual curl request; HEAD and GET responses can differ.", "Review a script's exact behavior before selecting any other script."],
      caution: "A script's safe category is not blanket exam approval. No -A, broad vulnerability category, or arbitrary script execution is included.", source: "nmap_headers"
    }
  );
  sources.gobuster36 = ["Gobuster 3.6 mode help", "https://github.com/OJ/gobuster/blob/v3.6.0/README.md"];
  sources.wstg = ["OWASP Web Security Testing Guide", "https://owasp.org/www-project-web-security-testing-guide/"];
  cards.push(
    {
      id: "gobuster-extensions", category: "Web testing", stage: "enumeration", services: ["web"],
      title: "Gobuster: search relevant file extensions", tags: ["gobuster", "directories", "extensions"],
      description: "Expand path discovery with a few application-relevant suffixes.",
      commands: ["gobuster dir -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> -x php,txt,html -t 5 --delay 300ms"],
      flags: ["dir selects path discovery; -u selects the base URL; -w selects the wordlist.", "-x adds comma-separated extensions; -t 5 uses five workers; --delay 300ms pauses each worker between requests, not the entire scan at a fixed rate."],
      steps: ["Use extensions justified by the observed application.", "Compare results with missing-path responses before treating them as files."],
      caution: "Each extension increases requests. No recursive crawling or redirect following is requested.", source: "gobuster36"
    },
    {
      id: "gobuster-status-filter", category: "Web testing", stage: "troubleshooting", services: ["web"],
      title: "Gobuster: avoid conflicting status filters", tags: ["gobuster", "status", "errors"],
      description: "Set an explicit status allowlist and clear the default blacklist when those options conflict.",
      commands: ["gobuster dir -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> -s '200,204,301,302,307,401,403' -b '' -t 5"],
      flags: ["dir selects path discovery; -u selects the URL; -w selects the wordlist; -t 5 uses five workers.", "-s selects positive status codes; -b '' clears the default blacklist so it does not conflict with -s. Empty quotes are an actual empty argument."],
      steps: ["Read the exact error and installed dir help first.", "Keep authorization and redirect responses visible; compare them manually."],
      caution: "A status allowlist can hide useful responses. This does not fix a soft-404 or authorize bypassing a 403.", source: "gobuster36"
    },
    {
      id: "gobuster-baseline-filter", category: "Web testing", stage: "troubleshooting", services: ["web"],
      title: "Gobuster: filter a measured soft-404 length", tags: ["gobuster", "wildcard", "soft-404"],
      description: "Exclude a known missing-page length only after measuring a consistent baseline.",
      commands: ["gobuster dir -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> --exclude-length <BASELINE_LENGTH> -t 5"],
      flags: ["dir selects path discovery; -u selects the URL; -w selects the wordlist; -t 5 uses five workers.", "--exclude-length excludes responses of the supplied byte length regardless of status. Gobuster 3.6 also supports multiple lengths/ranges; verify installed help."],
      steps: ["Compare two distinct missing paths and a known valid path.", "If lengths vary, use manual response comparison or ffuf calibration instead of guessing a length.", "Recheck interesting excluded candidates individually."],
      caution: "Real pages can have the same length as a missing page. Do not force past a precheck without understanding it.", source: "gobuster36"
    },
    {
      id: "gobuster-timeouts", category: "Web testing", stage: "troubleshooting", services: ["web"],
      title: "Gobuster: slower requests for timeouts or an unstable service", tags: ["gobuster", "timeout", "errors"],
      description: "Reduce concurrent requests and allow more response time after verifying the connection.",
      commands: ["gobuster dir -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> -t 2 --delay 500ms --timeout 20s"],
      flags: ["dir selects path discovery; -u selects the URL; -w selects the wordlist.", "-t 2 uses two workers; --delay 500ms is a pause per worker; --timeout 20s sets the HTTP request timeout."],
      steps: ["Check the endpoint once with curl first.", "Stop on repeated 429/503 responses and follow the lab's limits; a different tool will not fix a down service.", "Use a small wordlist before expanding."],
      caution: "This is not a guaranteed request-rate limit. Do not suppress errors or increase concurrency to hide a problem.", source: "gobuster36"
    },
    {
      id: "gobuster-vhosts", category: "Web testing", stage: "enumeration", services: ["web"],
      title: "Gobuster: virtual-host discovery", tags: ["gobuster", "vhost", "Host header"],
      description: "Try hostname prefixes against a known base hostname rather than directory paths.",
      commands: ["gobuster vhost -u http://<HOSTNAME>:<PORT>/ --append-domain -w <WORDLIST> -t 5 --delay 300ms", "gobuster vhost -u http://<TARGET_IP>:<PORT>/ --domain <DOMAIN> --append-domain -w <WORDLIST> -t 5 --delay 300ms"],
      flags: ["vhost varies the HTTP host; -u supplies the endpoint URL.", "--append-domain appends the URL domain to wordlist prefixes; --domain supplies that domain explicitly when using an IP URL. Omit appending when the wordlist already contains full names.", "-w selects the wordlist; -t 5 selects workers; --delay 300ms pauses each worker."],
      steps: ["Use a resolvable base hostname, or the explicit IP/--domain alternative supported by Gobuster 3.6.", "Compare an invented hostname with the normal response.", "Verify discovered names manually; DNS discovery and HTTP virtual hosts are different."],
      caution: "Do not append a domain twice or follow discovered names outside scope.", source: "gobuster36"
    },
    {
      id: "gobuster-dns", category: "Enumeration", stage: "enumeration", services: ["dns"],
      title: "Gobuster: DNS subdomain discovery", tags: ["gobuster", "DNS", "subdomains"],
      description: "Use a selected resolver and a small list of domain prefixes.",
      commands: ["gobuster dns -d <DOMAIN> -w <WORDLIST> -r <DNS_IP>:53 -t 5 --delay 300ms"],
      flags: ["dns selects DNS discovery; -d selects the authorized base domain; -w selects the prefix wordlist.", "-r selects the resolver and port; -t 5 selects workers; --delay 300ms pauses each worker."],
      steps: ["Check normal and invented names with dig before starting.", "Investigate wildcard answers rather than automatically forcing continued scanning.", "Confirm any discovered host is in scope before connecting."],
      caution: "DNS queries may leave the target network through the resolver. Use only approved domains/resolvers.", source: "gobuster36"
    },
    {
      id: "gobuster-session", category: "Web testing", stage: "advanced", services: ["web"],
      title: "Gobuster: discovery within your approved session", tags: ["gobuster", "cookies", "authentication"],
      description: "Reproduce a known authenticated session when the anonymous namespace is different.",
      commands: ["gobuster dir -u http://<TARGET_IP>:<PORT>/ -w <WORDLIST> -c '<SESSION_COOKIE>' -t 2 --delay 500ms"],
      flags: ["dir selects path discovery; -u selects the URL; -w selects the wordlist.", "-c supplies the Cookie header value; -t 2 selects workers; --delay 500ms pauses each worker."],
      steps: ["Confirm permission for authenticated discovery and a harmless baseline request.", "Use your own designated test account and verify that the session is still valid."],
      caution: "Never publish cookies or put them in shared history. Session expiry and CSRF controls are not reasons to bypass authentication.", source: "gobuster36"
    },
    {
      id: "gobuster-lab-tls", category: "Web testing", stage: "troubleshooting", services: ["web"],
      title: "Gobuster: a verified isolated lab with a self-signed certificate", tags: ["gobuster", "TLS", "certificate"],
      description: "An explicitly exceptional TLS option for a known lab endpoint whose certificate identity you already verified.",
      commands: ["gobuster dir -u https://<TARGET_IP>:<PORT>/ -w <WORDLIST> -k -t 2 --delay 500ms"],
      flags: ["dir selects path discovery; -u selects the HTTPS URL; -w selects the wordlist.", "-k disables certificate verification; -t 2 selects workers; --delay 500ms pauses each worker."],
      steps: ["Prefer correcting the hostname and trusting the approved lab CA.", "Verify the endpoint/certificate independently before considering this isolated-lab exception.", "Do not include authentication secrets while bypassing certificate verification."],
      caution: "-k removes server-identity protection. Never use it as an automatic TLS fix or for untrusted/production endpoints.", source: "gobuster36"
    },
    {
      id: "gobuster-help", category: "Web testing", stage: "reference", services: ["web", "dns"],
      title: "Gobuster: verify the installed mode and options", tags: ["gobuster", "help", "version"],
      description: "Check local mode help when an example flag is rejected or behaves differently.",
      commands: ["gobuster version", "gobuster dir --help", "gobuster vhost --help", "gobuster dns --help"],
      flags: ["version reports the installed release; dir, vhost, and dns select different modes; --help displays that mode's local options without scanning."],
      steps: ["Read the exact mode's help, not an old example using the removed -m mode selector.", "Confirm flag meaning before changing versions or choosing another client."],
      caution: "The linked 3.6 README includes some older help snapshots. Installed help takes precedence; templates are not execution-tested.", source: "gobuster36"
    },
    {
      id: "ffuf-calibration", category: "Web testing", stage: "troubleshooting", services: ["web"],
      title: "ffuf: alternative for wildcard-like path responses", tags: ["ffuf", "soft-404", "calibration"],
      description: "Use explicit all-status matching and calibration as an alternative to a brittle fixed-length filter.",
      commands: ["ffuf -u http://<TARGET_IP>:<PORT>/FUZZ -w <WORDLIST> -mc all -ac -t 5 -rate 10"],
      flags: ["-u sets the URL template; FUZZ is replaced with -w wordlist entries.", "-mc all considers all status codes; -ac performs calibration requests and adds response filters.", "-t 5 selects workers; -rate 10 limits the configured request rate."],
      steps: ["Read baseline responses before scanning.", "Compare calibrated matches and a few excluded candidates manually."],
      caution: "Calibration is heuristic, not AI or vulnerability confirmation, and can hide real pages. It sends extra requests.", source: "ffuf"
    },
    {
      id: "ffuf-vhosts", category: "Web testing", stage: "enumeration", services: ["web"],
      title: "ffuf: virtual-host alternative using an explicit Host header", tags: ["ffuf", "vhost", "Host header"],
      description: "Connect to the lab IP while varying scoped hostname prefixes in HTTP.",
      commands: ["ffuf -u http://<TARGET_IP>:<PORT>/ -H 'Host: FUZZ.<DOMAIN>' -w <WORDLIST> -fs <BASELINE_LENGTH> -t 5 -rate 10"],
      flags: ["-u selects the IP endpoint; -H sets the Host header with the FUZZ prefix marker; -w selects prefixes.", "-fs excludes the measured baseline response size; -t 5 selects workers; -rate 10 limits the configured request rate."],
      steps: ["Measure an invented Host header first.", "Do not use a prefix template with a wordlist of full hostnames.", "Verify an interesting response with curl and the intended hostname."],
      caution: "A size match can hide a real host. HTTP Host is not HTTPS SNI; use the appropriate TLS hostname for HTTPS.", source: "ffuf"
    },
    {
      id: "web-discovery-triage", category: "Web testing", stage: "troubleshooting", services: ["web"],
      title: "Web discovery: check the response before switching scanners", tags: ["curl", "HTTP", "soft-404", "troubleshooting"],
      description: "Compare a known valid path and a known missing path using the same method.",
      commands: ["curl -i --connect-timeout 5 --max-time 15 http://<TARGET_IP>:<PORT>/<KNOWN_VALID_PATH>", "curl -i --connect-timeout 5 --max-time 15 http://<TARGET_IP>:<PORT>/<KNOWN_MISSING_PATH>"],
      flags: ["-i includes response headers with the GET body; --connect-timeout 5 limits connection setup; --max-time 15 limits the transfer.", "The path placeholders are your chosen control requests; no redirect following is requested."],
      steps: ["Check status, body, length, redirects, Host header, scheme, port, and session.", "401/403 is an access boundary; 429/503 calls for stopping or reduced load.", "Try Gobuster, ffuf, feroxbuster, or dirsearch only after understanding the failure."],
      caution: "Different tools do not create permission or fix a wrong hostname. Do not bypass authorization or blindly hide errors.", source: "curl"
    },
    {
      id: "smb-connect-triage", category: "Enumeration", stage: "troubleshooting", services: ["smb"],
      title: "SMB: distinguish connection, authentication, and permission failures", tags: ["smbclient", "nmap", "SMB", "troubleshooting"],
      description: "Check the port, then use a known identity with the interactive password prompt.",
      commands: ["nmap -n -sT -p 445 --reason <TARGET_IP>", "smbclient -L //<TARGET_IP> -U '<DOMAIN>/<USER>'"],
      flags: ["nmap -n skips reverse DNS; -sT checks TCP connectivity; -p 445 selects SMB; --reason explains the state.", "smbclient -L requests shares; -U selects the identity and prompts for its password."],
      steps: ["Separate timeout/refusal from logon failure and share access denial.", "Confirm local versus domain identity and stop repeated failed logins.", "Try Impacket's SMB client or SMBMap for a different client's view; do not assume their access checks are equivalent."],
      caution: "Do not enable legacy SMB1, guess passwords, or disable protections merely to make a client work.", source: "smb"
    },
    {
      id: "smb-lab-write-proof", category: "Enumeration", stage: "exploitation", services: ["smb"],
      title: "SMB: verify a specifically permitted writable lab share", tags: ["smbclient", "SMB", "write permission"],
      description: "Write and remove one harmless uniquely named text fixture, only where write testing is explicitly authorized.",
      commands: ["smbclient //<TARGET_IP>/<TEST_SHARE> -U '<DOMAIN>/<USER>' -c 'put <LOCAL_TEXT_FIXTURE> <UNIQUE_TEST_NAME>; ls <UNIQUE_TEST_NAME>'", "smbclient //<TARGET_IP>/<TEST_SHARE> -U '<DOMAIN>/<USER>' -c 'del <UNIQUE_TEST_NAME>'"],
      flags: ["//HOST/TEST_SHARE selects the designated test share; -U selects the approved account and prompts for its password.", "-c runs the quoted SMB mini-shell commands; put uploads your harmless text fixture, ls checks that exact name, and del removes only that named fixture."],
      steps: ["Obtain permission for this write check and choose a fresh name that cannot overwrite an existing file.", "Use a small non-sensitive local text file, not a payload.", "Record the permission result, remove only your fixture, and verify cleanup."],
      caution: "Visible shares are not authorization to write. A writable share alone does not prove code execution; no executable upload or service replacement is included.", source: "smb"
    },
    {
      id: "web-lab-path-check", category: "Web testing", stage: "exploitation", services: ["web"],
      title: "Path traversal: one authorized non-sensitive fixture check", tags: ["curl", "path traversal", "manual validation"],
      description: "After mapping a relative-file handler, test one permitted fixture outside its intended directory.",
      commands: ["curl --get --data-urlencode 'file=../<AUTHORIZED_FIXTURE_FILE>' 'http://<TARGET_IP>:<PORT>/<DOWNLOAD_ENDPOINT>'"],
      flags: ["--get sends the data in a GET query; --data-urlencode encodes the field value.", "file is the example mapped parameter; replace it if the actual authorized handler uses another name."],
      steps: ["Confirm the baseline, intended directory boundary, parameter name, and permission to read the fixture.", "Use a non-sensitive designated lab file and compare its known contents.", "Stop after minimal proof; record the boundary and response."],
      caution: "No system/credential-file harvesting or executable inclusion is included. A response difference is not proof of traversal without confirming the actual fixture.", source: "wstg"
    },
    {
      id: "web-lab-sql-boolean", category: "Web testing", stage: "exploitation", services: ["web"],
      title: "SQL input: non-destructive Boolean control pair", tags: ["curl", "SQL injection", "manual validation"],
      description: "Compare one true/false numeric condition on an explicitly approved test record.",
      commands: ["curl --get --data-urlencode 'id=<FIXTURE_ID> AND 1=1' 'http://<TARGET_IP>:<PORT>/<TEST_ENDPOINT>'", "curl --get --data-urlencode 'id=<FIXTURE_ID> AND 1=2' 'http://<TARGET_IP>:<PORT>/<TEST_ENDPOINT>'"],
      flags: ["--get supplies a GET query; --data-urlencode encodes the test field value.", "id is the example mapped numeric parameter; FIXTURE_ID must be a designated test record. The two conditions differ only in truth value."],
      steps: ["Capture a normal request for the same permitted fixture first.", "Compare repeatable response content, not status alone, while accounting for validation and caching.", "Corroborate the cause manually; do not extract other records or escalate to writes."],
      caution: "A difference does not by itself prove SQL execution. No SQLmap, data dump, time-delay, stacked query, or database command execution is included.", source: "wstg"
    },
    {
      id: "web-lab-object-access", category: "Web testing", stage: "exploitation", services: ["web"],
      title: "Object access: compare two designated test accounts", tags: ["curl", "IDOR", "authorization", "manual validation"],
      description: "Read one test-owned object with its owner session and a different designated account.",
      commands: ["curl -i -H 'Cookie: <OWNER_TEST_COOKIE>' 'http://<TARGET_IP>:<PORT>/<OBJECT_ENDPOINT>/<OWNED_TEST_OBJECT_ID>'", "curl -i -H 'Cookie: <OTHER_TEST_COOKIE>' 'http://<TARGET_IP>:<PORT>/<OBJECT_ENDPOINT>/<OWNED_TEST_OBJECT_ID>'"],
      flags: ["-i includes headers; -H supplies the indicated test account's Cookie header.", "Both requests address the same designated test-owned object; only the account changes."],
      steps: ["Confirm both accounts and the object are authorized fixtures.", "Compare expected authorization behavior with actual returned object contents.", "Do not enumerate unrelated IDs or change/delete objects."],
      caution: "Do not publish sessions or use real users' data. Access differences require checking the intended policy, not assuming an IDOR from a status code.", source: "wstg"
    },
    {
      id: "sudo-lab-identity", category: "Linux privilege escalation", stage: "exploitation", services: ["linux"],
      title: "sudo: verify an explicitly permitted identity command", tags: ["sudo", "id", "manual validation"],
      description: "A harmless identity check only when sudo policy explicitly allows this exact program and run-as user.",
      commands: ["sudo -n -u <ALLOWED_RUNAS_USER> /usr/bin/id"],
      flags: ["-n is noninteractive and fails if a password would be required; -u selects the explicitly allowed run-as identity.", "/usr/bin/id must be the exact permitted executable on this host; this template is not a shell escape."],
      steps: ["Read sudo -l first and verify the exact executable, arguments, run-as user, and permission for the test.", "Record the resulting identity without reading secrets or invoking a shell."],
      caution: "Do not substitute arbitrary programs or assume a sudo rule permits escalation. No policy modification, binary replacement, or shell escape is included.", source: "sudo"
    }
  );
  const sourceRevision = "d66ac28d7a54c2ed1e9af1e607322d6f97138e95";
  const sourceReference = `https://github.com/0xsyr0/OSCP/blob/${sourceRevision}/README.md`;
  sources.syr0 = ["0xsyr0/OSCP source reference (pinned revision)", sourceReference];
  const sourceCommandCards = [
    {
      id: "netbios-names", category: "Enumeration", title: "NetBIOS: query one host's name table",
      tags: ["nbtscan", "nmblookup", "NetBIOS", "137"], aliases: ["NetBIOS name lookup"],
      description: "Resolve NetBIOS identity information for one explicitly scoped IPv4 host.",
      commands: ["nbtscan <TARGET_IPV4>", "nmblookup -A <TARGET_IPV4>"],
      flags: ["nbtscan takes a host or range; this template supplies a single IPv4 host.", "nmblookup -A queries the node-status name table of the supplied address."],
      steps: ["Compare the names with SMB and DNS results.", "Do not turn the address into an unapproved subnet sweep."],
      caution: "UDP 137 may be blocked; a missing response does not prove the host is absent.", source: "syr0"
    },
    {
      id: "memcached-version", category: "Enumeration", title: "Memcached: inspect TCP service identity",
      tags: ["memcached", "memcached-cli", "nc", "printf", "11211"],
      description: "Request the version from a known Memcached TCP endpoint without reading cached application data.",
      commands: ["printf 'version\\r\\nquit\\r\\n' | nc -w 3 <TARGET_IP> 11211"],
      flags: ["printf emits the version and quit protocol lines with CRLF endings.", "| sends the request to nc; nc -w 3 limits the connection's timeout to three seconds. 11211 is the selected TCP port."],
      steps: ["Confirm that the service actually speaks the Memcached text protocol.", "Use the interactive client's documentation only if further access is authorized."],
      caution: "Do not enumerate cached secrets or use UDP amplification tests. SASL-enabled or binary-only services may reject this text query.", source: "syr0"
    },
    {
      id: "ping-one-host", category: "Enumeration", title: "ping: bounded Linux reachability check",
      tags: ["ping", "ICMP"], aliases: ["ICMP reachability"],
      description: "Send a small number of ICMP echo requests to a selected host.",
      commands: ["ping -c 3 -W 2 <TARGET_IP>"],
      flags: ["Linux ping -c 3 sends three requests; -W 2 waits up to two seconds for each reply."],
      steps: ["Compare the result with an explicit TCP connectivity check.", "Use Windows ping's own switches rather than copying Linux flags."],
      caution: "Filtered ICMP is common; no echo reply does not establish that a host is down.", source: "syr0"
    },
    {
      id: "kerberos-cache", category: "Active Directory", title: "Kerberos: request and inspect your own ticket cache",
      tags: ["kinit", "klist", "Kerberos"], aliases: ["Kerberos ticket cache", "clock skew"],
      description: "Authenticate as your own authorized principal and inspect the current MIT Kerberos cache.",
      commands: ["kinit '<USER>@<REALM>'", "klist"],
      flags: ["kinit takes the Kerberos principal and prompts for its password.", "klist without flags lists the default credential cache and ticket expiry times."],
      steps: ["Confirm DNS, realm configuration, and clock synchronization first.", "Keep the cache private and use the intended account, not an impersonated identity."],
      caution: "Tickets are credentials. This is not ticket forging or delegation abuse; do not export caches publicly.", source: "syr0"
    },
    {
      id: "clock-inspection", category: "Active Directory", title: "Time: inspect local clock and a selected NTP server",
      tags: ["date", "timedatectl", "ntpdate", "time"], aliases: ["Kerberos time mismatch"],
      description: "Diagnose clock differences without changing the workstation's time or disabling synchronization.",
      commands: ["date -u", "timedatectl status", "ntpdate -q <DC_IP>"],
      flags: ["date -u displays UTC.", "timedatectl status displays system time and synchronization state.", "ntpdate -q queries the chosen server without setting the clock; the legacy client must be installed separately."],
      steps: ["Compare local UTC with a trusted service's time.", "Resolve clock skew using your approved time configuration rather than repeatedly forcing the clock."],
      caution: "An AD domain controller need not accept NTP queries. These utilities and flags are Linux-specific.", source: "syr0"
    },
    {
      id: "impacket-tgt", category: "Active Directory", title: "Impacket getTGT: request your own TGT",
      tags: ["impacket", "impacket-getTGT", "getTGT", "Kerberos"],
      description: "Request a ticket-granting ticket with one known account, letting the client prompt for the password.",
      commands: ["impacket-getTGT -dc-ip <DC_IP> '<DOMAIN>/<USER>'"],
      flags: ["-dc-ip selects the domain controller; DOMAIN/USER identifies the principal.", "Omitting a password from the identity string requests an interactive password prompt."],
      steps: ["Verify realm, time, and DNS before authenticating.", "Keep the generated cache private and record its expiry."],
      caution: "Distribution executable names differ. This template does not forge tickets or impersonate other accounts.", source: "impacket"
    },
    {
      id: "impacket-service-ticket", category: "Active Directory", title: "Impacket getST: request a service ticket for your account",
      tags: ["impacket", "impacket-getST", "getST", "SPN"],
      description: "Request a normal service ticket for an explicitly chosen SPN using the authenticated account.",
      commands: ["impacket-getST -dc-ip <DC_IP> -spn '<SPN>' '<DOMAIN>/<USER>'"],
      flags: ["-dc-ip selects the controller; -spn selects the service principal name.", "DOMAIN/USER selects the account and prompts for its password when omitted from the identity."],
      steps: ["Confirm the exact service principal and account permissions.", "Verify the resulting ticket's identity and service before use."],
      caution: "No impersonation, forced forwarding, or delegation-abuse switches are included. Check your installed Impacket version.", source: "impacket"
    },
    {
      id: "ticket-conversion", category: "Active Directory", title: "Impacket ticketConverter: convert an authorized local cache",
      tags: ["impacket", "impacket-ticketConverter", "ticketConverter", "ccache", "kirbi"],
      description: "Convert an existing authorized ticket file between supported cache representations locally.",
      commands: ["impacket-ticketConverter <INPUT_TICKET> <OUTPUT_TICKET>"],
      flags: ["The two positional arguments are the input ticket file and output file; the client determines the supported format conversion."],
      steps: ["Work on a copy and verify the source ticket's provenance.", "Check the output format required by the consuming client."],
      caution: "Conversion does not grant permissions or change ticket ownership. Both files remain sensitive credential material.", source: "impacket"
    },
    {
      id: "impacket-rpc-info", category: "Enumeration", title: "Impacket rpcdump / samrdump: scoped RPC information",
      tags: ["impacket", "impacket-rpcdump", "impacket-samrdump", "rpcdump", "samrdump"],
      description: "Inspect one host's registered RPC endpoints or account metadata with a known authorized identity.",
      commands: ["impacket-rpcdump '<DOMAIN>/<USER>@<TARGET_IP>'", "impacket-samrdump '<DOMAIN>/<USER>@<TARGET_IP>'"],
      flags: ["DOMAIN/USER@HOST is the identity/target syntax; the password is prompted when omitted.", "rpcdump lists endpoint-mapper registrations; samrdump requests account metadata, not password hashes."],
      steps: ["Confirm which RPC transport and endpoint are reachable.", "Correlate account metadata with existing domain enumeration."],
      caution: "Enumeration can be denied by policy. Do not confuse SAMR metadata queries with secretsdump credential extraction.", source: "impacket"
    },
    {
      id: "impacket-sid-lookup", category: "Enumeration", title: "Impacket lookupsid: resolve security identifiers",
      tags: ["impacket", "impacket-lookupsid", "lookupsid", "SID"],
      description: "Resolve account names from a selected host's security identifier namespace.",
      commands: ["impacket-lookupsid '<DOMAIN>/<USER>@<TARGET_IP>' 1200"],
      flags: ["DOMAIN/USER@HOST supplies the authorized identity and destination.", "1200 is the upper RID enumeration bound; it is not a TCP port or guarantee of complete account coverage."],
      steps: ["Confirm that SID enumeration is permitted and use a bounded RID range.", "Compare resolved names with LDAP or RPC account results."],
      caution: "This produces multiple RPC lookups. Keep the bound small and do not assume unresolved RIDs are unused.", source: "impacket"
    },
    {
      id: "cadaver-directory", category: "File transfers and shells", title: "cadaver: inspect a permitted WebDAV directory",
      tags: ["cadaver", "WebDAV"],
      description: "Open a known WebDAV collection and inspect its directory using the interactive client.",
      commands: ["cadaver https://<TARGET_IP>/<WEBDAV_PATH>/", "pwd\nls\nquit"],
      flags: ["cadaver takes a collection URL; the second block consists of interactive client commands.", "pwd shows the current collection, ls lists it, and quit closes the session."],
      steps: ["Verify the TLS certificate and authenticate when prompted.", "Limit reads or later transfers to explicitly permitted files."],
      caution: "The interactive block does not belong in your system shell. Uploads and overwrites are intentionally not the default.", source: "syr0"
    },
    {
      id: "wfuzz-paths", category: "Web testing", title: "Wfuzz: bounded web path discovery",
      tags: ["wfuzz", "web", "discovery"], aliases: ["web path fuzzing"],
      description: "Compare a small approved wordlist against one explicit HTTP path position.",
      commands: ["wfuzz -t 2 -w <WORDLIST> --hc 404 -u 'http://<TARGET_IP>/FUZZ'"],
      flags: ["-t 2 uses two concurrent workers; -w supplies the wordlist.", "--hc 404 hides responses with status 404; -u supplies the URL, where FUZZ marks the replacement position."],
      steps: ["Inspect a baseline missing-path response before choosing filters.", "Stop if the target shows rate limits or instability."],
      caution: "Concurrency is not a requests-per-second limit. This template does not fuzz login credentials or exploit injection points.", source: "syr0"
    },
    {
      id: "whatweb-fingerprint", category: "Web testing", title: "WhatWeb: low-aggression technology identification",
      tags: ["whatweb", "HTTP", "fingerprint"],
      description: "Identify apparent web technologies on one selected application without increasing aggression.",
      commands: ["whatweb --aggression 1 'http://<TARGET_IP>/'"],
      flags: ["--aggression 1 uses the tool's least aggressive recognition level; the URL selects the target."],
      steps: ["Compare detected products with HTTP headers and visible pages.", "Treat version strings as hypotheses until corroborated."],
      caution: "Fingerprinting is not a vulnerability proof or an exam-permission statement.", source: "syr0"
    },
    {
      id: "wpscan-passive", category: "Web testing", title: "WPScan: passive WordPress identification",
      tags: ["wpscan", "WordPress"],
      description: "Inspect a known WordPress site with passive component detection and no password testing.",
      commands: ["wpscan --url 'http://<TARGET_IP>/' --detection-mode passive"],
      flags: ["--url selects the application; adjust the template to its verified canonical hostname and installation subdirectory.", "--detection-mode passive controls component detection, not all network activity. Empty component results are not proof of absence."],
      steps: ["Confirm WordPress and the correct base URL before using the tool; inspect redirects for scope.", "Compare component results with assets referenced by public pages.", "Inspect inherited configuration and WPSCAN_API_TOKEN before use; an API token may be loaded without a command-line option."],
      caution: "Do not add password lists or assume automated exploitation is allowed. API access and database updates can contact external services; review rules and privacy separately.", source: "wpscan_docs"
    },
    {
      id: "mongodb-context", category: "Enumeration", title: "MongoDB / mongosh: inspect your connection context",
      tags: ["mongosh", "mongo", "MongoDB", "27017"],
      description: "Connect to an authorized MongoDB database and inspect identity/context without changing documents.",
      commands: ["mongosh 'mongodb://<TARGET_IP>:<PORT>/<DATABASE>' --username '<USER>' --authenticationDatabase '<AUTH_DATABASE>'", "db.getName()\ndb.runCommand({ connectionStatus: 1 })\nshow collections"],
      flags: ["--username selects the account and prompts for a password; --authenticationDatabase selects where that account is defined.", "The URI supplies the host, port, and working database. The second block belongs in mongosh, not the system shell."],
      steps: ["Select the correct authentication database and TLS configuration.", "Review the current identity and visible collection names before scoped reads."],
      caution: "mongosh replaces the legacy mongo client. Do not reset users, expose credential hashes, or dump collections by default.", source: "syr0"
    },
    {
      id: "redis-context", category: "Enumeration", title: "Redis: authenticate and inspect server context",
      tags: ["redis-cli", "Redis", "6379"],
      description: "Use an approved Redis account to query server identity without altering keys or configuration.",
      commands: ["redis-cli -h <TARGET_IP> -p <PORT> --user '<USER>' --askpass PING", "redis-cli -h <TARGET_IP> -p <PORT> --user '<USER>' --askpass INFO server"],
      flags: ["-h selects the server; -p selects the port; --user selects the Redis ACL user.", "--askpass prompts for the password; PING checks the connection and INFO server requests server metadata."],
      steps: ["Check ACL and TLS requirements before connecting.", "Limit later key reads to explicitly authorized names."],
      caution: "These are Redis 6+ client options. Do not use FLUSHALL, module loading, SSH-key writes, or configuration changes; plaintext connections need a trusted lab network or approved tunnel.", source: "syr0"
    },
    {
      id: "sqlite-readonly", category: "Enumeration", title: "SQLite: inspect a local database read-only",
      tags: ["sqlite3", "SQLite"],
      description: "Open a permitted local database without allowing database writes.",
      commands: ["sqlite3 -readonly <DATABASE_FILE>", ".databases\n.tables\n.schema <TABLE>\n.quit"],
      flags: ["-readonly opens the database read-only; DATABASE_FILE supplies the local path.", "The second block contains sqlite3 dot commands for database, table, and schema metadata, then exit."],
      steps: ["Work from an authorized copy, not a live application's database file.", "Review schema before reading specific rows."],
      caution: "Read-only does not make application data public. Do not expose confidential rows or assume a copied SQLite file includes all WAL changes.", source: "syr0"
    },
    {
      id: "sqsh-context", category: "Enumeration", title: "sqsh: inspect an authorized SQL Server session",
      tags: ["sqsh", "MSSQL"],
      description: "Connect with a known SQL Server account and inspect session identity.",
      commands: ["sqsh -S <TARGET_IP> -U '<USER>'", "SELECT SYSTEM_USER, DB_NAME();\ngo"],
      flags: ["-S selects the server or configured FreeTDS server name; -U selects the user and prompts for a password.", "The second block is SQL inside sqsh; go submits the current query batch."],
      steps: ["Confirm the configured server port and authentication mode.", "Review database context before scoped metadata queries."],
      caution: "Do not enable xp_cmdshell, execute operating-system commands, or force outbound authentication. TLS is configured separately in the client stack.", source: "syr0"
    },
    {
      id: "tmux-notes", category: "Evidence and reporting", title: "tmux: organize and capture a local terminal pane",
      tags: ["tmux", "terminal", "session"],
      description: "Keep your own preparation terminals organized and capture a bounded portion of local pane output.",
      commands: ["tmux new-session -s prep", "tmux list-sessions", "tmux capture-pane -p -S -100 -t <PANE> > <OUTPUT_FILE>"],
      flags: ["new-session -s names a session; list-sessions lists sessions on the local tmux server.", "capture-pane -p prints pane text; -S -100 starts 100 history lines back; -t selects the pane. > writes and replaces OUTPUT_FILE."],
      steps: ["Use Ctrl+B then D to detach; verify the selected pane before capture.", "Review captured output for credentials or exam information before sharing."],
      caution: "Local captures are not substitutes for required proof screenshots. Keep output private and avoid overwriting useful notes.", source: "syr0"
    },
    {
      id: "python-env-prep", category: "Tool notes and restricted features", title: "uv / virtualenv: prepare an isolated local environment",
      tags: ["uv", "virtualenv", "python", "pip"],
      description: "Create a local Python environment before the exam without installing or executing unreviewed scripts.",
      commands: ["uv venv <ENV_DIRECTORY>", "python3 -m virtualenv <ENV_DIRECTORY>"],
      flags: ["uv venv creates an environment at the positional directory.", "python3 -m virtualenv runs the installed virtualenv module; the directory is its destination. These are alternatives, not two required steps."],
      steps: ["Choose one environment tool and pin dependencies from reviewed manifests.", "Review script behavior before running it, and test your offline setup during preparation."],
      caution: "These commands require the selected environment utility to be installed already. Do not download and run arbitrary exploit dependencies during the exam.", source: "syr0"
    },
    {
      id: "virtualbox-inspect", category: "Tool notes and restricted features", title: "VirtualBox: inspect your local lab VM configuration",
      tags: ["VBoxManage", "VirtualBox"],
      description: "List local virtual machines and inspect a selected VM without changing its networking or guest settings.",
      commands: ["VBoxManage list vms", "VBoxManage showvminfo '<VM_NAME>'"],
      flags: ["list vms lists registered machines; showvminfo displays the named VM's configuration."],
      steps: ["Confirm the VM's lab network attachment before connecting to targets.", "Keep clipboard and shared-folder behavior consistent with your exam requirements."],
      caution: "This reference does not terminate guest processes or enable sharing automatically.", source: "syr0"
    },
    {
      id: "cewl-wordlist", category: "Password auditing", title: "CeWL: build a small preparation wordlist from a permitted page",
      tags: ["cewl", "wordlist"],
      description: "Extract words from one authorized page without recursively crawling the site.",
      commands: ["cewl -d 0 -m 6 -w <OUTPUT_FILE> 'http://<TARGET_IP>/<PATH>'"],
      flags: ["-d 0 disables link-depth recursion; -m 6 keeps words at least six characters long.", "-w writes the resulting wordlist to the named file; the URL selects the page."],
      steps: ["Use only a page you are allowed to retrieve and analyze.", "Review the generated words locally before any separately authorized audit."],
      caution: "This prepares a wordlist, not a credential attack. Do not harvest personal information or send the output to online cracking services.", source: "syr0"
    },
    {
      id: "crunch-small-list", category: "Password auditing", title: "crunch: generate a deliberately small local wordlist",
      tags: ["crunch", "wordlist"],
      description: "Generate a bounded toy wordlist locally to understand candidate-space size.",
      commands: ["crunch 2 3 ab12 -o <OUTPUT_FILE>"],
      flags: ["2 and 3 are the minimum and maximum lengths; ab12 is the four-character alphabet.", "-o names the output file. This example produces 4^2 + 4^3 = 80 candidates."],
      steps: ["Calculate the candidate count before increasing length or alphabet size.", "Keep generated lists separate from real credentials and exam records."],
      caution: "Large Cartesian products can exhaust disk space. Generation alone does not authorize password guessing.", source: "syr0"
    },
    {
      id: "username-anarchy-prep", category: "Password auditing", title: "Username Anarchy: generate candidate account spellings",
      tags: ["username-anarchy", "username", "wordlist"],
      description: "Generate name variants from an approved local preparation list without authenticating to a service.",
      commands: ["username-anarchy -i <NAME_FILE> -f first,first.last,flast"],
      flags: ["-i selects the input names file; -f selects the comma-separated output naming formats."],
      steps: ["Check the file's expected name format against the installed release.", "Treat generated names as candidates, not confirmed accounts."],
      caution: "This is local list preparation. Do not collect personal information or turn it into an unapproved enumeration or spraying campaign.", source: "syr0"
    },
    {
      id: "fcrackzip-local", category: "Password auditing", title: "fcrackzip: audit a permitted ZIP copy offline",
      tags: ["fcrackzip", "fcrack", "ZIP"], aliases: ["ZIP password audit"],
      description: "Test a bounded approved wordlist against a local ZIP archive you are authorized to audit.",
      commands: ["fcrackzip -D -p <WORDLIST> -u <ZIP_FILE>"],
      flags: ["-D selects dictionary mode; in that mode -p names the wordlist rather than a literal password.", "-u verifies candidates using unzip; ZIP_FILE is the archive path."],
      steps: ["Work on a copy and confirm that the archive's encryption is supported.", "Stop if the tool cannot verify a candidate and compare a supported offline alternative."],
      caution: "The external unzip utility is needed for -u verification. Do not upload archives or recovered passwords to third parties.", source: "syr0"
    },
    {
      id: "smb-account-password", category: "Active Directory", title: "smbpasswd: change your own authorized account password",
      tags: ["smbpasswd", "Samba"],
      description: "Use the interactive client to change only the selected account's password when a password change is explicitly permitted.",
      commands: ["smbpasswd -r <TARGET_IP> -U '<USER>'"],
      flags: ["-r selects the remote server; -U selects the account. Passwords are entered interactively, not placed in the command line."],
      steps: ["Confirm authorization for a state-changing password operation and its effect on active sessions.", "Use this only for your own designated account; record the approved change privately."],
      caution: "This changes authentication state and may disrupt services. It is not an enumeration command or an administrator password-reset recipe.", source: "syr0"
    },
    {
      id: "windows-access-review", category: "Windows privilege escalation", title: "AccessChk: inspect a selected file's access",
      tags: ["accesschk", "Sysinternals"],
      description: "Display permissions on one chosen Windows path with a known local account.",
      commands: ['accesschk.exe -v "<USER>" "<WINDOWS_PATH>"'],
      flags: ["-v requests verbose access details; the positional account and path select whose access is checked and what is inspected."],
      steps: ["Accept the Sysinternals license during preparation if required.", "Compare the reported effective access with icacls and the service account context."],
      caution: "Do not use recursive scans or modify permissions by default. Executable naming and permission interpretation depend on the installed version.", source: "syr0"
    },
    {
      id: "powershell-local-files", category: "Evidence and reporting", title: "PowerShell: inspect local files, modules, and version",
      tags: ["powershell", "Get-ChildItem", "Get-Module", "Get-FileHash"],
      description: "Inspect your local environment and calculate a file hash without bypassing execution policy.",
      commands: ["$PSVersionTable\nGet-Module -ListAvailable\nGet-ChildItem -LiteralPath '<WINDOWS_PATH>' -Force\nGet-FileHash -LiteralPath '<WINDOWS_FILE>' -Algorithm SHA256"],
      flags: ["Get-Module -ListAvailable lists installed discoverable modules, not just loaded modules.", "-LiteralPath treats a path literally; Get-ChildItem -Force includes hidden items. Get-FileHash -Algorithm SHA256 chooses the digest algorithm."],
      steps: ["Use the current PowerShell session to run this block.", "Compare the file hash with a trusted published digest before any execution."],
      caution: "No policy bypass, download-and-execute, reflection, or elevated-process creation is included.", source: "powershell"
    }
  ];
  sourceCommandCards.push(
    {
      id: "nxc-ssh-check", category: "Enumeration", title: "NetExec / nxc: one SSH authentication check",
      tags: ["nxc", "SSH"],
      description: "Check one selected SSH account without requesting remote command execution or file transfers.",
      commands: ["nxc ssh <TARGET_IP> -u '<USER>' -p '<PASSWORD>'"],
      flags: ["ssh selects the protocol; -u selects one username and -p one password. No command-execution or file-transfer flag is supplied."],
      steps: ["Confirm credential-testing permission and the destination host.", "Compare the result with an interactive SSH client if needed."],
      caution: "One failure can still count toward a lockout. Use a single designated account, never username/password list files; CLI passwords can appear in process listings.", source: "nxc"
    },
    {
      id: "nxc-ftp-list", category: "Enumeration", title: "NetExec / nxc: inspect an FTP login directory",
      tags: ["nxc", "FTP", "21"],
      description: "Authenticate as one approved FTP account and list the login directory without transferring files.",
      commands: ["nxc ftp <TARGET_IP> -u '<USER>' -p '<PASSWORD>' --ls"],
      flags: ["ftp selects the protocol; -u and -p provide one account.", "--ls lists the current directory; it does not upload or download files."],
      steps: ["Verify the account and directory scope before connecting.", "Use an interactive client for any separately permitted specific-file transfer."],
      caution: "FTP can send credentials in plaintext. Use only a trusted lab connection or approved tunnel; no broad file harvesting is included.", source: "nxc"
    },
    {
      id: "nxc-nfs-list", category: "Enumeration", title: "NetExec / nxc: list NFS exports",
      tags: ["nxc", "NFS", "2049"],
      description: "Request advertised export information from one NFS endpoint without mounting or modifying files.",
      commands: ["nxc nfs <TARGET_IP> --shares"],
      flags: ["nfs selects the protocol; --shares lists available exports in releases supporting this NFS client."],
      steps: ["Confirm that your installed NetExec release actually provides the nfs protocol and this option.", "Compare exports with showmount and check the allowed client addresses."],
      caution: "Do not add filesystem escape, password-file writes, or account-creation operations. Export visibility is not permission to read every file.", source: "nxc"
    },
    {
      id: "nxc-mssql-context", category: "Enumeration", title: "NetExec / nxc: read SQL Server connection context",
      tags: ["nxc", "MSSQL", "1433"],
      description: "Use a designated SQL Server account to read identity and database context only.",
      commands: ["nxc mssql <TARGET_IP> --local-auth -u '<USER>' -p '<PASSWORD>' -q 'SELECT SYSTEM_USER, DB_NAME();'"],
      flags: ["mssql selects SQL Server; --local-auth chooses server-local SQL authentication rather than domain authentication.", "-u and -p select one account; -q submits the quoted read-only SQL query. This is not -x operating-system command execution."],
      steps: ["Select the correct authentication type; use an appropriate domain configuration instead if the account is not server-local.", "Confirm the returned identity and database before any separately scoped query."],
      caution: "Do not enable command execution, run privilege modules, modify server configuration, or force outbound authentication.", source: "nxc"
    }
  );
  cards.push(
    {
      id: "source-web-techniques", category: "Web testing", title: "Source web techniques: choose a minimal manual investigation",
      tags: ["web-techniques", "XSS", "LFI", "SSRF", "SSTI", "XXE", "NoSQL", "WordPress"],
      aliases: ["cross-site scripting", "local file inclusion", "server-side request forgery", "server-side template injection", "XML external entity", "SQL truncation", "upload filter", "PDF PHP inclusion", "deserialization"],
      description: "Distinguish the source's input-handling techniques before choosing a small, authorized, non-destructive test.",
      commands: [],
      steps: ["XSS: determine the output context and encoding; do not collect cookies or use another user's session.",
        "LFI and upload handling: map normalization, allowed locations, file types, and execution behavior; do not deploy a web shell.",
        "SSRF: establish the URL-fetch boundary using only a controlled, authorized destination; do not pivot into unapproved internal services.",
        "SSTI and deserialization: identify the actual engine and dependency versions; do not generate executable gadget chains by default.",
        "XXE: inspect parser configuration with controlled benign documents; do not exfiltrate files or query unapproved endpoints.",
        "SQL/NoSQL and truncation: identify query construction, data types, and length constraints without resetting users or dumping databases."],
      caution: "This is an original technique map, not a copied payload catalogue. A technique name is not proof that the application is vulnerable or that an automated test is permitted.",
      source: "syr0"
    },
    {
      id: "nxc-feature-boundaries", category: "Tool notes and restricted features", title: "NetExec / nxc: protocol and module boundaries",
      tags: ["nxc", "RDP", "WMI", "LDAP", "AD CS"],
      aliases: ["nxc rdp", "nxc wmi", "laps", "gMSA", "coerce_plus", "spider_plus", "mssql_priv", "NTDS", "password spraying"],
      description: "Review source-listed NetExec modules separately from the single-account metadata commands in this reference.",
      commands: [],
      steps: ["Inspect the installed protocol's own help and the chosen module before enabling it.",
        "Separate inventory from screenshots, remote execution, credential collection, directory changes, and broad filesystem searches.",
        "Do not use coercion, spraying, automated escalation, or account/file modifications merely because a module is available."],
      caution: "No automatic module chain is supplied. Scope, installed release, feature behavior, and current exam rules must all be checked independently.",
      source: "nxc"
    }
  );
  tools["web-techniques"] = "Manual web technique review";
  const sourceMethods = [
    ["cyberchef", "CyberChef", "https://github.com/gchq/CyberChef", "Transform encodings and inspect non-sensitive sample data using a reviewed local build.", "Prepare an offline build and a small explicit recipe; verify each transformation rather than treating output as decryption proof."],
    ["swaks", "Swaks", "https://github.com/jetmore/swaks", "Review SMTP capability and authentication testing for one authorized mail server.", "Choose a non-delivery protocol check first; confirm recipient scope before sending any message."],
    ["sparta", "Sparta", "https://github.com/SECFORCE/sparta", "Review an older graphical reconnaissance orchestrator and the subprocesses it can start.", "Inspect its actual scan and brute-force actions before enabling any workflow; prefer explicit manual clients."],
    ["fpmvuln", "fpmvuln", "https://github.com/hannob/fpmvuln", "Research PHP-FPM vulnerability checks and their affected configurations.", "Verify the exact server configuration against vendor advisories; do not run a remote exploitation probe by default."],
    ["jwt", "JSON Web Tokens", "https://jwt.io", "Inspect JWT structure and distinguish decoding claims from verifying a signature.", "Use an offline decoder on a test token; check issuer, audience, algorithm, and expiry without modifying live authentication."],
    ["jwt_tool", "JWT_Tool", "https://github.com/ticarpi/jwt_tool", "Review JWT inspection and attack-testing features separately.", "Use local inspection only until token mutation or attack testing is explicitly authorized."],
    ["jwtlens", "JWTLens", "https://jwtlens.netlify.app", "Recognize the source's online JWT inspection reference without sending tokens there.", "Do not paste authentication tokens into hosted tools; use an audited offline alternative."],
    ["leaky-paths", "Leaky Paths", "https://github.com/ayoubfathi/leaky-paths", "Review a path-discovery reference and its request volume before use.", "Extract only a small approved path list for manual discovery; confirm the specific release's behavior."],
    ["payloadsallthethings", "PayloadsAllTheThings", "https://github.com/swisskyrepo/PayloadsAllTheThings", "Use a technique reference to understand prerequisites, not as an automatically runnable payload library.", "Check application context and documentation; do not import full payload chapters or unreviewed exploit scripts."],
    ["php-filter-chain-generator", "PHP Filter Chain Generator", "https://github.com/synacktiv/php_filter_chain_generator", "Understand how PHP stream filters can affect inclusion behavior.", "Review the inclusion primitive and mitigation first; executable filter chains are not provided here."],
    ["phpggc", "PHPGGC", "https://github.com/ambionics/phpggc", "Research PHP deserialization gadget compatibility and affected dependencies.", "Compare actual package versions and reachable deserialization paths; do not generate executable gadget payloads by default."],
    ["spose", "Spose", "https://github.com/aancw/spose", "Review proxy-assisted service discovery and its destination scope.", "Confirm proxy permissions and an explicit destination list before any scan."],
    ["wpprobe", "WPProbe", "https://github.com/Chocapikk/wpprobe", "Review WordPress detection and vulnerability-probing features separately.", "Verify which probes the installed scan mode sends before use; no automatic exploit workflow is imported."],
    ["gittools", "GitTools", "https://github.com/internetwache/GitTools", "Review recovery of a legitimately accessible Git repository and the sensitivity of recovered history.", "Confirm ownership and scope of any exposed repository; inspect a permitted local copy using Git rather than automatically dumping a site."],
    ["redis-modules", "RedisModules-ExecuteCommand", "https://github.com/n0b0dyCN/RedisModules-ExecuteCommand", "Recognize Redis module loading as an execution-capable feature rather than a harmless metadata query.", "Check server configuration and module policy; no module-upload or command-execution recipe is included."],
    ["redis-rce", "Redis RCE", "https://github.com/Ridter/redis-rce", "Identify an execution-oriented Redis toolkit listed by the source.", "Research the required replication and privilege conditions without launching the toolkit."],
    ["redis-rogue-server", "Redis Rogue Server", "https://github.com/n0b0dyCN/redis-rogue-server", "Recognize rogue replication-server techniques and their state-changing impact.", "Review vendor hardening and scope; no rogue-server execution chain is supplied."],
    ["sqli-reference", "SQL injection reference", "https://tib3rius.com/sqli.html", "Compare SQL dialects and query contexts during manual analysis.", "Start from an observed request and document a minimal non-destructive test; do not paste a full injection catalogue."],
    ["defaultcreds", "Default Credentials reference", "https://github.com/ihebski/DefaultCreds-cheat-sheet", "Research documented default-account practices for a specifically identified product.", "Verify vendor documentation and explicit authentication-testing permission; lists are not confirmed working credentials."],
    ["firefox-decrypt", "Firefox Decrypt", "https://github.com/unode/firefox_decrypt", "Review local browser-profile credential extraction as a sensitive-data operation.", "Use only an explicitly authorized profile copy and protect recovered material; extraction commands are omitted."],
    ["keepass-dump-masterkey", "KeePass master-key research", "https://github.com/CMEPW/keepass-dump-masterkey", "Research version-specific memory exposure in KeePass.", "Confirm affected versions and approved memory-artifact access; do not collect another user's process memory."],
    ["keepwn", "KeePwn", "https://github.com/Orange-Cyberdefense/KeePwn", "Review KeePass-related assessment features and data sensitivity.", "Inspect each subcommand's local or remote actions before use; protect databases and credential output."],
    ["lazagne", "LaZagne", "https://github.com/AlessandroZ/LaZagne", "Recognize application-secret recovery across local software profiles.", "Review authorized artifact access and collection breadth; do not run blanket credential harvesting."],
    ["ntlm.pw", "ntlm.pw", "https://ntlm.pw", "Recognize an online hash lookup service listed in the source.", "Do not upload password hashes or exam material; use approved local offline auditing instead."],
    ["pypykatz", "pypykatz", "https://github.com/skelsec/pypykatz", "Review parsing of Windows credential-bearing memory artifacts.", "Limit analysis to an authorized offline artifact and keep its results private; memory-collection recipes are not supplied."],
    ["donpapi", "DonPAPI", "https://github.com/login-securite/DonPAPI", "Review DPAPI-related collection and the difference between local artifact analysis and remote harvesting.", "Confirm the account, host scope, and every collection module before use; no mass remote extraction chain is provided."],
    ["gpp-decrypt", "gpp-decrypt", "https://www.kali.org/tools/gpp-decrypt/", "Understand legacy Group Policy Preferences cpassword exposure in an authorized XML copy.", "Verify the artifact's provenance and the affected policy; treat any recovered password as a secret."],
    ["cupp", "CUPP", "https://github.com/Mebus/cupp", "Review interactive password-candidate generation without collecting personal information.", "Use fictional preparation inputs and bound the output; list generation does not authorize credential guessing."],
    ["spray-passwords", "Spray-Passwords", sourceReference + "#spray-passwords", "Recognize password spraying as repeated authentication that can lock accounts.", "Check per-account and fine-grained lockout policies first; the source's spraying script is not imported."],
    ["adcskiller", "ADCSKiller", "https://github.com/grimlockx/ADCSKiller", "Recognize automated AD CS exploitation orchestration.", "Keep this method-only reference separate from manual certificate inventory; do not treat automated chains as exam-approved."],
    ["adcstemplate", "ADCSTemplate", "https://github.com/GoateePFE/ADCSTemplate", "Review certificate-template inspection versus creating or modifying templates.", "Inspect approved existing policy and permissions; do not introduce templates or change enrollment settings by default."],
    ["adminer-ad", "ADMiner", "https://github.com/Mazars-Tech/AD_Miner", "Review offline analysis of directory graph data and the provenance of findings.", "Use an authorized graph export and verify proposed paths manually rather than executing them automatically."],
    ["adpeas", "adPEAS", "https://github.com/ajm4n/adPEAS", "Review automated Active Directory reconnaissance and included credential checks.", "Inspect the module list and network actions before collection; limit to explicitly approved read-only features."],
    ["bloodhound-docker", "BloodHound Docker", "https://github.com/belane/docker-bloodhound", "Review a local graph-analysis deployment separately from network collection.", "Prepare and secure the local service before the exam; never expose credential-bearing graph imports publicly."],
    ["bloodhound-legacy", "BloodHound-Legacy", "https://github.com/SpecterOps/BloodHound-Legacy", "Distinguish legacy graph schemas and collectors from current Community Edition.", "Match the collector and server schema; do not assume a legacy command is valid for current releases."],
    ["bloodhound-legacy-collectors", "BloodHound legacy collectors", "https://github.com/SpecterOps/BloodHound-Legacy/tree/master/Collectors", "Review collection methods and compatibility for a legacy BloodHound deployment.", "Select explicit directory-only methods and avoid unapproved session collection or broad sweeps."],
    ["bloodhound-quickwin", "bloodhound-quickwin", "https://github.com/kaluche/bloodhound-quickwin", "Review graph-derived assessment shortcuts without treating them as validated attack paths.", "Confirm permissions and prerequisites against the underlying directory data; automatic actions are not included."],
    ["bloodyad", "bloodyAD", "https://github.com/CravateRouge/bloodyAD", "Distinguish LDAP reads from account, group, owner, and permission changes.", "Review exact object scope and rights before any operation; directory-modification chains are omitted."],
    ["cable", "Cable", "https://github.com/logangoins/Cable", "Locate the AD assessment project named in the source; detailed release behavior requires separate review.", "Read the project's own feature list and identify state-changing actions before considering use."],
    ["certify", "Certify", "https://github.com/GhostPack/Certify", "Review AD CS policy enumeration separately from requesting or abusing certificates.", "Inspect approved CA/template metadata first and verify the specific installed CLI version."],
    ["certipy", "Certipy", "https://github.com/ly4k/Certipy", "Review certificate-services discovery, enrollment, authentication, and relay as distinct features.", "Use scoped inventory only after checking the release documentation; relay and impersonation chains are excluded."],
    ["certipy-merged", "certipy-merged", "https://github.com/zimedev/certipy-merged", "Recognize a fork whose CLI and feature set can differ from upstream Certipy.", "Compare the exact fork and release before using any syntax; do not transfer assumptions between versions."],
    ["ad-attack-reference", "Active Directory technique reference", "https://github.com/drak3hft7/Cheat-Sheet---Active-Directory", "Use an AD reference to understand rights and prerequisites.", "Verify each technique against the current environment and exam rules; no external attack chapter is copied."],
    ["ghostpack-binaries", "GhostPack compiled binaries", "https://github.com/r3motecontrol/Ghostpack-CompiledBinaries", "Review the provenance and build version of third-party compiled assessment tools.", "Prefer verified official source builds and hashes; do not execute unknown binaries merely because they are listed."],
    ["gopacket", "gopacket", "https://github.com/mandiant/gopacket", "Recognize a Go packet-processing library rather than a ready-made terminal client.", "Review an application's capture permissions and behavior separately; there is no generic gopacket shell command."],
    ["gtfobins", "GTFOBins", "https://gtfobins.github.io", "Research binary capabilities and privilege prerequisites without assuming any installed binary grants escalation.", "Check effective identity, sudo policy, capabilities, and file permissions before testing a documented behavior."],
    ["impacket-static", "Impacket static binaries", "https://github.com/ropnop/impacket_static_binaries", "Distinguish third-party bundled Impacket executables from the currently installed Python distribution.", "Verify provenance and version; the same filename does not guarantee matching flags or transport behavior."],
    ["jaws", "JAWS", "https://github.com/411Hall/JAWS", "Review a Windows enumeration script's file, registry, and process queries.", "Read the script before running it and limit output to approved local assessment information."],
    ["krbrelay", "KrbRelay", "https://github.com/cube0x0/KrbRelay", "Recognize Kerberos relay and coercion-sensitive behavior.", "Research preconditions and defenses only; no relay execution chain is included."],
    ["krbrelayup", "KrbRelayUp", "https://github.com/Dec0ne/KrbRelayUp", "Recognize an automated Kerberos relay escalation chain.", "Keep automated exploitation separate from manual directory review; no runnable chain is supplied."],
    ["krbrelayx", "krbrelayx", "https://github.com/dirkjanm/krbrelayx", "Review Kerberos relay tooling and accompanying authentication-coercion utilities.", "Identify each network and directory change before use; relay/coercion recipes are omitted."],
    ["lapsdumper", "LAPSDumper", "https://github.com/n00py/LAPSDumper", "Review retrieval of managed local-administrator passwords and the required directory permissions.", "Inspect authorized read access to one designated object; do not harvest passwords across the domain."],
    ["linux-exploit-suggester", "Linux Exploit Suggester / LES", "https://github.com/The-Z-Labs/linux-exploit-suggester", "Review kernel/package-based exploit suggestions as unconfirmed leads.", "Corroborate distribution backports and prerequisites against advisories; do not automatically execute suggested exploits."],
    ["linenum", "LinEnum", "https://github.com/rebootuser/LinEnum", "Review a Linux enumeration script and the breadth of local information it collects.", "Read the script and select permitted checks; protect captured configuration and user information."],
    ["moriarty", "Moriarty", "https://github.com/BC-SECURITY/Moriarty", "Review Windows vulnerability suggestions and their version-matching assumptions.", "Verify patches and affected components manually; suggestions are not proof of exploitability."],
    ["nanodump", "nanodump", "https://github.com/fortra/nanodump", "Recognize LSASS memory acquisition and sensitive credential artifacts.", "Limit discussion to authorized artifact handling and defenses; process-dump and bypass recipes are not provided."],
    ["outpacket", "Outpacket", "https://github.com/n00py/Outpacket", "Locate the authentication assessment project listed by the source and verify its actual features.", "Review the exact release and any collection or state-changing operations before considering use."],
    ["passthecert", "PassTheCert", "https://github.com/AlmondOffSec/PassTheCert", "Review certificate-based directory authentication separately from directory modifications.", "Confirm the certificate identity and mapping; no account or permission modification chain is included."],
    ["peass-ng", "PEASS-ng", "https://github.com/peass-ng/PEASS-ng", "Review the LinPEAS and WinPEAS collection suites and optional active checks.", "Choose approved local enumeration features only and read the current script or binary documentation first."],
    ["penelope", "Penelope", "https://github.com/brightio/penelope", "Review session-management automation and the commands it may send into a connected shell.", "Use only an existing authorized session and disable unreviewed automation; verify terminal and logging behavior."],
    ["pkinittools", "PKINITtools", "https://github.com/dirkjanm/PKINITtools", "Review certificate-based Kerberos ticket utilities and credential-sensitive output.", "Verify certificate identity, clock, and mapping; credential-extraction and impersonation chains are omitted."],
    ["powercat", "powercat", "https://github.com/besimorhino/powercat", "Review PowerShell connection handling and optional process execution.", "Separate a permitted connection check from shell or payload delivery; no download-and-execute snippet is included."],
    ["powersharppack", "PowerSharpPack", "https://github.com/S3cur3Th1sSh1t/PowerSharpPack", "Recognize wrappers that can invoke many compiled assessment tools inside PowerShell.", "Audit the actual wrapped binary and side effects; avoid blanket in-memory execution."],
    ["powerup", "PowerUp", "https://github.com/PowerShellMafia/PowerSploit/blob/master/Privesc/PowerUp.ps1", "Distinguish local configuration checks from built-in abuse functions.", "Inspect service and path permissions manually; do not run automatic abuse or configuration changes."],
    ["powerview", "PowerView", "https://github.com/PowerShellMafia/PowerSploit/blob/master/Recon/PowerView.ps1", "Review directory queries separately from account, ACL, and delegation changes.", "Scope read-only object queries and confirm naming/version differences before use."],
    ["powerview.py", "PowerView.py", "https://github.com/aniqfakhrul/powerview.py", "Recognize a Python implementation with its own authentication and LDAP command syntax.", "Compare the installed implementation with the PowerShell version; restrict operations to approved reads."],
    ["ppldump", "PPLdump", "https://github.com/itm4n/PPLdump", "Recognize protected-process memory collection and bypass-sensitive behavior.", "Use this as a defensive/feature reference only; bypass and credential-memory collection commands are excluded."],
    ["priv2admin", "Priv2Admin", "https://github.com/gtworek/Priv2Admin", "Research Windows privilege semantics without assuming token privileges are enabled or exploitable.", "Confirm the actual token, operating-system version, and prerequisites; no automatic escalation recipe is provided."],
    ["privesccheck", "PrivescCheck", "https://github.com/itm4n/PrivescCheck", "Review Windows configuration and vulnerability-check modules.", "Read the collection options and avoid sensitive or active checks without explicit scope."],
    ["pspkiaudit", "PSPKIAudit", "https://github.com/GhostPack/PSPKIAudit", "Review AD CS permission and policy audit data.", "Assess approved CA/template inventory manually and distinguish findings from certificate impersonation."],
    ["pspy", "pspy", "https://github.com/DominicBreuker/pspy", "Observe local process activity to understand scheduled jobs and service context.", "Keep observation bounded and protect command-line output that may contain secrets."],
    ["pth-toolkit", "pth-toolkit", "https://github.com/byt3bl33d3r/pth-toolkit", "Review legacy pass-the-hash clients and their protocol limitations.", "Use only an authorized account/hash and compare a maintained client; credential material and remote actions require explicit scope."],
    ["pwncat", "pwncat", "https://github.com/calebstewart/pwncat", "Review remote session management and optional persistence/escalation plugins.", "Limit to an existing authorized session and disable unreviewed automatic plugins; persistence commands are not supplied."],
    ["pywhisker", "pyWhisker", "https://github.com/ShutdownRepo/pywhisker", "Recognize key-credential attribute changes and shadow-credential implications.", "Review object ownership and permitted reads; no key insertion or impersonation chain is included."],
    ["runascs", "RunasCs", "https://github.com/antonioCoco/RunasCs", "Review running a process under an explicitly authorized Windows identity.", "Confirm logon type, account permission, and child-process behavior; no privilege-bypass or reverse-session recipe is included."],
    ["rusthound", "RustHound", "https://github.com/OPENCYBER-FR/RustHound", "Review Rust-based directory graph collection and schema compatibility.", "Confirm the collector version, methods, and target scope before collecting approved graph data."],
    ["rusthound-ce", "RustHound-CE", "https://github.com/g0h4n/RustHound-CE", "Review Community Edition graph collection and compatibility separately from legacy RustHound.", "Match server/collector schemas and use an explicit directory collection scope."],
    ["scavenger", "scavenger", "https://github.com/SpiderLabs/scavenger", "Review SMB file discovery and the risk of broad sensitive-document collection.", "Inspect one permitted share/path at a time; do not harvest all accessible files by default."],
    ["sharpadws", "SharpADWS", "https://github.com/wh0amitz/SharpADWS", "Review directory operations through Active Directory Web Services.", "Distinguish permitted metadata reads from object and permission changes; confirm the actual release documentation."],
    ["sharpcollection", "SharpCollection", "https://github.com/Flangvik/SharpCollection", "Review a third-party binary collection's provenance, hashes, and build age.", "Audit each selected tool independently and prefer reviewed source builds; no bundled binaries are imported."],
    ["sharpchromium", "SharpChromium", "https://github.com/djhohnstein/SharpChromium", "Recognize browser-profile data and credential extraction as sensitive operations.", "Use only an authorized offline artifact; do not collect another user's cookies or saved passwords."],
    ["sharpsuccessor", "SharpSuccessor", "https://github.com/logangoins/SharpSuccessor", "Research delegated managed-service-account escalation prerequisites.", "Verify applicable directory and server conditions against authoritative advisories; no dMSA abuse chain is supplied."],
    ["sharpview", "SharpView", "https://github.com/tevora-threat/SharpView", "Review compiled directory enumeration functions and their authentication requirements.", "Choose explicit object reads and verify feature equivalence instead of assuming every PowerView function is present."],
    ["sherlock", "Sherlock", "https://github.com/rasta-mouse/Sherlock", "Review older Windows missing-patch suggestions and their limitations.", "Corroborate patch state with vendor information; version-based suggestions alone do not establish vulnerability."],
    ["titanis", "Titanis", "https://github.com/trustedsec/Titanis", "Review an assessment framework whose SMB, WMI, Kerberos, and coercion features have different risk.", "Inspect the selected feature's exact network actions; coercion and impersonation chains are not imported."],
    ["wadcoms", "WADComs", "https://wadcoms.github.io", "Use a Windows/AD command reference to compare prerequisites and available account material.", "Verify the actual tool version and method permissions; reference presence is not exam approval."],
    ["watson", "Watson", "https://github.com/rasta-mouse/Watson", "Review Windows patch-based vulnerability suggestions.", "Confirm installed updates and affected components manually rather than launching suggested exploits."],
    ["wesng", "WES-NG", "https://github.com/bitsadmin/wesng", "Review offline Windows system-information matching against vulnerability data.", "Use an authorized local report and account for superseded updates and backports; protect host-identifying reports."],
    ["whisker", "Whisker", "https://github.com/eladshamir/Whisker", "Recognize key-credential attribute manipulation and shadow-credential risks.", "Review permissions and attribute state only; no persistent key insertion or impersonation recipe is provided."],
    ["windows-privesc-check", "Windows-privesc-check", "https://github.com/pentestmonkey/windows-privesc-check", "Review local Windows misconfiguration-check coverage and data collection.", "Read the exact checks and keep evidence local; findings require manual verification."],
    ["windows-privesc-reference", "Windows privilege reference", "https://www.fuzzysecurity.com/tutorials/16.html", "Compare Windows privilege prerequisites and service configuration risks.", "Verify each premise against the actual token, permissions, and operating-system version."],
    ["windows-privesc-notes", "Windows privilege notes", "https://github.com/frizb/Windows-Privilege-Escalation", "Use an additional privilege reference for manual configuration review.", "Do not copy full attack chapters; verify current versions and choose minimal authorized checks."],
    ["kdestroy", "kdestroy", sourceReference + "#kerberos-related-files", "Understand removing your own local Kerberos cache and its effect on active clients.", "Inspect the current cache first; do not delete shared or another user's credential caches."],
    ["kadmin", "kadmin", sourceReference + "#kerberos-related-files", "Review privileged Kerberos principal and key-table administration.", "Use read-only administration only when explicitly authorized; principal creation and key changes are not included."],
    ["ksu", "ksu", sourceReference + "#kerberos-related-files", "Review Kerberos-authenticated user switching and local authorization policy.", "Confirm the requested identity and local policy; obtaining a ticket does not automatically grant account switching."],
    ["rdate", "rdate", sourceReference + "#rdate", "Review legacy remote time queries versus setting the system clock.", "Prefer inspection and a trusted time source; do not change a shared workstation's clock automatically."],
    ["faketime", "faketime", sourceReference + "#faketime", "Review per-process simulated time and its limitations during clock-skew diagnosis.", "Use a controlled local test process; simulated time is not a repair for server, DNS, or certificate problems."],
    ["php", "PHP built-in web server", "https://www.php.net/manual/en/features.commandline.webserver.php", "Review serving a dedicated local directory with the PHP development server.", "Prefer a non-executable transfer server for untrusted files; the PHP server executes PHP files and is not a production server."],
    ["aria2c", "aria2c", "https://github.com/aria2/aria2", "Review a multi-protocol download client and output-path behavior.", "Use a verified URL and dedicated destination; the source's arua2c spelling should not be assumed to be an executable name."],
    ["iptables", "iptables", "https://www.netfilter.org/projects/iptables/index.html", "Review local firewall rules without changing shared host networking.", "Inspect rules only under approved access; do not flush rules or bypass required network controls."],
    ["logrotten", "logrotten", "https://github.com/whotwagner/logrotten", "Research log-rotation race conditions and the required writable path/configuration.", "Verify version and configuration with approved reads; no race-exploitation or scheduled payload recipe is included."],
    ["relayd", "relayd", sourceReference + "#relayd", "Review the specific relay daemon and configuration mentioned in the source.", "Resolve implementation/version ambiguity before using syntax; never assume a daemon-name match proves a bypass primitive."],
    ["rbash", "rbash", sourceReference + "#rbash", "Understand restricted-shell constraints and why surrounding policy matters.", "Document the allowed commands and approved scope; escape and policy-bypass command chains are not supplied."],
    ["less", "less", "https://man7.org/linux/man-pages/man1/less.1.html", "Review local paging of a permitted file and the risks of optional shell escapes.", "Use ordinary read-only navigation; do not interpret the pager's presence as permission to bypass a restricted shell."],
    ["powermad", "Powermad", "https://github.com/Kevin-Robertson/Powermad", "Review machine-account and directory operations that can change domain state.", "Confirm object-creation policy and authorization; machine-account abuse recipes are not included."],
    ["seatbelt", "Seatbelt", "https://github.com/GhostPack/Seatbelt", "Review selectable Windows host-inspection modules and their sensitive output.", "Select approved individual checks rather than running every collection group."],
    ["winexe", "winexe", sourceReference + "#winexe", "Review SMB-backed remote process execution and remote service side effects.", "Confirm account scope, transport, and cleanup behavior; a remote execution recipe is not supplied by default."],
    ["responder", "Responder", "https://github.com/lgandx/Responder", "Recognize name-resolution poisoning and authentication-capture features.", "No poisoning, capture, or relay command is included; examine allowed features and current exam restrictions independently."],
    ["mitm6", "mitm6", "https://github.com/dirkjanm/mitm6", "Recognize DHCPv6/DNS spoofing as an active network-manipulation technique.", "Keep this as a restriction/defense reference; no spoofing or relay setup is included."],
    ["petitpotam", "PetitPotam", "https://github.com/topotam/PetitPotam", "Recognize EFS-related authentication coercion and resulting relay risks.", "Review defensive controls and prerequisites only; no forced-authentication recipe is supplied."],
    ["dfscoerce", "DFSCoerce", "https://github.com/Wh04m1001/DFSCoerce", "Recognize DFS-related authentication coercion.", "Review the RPC exposure and mitigations; coercion and relay chains are omitted."],
    ["shadowcoerce", "ShadowCoerce", "https://github.com/ShutdownRepo/ShadowCoerce", "Recognize shadow-copy-service authentication coercion.", "Review service exposure and mitigations without forcing outbound authentication."],
    ["printerbug", "PrinterBug", "https://github.com/dirkjanm/krbrelayx", "Recognize spooler-related forced-authentication behavior.", "Review the spooler exposure and defenses; no coercion or relay invocation is included."],
    ["cheeseounce", "MSEven / CheeseOunce", sourceReference + "#mseven-cheeseounce", "Recognize an event-log-related authentication-coercion technique listed by the source.", "Verify the actual project and prerequisites; no coercion or capture chain is imported."],
    ["dnstool", "dnstool", "https://github.com/dirkjanm/krbrelayx", "Distinguish AD-integrated DNS inspection from poisoning or record changes.", "Review approved existing records only; no authentication-redirection recipe is included."],
    ["adcs", "AD CS feature boundaries", sourceReference + "#active-directory-certificate-services-ad-cs", "Understand certificate templates, mappings, enrollment permissions, and why ESC labels need version-specific verification.", "Inspect approved policy data first; template changes, relay, and identity impersonation are not supplied as runnable chains."],
    ["godpotato", "GodPotato", "https://github.com/BeichenDream/GodPotato", "Research token-impersonation escalation prerequisites and patch applicability.", "Check the actual token and system configuration; no privilege-escalation payload is included."],
    ["juicypotato", "Juicy Potato", "https://github.com/ohpe/juicy-potato", "Research version-specific token-impersonation escalation conditions.", "Do not assume an enabled privilege is sufficient; verify affected systems and mitigations before any authorized lab test."],
    ["juicypotatong", "JuicyPotatoNG", "https://github.com/antonioCoco/JuicyPotatoNG", "Review a distinct token-impersonation implementation and its release-specific prerequisites.", "Keep version and feature review separate from running an elevated process."],
    ["printspoofer", "PrintSpoofer", "https://github.com/itm4n/PrintSpoofer", "Research spooler/token-impersonation prerequisites without delivering an elevated shell.", "Verify token, service state, and vendor mitigations; no runnable escalation chain is supplied."],
    ["sharpefspotato", "SharpEfsPotato", "https://github.com/bugch3ck/SharpEfsPotato", "Research EFS-related token-impersonation escalation prerequisites.", "Review current defensive controls and approved scope; no elevated payload or coercion invocation is included."],
    ["shocker", "Shocker container escape", sourceReference + "#shocker-container-escape", "Research container capability and mount-boundary risks listed by the source.", "Inspect approved capability and mount metadata; do not assume a container is isolated or execute an escape payload."],
    ["psexec-sysinternals", "Sysinternals PsExec", "https://learn.microsoft.com/en-us/sysinternals/downloads/psexec", "Distinguish the Windows Sysinternals client from Impacket's implementation.", "Review service installation, account context, and cleanup effects before authorized remote execution."],
    ["sharpkatz", "SharpKatz", sourceReference, "Recognize a credential-oriented binary bundled in the source resources.", "Verify official provenance and protect credential artifacts; no process-memory collection or obfuscated binary is imported."],
    ["impacket-addcomputer", "Impacket addcomputer", "https://github.com/fortra/impacket", "Review machine-account creation as a domain-state change.", "Check allowed object creation and cleanup policy; no machine-account abuse chain is supplied."],
    ["impacket-atexec", "Impacket atexec", "https://github.com/fortra/impacket", "Review scheduled-task remote execution and its host-side artifacts.", "Confirm explicit remote-execution scope and task cleanup behavior before use."],
    ["impacket-changepasswd", "Impacket changepasswd", "https://github.com/fortra/impacket", "Review password changes/resets and the account/transport permissions they require.", "Use only an explicitly designated account; do not treat password changes as harmless enumeration."],
    ["impacket-dcomexec", "Impacket dcomexec", "https://github.com/fortra/impacket", "Review DCOM-based remote process execution and transport prerequisites.", "Verify identity, firewall paths, and endpoint behavior; no automatic lateral-movement chain is provided."],
    ["impacket-describeTicket", "Impacket describeTicket", "https://github.com/fortra/impacket", "Review local ticket-file inspection and release-dependent decoding support.", "Work on an authorized copy and compare the installed client's help; the source does not establish universal CLI compatibility."],
    ["impacket-findDelegation", "Impacket findDelegation", "https://github.com/fortra/impacket", "Review directory delegation metadata separately from abusing delegation.", "Limit queries to approved objects and verify actual service permissions; no impersonation chain is included."],
    ["impacket-netview", "Impacket netview", "https://github.com/fortra/impacket", "Review host/session enumeration breadth and automatic target discovery.", "Choose an explicit approved host list and inspect session-collection permissions before any run."],
    ["impacket-req", "Impacket req (source-listed name)", sourceReference + "#impacket-req", "Recognize a source-listed executable name whose availability and semantics require release-specific verification.", "Find the installed project's actual matching client and help before using any command; no guessed syntax is supplied."],
    ["impacket-services", "Impacket services", "https://github.com/fortra/impacket", "Distinguish service inventory from creating, starting, stopping, or deleting remote services.", "Select only an approved read operation after checking installed action syntax."],
    ["impacket-smbpasswd", "Impacket smbpasswd", "https://github.com/fortra/impacket", "Review SMB password changes and legacy client-version differences.", "Use only a designated account and verify the installed script; password changes are not passive checks."],
    ["impacket-dacledit", "Impacket dacledit", "https://github.com/fortra/impacket", "Review directory ACL reads separately from writing access-control entries.", "Inspect one authorized object's ACL; permission-modification and persistence chains are not provided."],
    ["impacket-owneredit", "Impacket owneredit", "https://github.com/fortra/impacket", "Review directory object ownership and the consequences of changing it.", "Read approved object metadata only; no owner takeover or follow-on ACL change is supplied."],
    ["impacket-theporgs", "ThePorgs Impacket fork", "https://github.com/ThePorgs/impacket", "Recognize fork-specific features that may not exist in upstream packaged clients.", "Record the actual fork/revision and compare help before applying any syntax or assumptions."],
    ["sshuttle", "sshuttle", "https://github.com/sshuttle/sshuttle", "Review SSH-assisted routed connectivity and local firewall changes.", "Use only explicit approved routes and exclusions; inspect the resulting host network rules and cleanup behavior."],
    ["plink", "Plink", "https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html", "Review PuTTY's command-line SSH client and forwarding syntax separately from OpenSSH.", "Verify the host key and approved endpoint; do not disable host-key verification or expose a forward on all interfaces."],
    ["rdesktop", "rdesktop", "https://www.rdesktop.org", "Distinguish the legacy RDP client from current FreeRDP and its different authentication/TLS behavior.", "Verify client compatibility and server identity; prefer a maintained client rather than weakening security to connect."],
    ["apache2", "Apache httpd / apache2", "https://httpd.apache.org/docs/2.4/", "Review server configuration parsing separately from privileged file-read or startup behavior.", "Inspect an authorized configuration copy and vendor syntax; do not misuse a privileged server binary to read protected files."],
    ["apt", "APT", "https://www.debian.org/doc/manuals/apt-guide/", "Review package-manager hooks and the impact of installing or changing system packages.", "Prepare reviewed dependencies before the exam; do not use privileged hooks or change a shared host's packages automatically."],
    ["windows-native-tools", "Windows native administration tools", "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands", "Distinguish inventory clients from process creation, credential storage, and network configuration changes.", "Use approved metadata queries only and check each installed utility's help; avoid remote process creation and destructive task/network actions."],
    ["build-toolchains", "Build toolchains", sourceReference, "Review local compilation and dependency execution as preparation work, not a reason to trust source payloads.", "Audit source, dependencies, build hooks, and license terms before building; never automatically compile/run bundled exploits."]
  ];
  const sourceAliases = {
    "sqli-reference": ["SQL Injection Cheatsheet"],
    defaultcreds: ["Default Credentials Cheat Sheet"],
    adcskiller: ["ADCSKiller - An ADCS Exploitation Automation Tool"],
    "ad-attack-reference": ["Cheat Sheet - Attack Active Directory"],
    "linux-exploit-suggester": ["LES"],
    "windows-privesc-reference": ["Windows Privilege Escalation Fundamentals"],
    "windows-privesc-notes": ["Windows Privilege Escalation"],
    moriarty: ["Moriaty"],
    pkinittools: ["gettgtpkinit.py", "getnthash.py"],
    "gpp-decrypt": ["gpp-decrypt.py", "cpassword", "Group Policy Preferences"],
    powerview: ["Get-DomainUser", "Get-DomainComputer", "Get-DomainObjectAcl", "Get-NetDomain", "Get-NetUser", "Get-NetComputer"],
    powermad: ["New-MachineAccount", "Set-MachineAccountAttribute"],
    privesccheck: ["PrivescCheck.ps1", "Invoke-PrivescCheck"],
    powerup: ["PowerUp.ps1", "Invoke-AllChecks"],
    sharpview: ["SharpView.exe"],
    penelope: ["penelope.py"],
    plink: ["plink.exe"],
    adcs: Array.from({ length: 17 }, (_, index) => `ESC${index + 1}`),
    "windows-native-tools": ["wmic", "cmdkey", "netsh", "tasklist", "taskkill", "runas", "findstr", "cmd.exe"],
    "build-toolchains": ["gcc", "g++", "make", "cmake", "dotnet", "mcs", "go", "msbuild", "nasm"],
    aria2c: ["arua2c"]
  };
  const sourceToolAliases = [
    "gettgtpkinit.py", "getnthash.py", "wmic", "cmdkey", "netsh", "tasklist",
    "taskkill", "runas", "findstr", "cmd.exe", "gcc", "g++", "make", "cmake",
    "dotnet", "mcs", "go", "msbuild", "nasm"
  ];
  const methodKeys = sourceMethods.map(([key]) => key);
  for (const [key, name, url, description, step] of sourceMethods) {
    tools[key] = name;
    sources[`syr0-${key}`] = [name + " documentation / reference", url];
    cards.push({
      id: `syr0-${key}`, category: "Tool notes and restricted features",
      title: `${name}: reference and feature review`,
      tags: [key, name, ...(key.startsWith("impacket-") ? ["impacket"] : []),
        ...(sourceAliases[key] ?? []).filter(alias => sourceToolAliases.includes(alias))],
      aliases: sourceAliases[key] ?? [],
      description, commands: [], steps: [step],
      caution: "Method-only reference; no runnable chain is included. Verify the exact release, scope, and current exam rules. A listed tool or technique is not blanket permission to use its features.",
      source: `syr0-${key}`
    });
  }
  const newToolLabels = {
    nbtscan: "nbtscan", nmblookup: "nmblookup", memcached: "Memcached",
    "memcached-cli": "memcached-cli", printf: "printf", ping: "ping",
    kinit: "Kerberos kinit", klist: "Kerberos klist", date: "date",
    timedatectl: "timedatectl", ntpdate: "ntpdate",
    "impacket-getTGT": "Impacket: getTGT", "impacket-getST": "Impacket: getST",
    "impacket-ticketConverter": "Impacket: ticketConverter",
    "impacket-rpcdump": "Impacket: rpcdump", "impacket-samrdump": "Impacket: samrdump",
    "impacket-lookupsid": "Impacket: lookupsid", cadaver: "cadaver", wfuzz: "Wfuzz",
    whatweb: "WhatWeb", wpscan: "WPScan", mongosh: "MongoDB / mongosh",
    mongo: "MongoDB legacy mongo", "redis-cli": "Redis / redis-cli", sqlite3: "SQLite / sqlite3",
    sqsh: "sqsh", tmux: "tmux", uv: "uv", virtualenv: "virtualenv", pip: "Python pip",
    VBoxManage: "VirtualBox / VBoxManage", cewl: "CeWL", crunch: "crunch",
    "username-anarchy": "Username Anarchy", fcrackzip: "fcrackzip", fcrack: "fcrack (source alias)",
    smbpasswd: "Samba smbpasswd", accesschk: "Sysinternals AccessChk",
    "Get-ChildItem": "PowerShell: Get-ChildItem", "Get-Module": "PowerShell: Get-Module",
    "Get-FileHash": "PowerShell: Get-FileHash"
  };
  Object.assign(tools, newToolLabels);
  for (const alias of sourceToolAliases) tools[alias] = alias;
  cards.push(...sourceCommandCards);
  cards.push({
    id: "source-cve-research", category: "Tool notes and restricted features",
    title: "Source CVE and bundled exploit references: research only",
    tags: ["source-cve", "CVE", "exploit research"],
    aliases: [
      "Shellshock", "Dirty COW", "EternalBlue", "MS17-010", "ZeroLogon", "NoPac",
      "Log4Shell", "Dirty Pipe", "Spring4Shell", "PwnKit", "Firejail", "LocalPotato",
      "GameOverlay", "Looney Tunables", "GitLab account takeover", "chwoot",
      "React2Shell", "Fragnesia", "BadSuccessor",
      "CVE-2014-5301", "CVE-2014-6271", "CVE-2015-1328", "CVE-2016-1531",
      "CVE-2016-5195", "CVE-2017-0144", "CVE-2018-7600", "CVE-2019-7214",
      "CVE-2019-14287", "CVE-2020-11651", "CVE-2020-11652", "CVE-2020-1472",
      "CVE-2020-24186", "CVE-2021-3156", "CVE-2021-4034", "CVE-2021-42287",
      "CVE-2021-44228", "CVE-2022-0847", "CVE-2022-22963", "CVE-2022-24112",
      "CVE-2022-31214", "CVE-2023-21746", "CVE-2023-22809", "CVE-2023-24078",
      "CVE-2023-2640", "CVE-2023-32629", "CVE-2023-4911", "CVE-2023-7028",
      "CVE-2024-4577", "CVE-2025-29927", "CVE-2025-32463", "CVE-2025-55182",
      "CVE-2026-24061", "CVE-2026-46300", "ManageEngine ServiceDesk Plus",
      "SmarterMail", "Saltstack", "wpDiscuz", "Apache APISIX", "FuguHub",
      "FreeSWITCH", "HP Power Manager", "Sonatype Nexus", "Symfony", "Wifi Mouse"
    ],
    description: "Find names and identifiers listed by the source without importing its exploit programs, payloads, or binaries.",
    commands: [],
    steps: ["Independently verify the identifier, affected product, and patch/backport status using vendor advisories.",
      "Review prerequisites, authorization, and current exam rules before a separately approved lab test; reference presence is not a verified vulnerability finding."],
    caution: "The source's identifiers and claims are indexed, not independently validated here. No bundled exploit source or executables are copied, compiled, or run.",
    source: "syr0"
  });
  tools["source-cve"] = "CVE / bundled exploit reference index";
  const sourceCoveredExisting = [
    "chisel", "ligolo-ng", "nmap", "nikto", "ffuf", "gobuster", "hashcat", "hydra",
    "john", "kerbrute", "mimikatz", "evil-winrm", "bloodhound", "impacket", "enum4linux-ng",
    "lsassy", "nxc", "rubeus", "sharphound", "msfconsole", "meterpreter", "msfvenom",
    "curl", "certutil", "nc", "powershell", "ftp", "python", "xfreerdp", "showmount",
    "smbclient", "ssh", "socat", "proxychains4", "snmpwalk", "impacket-mssqlclient",
    "mysql", "psql", "ldapsearch", "rpcclient", "exiftool", "bash", "find", "getcap",
    "reg", "icacls", "schtasks", "systeminfo", "whoami", "net", "ipconfig", "robocopy"
  ];
  const sourceCoverage = {
    url: sourceReference, revision: sourceRevision, inventoried: "2026-11-25",
    scope: "Named tool/reference catalogue, dedicated CLI tool sections, Impacket clients, and named coercion/escalation families. Bundled exploit binaries, payload source, and full attack chains are not imported.",
    keys: [...new Set([...sourceCoveredExisting, ...methodKeys, ...Object.keys(newToolLabels), ...sourceToolAliases, "source-cve"])]
  };
  const reviewGroups = [
    {
      ids: ["impacket-psexec", "impacket-secretsdump-local", "impacket-smbserver", "impacket-smbclient", "impacket-ad-users", "impacket-spns", "impacket-asrep", "impacket-wmi", "impacket-mssql"],
      version: "Impacket 0.12.0",
      url: "https://github.com/fortra/impacket/tree/impacket_0_12_0/examples",
      note: "Checked each example's argument definitions and identity format. Kali's impacket-* wrappers correspond to upstream .py script names."
    },
    {
      ids: ["nxc-smb-info", "nxc-smb-shares", "nxc-domain-info", "nxc-local-auth", "nxc-hash-auth"],
      version: "NetExec 1.4.0 SMB CLI",
      url: "https://github.com/Pennyw0rth/NetExec/blob/v1.4.0/nxc/protocols/smb/proto_args.py",
      note: "Checked protocol options and shared credential arguments in nxc/cli.py. Share enumeration may perform write-access probes."
    },
    {
      ids: ["nxc-ldap-users"],
      version: "NetExec 1.4.0 LDAP CLI",
      url: "https://github.com/Pennyw0rth/NetExec/blob/v1.4.0/nxc/protocols/ldap/proto_args.py",
      note: "Checked LDAP --users, domain selection, and shared username/password arguments."
    },
    {
      ids: ["nxc-winrm-auth"],
      version: "NetExec 1.4.0 WinRM CLI",
      url: "https://github.com/Pennyw0rth/NetExec/blob/v1.4.0/nxc/protocols/winrm/proto_args.py",
      note: "Checked credential arguments; this version checks HTTP and HTTPS endpoints by default."
    },
    {
      ids: ["smbmap-access"], version: "SMBMap 1.10.7",
      url: "https://github.com/ShawnDEvans/smbmap/blob/v1.10.7/README.md",
      note: "Checked --prompt, --no-write-check, and -r path syntax. Directory traversal defaults to depth 1 in this release."
    },
    {
      ids: ["enum4linux-ng"], version: "enum4linux-ng 1.3.4",
      url: "https://github.com/cddmp/enum4linux-ng/blob/v1.3.4/README.md",
      note: "Checked selected RPC enumeration switches and credential/domain options; older enum4linux flags differ."
    },
    {
      ids: ["evil-winrm-session"], version: "Evil-WinRM 3.7",
      url: "https://github.com/Hackplayers/evil-winrm/blob/v3.7/README.md",
      note: "Checked -i, -u, -S and -P; HTTPS selection is distinct from certificate-trust behavior."
    },
    {
      ids: ["dirsearch-paths"], version: "dirsearch 0.4.3",
      url: "https://github.com/maurosoria/dirsearch/blob/v0.4.3/README.md",
      note: "Checked URL, wordlist, and extensions. This template replaces %EXT% markers, not every wordlist entry's extension."
    },
    {
      ids: ["web-directories"], version: "ffuf 2.1.0",
      url: "https://github.com/ffuf/ffuf/blob/v2.1.0/README.md",
      note: "Checked FUZZ placement, rate/workers, match-all status selection, and JSON output switches."
    },
    {
      ids: ["gobuster-directories"], version: "Gobuster 3.6.0",
      url: "https://github.com/OJ/gobuster/blob/v3.6.0/README.md",
      note: "Checked dir mode, URL, wordlist, concurrent workers, and output path."
    },
    {
      ids: ["chisel-reverse"], version: "Chisel 1.10.1",
      url: "https://github.com/jpillora/chisel/blob/v1.10.1/README.md",
      note: "Checked server/client flags and reverse-forward field order. The authfile must authorize the intended R:bind-address:port pattern."
    },
    {
      ids: ["kerbrute-users"], version: "Kerbrute 1.0.3",
      url: "https://github.com/ropnop/kerbrute/blob/v1.0.3/README.md",
      note: "Checked userenum and KDC/domain switches; --delay uses milliseconds and forces a single thread."
    },
    {
      ids: ["proxychains-request"], version: "ProxyChains-NG 4.17",
      url: "https://github.com/rofl0r/proxychains-ng/blob/v4.17/README",
      note: "Checked the explicit -f configuration option; the socks5 line belongs in ProxyList, not a shell."
    },
    {
      ids: ["freerdp-session"], version: "FreeRDP 3.10.3",
      url: "https://github.com/FreeRDP/FreeRDP/blob/3.10.3/client/common/cmdline.c",
      note: "Checked /v, /u, /d and /dynamic-resolution. The installed wrapper may be xfreerdp or xfreerdp3; the legacy 2.x alternative remains unverified."
    },
    {
      ids: ["bloodhound-directory"], version: "BloodHound.py legacy master and bloodhound-ce branch references (rolling)",
      url: "https://github.com/dirkjanm/BloodHound.py",
      note: "Checked both branches' DCOnly, -ns, -dc, -d, -u and --zip parsers. These are not pinned release guarantees; use the collector matching your local graph edition."
    },
    {
      ids: ["ligolo-tunnel"], version: "Ligolo-ng quickstart, interface CLI >=0.6 (rolling)",
      url: "https://docs.ligolo.ng/Quickstart/",
      note: "Checked fingerprint pinning and interface/tunnel/route commands. This interface example is Linux-oriented; macOS uses utun devices and OS-specific routing."
    },
    {
      ids: ["feroxbuster-paths"], version: "feroxbuster rate-limit documentation (rolling)",
      url: "https://epi052.github.io/feroxbuster-docs/examples/rate-limit/",
      note: "Confirmed --rate-limit is per directory. Recheck remaining options and configuration in your installed release."
    },
    {
      ids: ["tcp-discovery", "service-versions", "udp-discovery"], version: "Nmap 7.99SVN published options reference",
      url: "https://nmap.org/book/man-briefoptions.html",
      note: "Checked scan types, port selectors, --open and -oN. Host discovery is still enabled; an unresponsive host may need a deliberate scoped follow-up."
    },
    {
      ids: ["http-basics", "virtual-host", "http-form", "ftp-list", "web-map"],
      version: "curl manual (rolling)",
      url: "https://curl.se/docs/manpage.html",
      note: "Checked HTTP/FTP flags against the published manual. Configure certificate trust and confirm installed curl options; local defaults can affect requests."
    },
    {
      ids: ["ssh-scp-access", "ssh-local", "ssh-remote", "ssh-dynamic"],
      version: "OpenBSD OpenSSH manuals (rolling)",
      url: "https://man.openbsd.org/ssh",
      note: "Checked forwarding endpoint order and ExitOnForwardFailure; SCP source/destination syntax was checked in the scp manual. Remote-forward success does not guarantee later destination reachability."
    },
    {
      ids: ["netcat-listener"], version: "OpenBSD nc manual (rolling)",
      url: "https://man.openbsd.org/nc",
      note: "Checked listen/verbose/numeric options and positional bind syntax. BusyBox and traditional netcat may require different arguments."
    },
    {
      ids: ["file-http"], version: "Python 3.12 http.server and curl manuals",
      url: "https://docs.python.org/3.12/library/http.server.html",
      note: "Checked module invocation, port, bind address, and served directory; curl output/error flags were checked separately."
    },
    {
      ids: ["shell-terminal"], version: "Python 3.12 pty documentation",
      url: "https://docs.python.org/3.12/library/pty.html",
      note: "Checked pty.spawn usage. TERM and stty behavior still depend on the target shell and terminal; no full-interactivity guarantee."
    },
    {
      ids: ["postgres-client"], version: "PostgreSQL 16 psql reference",
      url: "https://www.postgresql.org/docs/16/app-psql.html",
      note: "Checked connection switches, password prompting, and psql meta-command syntax. Database visibility depends on the authenticated role."
    },
    {
      ids: ["mysql-context"], version: "MySQL 8.4 client reference",
      url: "https://dev.mysql.com/doc/refman/8.4/en/mysql-command-options.html",
      note: "Checked long-form host/port/user options and the value-less password prompt; MariaDB client defaults may differ."
    },
    {
      ids: ["openssl-tls"], version: "OpenSSL 3.0 s_client and x509 references",
      url: "https://docs.openssl.org/3.0/man1/openssl-s_client/",
      note: "Checked both subcommands' flags. SNI and chain-error checking do not by themselves enable hostname verification."
    },
    {
      ids: ["smb-shares", "rpcclient-accounts"], version: "Samba current client manuals (rolling)",
      url: "https://www.samba.org/samba/docs/current/man-html/rpcclient.1.html",
      note: "Checked RPC commands, user identity, and command-list syntax; smbclient's share/password flags were checked in its separate manual."
    },
    {
      ids: ["snmp-system"], version: "Net-SNMP snmpwalk/snmpcmd manuals (rolling)",
      url: "https://www.net-snmp.org/docs/man/snmpcmd.html",
      note: "Checked protocol/community options and subtree selection. SNMPv2c does not encrypt the supplied community."
    },
    {
      ids: ["tcpdump-lab"], version: "tcpdump manual (rolling)",
      url: "https://www.tcpdump.org/manpages/tcpdump.1.html",
      note: "Checked interface selection, packet-count limit, and numeric-name option; the host filter selects both traffic directions."
    },
    {
      ids: ["ldap-root", "ldap-users"], version: "OpenLDAP ldapsearch manual (rolling)",
      url: "https://www.openldap.org/software/man.cgi?query=ldapsearch",
      note: "Checked bind/URI/base/scope/password switches. The authenticated template requires certificate trust and hostname resolution."
    },
    {
      ids: ["john-wordlist"], version: "John the Ripper published options reference (rolling)",
      url: "https://www.openwall.com/john/doc/OPTIONS.shtml",
      note: "Checked --wordlist and --show; installed build capabilities and input hash formats still need confirmation."
    },
    {
      ids: ["hashcat-formats"], version: "Hashcat published CLI reference (rolling)",
      url: "https://hashcat.net/wiki/doku.php?id=hashcat",
      note: "Checked attack/hash mode and --show. Choose HASH_MODE for the actual material rather than relying on an example mode."
    },
    {
      ids: ["wsgidav-transfer"], version: "WsgiDAV 4.x CLI documentation (rolling)",
      url: "https://wsgidav.readthedocs.io/en/latest/user_guide_cli.html",
      note: "Checked host/port/root and pam-login choices. PAM support is platform-dependent and the HTTP template does not enable TLS."
    }
  ];
  const syntaxReviews = Object.fromEntries(reviewGroups.flatMap(({ ids, ...review }) =>
    ids.map(id => [id, { date: "2026-11-24", ...review }])
  ));
  const library = { categories, tools, sources, cards, syntaxReviews, sourceCoverage };
  if (typeof module !== "undefined" && module.exports) module.exports = library;
  else root.FieldnotesData = library;
})(globalThis);
