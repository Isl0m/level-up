import { Adapter } from "next-auth/adapters";
import { DB } from ".";
import { accounts, sessions, users, verificationTokens } from "./schema";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";

export function DrizzleAdapter(db: DB): Adapter {
  return {
    createUser: (user) =>
      db
        .insert(users)
        .values({ id: createId(), ...user })
        .returning()
        .then((result) => result[0] ?? null),
    getUser: (id) =>
      db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1)
        .then((result) => result[0] ?? null),
    getUserByEmail: (email) =>
      db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .then((result) => result[0] ?? null),
    getUserByAccount: ({ provider, providerAccountId }) =>
      db
        .select()
        .from(users)
        .innerJoin(accounts, eq(users.id, accounts.id))
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider)
          )
        )
        .limit(1)
        .then((result) => result[0]?.users ?? null),
    updateUser: ({ id, ...data }) =>
      db
        .update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning()
        .then((result) => result[0] ?? null),
    deleteUser: async (userId) => {
      await db.delete(users).where(eq(users.id, userId));
    },
    linkAccount: async (account) => {
      await db.insert(accounts).values({
        id: createId(),
        ...account,
      });
    },
    unlinkAccount: async ({ provider, providerAccountId }) => {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        );
    },
    getSessionAndUser: (sessionToken) =>
      db
        .select({
          user: users,
          session: {
            id: sessions.id,
            userId: sessions.userId,
            sessionToken: sessions.sessionToken,
            expires: sessions.expires,
          },
        })
        .from(sessions)
        .innerJoin(users, eq(users.id, sessions.userId))
        .where(eq(sessions.sessionToken, sessionToken))
        .limit(1)
        .then((result) => result[0] ?? null),

    createSession: (data) =>
      db
        .insert(sessions)
        .values({ id: createId(), ...data })
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
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
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
        .returning();

      return verificationToken;
    },
  };
}
