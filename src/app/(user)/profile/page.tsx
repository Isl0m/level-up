import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseCard } from "@components/course-card";
import { Library } from "lucide-react";

import { getUserEnrollments } from "@/lib/api/enrollment/queries";
import { getUserAuth } from "@/lib/auth";
import { route } from "@/lib/config";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Heading } from "@ui/heading";

export default async function Profile() {
  const { session } = await getUserAuth();
  if (!session) {
    redirect("/home");
  }
  const { user } = session;
  const userEnrollments = await getUserEnrollments(user.id);

  return (
    <main className="container py-8">
      <div className="flex items-center gap-2">
        <Link href={route.profile.edit.avatar}>
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || undefined}
            />
            <AvatarFallback className="text-3xl">
              {user.name?.[0] || undefined}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Heading variant={"h3"}>{user.name}</Heading>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {userEnrollments.length > 0 ? (
        <>
          <Heading variant={"h3"} className="mt-8">
            Course Enrollments
          </Heading>
          <div className="mt-4 flex gap-4">
            {userEnrollments.map(
              (enrollment) =>
                enrollment.course && (
                  <Link
                    href={`${route.enrollment.self}/${enrollment.id}`}
                    key={enrollment.id}
                  >
                    <CourseCard course={enrollment.course} />
                  </Link>
                )
            )}
          </div>
        </>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Library className="h-12 w-12" />
          <Heading variant={"h3"}>Pretty empty around here</Heading>
          <p>Let&apos;s add your first enrollment.</p>
        </div>
      )}
    </main>
  );
}
