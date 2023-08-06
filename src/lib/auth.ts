import { db } from "@/db";
import { DrizzleAdapter } from "@/db/drizzle-adapter";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ token, session }) {
      if (token) {
        console.log(token, session);
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log(token, user);
      const [dbUser] = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          picture: users.image,
        })
        .from(users)
        .where(eq(users.email, token.email || ""))
        .limit(1);

      if (dbUser) {
        return dbUser;
      }

      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        return user;
      },
    }),
  ],
};
