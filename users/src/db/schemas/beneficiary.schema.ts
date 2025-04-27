import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const beneficiary = pgTable("beneficiary", {
  beneficiaryId: uuid("beneficiaryId").primaryKey().defaultRandom(),
  usersId: uuid("usersId").references(() => users.usersId, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Beneficiary = typeof beneficiary.$inferSelect;
