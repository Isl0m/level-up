import { TRPCError } from "@trpc/server"
import { z, ZodError } from "zod"

import {
  createLectureSchema,
  updateLectureSchema,
} from "@/lib/validators/lecture"
import {
  createLecture,
  deleteLecture,
  getLectureById,
  getLectures,
  getLecturesWithCourse,
  updateLecture,
} from "@/db/queries"

import { protectedProcedure, publicProcedure, router } from "../trpc"

export const lectureRouter = router({
  getAll: publicProcedure.query(async () => {
    try {
      const lectures = await getLectures()
      return lectures
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }
  }),
  getAllWithCourse: publicProcedure.query(async () => {
    try {
      const lectures = await getLecturesWithCourse()
      return lectures
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const lecture = await getLectureById(input.id)
        return lecture
      } catch (error) {
        if (error instanceof ZodError)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          })
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }
    }),
  create: protectedProcedure
    .input(createLectureSchema)
    .mutation(async ({ input }) => {
      try {
        const lecture = await createLecture(input)
        return lecture
      } catch (error) {
        if (error instanceof ZodError)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          })
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), data: updateLectureSchema }))
    .mutation(async ({ input }) => {
      try {
        const lecture = await updateLecture(input.data, input.id)
        return lecture
      } catch (error) {
        if (error instanceof ZodError)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          })
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const lecture = await deleteLecture(input.id)
        return lecture
      } catch (error) {
        if (error instanceof ZodError)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          })
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }
    }),
})
