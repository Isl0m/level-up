import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Course, courses } from "@/db/schema/course";
import { Enrollment, enrollments } from "@/db/schema/enrollment";

type UserEnrollments = Enrollment & {
  course: Course | null;
};

export async function getUserEnrollments(
  userId: string
): Promise<UserEnrollments[]> {
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
