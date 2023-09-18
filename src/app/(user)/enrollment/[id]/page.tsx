import Link from "next/link";
import { redirect } from "next/navigation";

import { getEnrollmentById } from "@/lib/api/enrollment/queries";
import { getLecturesByCourseId } from "@/lib/api/lecture/queries";
import { route } from "@/lib/config";
import { Badge } from "@ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Heading } from "@ui/heading";

import { LecturePlayer } from "./lecture-player";

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
      <p className="my-8 text-foreground">{course.description}</p>

      <LecturePlayer lectures={lectures} />
    </main>
  );
}
