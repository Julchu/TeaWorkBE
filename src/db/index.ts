import { drizzle } from "drizzle-orm/postgres-js";
import { userTable } from "./schemas/user.schema.js";

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production",
  },
  schema: {
    userTable,
  },
});
