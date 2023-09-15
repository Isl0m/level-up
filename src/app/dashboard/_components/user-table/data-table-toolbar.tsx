"use client";

import Link from "next/link";
import { Table } from "@tanstack/react-table";
import { PlusCircle, RefreshCcw } from "lucide-react";

import { route } from "@/lib/config";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  refetch: () => void;
}

export function DataTableToolbar<TData>({
  table,
  refetch,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4">
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <div className="space-x-4">
        <Button variant="outline" className="border-dashed" onClick={refetch}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button variant="outline" className="border-dashed" asChild>
          <Link href={route.dashboard["create-user"]}>
            <PlusCircle className="mr-2 h-4 w-4" />
            User
          </Link>
        </Button>
      </div>
    </div>
  );
}
