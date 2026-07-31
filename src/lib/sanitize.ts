const ALLOWED_TAGS = [
  "p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "code",
  "a", "span", "div",
];

const ALLOWED_ATTR = ["href", "title", "target", "rel", "class"];

function stripDisallowedTags(html: string): string {
  return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*?)?>/g, (match, tag) => {
    if (ALLOWED_TAGS.includes(tag.toLowerCase())) {
      return match;
    }
    if (`/${tag.toLowerCase()}` === match.replace(/<|>/g, "").trim()) {
      return match;
    }
    return "";
  });
}

function stripEventHandlers(html: string): string {
  return html.replace(/\s(on\w+)=("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function stripDisallowedAttributes(html: string): string {
  return html.replace(
    new RegExp(`\\s+((?!${ALLOWED_ATTR.join("|")})\\w+)=("[^"]*"|'[^']*'|[^\\s>]+)`, "gi"),
    ""
  );
}

export function sanitize(dirty: string): string {
  if (!dirty) return "";
  return dirty.replace(/<[^>]*>/g, "").trim().slice(0, 10000);
}

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  let cleaned = stripDisallowedTags(dirty);
  cleaned = stripEventHandlers(cleaned);
  cleaned = stripDisallowedAttributes(cleaned);
  return cleaned.trim();
}
