"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Course } from "@/db/schema"

import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<Course>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Slug" />
    },
  },
  {
    header: "Rating",
    cell: ({ row }) => row.original.rating || "Null",
  },
  {
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price
      if (!price) return "Null"
      return Intl.NumberFormat(navigator.language).format(price)
    },
  },
]
