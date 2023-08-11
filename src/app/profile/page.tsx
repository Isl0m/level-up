import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Heading } from "@ui/heading"

export default async function Profile() {
  const session = await getServerSession()
  if (!session) {
    redirect("/home")
  }
  const { user } = session

  return (
    <main className="container py-8">
      <div className="flex items-center gap-2">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || undefined}
          />
          <AvatarFallback>{user.name?.[0] || undefined}</AvatarFallback>
        </Avatar>
        <div>
          <Heading variant={"h3"}>{user.name}</Heading>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </main>
  )
}
