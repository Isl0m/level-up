import { Suspense } from "react";
import {
  BookOpen,
  BookOpenCheck,
  CircleDollarSign,
  DollarSign,
  User,
} from "lucide-react";

import {
  getCoursesCount,
  getCoursesCountLastMonth,
} from "@/lib/api/course/queries";
import {
  getEnrollmentsCount,
  getEnrollmentsCountLastMonth,
  getRevenue,
  getRevenueLastMonth,
} from "@/lib/api/enrollment/queries";
import {
  getUsers,
  getUsersCount,
  getUsersCountLastMonth,
} from "@/lib/api/user/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Heading } from "@ui/heading";

import { Overview } from "./overview";
import { RecentEnrollments } from "./recent-enrollments";

function separateDatesByMonth(dateObjects: Date[]) {
  const groupedDates: Record<number, Date[]> = {};

  for (const dateObject of dateObjects) {
    const month = dateObject.getMonth();

    if (!groupedDates[month]) {
      groupedDates[month] = [];
    }

    groupedDates[month].push(dateObject);
  }

  return groupedDates;
}

export async function AnalyticsCards() {
  const users = await getUsers();
  const usersCreatedAt = separateDatesByMonth(
    users.map((user) => user.createdAt)
  );

  const revenue = await getRevenue();
  const revenueLastMonth = await getRevenueLastMonth();

  const usersCount = await getUsersCount();
  const usersCountLastMonth = await getUsersCountLastMonth();

  const coursesCount = await getCoursesCount();
  const coursesCountLastMonth = await getCoursesCountLastMonth();

  const enrollmentsCount = await getEnrollmentsCount();
  const enrollmentsCountLastMonth = await getEnrollmentsCountLastMonth();

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="max-w-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-6 w-6 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <Heading variant={"h3"}>
              ${Intl.NumberFormat().format(revenue)}
            </Heading>
            <p className="text-xs text-muted-foreground">
              +${Intl.NumberFormat().format(revenueLastMonth)} this month
            </p>
          </CardContent>
        </Card>
        <Card className="max-w-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Total Users</CardTitle>
            <User className="h-6 w-6 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <Heading variant={"h3"}>{usersCount}</Heading>
            <p className="text-xs text-muted-foreground">
              +{usersCountLastMonth} this month
            </p>
          </CardContent>
        </Card>
        <Card className="max-w-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Total Courses
            </CardTitle>
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <Heading variant={"h3"}>{coursesCount}</Heading>
            <p className="text-xs text-muted-foreground">
              +{coursesCountLastMonth} this month
            </p>
          </CardContent>
        </Card>
        <Card className="max-w-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Total Enrollments
            </CardTitle>
            <BookOpenCheck className="h-6 w-6 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <Heading variant={"h3"}>{enrollmentsCount}</Heading>
            <p className="text-xs text-muted-foreground">
              +{enrollmentsCountLastMonth} this month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={usersCreatedAt} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made {enrollmentsCount} sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* @ts-expect-error Server Component */}
            <RecentEnrollments />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
