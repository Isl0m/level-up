import { z } from "zod";

import {
  createLecture,
  deleteLecture,
  updateLecture,
} from "@/lib/api/lecture/mutations";
import {
  getLectureById,
  getLectures,
  getLecturesAndCourse,
} from "@/lib/api/lecture/queries";
import { insertLectureSchema, updateLectureSchema } from "@/db/schema/lecture";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const lectureRouter = router({
  getAll: publicProcedure.query(async () => await getLectures()),
  getAllWithCourse: publicProcedure.query(
    async () => await getLecturesAndCourse()
  ),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => await getLectureById(input.id)),
  create: protectedProcedure
    .input(insertLectureSchema)
    .mutation(async ({ input }) => await createLecture(input)),
  update: protectedProcedure
    .input(z.object({ id: z.string(), data: updateLectureSchema }))
    .mutation(async ({ input }) => await updateLecture(input.data, input.id)),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => await deleteLecture(input.id)),
});
