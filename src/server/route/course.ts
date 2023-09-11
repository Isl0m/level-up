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

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const courseRouter = router({
  getCount: publicProcedure.query(async () => await getCoursesCount()),
  getAll: publicProcedure.query(async () => await getCourses()),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => await getCourseById(input.id)),
  create: protectedProcedure
    .input(insertCourseSchema)
    .mutation(async ({ input }) => await createCourse(input)),
  update: protectedProcedure
    .input(z.object({ id: z.string(), data: updateCourseSchema }))
    .mutation(async ({ input }) => await updateCourse(input.data, input.id)),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => await deleteCourse(input.id)),
});
