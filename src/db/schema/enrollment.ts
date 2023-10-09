import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { toOptional } from "../../lib/helpers";
import { courses } from "./course";
import { users } from "./user";

export const enrollments = pgTable("enrollments", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: text("courseId")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  enrollmentDate: timestamp("enrollmentDate").defaultNow(),
});

export const insertEnrollmentSchema = createInsertSchema(enrollments);
export const selectEnrollmentSchema = createSelectSchema(enrollments);
export const updateEnrollmentSchema = toOptional(selectEnrollmentSchema);

export type Enrollment = z.infer<typeof selectEnrollmentSchema>;
export type NewEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type UpdateEnrollment = z.infer<typeof updateEnrollmentSchema>;
