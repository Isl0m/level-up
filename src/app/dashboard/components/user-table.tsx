import { getUsers } from "@/db/queries"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export async function UserTable() {
  const data = await getUsers()
  return <DataTable data={data} columns={columns} />
}
