import { initTRPC, TRPCError } from "@trpc/server"

import { Context } from "./context"

const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return opts.next({
    ctx: {
      session: ctx.session,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
