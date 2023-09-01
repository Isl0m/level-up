import { courseRouter } from "./route/course"
import { lectureRouter } from "./route/lecture"
import { userRouter } from "./route/user"
import { router } from "./trpc"

export const appRouter = router({
  course: courseRouter,
  lecture: lectureRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
