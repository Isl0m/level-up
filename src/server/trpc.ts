import { getUserByEmail } from "@/db/queries"
import { initTRPC, TRPCError } from "@trpc/server"
import { getServerSession } from "next-auth"

const t = initTRPC.create()

const isAuthed = t.middleware(async (opts) => {
    const session = await getServerSession()

    if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    if ((!session.user.id || !session.user.role) && session.user.email) {
        const user = await getUserByEmail(session.user.email)
        if (user) {
            session.user.id = user.id
            session.user.id = user.role
        }
    }

    return opts.next({
        ctx: {
            session,
        },
    })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
