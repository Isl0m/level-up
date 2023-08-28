import { TRPCError } from "@trpc/server"
import { z, ZodError } from "zod"

import { createUserSchema } from "@/lib/validators/auth"
import { updateUserSchema } from "@/lib/validators/user"
import { createUserWithPassword, getUsers, updateUser } from "@/db/queries"

import { protectedProcedure, publicProcedure, router } from "../trpc"

export const userRouter = router({
  getAll: publicProcedure.query(async () => {
    try {
      const users = await getUsers()
      return users
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
    }
  }),
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      try {
        const user = await createUserWithPassword(input)
        return user
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
    .input(z.object({ id: z.string().optional(), data: updateUserSchema }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await updateUser(
          input.data,
          input.id || ctx.session.user.id
        )
        return user
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
