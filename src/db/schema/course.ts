import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { toOptional } from "@/lib/helpers";

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
  rating: z.number(),
  reviews: z.number(),
  price: z.number(),
});
export const selectCourseSchema = createSelectSchema(courses, {
  rating: z.number(),
  reviews: z.number(),
  price: z.number(),
});
export const updateCourseSchema = toOptional(selectCourseSchema);

export type Course = z.infer<typeof selectCourseSchema>;
export type NewCourse = z.infer<typeof insertCourseSchema>;
export type UpdateCourse = z.infer<typeof updateCourseSchema>;
