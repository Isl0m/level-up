"use client";

import Link from "next/link";

import { route } from "@/lib/config";
import { Button } from "@ui/button";
import { Heading } from "@ui/heading";
import { trpc } from "@/app/_trpc/client";

import { columns } from "./column";
import { DataTable } from "./data-table";

export function LectureTable() {
  const { data, refetch } = trpc.lecture.getAllWithCourse.useQuery();
  const { data: coursesCount, isSuccess } = trpc.course.getCount.useQuery();

  if (isSuccess && coursesCount === undefined) return <AddCourses />;

  if (data) return <DataTable data={data} columns={columns(refetch)} />;
  else return <p>Loading...</p>;
}

function AddCourses() {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-8 rounded-xl border bg-card text-center text-card-foreground shadow">
      <Heading variant={"h3"}>
        To add lectures you need to add courses first
      </Heading>
      <Button asChild>
        <Link href={route.dashboard.course.create}>Add course</Link>
      </Button>
    </div>
  );
}
