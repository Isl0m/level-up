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

export const createCourseFormSchema = z
  .object({
    slug: z.string().min(3, { message: "Too short" }),
    name: z.string().min(3, { message: "Too short" }),
    description: z.string().optional(),
    image: z.string().optional().nullable(),
    price: z
      .string()
      .transform((val) => Number(val.trim()))
      .pipe(z.number().min(0).max(10))
      .optional(),
  })
  .transform((val) => ({
    ...val,
    description: val.description ?? null,
    image: val.image ?? null,
    price: val.price ?? null,
  }))

export const createCourseSchema = z.object({
  slug: z.string().min(3, { message: "Too short" }),
  name: z.string().min(3, { message: "Too short" }),
  description: z.string().nullable(),
  image: z.string().nullable(),
  price: z
    .string()
    .transform((val) => Number(val.trim()))
    .pipe(z.number().min(0).max(10))
    .nullable(),
})

export type CreateCourse = z.infer<typeof createCourseSchema>
