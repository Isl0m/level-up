import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { Course, courses } from "@/db/schema/course";
import { Enrollment, enrollments } from "@/db/schema/enrollment";
import { User, users } from "@/db/schema/user";

type EnrollmentWithCourse = Enrollment & {
  course: Course;
};
type PopulatedEnrollment = Enrollment & {
  course: Course;
  user: User;
};

export async function getEnrollments(): Promise<PopulatedEnrollment[]> {
  try {
    const populatedEnrollments = await db
      .select()
      .from(enrollments)
      .innerJoin(courses, eq(courses.id, enrollments.courseId))
      .innerJoin(users, eq(users.id, enrollments.userId));

    return populatedEnrollments.map(({ enrollments, courses, users }) => ({
      ...enrollments,
      course: courses,
      user: users,
    }));
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at getUserEnrollments", message);
    throw { error: message };
  }
}

export function getEnrollmentsCount(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(enrollments)
    .then((res) => res[0].count);
}

export function getEnrollmentsCountLastMonth(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(enrollments)
    .where(sql`"enrollmentDate" > now() - interval '1 month'`)
    .then((res) => res[0].count);
}

export function getRevenue(): Promise<number> {
  return db
    .select({ earnings: sql<number>`sum("price")`.mapWith(Number) })
    .from(enrollments)
    .innerJoin(courses, eq(courses.id, enrollments.courseId))
    .then((res) => res[0].earnings);
}

export function getRevenueLastMonth(): Promise<number> {
  return db
    .select({ earnings: sql<number>`sum("price")`.mapWith(Number) })
    .from(enrollments)
    .where(sql`"enrollmentDate" > now() - interval '1 month'`)
    .innerJoin(courses, eq(courses.id, enrollments.courseId))
    .then((res) => res[0].earnings);
}

export async function getUserEnrollments(
  userId: string
): Promise<EnrollmentWithCourse[]> {
  try {
    const userEnrollments = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.userId, userId))
      .innerJoin(courses, eq(courses.id, enrollments.courseId));

    return userEnrollments.map(({ enrollments, courses }) => ({
      ...enrollments,
      course: courses,
    }));
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at getUserEnrollments", message);
    throw { error: message };
  }
}

export async function getOnlyEnrollmentById(id: string): Promise<Enrollment> {
  try {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, id));

    return enrollment;
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at getOnlyEnrollmentById", message);
    throw { error: message };
  }
}

export async function getEnrollmentById(
  id: string
): Promise<EnrollmentWithCourse> {
  try {
    const [result] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, id))
      .innerJoin(courses, eq(courses.id, enrollments.courseId));

    const { courses: course, enrollments: enrollment } = result;

    return { ...enrollment, course };
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at getEnrollmentById", message);
    throw { error: message };
  }
}

export async function isUserEnrolledToCourse(
  userId: string,
  courseId: string
): Promise<boolean> {
  try {
    const [result] = await db
      .select()
      .from(enrollments)
      .where(
        and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId))
      );

    return Boolean(result);
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at isUserEnrolledToCourse", message);
    throw { error: message };
  }
}
