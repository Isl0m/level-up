"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { route } from "@/lib/config";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { trpc } from "@/app/_trpc/client";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  id: string;
  refetch: unknown;
}

export function DataTableRowActions<TData>({
  row,
  id,
  refetch,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const { mutateAsync: deleteEnrollment } =
    trpc.enrollment.delete.useMutation();

  const handleDeleteItem = async () => {
    const isYes = confirm("Do you really want to delete");
    if (isYes) {
      await deleteEnrollment({ id });

      if (typeof refetch === "function") {
        refetch();
      }
    }
  };
  const handleEditItem = () => {
    router.push(route.dashboard.enrollment.edit + `?id=${id}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEditItem}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteItem}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
