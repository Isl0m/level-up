import { redirect } from "next/navigation"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { compare } from "bcryptjs"
import {
  getServerSession as getNextAuthServerSession,
  type NextAuthOptions,
} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/db"
import {
  createUserWithPassword,
  getUserByEmail,
  getUserById,
} from "@/db/queries"
import { env } from "@/env.mjs"

import { authMethodSchema, signInSchema, signUpSchema } from "./validators/auth"

const drizzleAdapter = DrizzleAdapter(db)

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.image = token.picture
        session.user.role = token.role
      }
      return session
    },
    async jwt({ token, user }) {
      if (user && !user.role) {
        const res = await getUserById(user.id)
        const role = res?.role ?? "user"

        return {
          ...user,
          role,
        }
      }
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.image,
          role: user.role,
        }
      }

      return token
    },
  },
  // @ts-ignore
  adapter: drizzleAdapter,
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

            const user = await getUserByEmail(email)
            if (!user) return null

            const isValid =
              user.password && (await compare(password, user.password))
            if (!isValid) return null

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.role,
            }
          }

          if (method === "signup") {
            const data = signUpSchema.parse(credentials)

            const user = await createUserWithPassword(data)

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.role,
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

export const getUserAuth = async () => {
  const session = await getNextAuthServerSession(authOptions)
  return { session }
}

export const checkAuth = async () => {
  const { session } = await getUserAuth()
  if (!session) return redirect("api/auth/signin")
}
