import { courseRouter } from "./route/course"
import { userRouter } from "./route/user"
import { router } from "./trpc"

export const appRouter = router({
    course: courseRouter,
    user: userRouter
})

export type AppRouter = typeof appRouter
