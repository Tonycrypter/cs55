(function (root) {
  "use strict";

  function isIPv4(value) {
    const parts = value.split(".");
    return parts.length === 4 && parts.every(part =>
      /^(0|[1-9]\d{0,2})$/.test(part) && Number(part) <= 255
    );
  }

  function isHostname(value) {
    return value.length <= 253 && !/^[\d.]+$/.test(value) &&
      value.split(".").every(label =>
        label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label)
      );
  }

  function prepareVariables(values) {
    const valid = {};
    const errors = {};
    for (const field of ["target", "listener", "dc", "domain"]) {
      const raw = (values[field] || "").trim();
      if (!raw) continue;
      const value = raw.toLowerCase().replace(/\.$/, "");
      const ipv4 = isIPv4(raw);
      const hostname = isHostname(value);
      if (field === "listener" ? !ipv4 :
          field === "domain" ? !hostname || !value.includes(".") :
          !ipv4 && !hostname) {
        errors[field] = field === "listener" ? "Enter a valid IPv4 address, without a port." :
          field === "domain" ? "Enter an AD DNS domain, such as corp.example (not an IP or URL)." :
          "Enter an IPv4 address or hostname only, without a URL, port, spaces, or shell characters.";
        continue;
      }
      valid[field] = value;
    }
    const replacements = {};
    if (valid.target) {
      replacements.TARGET_IP = valid.target;
      if (isIPv4(valid.target)) replacements.TARGET_IPV4 = valid.target;
      if (!isIPv4(valid.target)) replacements.HOSTNAME = valid.target;
    }
    if (valid.listener) replacements.VPN_IP = valid.listener;
    if (valid.dc) {
      replacements.DC_IP = valid.dc;
      replacements.DNS_IP = valid.dc;
      if (isIPv4(valid.dc)) replacements.DC_IPV4 = valid.dc;
      if (!isIPv4(valid.dc)) replacements.DC_HOSTNAME = valid.dc;
    }
    if (valid.domain) {
      replacements.DOMAIN = valid.domain;
      replacements.REALM = valid.domain.toUpperCase();
      replacements.BASE_DN = valid.domain.split(".").map(label => `DC=${label}`).join(",");
    }
    return { replacements, errors };
  }

  function commandSegments(command, replacements = {}) {
    const segments = [];
    let cursor = 0;
    for (const match of command.matchAll(/<([A-Z][A-Z0-9_]*)>/g)) {
      if (match.index > cursor) segments.push({ text: command.slice(cursor, match.index), role: "" });
      const [placeholder, key] = match;
      const requiresIPv4 = key === "TARGET_IP" && command.includes("--resolve ") &&
        replacements.TARGET_IP && !isIPv4(replacements.TARGET_IP);
      const role = ["TARGET_IP", "TARGET_IPV4", "HOSTNAME"].includes(key) ? "target" :
        ["USER", "USERNAME", "PASS", "PASSWORD"].includes(key) ? "credential" : "";
      segments.push({ text: requiresIPv4 ? placeholder : replacements[key] || placeholder, role });
      cursor = match.index + placeholder.length;
    }
    if (cursor < command.length) segments.push({ text: command.slice(cursor), role: "" });
    return segments;
  }

  function fillCommand(command, replacements) {
    return commandSegments(command, replacements).map(segment => segment.text).join("");
  }

  function remainingPlaceholders(command) {
    return [...new Set(Array.from(command.matchAll(/<([A-Z][A-Z0-9_]*)>/g), match => match[1]))];
  }

  root.FieldnotesVariables = { prepareVariables, fillCommand, remainingPlaceholders, commandSegments };
})(globalThis);
