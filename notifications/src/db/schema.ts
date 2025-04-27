import { pgTable, uuid, timestamp, pgEnum, text } from "drizzle-orm/pg-core";

export const notifType = pgEnum("notifType", ["email", "sms"]);
export const notification = pgTable("notification", {
  notificationId: uuid("notificationId").primaryKey().defaultRandom(),
  changeRequestId: uuid("changeRequestId"),
  notifType: notifType("notifType").default("email"),
  notifContent: text("notifContent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
