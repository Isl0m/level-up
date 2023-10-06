import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Course } from "@/db/schema/course";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card>
      <CardHeader className="p-4">
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
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle>{course.title}</CardTitle>
        <p className="mt-4 text-gray-600">${course.price}</p>
      </CardContent>
    </Card>
  );
}
