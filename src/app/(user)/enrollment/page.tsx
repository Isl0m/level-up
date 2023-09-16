import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseCard } from "@components/course-card";

import { getUserEnrollments } from "@/lib/api/enrollment/queries";
import { getUserAuth } from "@/lib/auth";
import { route } from "@/lib/config";
import { Heading } from "@ui/heading";

export default async function Enrollments() {
  const { session } = await getUserAuth();
  if (!session) {
    redirect(route.profile);
  }
  const enrollments = await getUserEnrollments(session.user.id);

  return (
    <main className="container py-8">
      <Heading>Enrollments</Heading>
      <div className="mt-4 flex gap-4">
        {enrollments.map(
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
    </main>
  );
}
