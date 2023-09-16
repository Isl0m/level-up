import { z } from "zod";

import { createEnrollment } from "@/lib/api/enrollment/mutations";
import {
  getEnrollmentById,
  getEnrollments,
  getUserEnrollments,
  isUserEnrolledToCourse,
} from "@/lib/api/enrollment/queries";
import { insertEnrollmentSchema } from "@/db/schema/enrollment";

import { protectedProcedure, router } from "../trpc";

export const enrollmentRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => getEnrollments()),
  get: protectedProcedure.query(({ ctx }) =>
    getUserEnrollments(ctx.session.user.id)
  ),
  isUserEnrolled: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(({ ctx, input }) =>
      isUserEnrolledToCourse(ctx.session.user.id, input.courseId)
    ),
  create: protectedProcedure
    .input(insertEnrollmentSchema.omit({ userId: true, id: true }))
    .mutation(({ input, ctx }) =>
      createEnrollment({ ...input, userId: ctx.session.user.id })
    ),
});
