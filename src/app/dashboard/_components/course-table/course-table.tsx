"use client";

import { trpc } from "@/app/_trpc/client";

import { columns } from "./column";
import { DataTable } from "./data-table";

export function CourseTable() {
  const { data, refetch } = trpc.course.getAll.useQuery();

  if (data) return <DataTable data={data} columns={columns(refetch)} />;
  else return <p>Loading...</p>;
}
