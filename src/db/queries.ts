import { genSalt, hash } from "bcryptjs"
import { eq } from "drizzle-orm"

import { UpdateUser } from "@/lib/validators/user"

import { db } from "./index"
import { NewUser, User, UserRole, users } from "./schema"

export function getUsers(): Promise<User[]> {
  return db.select().from(users)
}

export function getUserByEmail(email: string): Promise<User | null> {
  return db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res[0] ?? null)
}

export function createUser(
  data: Omit<NewUser, "id" | "password">
): Promise<User> {
  return db
    .insert(users)
    .values({ ...data, id: crypto.randomUUID() })
    .returning()
    .then((res) => res[0])
}

export async function createUserWithPassword(
  data: Omit<NewUser, "id"> & {
    password: NonNullable<Required<NewUser>["password"]>
  }
): Promise<User> {
  const { password, ...user } = data
  const salt = await genSalt(12)

  return db
    .insert(users)
    .values({
      ...user,
      id: crypto.randomUUID(),
      password: await hash(password, salt),
    })
    .returning()
    .then((res) => res[0])
}

export function updateUser(
  user: UpdateUser,
  userId: User["id"]
): Promise<User> {
  return db
    .update(users)
    .set(user)
    .where(eq(users.id, userId))
    .returning()
    .then((res) => res[0])
}
