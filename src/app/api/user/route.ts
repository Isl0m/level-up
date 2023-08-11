import { createUserSchema } from "@/lib/validators/auth"
import { createUserWithPassword } from "@/db/queries"

export async function POST(request: Request) {
  const req = await request.json()

  try {
    const data = createUserSchema.parse(req)

    const user = await createUserWithPassword(data)

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 })
  }
}
