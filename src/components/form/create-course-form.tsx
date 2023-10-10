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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { insertCourseSchema } from "@/db/schema/course";

import { getFormInputsSchema } from "./helpers";

const inputSchema = getFormInputsSchema(insertCourseSchema);
type Inputs = z.input<typeof inputSchema>;

export function CreateCourseForm() {
  const { back } = useRouter();
  const { mutateAsync: createCourse, isLoading } =
    trpc.course.create.useMutation();

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(inputSchema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      await createCourse(data);
      back();
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }
  };

  const handleGenerateSlug = () => {
    const title = form.getValues("title");
    form.setValue("slug", title.toLowerCase().replaceAll(" ", "-"));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="flex w-full items-center space-x-2">
                  <Input {...field} />
                  <Button type="button" onClick={handleGenerateSlug}>
                    Generate
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title..." {...field} />
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
                  placeholder="Enter course description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                {/* <Input type="file" {...field} /> */}
                <Input placeholder="Enter course image url..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter course price in dollars..."
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Add course
        </Button>
      </form>
    </Form>
  );
}
