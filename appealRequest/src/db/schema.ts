import { pgTable, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const appealRequestStatus = pgEnum("appealRequestStatus", [
  "pending",
  "approved",
  "rejected",
]);

export const appealRequestType = pgEnum("requestType", [
  "leave",
  "promotion",
  "other",
]);

export const appealRequest = pgTable("appealRequest", {
  requestId: uuid("requestId").primaryKey().defaultRandom(),
  requestDate: timestamp("requestDate").defaultNow().notNull(),
  requestStatus: appealRequestStatus("requestStatus")
    .default("pending")
    .notNull(),
  requestType: appealRequestType("requestType").default("other").notNull(),
  employesId: uuid("employesId"),
  hrAdvisorId: uuid("hrAdvisorId"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type AppealRequest = typeof appealRequest.$inferSelect;
