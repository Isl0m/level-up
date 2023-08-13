"use client"

import { ColumnDef } from "@tanstack/react-table"

import { User } from "@/db/schema"

import { DataTableColumnHeader } from "./data-table-column-header"
import { UserRoleChanger } from "./user-role-changer"

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />
    },
  },
  {
    accessorKey: "Role",
    cell: ({ row }) => {
      return <UserRoleChanger role={row.original.role} />
    },
  },
]
