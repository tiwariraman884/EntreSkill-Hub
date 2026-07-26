import { connectToDatabase } from "@/lib/mongoose";
import { Notification } from "@/models";

export async function getNotifications(userId: string, unreadOnly = false) {
  await connectToDatabase();
  const query: Record<string, unknown> = { userId };
  if (unreadOnly) query.read = false;
  return Notification.find(query).sort({ createdAt: -1 }).limit(50);
}

export async function markNotificationRead(id: string, userId: string) {
  await connectToDatabase();
  const notification = await Notification.findOne({ _id: id, userId });
  if (!notification) throw new Error("Notification not found");
  notification.read = true;
  await notification.save();
  return notification;
}

export async function createNotification(userId: string, type: string, message: string) {
  await connectToDatabase();
  return Notification.create({ userId, type, message, read: false });
}

export async function getUnreadCount(userId: string) {
  await connectToDatabase();
  return Notification.countDocuments({ userId, read: false });
}
