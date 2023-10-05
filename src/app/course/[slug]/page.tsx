import Image from "next/image";
import { redirect } from "next/navigation";

import { getCourseBySlug } from "@/lib/api/course/queries";
import { getLecturesByCourseId } from "@/lib/api/lecture/queries";
import { route } from "@/lib/config";
import { Heading } from "@ui/heading";

import { GetCourse } from "./get-course";

export default async function Course({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);
  if (course === null) {
    redirect(route.course.self);
  }
  const lectures = await getLecturesByCourseId(course.id);

  if (!course) {
    redirect(route.home);
  }

  return (
    <main className="container py-8">
      <Heading>{course.title}</Heading>
      <div className="flex items-center gap-8">
        <p className="mt-4 basis-1/2 text-foreground">{course.description}</p>
        {course.image && (
          <div className="relative h-48 w-80 overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">${course.price}</span>
        <GetCourse courseId={course.id} />
      </div>
      {lectures.length > 0 && (
        <div className="mt-8">
          <Heading variant={"h4"}>Lectures</Heading>
          <ul className="mt-4">
            {lectures.map((lecture) => (
              <li key={lecture.id}>
                {lecture.order} - {lecture.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
