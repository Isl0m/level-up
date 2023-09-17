import Link from "next/link";
import { CourseCard } from "@components/course-card";

import { getCourses } from "@/lib/api/course/queries";
import { Heading } from "@/components/ui/heading";

export default async function Courses() {
  const courses = await getCourses();

  return (
    <main className="container py-8">
      <Heading>Courses</Heading>
      <div className="mt-8 flex gap-4">
        {courses.map((course) => (
          <Link href={`/course/${course.slug}`} key={course.id}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </main>
  );
}