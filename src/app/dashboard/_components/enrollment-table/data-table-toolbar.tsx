"use client";

import Link from "next/link";
import { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";

import { route } from "@/lib/config";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4">
      <Input
        placeholder="Filter title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Button variant="outline" className="border-dashed" asChild>
        <Link href={route.dashboard.enrollment.create}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Enrollment
        </Link>
      </Button>
    </div>
  );
}
