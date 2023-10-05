"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Textarea } from "@ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { updateEnrollmentSchema } from "@/db/schema/enrollment";

import { getDirtyFields } from "./helpers";

const inputSchema = updateEnrollmentSchema;
type Inputs = z.input<typeof inputSchema>;

export function EditEnrollmentForm({
  defaultValues,
  enrollmentId,
}: {
  defaultValues: Inputs;
  enrollmentId: string;
}) {
  const { back } = useRouter();
  const { mutateAsync: updateEnrollment, isLoading } =
    trpc.enrollment.update.useMutation();

  const { data: courses, isLoading: coursesLoading } =
    trpc.course.getAll.useQuery();
  const { data: users, isLoading: usersLoading } = trpc.user.getAll.useQuery();

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(inputSchema),
    defaultValues,
  });

  const onSubmit = async (data: Inputs) => {
    if (
      !form.formState.isDirty &&
      !Object.keys(form.formState.dirtyFields).length
    ) {
      toast("No one field was changed");
      return;
    }
    try {
      const dirtyFields = getDirtyFields(data, form.formState);
      await updateEnrollment({
        id: enrollmentId,
        data: dirtyFields,
      });
      back();
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      return;
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select
                disabled={usersLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email} {user.name ? ` - ${user.name}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose for which user this enrollment belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select
                disabled={coursesLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses?.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose for which course this enrollment belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update enrollment
        </Button>
      </form>
    </Form>
  );
}
