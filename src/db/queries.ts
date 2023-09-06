import { genSalt, hash } from "bcryptjs"
import { eq, sql } from "drizzle-orm"

import { CreateCourse, UpdateCourse } from "@/lib/validators/course"
import { CreateLecture, UpdateLecture } from "@/lib/validators/lecture"
import { UpdateUser } from "@/lib/validators/user"

import { db } from "./index"
import {
  Course,
  courses,
  Lecture,
  lectures,
  NewUser,
  User,
  users,
} from "./schema"

// USERS QUERIES

const preparedGetAllUsers = db
  .select()
  .from(users)
  .orderBy(users.createdAt)
  .prepare("get-all-users")

export function getUsers(): Promise<User[]> {
  return preparedGetAllUsers.execute()
}

export function getUsersCount(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .then((res) => res[0].count)
}

export function getUsersCountLastMonth(): Promise<number> {
  return db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(sql`"createdAt" > now() - interval '1 month'`)
    .then((res) => res[0].count)
}

export function getUserById(id: string): Promise<User | null> {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0] ?? null)
}

export function getUserByEmail(email: string): Promise<User | null> {
  return db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res[0] ?? null)
}

export function createUser(
  data: Omit<NewUser, "id" | "password">
): Promise<User> {
  return db
    .insert(users)
    .values({ ...data, id: crypto.randomUUID() })
    .returning()
    .then((res) => res[0])
}

export async function createUserWithPassword(
  data: Omit<NewUser, "id"> & {
    password: NonNullable<Required<NewUser>["password"]>
  }
): Promise<User> {
  const { password, ...user } = data
  const salt = await genSalt(12)

  return db
    .insert(users)
    .values({
      ...user,
      id: crypto.randomUUID(),
      password: await hash(password, salt),
    })
    .returning()
    .then((res) => res[0])
}

export function updateUser(
  user: UpdateUser,
  userId: User["id"]
): Promise<User> {
  return db
    .update(users)
    .set(user)
    .where(eq(users.id, userId))
    .returning()
    .then((res) => res[0])
}

// COURSES QUERIES

const preparedGetCoursesCount = db
  .select({ count: sql<number>`count(*)` })
  .from(courses)
  .prepare("get-courses-count")

export function getCoursesCount(): Promise<number> {
  return preparedGetCoursesCount.execute()
}

const preparedGetAllCourses = db
  .select()
  .from(courses)
  .orderBy(courses.createdAt)
  .prepare("get-all-courses")

export function getCourses(): Promise<Course[]> {
  return preparedGetAllCourses.execute()
}

export function getCourseById(id: string): Promise<Course | null> {
  return db
    .select()
    .from(courses)
    .where(eq(courses.id, id))
    .then((res) => res[0] ?? null)
}

export function createCourse(data: CreateCourse): Promise<Course> {
  return db
    .insert(courses)
    .values({ ...data, id: crypto.randomUUID() })
    .returning()
    .then((res) => res[0])
}

export function updateCourse(
  course: UpdateCourse,
  courseId: Course["id"]
): Promise<Course> {
  return db
    .update(courses)
    .set(course)
    .where(eq(courses.id, courseId))
    .returning()
    .then((res) => res[0])
}

export function deleteCourse(id: string): Promise<Course> {
  return db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning()
    .then((res) => res[0] ?? null)
}

// LECTURES QUERIES

const preparedGetAllLectures = db
  .select()
  .from(lectures)
  .prepare("get-all-lectures")

export function getLectures(): Promise<Lecture[]> {
  return preparedGetAllLectures.execute()
}

export function getLecturesWithCourse() {
  return db.query.lectures.findMany({
    with: {
      course: true,
    },
  })
}

export function getLectureById(id: string): Promise<Lecture | null> {
  return db
    .select()
    .from(lectures)
    .where(eq(lectures.id, id))
    .then((res) => res[0] ?? null)
}

export function createLecture(data: CreateLecture): Promise<Lecture> {
  return db
    .insert(lectures)
    .values({ ...data, id: crypto.randomUUID() })
    .returning()
    .then((res) => res[0])
}

export function updateLecture(
  lecture: UpdateLecture,
  courseId: Lecture["id"]
): Promise<Lecture> {
  return db
    .update(lectures)
    .set(lecture)
    .where(eq(courses.id, courseId))
    .returning()
    .then((res) => res[0])
}

export function deleteLecture(id: string): Promise<Lecture> {
  return db
    .delete(lectures)
    .where(eq(lectures.id, id))
    .returning()
    .then((res) => res[0] ?? null)
}
