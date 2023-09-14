"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Course } from "@/db/schema/course";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = (refetch: unknown): ColumnDef<Course>[] => [
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
      return <DataTableColumnHeader column={column} title="title" />;
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Slug" />;
    },
  },
  {
    header: "Duration",
    cell: ({ row }) => row.original.duration || "Null",
  },
  {
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      if (!price) return "Null";
      return Intl.NumberFormat().format(price); // navigator.language
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions id={row.original.id} row={row} refetch={refetch} />
    ),
  },
];
