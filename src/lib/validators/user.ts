import { z } from "zod"

export const updateUserSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email().optional(),
  surname: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  role: z.enum(["user", "admin"]).optional(),
})

export type UpdateUser = z.infer<typeof updateUserSchema>
