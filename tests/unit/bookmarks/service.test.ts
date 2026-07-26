import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";

describe("bookmarks service", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("toggles a bookmark on", async () => {
    const { toggleBookmark, getUserBookmarks } = await import("@/domains/bookmarks/service");

    const user = await User.create({
      name: "Bookmark User",
      email: `bm-${Date.now()}@example.com`,
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: ["tech"],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    await toggleBookmark(user._id.toString(), "idea", new mongoose.Types.ObjectId().toString());
    const bookmarks = await getUserBookmarks(user._id.toString());
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].targetType).toBe("idea");
    expect(bookmarks[0].targetId).toBeDefined();
  });

  it("toggles a bookmark off", async () => {
    const { toggleBookmark, getUserBookmarks } = await import("@/domains/bookmarks/service");

    const user = await User.create({
      name: "Bookmark User",
      email: `bm-${Date.now()}@example.com`,
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: ["tech"],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const targetId = new mongoose.Types.ObjectId().toString();
    await toggleBookmark(user._id.toString(), "idea", targetId);
    await toggleBookmark(user._id.toString(), "idea", targetId);
    const bookmarks = await getUserBookmarks(user._id.toString());
    expect(bookmarks).toHaveLength(0);
  });

  it("returns empty bookmarks for user with none", async () => {
    const { getUserBookmarks } = await import("@/domains/bookmarks/service");

    const user = await User.create({
      name: "Bookmark User",
      email: `bm-${Date.now()}@example.com`,
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: ["tech"],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const bookmarks = await getUserBookmarks(user._id.toString());
    expect(bookmarks).toHaveLength(0);
  });
});
