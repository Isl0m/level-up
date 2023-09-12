import { create } from "domain";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { denullableObject, nullableToOptionalObject } from "@/lib/utils";

export const courses = pgTable("courses", {
  id: text("id").notNull().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  rating: integer("rating"),
  reviews: integer("reviews"),
  price: integer("price"),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const insertCourseSchema = createInsertSchema(courses, {
  rating: z.number().nullable(),
  reviews: z.number().nullable(),
  price: z.number().nullable(),
});
export const selectCourseSchema = createSelectSchema(courses, {
  rating: z.number().nullable(),
  reviews: z.number().nullable(),
  price: z.number().nullable(),
});
export const updateCourseSchema = selectCourseSchema;

export type Course = z.infer<typeof selectCourseSchema>;
export type NewCourse = z.infer<typeof insertCourseSchema>;
export type UpdateCourse = z.infer<typeof updateCourseSchema>;

export const insertCourseFormSchema = denullableObject(insertCourseSchema);
export const updateCourseFormSchema =
  nullableToOptionalObject(updateCourseSchema);
