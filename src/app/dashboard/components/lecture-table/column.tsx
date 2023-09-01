"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Course, Lecture } from "@/db/schema"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

type CourseColumn = Omit<Course, "createdAt"> & { createdAt: string | null }

type Column = Lecture & { course: CourseColumn }

export const columns = (refetch: unknown): ColumnDef<Column>[] => [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
  },
  {
    header: "Course",
    cell: ({ row }) => row.original.course.name,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions id={row.original.id} row={row} refetch={refetch} />
    ),
  },
]
