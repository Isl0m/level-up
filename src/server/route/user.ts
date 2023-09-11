import { z } from "zod";

import { createUserWithPassword, updateUser } from "@/lib/api/user/mutations";
import { getUsers } from "@/lib/api/user/queries";
import { insertUserSchema, updateUserSchema } from "@/db/schema/user";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
  getAll: publicProcedure.query(async () => await getUsers()),
  create: publicProcedure
    .input(
      insertUserSchema.omit({ password: true }).extend({ password: z.string() })
    )
    .mutation(async ({ input }) => await createUserWithPassword(input)),
  update: protectedProcedure
    .input(z.object({ id: z.string().optional(), data: updateUserSchema }))
    .mutation(
      async ({ ctx, input }) =>
        await updateUser(input.data, input.id || ctx.session.user.id)
    ),
});
