import Link from "next/link";
import { CourseCard } from "@components/course-card";
import { SearchInput } from "@components/search-input";
import { z } from "zod";

import { getCourses } from "@/lib/api/course/queries";
import { SearchParamsProps } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";

export default async function Courses({ searchParams }: SearchParamsProps) {
  const query = await z
    .object({ query: z.string() })
    .transform(({ query }) => query)
    .safeParseAsync(searchParams);

  let courses = await getCourses();

  courses = courses.filter((course) => {
    if (query.success) {
      return (
        course.title.toLowerCase().includes(query.data) ||
        (course.description &&
          course.description.toLowerCase().includes(query.data))
      );
    }
    return true;
  });

  return (
    <main className="container mt-12 flex flex-col  gap-8">
      <div>
        <Heading variant={"h2"}>Search our catalog</Heading>
        <SearchInput />
      </div>
      <div className="">
        <Heading variant={"h2"}>Courses</Heading>
        <p>{courses.length} results on level up</p>
      </div>
      {/* FIX UI */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {courses.map((course) => (
          <Link href={`/course/${course.slug}`} key={course.id}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </main>
  );
}
