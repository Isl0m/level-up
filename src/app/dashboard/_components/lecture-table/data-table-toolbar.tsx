"use client";

import Link from "next/link";
import { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { z } from "zod";

import { route } from "@/lib/config";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

import { DataTableFacetedFilter } from "./data-table-faced-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const courseSchema = z.object({
  course: z.object({
    id: z.string(),
    title: z.string(),
  }),
});

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const courses = table
    .getColumn("course")
    ?.getFacetedRowModel()
    .rows.map((row) => row.original);
  const getCourseOptions = () => {
    if (!courses) return;
    let options = courses.map((course) => {
      const data = courseSchema.parse(course);
      return {
        value: data.course.id,
        label: data.course.title,
      };
    });
    const optionValues: string[] = [];
    options = options.filter((option) => {
      const isFound = optionValues.includes(option.label);
      if (!isFound) {
        optionValues.push(option.label);
        return true;
      }
      return false;
    });

    return options;
  };

  const courseOptions = getCourseOptions();
  return (
    <div className="flex items-center  py-4">
      <Input
        placeholder="Filter title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="mr-4 max-w-sm"
      />
      {table.getColumn("course") && courseOptions && (
        <DataTableFacetedFilter
          column={table.getColumn("course")}
          title="Course"
          options={courseOptions}
        />
      )}
      <Button variant="outline" className="ml-auto border-dashed" asChild>
        <Link href={route.dashboard.lecture.create}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Lecture
        </Link>
      </Button>
    </div>
  );
}
