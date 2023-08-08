import { createId } from "@paralleldrive/cuid2"
import { compare, genSalt, hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import {
  getServerSession as getNextAuthServerSession,
  type NextAuthOptions,
} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/db"
import { DrizzleAdapter } from "@/db/drizzle-adapter"
import { users } from "@/db/schema"
import { env } from "@/env.mjs"

import { authMethodSchema, signInSchema, signUpSchema } from "./validators/auth"

const drizzleAdapter = DrizzleAdapter(db)

export const authOptions: NextAuthOptions = {
  adapter: drizzleAdapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.image,
        }
      }

      return token
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
    CredentialsProvider({
      name: "Auth",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
        name: {
          label: "Name",
          type: "text",
        },
        method: {
          label: "Auth method",
          type: "text",
        },
      },
      async authorize(credentials) {
        try {
          const method = authMethodSchema.parse(credentials?.method)

          if (method === "signin") {
            const { email, password } = signInSchema.parse(credentials)

            const user = await db
              .select()
              .from(users)
              .where(eq(users.email, email))
              .limit(1)
              .then((result) => result[0] ?? null)
            if (!user) return null

            const isValid =
              user.password && (await compare(password, user.password))
            if (!isValid) return null

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            }
          }

          if (method === "signup") {
            const { email, password, name } = signUpSchema.parse(credentials)

            const salt = await genSalt(12)

            const user = await db
              .insert(users)
              .values({
                id: createId(),
                email,
                name,
                password: await hash(password, salt),
              })
              .returning()
              .then((result) => result[0] ?? null)

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            }
          }

          return null
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
}

export const getServerSession = () => getNextAuthServerSession(authOptions)
