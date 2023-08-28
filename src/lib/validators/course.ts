import { z } from "zod"

export const createCourseFormSchema = z.object({
  slug: z.string().min(3, { message: "Too short" }),
  name: z.string().min(3, { message: "Too short" }),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z
    .string()
    .transform((val) => Number(val.trim()))
    .pipe(z.number())
    .optional(),
})

export const createCourseSchema = z.object({
  slug: z.string().min(3, { message: "Too short" }),
  name: z.string().min(3, { message: "Too short" }),
  description: z.string().optional(),
  image: z.string().url().optional(),
  price: z.number().optional(),
})

export type CreateCourse = z.infer<typeof createCourseSchema>

export const updateCourseSchema = z.object({
  slug: z.string().min(3, { message: "Too short" }).optional(),
  name: z.string().min(3, { message: "Too short" }).optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  price: z.number().optional(),
})

export const toUpdateCourseSchema = z
  .object({
    slug: z.string().min(3, { message: "Too short" }),
    name: z.string().min(3, { message: "Too short" }),
    description: z.string().nullable(),
    image: z.string().url().nullable(),
    rating: z.number().nullable(),
    reviews: z.number().nullable(),
    price: z.number().nullable(),
  })
  .transform((val) => ({
    ...val,
    description: val.description || undefined,
    image: val.image || undefined,
    rating: val.rating || undefined,
    reviews: val.reviews || undefined,
    price: val.price || undefined,
  }))

export type UpdateCourse = z.infer<typeof updateCourseSchema>
