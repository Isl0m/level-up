import { getCourses } from "@/db/queries"

import { columns } from "./column"
import { DataTable } from "./data-table"

export async function CourseTable() {
  const data = await getCourses()
  return <DataTable data={data} columns={columns} />
}
