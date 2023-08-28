import { capitalize } from "@/lib/utils"
import { Heading } from "@ui/heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs"

import { AnalyticsCards } from "./components/analytics/card"
import { CourseTable } from "./components/course-table/course-table"
import { UserTable } from "./components/user-table/user-table"

export const dynamic = "force-dynamic"
const tabs = [
  "analytics",
  "users",
  "courses",
  "reports",
  "notifications",
] as const

export default async function Dashboard() {
  return (
    <main className="container space-y-4 py-8">
      <Heading variant={"h2"}>Dashboard</Heading>
      <Tabs defaultValue={tabs[1]} className="space-y-4">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {capitalize(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="analytics">
          {/* @ts-expect-error Server Component */}
          <AnalyticsCards />
        </TabsContent>
        <TabsContent value="users">
          <UserTable />
        </TabsContent>
        <TabsContent value="courses">
          <CourseTable />
        </TabsContent>
      </Tabs>
    </main>
  )
}
