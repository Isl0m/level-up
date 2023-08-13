import { createCourseSchema } from "@/lib/validators/user"
import { createCourse } from "@/db/queries"

export async function POST(request: Request) {
  const req = await request.json()

  try {
    const data = createCourseSchema.parse(req)

    const course = await createCourse(data)

    return new Response(JSON.stringify(course), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 400 })
  }
}
