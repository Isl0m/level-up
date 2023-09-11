import { genSalt, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { NewUser, UpdateUser, User, users } from "@/db/schema/user";

export async function createUser(data: NewUser): Promise<User> {
  try {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at createUser", message);
    throw { error: message };
  }
}

export async function createUserWithPassword(
  data: Omit<NewUser, "id"> & {
    password: string;
  }
): Promise<User> {
  const { password, ...user } = data;
  const salt = await genSalt(12);

  return db
    .insert(users)
    .values({
      ...user,
      id: crypto.randomUUID(),
      password: await hash(password, salt),
    })
    .returning()
    .then((res) => res[0]);
}

export function updateUser(user: UpdateUser, userId: string): Promise<User> {
  return db
    .update(users)
    .set(user)
    .where(eq(users.id, userId))
    .returning()
    .then((res) => res[0]);
}
