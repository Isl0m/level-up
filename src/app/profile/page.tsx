import { redirect } from "next/navigation";
import { CourseCard } from "@components/course-card";

import { getUserEnrollments } from "@/lib/api/enrollment/queries";
import { getUserAuth } from "@/lib/auth";
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

      <Heading variant={"h3"} className="mt-8">
        Course Enrollments
      </Heading>
      <div className="mt-4 flex gap-4">
        {userEnrollments.map(
          (enrollment) =>
            enrollment.course && (
              <CourseCard course={enrollment.course} key={enrollment.id} />
            )
        )}
      </div>
    </main>
  );
}
