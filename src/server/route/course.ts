import { z } from "zod";

import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/lib/api/course/mutations";
import {
  getCourseById,
  getCourses,
  getCoursesCount,
} from "@/lib/api/course/queries";
import { insertCourseSchema, updateCourseSchema } from "@/db/schema/course";

import { adminProcedure, publicProcedure, router } from "../trpc";

export const courseRouter = router({
  getCount: publicProcedure.query(async () => await getCoursesCount()),
  getAll: publicProcedure.query(async () => await getCourses()),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => await getCourseById(input.id)),

  // Only admins can update course
  create: adminProcedure
    .input(insertCourseSchema)
    .mutation(async ({ input }) => await createCourse(input)),
  update: adminProcedure
    .input(z.object({ id: z.string(), data: updateCourseSchema }))
    .mutation(async ({ input }) => await updateCourse(input.data, input.id)),
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => await deleteCourse(input.id)),
});
