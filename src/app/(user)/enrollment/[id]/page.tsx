import Link from "next/link";
import { redirect } from "next/navigation";

import { getEnrollmentById } from "@/lib/api/enrollment/queries";
import { getLecturesByCourseId } from "@/lib/api/lecture/queries";
import { route } from "@/lib/config";
import { Badge } from "@ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Heading } from "@ui/heading";

export default async function Enrollment({
  params,
}: {
  params: { id: string };
}) {
  const enrollment = await getEnrollmentById(params.id);
  if (enrollment.course === null) {
    redirect(route.profile);
  }
  const { course } = enrollment;
  const lectures = await getLecturesByCourseId(course.id);
  return (
    <main className="container py-8">
      <Heading>{course.title}</Heading>
      <p className="my-4 text-foreground">{course.description}</p>

      <Heading variant={"h3"}>Lectures</Heading>
      <div className="mt-4 flex gap-4">
        {lectures.map((lecture) => (
          <Link
            key={lecture.id}
            href={`${route.enrollment.lecture.self}/${lecture.id}`}
          >
            <Card>
              <CardHeader>
                <CardTitle>{lecture.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">
                  {lecture.description}
                </p>
                <Badge>{lecture.order}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
