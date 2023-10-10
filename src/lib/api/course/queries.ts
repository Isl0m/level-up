import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { Course, courses } from "@/db/schema/course";

export function getCoursesCount(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(courses)
    .then((res) => res[0].count);
}

export function getCoursesCountLastMonth(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(courses)
    .where(sql`"createdAt" > now() - interval '1 month'`)
    .then((res) => res[0].count);
}

export function getCourses(): Promise<Course[]> {
  return db.select().from(courses).orderBy(courses.createdAt);
}

export function getCourseById(id: string): Promise<Course | null> {
  return db
    .select()
    .from(courses)
    .where(eq(courses.id, id))
    .then((res) => res[0] ?? null);
}

export function getCourseBySlug(slug: string): Promise<Course | null> {
  return db
    .select()
    .from(courses)
    .where(eq(courses.slug, slug))
    .then((res) => res[0] ?? null);
}
