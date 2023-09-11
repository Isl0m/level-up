import { z } from "zod";

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
  }));
