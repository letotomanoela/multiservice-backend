import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  usersId: uuid("usersId").primaryKey().defaultRandom(),
  fullname: varchar("fullname", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique(),
  address: varchar("address", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
export type Users = typeof users.$inferSelect;
