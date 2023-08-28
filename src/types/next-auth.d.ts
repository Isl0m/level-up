import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

import { UserRole } from "@/db/schema"

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: UserRole
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: UserRole
  }
  interface Session {
    user: User & {
      id: string
      role?: UserRole
    }
  }
}
