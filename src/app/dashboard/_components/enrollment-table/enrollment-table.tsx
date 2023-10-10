"use client";

import { Skeleton } from "@ui/skeleton";
import { trpc } from "@/app/_trpc/client";

import { columns } from "./column";
import { DataTable } from "./data-table";

export function EnrollmentTable() {
  const { data, refetch } = trpc.enrollment.getAll.useQuery();

  if (data) return <DataTable data={data} columns={columns(refetch)} />;
  else return <Skeleton className="h-[50vh] w-full rounded-md" />;
}
