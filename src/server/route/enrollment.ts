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

import { adminProcedure, protectedProcedure, router } from "../trpc";

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

  // All users can create enrollment
  create: protectedProcedure
    .input(insertEnrollmentSchema.omit({ userId: true, id: true }))
    .mutation(({ input, ctx }) =>
      createEnrollment({ ...input, userId: ctx.session.user.id })
    ),

  // Only admins can update enrollment
  update: adminProcedure
    .input(z.object({ id: z.string(), data: updateEnrollmentSchema }))
    .mutation(({ input }) => updateEnrollment(input.data, input.id)),
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => deleteEnrollment(input.id)),
});
