"use client"

import { ColumnDef } from "@tanstack/react-table"

import { User } from "@/db/schema"

import { DataTableColumnHeader } from "./data-table-column-header"
import { UserRoleChanger } from "./user-role-changer"

type Column = Omit<User, "createdAt" | "emailVerified"> & {
  createdAt: string | null
  emailVerified: string | null
}

export const columns: ColumnDef<Column>[] = [
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
      return (
        <UserRoleChanger role={row.original.role} userId={row.original.id} />
      )
    },
  },
]
