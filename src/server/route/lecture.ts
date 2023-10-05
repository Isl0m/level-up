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
import { getVideoDurationByLink } from "@/lib/youtube";
import { insertLectureSchema, updateLectureSchema } from "@/db/schema/lecture";

import { adminProcedure, publicProcedure, router } from "../trpc";

export const lectureRouter = router({
  getAll: publicProcedure.query(async () => await getLectures()),
  getAllWithCourse: publicProcedure.query(
    async () => await getLecturesAndCourse()
  ),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => await getLectureById(input.id)),

  // Only admins can update course

  create: adminProcedure
    .input(insertLectureSchema)
    .mutation(async ({ input }) => {
      const duration = input.video
        ? await getVideoDurationByLink(input.video)
        : null;

      if (duration) {
        input.duration = duration.seconds;
      }
      return createLecture(input);
    }),
  update: adminProcedure
    .input(z.object({ id: z.string(), data: updateLectureSchema }))
    .mutation(async ({ input }) => {
      const duration = input.data.video
        ? await getVideoDurationByLink(input.data.video)
        : null;

      if (duration) {
        input.data.duration = duration.seconds;
      }
      return updateLecture(input.data, input.id);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => await deleteLecture(input.id)),
});
