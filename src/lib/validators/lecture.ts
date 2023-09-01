import { z } from "zod"

export const createLectureSchema = z.object({
  title: z.string().min(3, { message: "Too short" }),
  description: z.string().optional(),
  video: z.string().url().optional(),
  duration: z.number().optional(),
  courseId: z.string(),
})

export const updateLectureSchema = z.object({
  title: z.string().min(3, { message: "Too short" }).optional(),
  description: z.string().optional(),
  video: z.string().url().optional(),
  duration: z.number().optional(),
  courseId: z.string().optional(),
})

export type CreateLecture = z.infer<typeof createLectureSchema>
export type UpdateLecture = z.infer<typeof updateLectureSchema>
