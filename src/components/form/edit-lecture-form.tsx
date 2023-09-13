"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormState, useForm } from "react-hook-form";
import { z } from "zod";

import { isKey } from "@/lib/utils";
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
import { useToast } from "@ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { updateLectureSchema } from "@/db/schema/lecture";

import { getFormInputsSchema } from "./helpers";

const inputSchema = getFormInputsSchema(updateLectureSchema);
type Inputs = z.input<typeof inputSchema>;

export function EditLectureForm({
  defaultValues,
  lectureId,
}: {
  defaultValues: Inputs;
  lectureId: string;
}) {
  const { toast } = useToast();
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

  const getDirtyFields = <T extends object>(
    data: T,
    formState: FormState<T>
  ) => {
    const defaultValues = formState.defaultValues;

    const dirtyFields: Record<string, unknown> = {};

    Object.keys(formState.dirtyFields).map((key) => {
      if (isKey(data, key)) {
        const value = data[key];
        if (
          defaultValues &&
          isKey(defaultValues, key) &&
          value === defaultValues[key]
        ) {
          return;
        }
        if (value) {
          dirtyFields[key] = value;
        }
      }
    });

    return dirtyFields;
  };

  const onSubmit = async (data: Inputs) => {
    if (!form.formState.isDirty) return;
    console.log(getDirtyFields(data, form.formState));
    // try {
    //   await updateLecture({
    //     id: lectureId,
    //     data: undefinedToNull(data),
    //   });
    //   back();
    //   form.reset();
    // } catch (error) {
    //   console.log(error);
    //   toast({
    //     variant: "destructive",
    //     title: "Something went wrong",
    //   });
    //   return;
    // }
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
              <FormLabel>Video</FormLabel>
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
                      {course.name}
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
