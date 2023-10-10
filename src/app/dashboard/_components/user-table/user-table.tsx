"use client";

import { Skeleton } from "@ui/skeleton";
import { trpc } from "@/app/_trpc/client";

import { columns } from "./column";
import { DataTable } from "./data-table";

export function UserTable() {
  const { data, refetch } = trpc.user.getAll.useQuery();

  if (data)
    return <DataTable data={data} columns={columns} refetch={refetch} />;
  else return <Skeleton className="h-[50vh] w-full rounded-md" />;
}
