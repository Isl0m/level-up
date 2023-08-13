"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@components/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { route } from "@/lib/config"
import {
  createCourseFormSchema,
  createCourseSchema,
} from "@/lib/validators/user"
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

type Inputs = z.input<typeof createCourseFormSchema>

export function CreateCourseForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { push } = useRouter()

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(createCourseFormSchema),
  })

  const onSubmit = async (data: Inputs) => {
    try {
      setIsLoading(true)
      await axios.post(route.api.course, JSON.stringify(data))
      push(route.dashboard)
      setIsLoading(false)
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      })
      setIsLoading(false)
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
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
                  min={0}
                  max={10}
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
  )
}
