import { getServerSession } from "@/lib/auth"
import { updateUserSchema } from "@/lib/validators/user"
import { updateUser } from "@/db/queries"

export async function POST(request: Request) {
  const req = await request.json()

  try {
    const data = updateUserSchema.parse(req)
    const session = await getServerSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const updatedUser = await updateUser(data, session.user.id)

    return new Response(JSON.stringify(updatedUser), { status: 200 })
  } catch (error) {
    return new Response("Something went wrong", { status: 400 })
  }
}
