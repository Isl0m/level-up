import { courseRouter } from "./route/course";
import { enrollmentRouter } from "./route/enrollment";
import { lectureRouter } from "./route/lecture";
import { userRouter } from "./route/user";
import { router } from "./trpc";

export const appRouter = router({
  course: courseRouter,
  lecture: lectureRouter,
  user: userRouter,
  enrollment: enrollmentRouter,
});

export type AppRouter = typeof appRouter;
