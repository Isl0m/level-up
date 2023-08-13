import { z } from "zod"

export const createCourseFormSchema = z
  .object({
    slug: z.string().min(3, { message: "Too short" }),
    name: z.string().min(3, { message: "Too short" }),
    description: z.string().optional(),
    image: z.string().url().optional(),
    price: z
      .string()
      .transform((val) => Number(val.trim()))
      .pipe(z.number())
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
  price: z.number().nullable(),
})

export type CreateCourse = z.infer<typeof createCourseSchema>
