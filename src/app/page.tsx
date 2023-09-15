import Image from "next/image";
import Link from "next/link";

import { getCourses } from "@/lib/api/course/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Heading } from "@/components/ui/heading";

export default async function Home() {
  const courses = await getCourses();

  return (
    <main className="container py-8">
      <Heading>Level Up</Heading>
      <div className="mt-8 flex gap-4">
        {courses.map((course) => (
          <Link href={`/course/${course.slug}`} key={course.id}>
            <Card>
              <CardHeader>
                {course.image && (
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={300}
                    height={200}
                  />
                )}
              </CardHeader>
              <CardContent>
                <CardTitle>{course.title}</CardTitle>
                <p className="mt-4 text-gray-600">${course.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
