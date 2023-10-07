import Link from "next/link";
import { CourseCard } from "@components/course-card";
import { ArrowRight } from "lucide-react";

import { getCourses } from "@/lib/api/course/queries";
import { route } from "@/lib/config";
import { buttonVariants } from "@ui/button";
import { Heading } from "@/components/ui/heading";

export default async function Home() {
  const courses = await getCourses();

  return (
    <main className="container mb-16 flex flex-col items-center gap-12">
      <section className="flex flex-col items-center gap-4 pt-28">
        <div className="mx-auto max-w-fit rounded-full border border-gray-200 px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-slate-700">
            Level Up in public!
          </p>
        </div>
        <Heading className="max-w-3xl text-center">
          Next level online <span className="text-blue-700">learning</span>{" "}
          experience
        </Heading>
        <p className="max-w-prose text-foreground">
          Level Up is an online learning platform that offers a wide range of
          courses to help you reach your next level. Whether you&apos;re looking
          to upskill or reskill for the future.
        </p>
        <div>
          <Link href={route.signin} className={buttonVariants()}>
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {courses.length > 0 && (
        <section className="w-full">
          <Heading variant={"h2"} className="font-bold">
            Courses
          </Heading>
          <div className="mt-4 grid  grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
            {courses.slice(0, 3).map((course) => (
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
