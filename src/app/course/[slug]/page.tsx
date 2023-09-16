import Image from "next/image";
import { redirect } from "next/navigation";

import { getCourseBySlug } from "@/lib/api/course/queries";
import { route } from "@/lib/config";
import { Heading } from "@ui/heading";

import { GetCourse } from "./get-course";

export default async function Course({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    redirect(route.home);
  }

  return (
    <main className="container py-8">
      <Heading>{course.title}</Heading>
      <div className="flex items-center gap-8">
        <p className="mt-4 basis-1/2 text-foreground">{course.description}</p>
        {course.image && (
          <Image
            src={course.image}
            alt={course.title}
            width={400}
            height={300}
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">${course.price}</span>
        <GetCourse courseId={course.id} />
      </div>
    </main>
  );
}
