import { z } from "zod";

import { SearchParamsProps } from "@/lib/utils";
import { Heading } from "@ui/heading";
import { Tabs, TabsContent } from "@ui/tabs";

import { AnalyticsCards } from "./_components/analytics/card";
import { CourseTable } from "./_components/course-table/course-table";
import { EnrollmentTable } from "./_components/enrollment-table/enrollment-table";
import { LectureTable } from "./_components/lecture-table/lecture-table";
import { DashboardTabList } from "./_components/tabs";
import { UserTable } from "./_components/user-table/user-table";

export const dynamic = "force-dynamic";

const tabs = [
  "analytics",
  "users",
  "courses",
  "lectures",
  "enrollments",
  // "reports",
  // "notifications",
] as const;

const tabParser = z.enum(tabs).default("analytics");

export default async function Dashboard({ searchParams }: SearchParamsProps) {
  const tab = await tabParser.parseAsync(searchParams.tab);

  return (
    <main className="container space-y-4 py-8">
      <Heading variant={"h2"}>Dashboard</Heading>
      <Tabs defaultValue={tab} className="space-y-4">
        <DashboardTabList tabs={tabs} />
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
        <TabsContent value="lectures">
          <LectureTable />
        </TabsContent>
        <TabsContent value="enrollments">
          <EnrollmentTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
