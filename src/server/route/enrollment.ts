import { createEnrollment } from "@/lib/api/enrollment/mutations";
import { insertEnrollmentSchema } from "@/db/schema/enrollment";

import { protectedProcedure, router } from "../trpc";

export const enrollmentRouter = router({
  create: protectedProcedure
    .input(insertEnrollmentSchema.omit({ userId: true, id: true }))
    .mutation(({ input, ctx }) =>
      createEnrollment({ ...input, userId: ctx.session.user.id })
    ),
});
