"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Course } from "@/db/schema/course";
import { Lecture } from "@/db/schema/lecture";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

type Column = Lecture & {
  course: Course | null;
};

export const columns = (refetch: unknown): ColumnDef<Column>[] => [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    header: "Course",
    cell: ({ row }) => row.original.course?.name || "Null",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions id={row.original.id} row={row} refetch={refetch} />
    ),
  },
];
