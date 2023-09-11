import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Course, courses, NewCourse, UpdateCourse } from "@/db/schema/course";

export function createCourse(data: NewCourse): Promise<Course> {
  return db
    .insert(courses)
    .values({ ...data, id: crypto.randomUUID() })
    .returning()
    .then((res) => res[0]);
}

export function updateCourse(
  course: UpdateCourse,
  courseId: string
): Promise<Course> {
  return db
    .update(courses)
    .set(course)
    .where(eq(courses.id, courseId))
    .returning()
    .then((res) => res[0]);
}

export function deleteCourse(id: string): Promise<Course> {
  return db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning()
    .then((res) => res[0] ?? null);
}
