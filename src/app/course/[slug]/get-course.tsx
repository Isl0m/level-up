"use client";

import { Icons } from "@components/icons";

import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { NewEnrollment } from "@/db/schema/enrollment";

export function GetCourse(data: Omit<NewEnrollment, "userId" | "id">) {
  const { toast } = useToast();
  const { mutateAsync, isLoading } = trpc.enrollment.create.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Enrollment created successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error creating enrollment",
      });
    },
  });

  return (
    <Button disabled={isLoading} onClick={() => mutateAsync(data)}>
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Get Course
    </Button>
  );
}
