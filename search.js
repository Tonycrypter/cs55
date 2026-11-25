(function (root) {
  "use strict";
  function splitMatches(text, query) {
    const lower = text.toLowerCase();
    const ranges = [];
    for (const word of new Set(query.trim().toLowerCase().split(/\s+/).filter(Boolean))) {
      let start = lower.indexOf(word);
      while (start !== -1) {
        ranges.push([start, start + word.length]);
        start = lower.indexOf(word, start + word.length);
      }
    }
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [];
    for (const range of ranges) {
      const previous = merged.at(-1);
      if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
      else merged.push([...range]);
    }
    const parts = [];
    let cursor = 0;
    for (const [start, end] of merged) {
      if (start > cursor) parts.push({ text: text.slice(cursor, start), match: false });
      parts.push({ text: text.slice(start, end), match: true });
      cursor = end;
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false });
    return parts;
  }

  function splitCommandMatches(segments, query) {
    const matches = splitMatches(segments.map(segment => segment.text).join(""), query);
    const parts = [];
    let index = 0;
    let offset = 0;
    for (const segment of segments) {
      let cursor = 0;
      while (cursor < segment.text.length) {
        const match = matches[index];
        const length = Math.min(segment.text.length - cursor, match.text.length - offset);
        parts.push({ text: segment.text.slice(cursor, cursor + length), role: segment.role, match: match.match });
        cursor += length;
        offset += length;
        if (offset === match.text.length) {
          index++;
          offset = 0;
        }
      }
    }
    return parts;
  }

  function searchCards(cards, query, category = "All topics", tool = "All tools") {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const phrase = words.join(" ");
    const namedAlias = words.length > 1 && cards.some(card =>
      card.aliases?.some(alias => alias.toLowerCase() === phrase)
    );
    return cards.filter(card => {
      if (category !== "All topics" && card.category !== category) return false;
      if (tool !== "All tools" && !card.tags.some(tag => tag.toLowerCase() === tool.toLowerCase())) return false;
      const text = [
        card.title, card.category, card.description, card.caution,
        ...card.tags, ...card.commands, ...card.steps, ...(card.flags ?? []), ...(card.aliases ?? [])
      ].join(" ").toLowerCase();
      if (namedAlias) return card.aliases?.some(alias => alias.toLowerCase() === phrase) ||
        text.includes(phrase);
      return words.every(word => text.includes(word));
    });
  }
  const helpers = { searchCards, splitMatches, splitCommandMatches };
  if (typeof module !== "undefined" && module.exports) module.exports = helpers;
  else root.FieldnotesSearch = helpers;
})(globalThis);
