import { User } from "lucide-react";

import { getUsersCount, getUsersCountLastMonth } from "@/lib/api/user/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Heading } from "@ui/heading";

export async function AnalyticsCards() {
  const usersCount = await getUsersCount();
  const usersCountLastMonth = await getUsersCountLastMonth();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="max-w-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Total Users</CardTitle>
          <User className="h-6 w-6 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <Heading variant={"h3"}>{usersCount}</Heading>
          <p className="text-xs text-muted-foreground">
            +{usersCountLastMonth} from last month
          </p>
        </CardContent>
      </Card>
      <Card className="max-w-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Total Users</CardTitle>
          <User className="h-6 w-6 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <Heading variant={"h3"}>{usersCount}</Heading>
          <p className="text-xs text-muted-foreground">
            +{usersCountLastMonth} from last month
          </p>
        </CardContent>
      </Card>
      <Card className="max-w-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Total Users</CardTitle>
          <User className="h-6 w-6 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <Heading variant={"h3"}>{usersCount}</Heading>
          <p className="text-xs text-muted-foreground">
            +{usersCountLastMonth} from last month
          </p>
        </CardContent>
      </Card>
      <Card className="max-w-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Total Users</CardTitle>
          <User className="h-6 w-6 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <Heading variant={"h3"}>{usersCount}</Heading>
          <p className="text-xs text-muted-foreground">
            +{usersCountLastMonth} from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
