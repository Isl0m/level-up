"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Course } from "@/db/schema/course";
import { Enrollment } from "@/db/schema/enrollment";
import { User } from "@/db/schema/user";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

type Column = Enrollment & {
  course: Course;
  user: User;
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
    header: "User Email",
    cell: ({ row }) => {
      const user = row.original.user;
      return user.email;
    },
  },
  {
    header: "User Name",
    cell: ({ row }) => {
      const user = row.original.user;
      return user.name || "Null";
    },
  },
  {
    header: "Course",
    cell: ({ row }) => {
      const course = row.original.course;
      return course.title;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions id={row.original.id} row={row} refetch={refetch} />
    ),
  },
];
