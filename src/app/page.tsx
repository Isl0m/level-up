import Link from "next/link";
import { CourseCard } from "@components/course-card";

import { getCourses } from "@/lib/api/course/queries";
import { Heading } from "@/components/ui/heading";

export default async function Home() {
  const courses = await getCourses();

  return (
    <main className="container space-y-8 py-8">
      <Heading>Level Up</Heading>
      {courses.length > 0 && (
        <section>
          <Heading variant={"h3"}>Courses</Heading>
          <div className="mt-4 flex gap-4">
            {courses.map((course) => (
              <Link href={`/course/${course.slug}`} key={course.id}>
                <CourseCard course={course} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
