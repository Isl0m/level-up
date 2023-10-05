"use client";

import Link from "next/link";
import { Icons } from "@components/icons";
import { toast } from "sonner";

import { route } from "@/lib/config";
import { Button } from "@ui/button";
import { trpc } from "@/app/_trpc/client";
import { NewEnrollment } from "@/db/schema/enrollment";

export function GetCourse(data: Omit<NewEnrollment, "userId" | "id">) {
  const { mutateAsync: getCourse, isLoading } =
    trpc.enrollment.create.useMutation({
      onSuccess: () => {
        toast.success("Enrollment created successfully");
      },
      onError: (error) => {
        toast.error("Error creating enrollment");
      },
    });
  const { data: isUserEnrolled } = trpc.enrollment.isUserEnrolled.useQuery({
    courseId: data.courseId,
  });

  if (isUserEnrolled) {
    return (
      <Button asChild>
        <Link href={route.enrollment.self}>Go to course</Link>
      </Button>
    );
  }

  return (
    <Button disabled={isLoading} onClick={() => getCourse(data)}>
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Get Course
    </Button>
  );
}
