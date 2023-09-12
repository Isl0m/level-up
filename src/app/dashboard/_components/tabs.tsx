"use client";

import { useRouter } from "next/navigation";

import { route } from "@/lib/config";
import { capitalize } from "@/lib/utils";
import { TabsList, TabsTrigger } from "@ui/tabs";

type Props = {
  tabs: readonly string[];
};

export function DashboardTabList({ tabs }: Props) {
  const { push } = useRouter();

  const handleClick = (tab: string) => () =>
    push(`${route.dashboard.self}?tab=${tab}`);

  return (
    <TabsList>
      {tabs.map((tab) => (
        <TabsTrigger key={tab} value={tab} onClick={handleClick(tab)}>
          {capitalize(tab)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
