import { bookmarkSchema } from "@/domains/bookmarks/schema";

describe("bookmarkSchema", () => {
  it("accepts valid input", () => {
    const result = bookmarkSchema.safeParse({ targetType: "idea", targetId: "123" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid targetType", () => {
    const result = bookmarkSchema.safeParse({ targetType: "invalid", targetId: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects missing targetId", () => {
    const result = bookmarkSchema.safeParse({ targetType: "idea" });
    expect(result.success).toBe(false);
  });
});
