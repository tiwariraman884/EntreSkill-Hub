import { sanitizeHtml } from "@/lib/sanitize";

describe("sanitizeHtml", () => {
  it("allows safe tags", () => {
    const input = "<p>Hello <strong>world</strong></p>";
    expect(sanitizeHtml(input)).toBe("<p>Hello <strong>world</strong></p>");
  });

  it("strips script tags", () => {
    const input = "<script>alert('xss')</script><p>Hello</p>";
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<script>");
    expect(result).toContain("<p>Hello</p>");
  });

  it("strips event handlers", () => {
    const input = `<p onclick="alert('xss')">Hello</p>`;
    const result = sanitizeHtml(input);
    expect(result).not.toContain("onclick");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeHtml("")).toBe("");
  });

  it("strips iframe tags", () => {
    const input = '<iframe src="https://evil.com"></iframe><p>Hello</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<iframe");
    expect(result).toContain("<p>Hello</p>");
  });

  it("returns plain text when no tags", () => {
    const input = "Just plain text";
    expect(sanitizeHtml(input)).toBe("Just plain text");
  });
});
