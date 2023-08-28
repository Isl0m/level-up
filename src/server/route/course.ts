import { TRPCError } from "@trpc/server"
import { z, ZodError } from "zod"

import { createCourseSchema, updateCourseSchema } from "@/lib/validators/course"
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from "@/db/queries"

import { protectedProcedure, publicProcedure, router } from "../trpc"

export const courseRouter = router({
  getAll: publicProcedure.query(async () => {
    try {
      const courses = await getCourses()
      return courses
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const course = await getCourseById(input.id)
        return course
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
    .input(createCourseSchema)
    .mutation(async ({ input }) => {
      try {
        const course = await createCourse(input)
        return course
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
    .input(z.object({ id: z.string(), data: updateCourseSchema }))
    .mutation(async ({ input }) => {
      try {
        const course = await updateCourse(input.data, input.id)
        return course
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
        const course = await deleteCourse(input.id)
        return course
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
