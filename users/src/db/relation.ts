import { relations } from "drizzle-orm";
import { users } from "./schemas/user.schema";
import { beneficiary } from "./schemas/beneficiary.schema";
import { hrAdvisor } from "./schemas/hrAdvisor.schema";
import { employes } from "./schemas/employe.schema";

export const usersRelations = relations(users, ({ one }) => ({
  beneficiary: one(beneficiary),
  hrAdvisor: one(hrAdvisor),
  employe: one(employes),
}));

export const employesRelations = relations(employes, ({ one, many }) => ({
  user: one(users, {
    fields: [employes.usersId],
    references: [users.usersId],
  }),
}));

export const hrAdvisorRelations = relations(hrAdvisor, ({ one, many }) => ({
  user: one(users, {
    fields: [hrAdvisor.usersId],
    references: [users.usersId],
  }),
}));

export const beneficiaryRelations = relations(beneficiary, ({ one, many }) => ({
  user: one(users, {
    fields: [beneficiary.usersId],
    references: [users.usersId],
  }),
}));
