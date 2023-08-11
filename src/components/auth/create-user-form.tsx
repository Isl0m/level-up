"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { route } from "@/lib/config"
import { createUserSchema } from "@/lib/validators/auth"
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
import { useToast } from "@ui/use-toast"

import { Icons } from "../icons"

type Inputs = z.infer<typeof createUserSchema>

export function CreateUserForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { push } = useRouter()

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = async (values: Inputs) => {
    try {
      setIsLoading(true)
      await axios.post(route.api.user, JSON.stringify(values))
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Add user
        </Button>
      </form>
    </Form>
  )
}
