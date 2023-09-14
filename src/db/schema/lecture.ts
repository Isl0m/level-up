import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { toOptional } from "@/lib/helpers";

import { courses } from "./course";

export const lectures = pgTable("lectures", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  video: text("video"),
  duration: integer("duration"),
  courseId: text("courseId")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});

export const selectLectureSchema = createSelectSchema(lectures, {
  duration: z.number(),
});
export const insertLectureSchema = createInsertSchema(lectures, {
  duration: z.number(),
});
export const updateLectureSchema = toOptional(selectLectureSchema);

export type Lecture = z.infer<typeof selectLectureSchema>;
export type NewLecture = z.infer<typeof insertLectureSchema>;
export type UpdateLecture = z.infer<typeof updateLectureSchema>;
