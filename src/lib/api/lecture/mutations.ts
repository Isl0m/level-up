import { eq } from "drizzle-orm";

import { db } from "@/db";
import { courses } from "@/db/schema/course";
import {
  Lecture,
  lectures,
  NewLecture,
  UpdateLecture,
} from "@/db/schema/lecture";

export function createLecture(data: NewLecture): Promise<Lecture> {
  return db
    .insert(lectures)
    .values({ ...data, id: crypto.randomUUID() })
    .returning()
    .then((res) => res[0]);
}

export function updateLecture(
  lecture: UpdateLecture,
  courseId: string
): Promise<Lecture> {
  return db
    .update(lectures)
    .set(lecture)
    .where(eq(courses.id, courseId))
    .returning()
    .then((res) => res[0]);
}

export function deleteLecture(id: string): Promise<Lecture> {
  return db
    .delete(lectures)
    .where(eq(lectures.id, id))
    .returning()
    .then((res) => res[0] ?? null);
}
