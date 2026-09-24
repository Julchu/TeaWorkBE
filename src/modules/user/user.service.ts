import { eq } from "drizzle-orm";
import { db } from "@/db/index.js";
import {
  type SelectPublicUser,
  userTable,
} from "@/db/schemas/user.schema.js";

const toPublicUser = ({
  id: _id,
  ...user
}: typeof userTable.$inferSelect): SelectPublicUser => user;

export const getUserById = async (userId?: number) => {
  if (userId === undefined) return;

  try {
    const user = await db.query.userTable.findFirst({
      where: (users) => eq(users.id, userId),
    });
    return user ? toPublicUser(user) : undefined;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};