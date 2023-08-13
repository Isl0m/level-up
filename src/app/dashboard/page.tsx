import { Heading } from "@ui/heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs"

import { CourseTable } from "./components/course-table/course-table"
import { UserTable } from "./components/user-table/user-table"

export default function Dashboard() {
  return (
    <main className="container space-y-4 py-8">
      <Heading variant={"h2"}>Dashboard</Heading>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          {/* @ts-expect-error Server Component */}
          <UserTable />
        </TabsContent>
        <TabsContent value="courses">
          {/* @ts-expect-error Server Component */}
          <CourseTable />
        </TabsContent>
      </Tabs>
    </main>
  )
}
