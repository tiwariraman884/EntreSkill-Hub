import { connectToDatabase } from "@/lib/mongoose";
import { User, BusinessIdea, LearningResource } from "@/models";

interface Bookmark {
  targetType: string;
  targetId: string;
}

export async function toggleBookmark(userId: string, targetType: string, targetId: string) {
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  
  const bookmarks = (user.bookmarks as Bookmark[]) || [];
  const index = bookmarks.findIndex(b => b.targetType === targetType && b.targetId.toString() === targetId);
  
  if (index >= 0) {
    user.bookmarks = bookmarks.filter((_, i) => i !== index);
  } else {
    user.bookmarks = [...bookmarks, { targetType, targetId }];
  }
  
  await user.save();
  return user;
}

export async function getUserBookmarks(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId).select("bookmarks");
  const bookmarks = (user?.bookmarks as Bookmark[]) || [];

  const populated = await Promise.all(
    bookmarks.map(async (bookmark) => {
      let target: Record<string, unknown> | null = null;
      if (bookmark.targetType === "idea") {
        target = await BusinessIdea.findById(bookmark.targetId).lean();
      } else if (bookmark.targetType === "resource") {
        target = await LearningResource.findById(bookmark.targetId).lean();
      }
      return {
        targetType: bookmark.targetType,
        targetId: bookmark.targetId,
        target,
      };
    })
  );

  return populated;
}
