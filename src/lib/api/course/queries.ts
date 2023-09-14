import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { Course, courses } from "@/db/schema/course";

export function getCoursesCount(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(courses)
    .then((res) => res[0].count);
}

const preparedGetAllCourses = db
  .select()
  .from(courses)
  .orderBy(courses.createdAt)
  .prepare("get-all-courses");

export function getCourses(): Promise<Course[]> {
  return preparedGetAllCourses.execute();
}

export function getCourseById(id: string): Promise<Course | null> {
  return db
    .select()
    .from(courses)
    .where(eq(courses.id, id))
    .then((res) => res[0] ?? null);
}
