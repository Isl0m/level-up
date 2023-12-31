"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { generateFakeLecture } from "@/lib/mock";
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
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Textarea } from "@ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { insertLectureSchema } from "@/db/schema/lecture";

import { getFormInputsSchema } from "./helpers";

const inputSchema = getFormInputsSchema(insertLectureSchema).extend({
  video: z
    .string()
    .url()
    .regex(/https:\/\/youtu\.be\//, { message: "Invalid youtube url" }),
});
type Inputs = z.input<typeof inputSchema>;

export function CreateLectureForm() {
  const { back } = useRouter();
  const { mutateAsync: createLecture, isLoading } =
    trpc.lecture.create.useMutation();
  const { data: courses, isLoading: coursesLoading } =
    trpc.course.getAll.useQuery();
  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(inputSchema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      await createLecture(data);
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter lecture description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Url</FormLabel>
              <FormControl>
                {/* <Input type="file" {...field} /> */}
                <Input placeholder="Enter lecture video url..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter lecture order..."
                  type="number"
                  {...field}
                />
              </FormControl>
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
                Choose for which course this lecture belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Add lecture
        </Button>
      </form>
    </Form>
  );
}
