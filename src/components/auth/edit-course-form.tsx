"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@components/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { route } from "@/lib/config"
import {
  createCourseFormSchema,
  updateCourseSchema,
} from "@/lib/validators/course"
import { Button } from "@ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import { Textarea } from "@ui/textarea"
import { useToast } from "@ui/use-toast"
import { trpc } from "@/app/_trpc/client"

type Inputs = z.input<typeof updateCourseSchema>

export function EditCourseForm({
  defaultValues,
  courseId,
}: {
  defaultValues: Inputs
  courseId: string
}) {
  const { toast } = useToast()
  const { push } = useRouter()
  const { mutateAsync: updateCourse, isLoading } =
    trpc.course.update.useMutation()

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(updateCourseSchema),
    defaultValues,
  })

  const onSubmit = async (data: Inputs) => {
    try {
      await updateCourse({ id: courseId, data })
      push(route.dashboard)
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      })
      return
    }
  }
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name..." {...field} />
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
                  placeholder="Enter course price..."
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
          Update course
        </Button>
      </form>
    </Form>
  )
}
