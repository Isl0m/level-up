import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  Enrollment,
  enrollments,
  NewEnrollment,
  UpdateEnrollment,
} from "@/db/schema/enrollment";

export async function createEnrollment(
  data: Omit<NewEnrollment, "id">
): Promise<Enrollment> {
  try {
    const [enrollment] = await db
      .insert(enrollments)
      .values({ ...data, id: crypto.randomUUID() })
      .returning();
    return enrollment;
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at createEnrollment", message);
    throw { error: message };
  }
}

export async function updateEnrollment(
  data: UpdateEnrollment,
  enrollmentId: string
): Promise<Enrollment> {
  try {
    const [enrollment] = await db
      .update(enrollments)
      .set(data)
      .where(eq(enrollments.id, enrollmentId))
      .returning();

    return enrollment;
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at updateEnrollment", message);
    throw { error: message };
  }
}

export async function deleteEnrollment(id: string): Promise<Enrollment> {
  try {
    const [enrollment] = await db
      .delete(enrollments)
      .where(eq(enrollments.id, id))
      .returning();

    return enrollment;
  } catch (error) {
    const message = (error as Error).message ?? "Error, please try again";
    console.error("Error at createEnrollment", message);
    throw { error: message };
  }
}
