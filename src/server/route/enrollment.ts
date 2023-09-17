import { z } from "zod";

import {
  createEnrollment,
  deleteEnrollment,
  updateEnrollment,
} from "@/lib/api/enrollment/mutations";
import {
  getEnrollments,
  getUserEnrollments,
  isUserEnrolledToCourse,
} from "@/lib/api/enrollment/queries";
import {
  insertEnrollmentSchema,
  updateEnrollmentSchema,
} from "@/db/schema/enrollment";

import { protectedProcedure, router } from "../trpc";

export const enrollmentRouter = router({
  getAll: protectedProcedure.query(() => getEnrollments()),
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
  update: protectedProcedure
    .input(z.object({ id: z.string(), data: updateEnrollmentSchema }))
    .mutation(({ input }) => updateEnrollment(input.data, input.id)),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => deleteEnrollment(input.id)),
});
