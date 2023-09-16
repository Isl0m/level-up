import { eq } from "drizzle-orm";

import { db } from "@/db";
import { courses } from "@/db/schema/course";
import { Lecture, lectures } from "@/db/schema/lecture";

const preparedGetAllLectures = db
  .select()
  .from(lectures)
  .prepare("get-all-lectures");

export function getLectures(): Promise<Lecture[]> {
  return preparedGetAllLectures.execute();
}

export async function getLecturesAndCourse() {
  let data = await db
    .select()
    .from(lectures)
    .leftJoin(courses, eq(courses.id, lectures.courseId))
    .then((res) => res);

  return data.map(({ lectures, courses }) => ({
    ...lectures,
    course: courses,
  }));
}

export function getLectureById(id: string): Promise<Lecture | null> {
  return db
    .select()
    .from(lectures)
    .where(eq(lectures.id, id))
    .then((res) => res[0] ?? null);
}

export function getLecturesByCourseId(id: string): Promise<Lecture[]> {
  return db
    .select()
    .from(lectures)
    .where(eq(lectures.courseId, id))
    .orderBy(lectures.order)
    .then((res) => res);
}
