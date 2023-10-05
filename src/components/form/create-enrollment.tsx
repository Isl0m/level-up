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
import { trpc } from "@/app/_trpc/client";
import { insertEnrollmentSchema } from "@/db/schema/enrollment";

import { getFormInputsSchema } from "./helpers";

const inputSchema = getFormInputsSchema(insertEnrollmentSchema);
type Inputs = z.input<typeof inputSchema>;

export function CreateEnrollmentForm() {
  const { back } = useRouter();
  const { mutateAsync: createEnrollment, isLoading } =
    trpc.enrollment.create.useMutation();

  const { data: courses, isLoading: coursesLoading } =
    trpc.course.getAll.useQuery();
  const { data: users, isLoading: usersLoading } = trpc.user.getAll.useQuery();

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(inputSchema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      await createEnrollment(data);
      back();
      form.reset();
    } catch (error) {
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {coursesLoading && (
                    <SelectItem disabled value="loading">
                      Loading...
                    </SelectItem>
                  )}
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
          Add enrollment
        </Button>
      </form>
    </Form>
  );
}
