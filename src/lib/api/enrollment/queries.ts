import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Course, courses } from "@/db/schema/course";
import { Enrollment, enrollments } from "@/db/schema/enrollment";

type EnrollmentWithCourse = Enrollment & {
  course: Course | null;
};

export async function getUserEnrollments(
  userId: string
): Promise<EnrollmentWithCourse[]> {
  try {
    const userEnrollments = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.userId, userId))
      .leftJoin(courses, eq(courses.id, enrollments.courseId));

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

export async function getEnrollmentById(
  id: string
): Promise<EnrollmentWithCourse> {
  try {
    const [result] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, id))
      .leftJoin(courses, eq(courses.id, enrollments.courseId));

    const { courses: course, enrollments: enrollment } = result;

    return { ...enrollment, course };
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at getEnrollmentById", message);
    throw { error: message };
  }
}
