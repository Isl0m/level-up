import { z } from "zod";

import { createUserWithPassword, updateUser } from "@/lib/api/user/mutations";
import { getUsers } from "@/lib/api/user/queries";
import { SUPABASE } from "@/lib/supabase";
import { insertUserSchema, updateUserSchema } from "@/db/schema/user";

import { protectedProcedure, publicProcedure, router } from "../trpc";

const createUserSchema = insertUserSchema
  .omit({ password: true, id: true })
  .extend({ password: z.string() });

export const userRouter = router({
  getAll: publicProcedure.query(async () => await getUsers()),
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => await createUserWithPassword(input)),
  update: protectedProcedure
    .input(z.object({ id: z.string().optional(), data: updateUserSchema }))
    .mutation(
      async ({ ctx, input }) =>
        await updateUser(input.data, input.id || ctx.session.user.id)
    ),
});
