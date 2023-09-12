import { z } from "zod";

import { updateCourseSchema } from "@/db/schema/course";

export const toUpdateCourseSchema = updateCourseSchema.transform((val) => ({
  ...val,
  description: val.description || undefined,
  image: val.image || undefined,
  rating: val.rating || undefined,
  reviews: val.reviews || undefined,
  price: val.price || undefined,
}));
