import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Course } from "@/db/schema/course";

export function CourseCard({ course }: { course: Course }) {
  return (
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
  );
}
