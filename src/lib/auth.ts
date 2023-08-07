import { db } from "@/db";
import { DrizzleAdapter } from "@/db/drizzle-adapter";
import { env } from "@/env.mjs";
import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log(token, user);

      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.image,
        };
      }

      return token;
    },
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
