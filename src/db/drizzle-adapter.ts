import { and, eq } from "drizzle-orm"
import { Adapter } from "next-auth/adapters"

import { DB } from "."
import { createUser, getUserByEmail } from "./queries"
import { accounts, sessions, users, verificationTokens } from "./schema"

export function DrizzleAdapter(db: DB): Adapter {
  return {
    createUser: (user) => createUser({ id: crypto.randomUUID(), ...user }),
    getUser: (id) =>
      db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((result) => result[0] ?? null),
    getUserByEmail,
    getUserByAccount: async ({ provider, providerAccountId }) => {
      const dbAccount =
        (await db
          .select()
          .from(users)
          .innerJoin(accounts, eq(users.id, accounts.userId))
          .where(
            and(
              eq(accounts.providerAccountId, providerAccountId),
              eq(accounts.provider, provider)
            )
          )
          .then((result) => result[0])) ?? null

      if (!dbAccount) return null

      return dbAccount.user
    },
    updateUser: ({ id, ...data }) =>
      db
        .update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning()
        .then((result) => result[0] ?? null),
    deleteUser: async (userId) => {
      await db.delete(users).where(eq(users.id, userId))
    },
    linkAccount: async (account) => {
      await db.insert(accounts).values(account)
    },
    unlinkAccount: async ({ provider, providerAccountId }) => {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
    },
    getSessionAndUser: (sessionToken) =>
      db
        .select({
          user: users,
          session: sessions,
        })
        .from(sessions)
        .innerJoin(users, eq(users.id, sessions.userId))
        .where(eq(sessions.sessionToken, sessionToken))
        .then((result) => result[0] ?? null),

    createSession: (data) =>
      db
        .insert(sessions)
        .values(data)
        .returning()
        .then((result) => result[0] ?? null),
    updateSession: ({ sessionToken, ...data }) =>
      db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((result) => result[0] ?? null),
    deleteSession: async (sessionToken) => {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken))
    },
    createVerificationToken: (verificationToken) =>
      db
        .insert(verificationTokens)
        .values(verificationToken)
        .returning()
        .then((result) => result[0] ?? null),
    useVerificationToken: async ({ identifier, token }) => {
      const [verificationToken] = await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.token, token),
            eq(verificationTokens.identifier, identifier)
          )
        )
        .returning()

      return verificationToken
    },
  }
}
