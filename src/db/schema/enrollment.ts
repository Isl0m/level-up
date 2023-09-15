import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { courses } from "./course";
import { users } from "./user";

export const enrollments = pgTable("enrollments", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: text("courseId")
    .unique()
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  enrollmentDate: timestamp("enrollmentDate").defaultNow(),
});

export const insertEnrollmentSchema = createInsertSchema(enrollments);
export const selectEnrollmentSchema = createSelectSchema(enrollments);

export type Enrollment = z.infer<typeof selectEnrollmentSchema>;
export type NewEnrollment = z.infer<typeof insertEnrollmentSchema>;
