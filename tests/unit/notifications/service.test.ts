import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { Notification } from "@/models";

describe("notifications service", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await Notification.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("creates a notification", async () => {
    const { createNotification } = await import("@/domains/notifications/service");
    const userId = new mongoose.Types.ObjectId();
    const notification = await createNotification(userId.toString(), "session_update", "Your session was updated");
    expect(notification.read).toBe(false);
    expect(notification.type).toBe("session_update");
  });

  it("gets notifications for user", async () => {
    const { createNotification, getNotifications } = await import("@/domains/notifications/service");
    const user1 = new mongoose.Types.ObjectId();
    const user2 = new mongoose.Types.ObjectId();
    await createNotification(user1.toString(), "type1", "message 1");
    await createNotification(user2.toString(), "type2", "message 2");

    const notifications = await getNotifications(user1.toString());
    expect(notifications).toHaveLength(1);
    expect(notifications[0].message).toBe("message 1");
  });

  it("filters unread notifications", async () => {
    const { createNotification, getNotifications, markNotificationRead } = await import("@/domains/notifications/service");
    const user1 = new mongoose.Types.ObjectId();
    const n1 = await createNotification(user1.toString(), "type1", "message 1");
    await createNotification(user1.toString(), "type2", "message 2");

    const unread = await getNotifications(user1.toString(), true);
    expect(unread).toHaveLength(2);

    await markNotificationRead(n1._id.toString(), user1.toString());
    const stillUnread = await getNotifications(user1.toString(), true);
    expect(stillUnread).toHaveLength(1);
  });

  it("gets unread count", async () => {
    const { createNotification, getUnreadCount } = await import("@/domains/notifications/service");
    const user1 = new mongoose.Types.ObjectId();
    await createNotification(user1.toString(), "type1", "message 1");
    await createNotification(user1.toString(), "type2", "message 2");

    const count = await getUnreadCount(user1.toString());
    expect(count).toBe(2);
  });
});
