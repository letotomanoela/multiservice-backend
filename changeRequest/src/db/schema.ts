import { varchar, timestamp, uuid, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const changeRequest = pgTable("changeRequest", {
  changeRequestId: uuid("changeRequestId").primaryKey().defaultRandom(),
  hrAdvisorId: uuid("hrAdvisorId"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const informations = pgTable("informations", {
  informationsId: uuid("informationsId").primaryKey().defaultRandom(),
  changeRequestId: uuid("changeRequestId").references(
    () => changeRequest.changeRequestId
  ),
  beneficiaryName: varchar("beneficiaryName", { length: 256 }).notNull(),
  beneficiaryAddress: varchar("beneficiaryAddress", { length: 256 }),
  beneficiaryPhone: varchar("beneficiaryPhone", { length: 15 }),
  beneficiaryEmail: varchar("beneficiaryEmail", { length: 256 }),
  beneficiaryId: uuid("beneficiaryId"),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const changeRequests = relations(changeRequest, ({ one, many }) => ({
  informations: one(informations),
}));

export const informationsRelations = relations(
  informations,
  ({ one, many }) => ({
    changeRequest: one(changeRequest, {
      fields: [informations.changeRequestId],
      references: [changeRequest.changeRequestId],
    }),
  })
);

export type Informations = typeof informations.$inferSelect;

export type ChangeRequest = typeof changeRequest.$inferSelect;
