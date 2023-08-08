import { z } from "zod"

export const authMethodSchema = z.enum(["signin", "signup"])

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" })

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters." })
  .max(100)
  .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/, {
    message: "Password must contain at least 6 characters and one number",
  })

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
})
