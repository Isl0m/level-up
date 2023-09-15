import { db } from "@/db";
import { Enrollment, enrollments, NewEnrollment } from "@/db/schema/enrollment";

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
