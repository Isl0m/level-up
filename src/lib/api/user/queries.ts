import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { User, users } from "@/db/schema/user";

const preparedGetAllUsers = db
  .select()
  .from(users)
  .orderBy(users.createdAt)
  .prepare("get-all-users");

export function getUsers(): Promise<User[]> {
  return preparedGetAllUsers.execute();
}

export function getUsersCount(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(users)
    .then((res) => res[0].count);
}

export function getUsersCountLastMonth(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(users)
    .where(sql`"createdAt" > now() - interval '1 month'`)
    .then((res) => res[0].count);
}

export function getUserById(id: string): Promise<User | null> {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0] ?? null);
}

export function getUserByEmail(email: string): Promise<User | null> {
  return db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res[0] ?? null);
}
