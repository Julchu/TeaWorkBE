import { jsonb, pgTable, unique, varchar } from "drizzle-orm/pg-core";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  type AutomaticFields,
  type PrivateFields,
  requiredColumns,
  timestamps,
} from "../utils/shared-schema.js";

export const userTable = pgTable(
  "users",
  {
    ...requiredColumns,
    email: varchar({ length: 255 }).unique().notNull(),
    name: varchar({ length: 255 }),
    image: varchar({ length: 255 }),
    metadata: jsonb().$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  (table) => [unique("unique_user_public_id").on(table.publicId)],
);

export type SelectUser = InferSelectModel<typeof userTable>;
export type InsertUser = InferInsertModel<typeof userTable>;
export type SelectPublicUser = Omit<SelectUser, PrivateFields>;
export type InsertPublicUser = Omit<
  InsertUser,
  PrivateFields | AutomaticFields
>;
