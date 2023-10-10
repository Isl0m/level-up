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
      <Heading className="mb-8">{course.title}</Heading>
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-start">
        <div className="basis-7/12">
          <p className="text-sm text-foreground lg:text-base">
            {course.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-muted-foreground">${course.price}</span>
            <GetCourse courseId={course.id} />
          </div>
        </div>
        {course.image && (
          <div className="relative aspect-video basis-5/12 overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        )}
      </div>

      {lectures.length > 0 && (
        <div className="mt-8">
          <Heading variant={"h3"}>Lectures</Heading>
          <ul className="mt-4 list-disc pl-4">
            {lectures.map((lecture) => (
              <li key={lecture.id}>{lecture.title}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
