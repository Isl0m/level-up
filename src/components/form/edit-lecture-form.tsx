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
import { updateLectureSchema } from "@/db/schema/lecture";

import { getDirtyFields } from "./helpers";

const inputSchema = updateLectureSchema.extend({
  video: z
    .string()
    .url()
    .regex(/https:\/\/youtu\.be\//, { message: "Invalid youtube url" }),
});
type Inputs = z.input<typeof inputSchema>;

export function EditLectureForm({
  defaultValues,
  lectureId,
}: {
  defaultValues: Inputs;
  lectureId: string;
}) {
  const { back } = useRouter();
  const { mutateAsync: updateLecture, isLoading } =
    trpc.lecture.update.useMutation();

  const { data: courses, isLoading: coursesLoading } =
    trpc.course.getAll.useQuery();
  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(inputSchema),
    defaultValues,
  });

  const onSubmit = async (data: Inputs) => {
    // TODO: Problems with next js caching
    if (
      !form.formState.isDirty &&
      !Object.keys(form.formState.dirtyFields).length
    ) {
      toast("No one field was changed");
      return;
    }
    try {
      const dirtyFields = getDirtyFields(data, form.formState);
      await updateLecture({
        id: lectureId,
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
                Choose for which course this lecture belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update lecture
        </Button>
      </form>
    </Form>
  );
}
