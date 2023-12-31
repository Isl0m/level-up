"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createUserSchema } from "@/lib/validators/auth";
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
import { trpc } from "@/app/_trpc/client";

import { Icons } from "../icons";

type Inputs = z.infer<typeof createUserSchema>;

export function CreateUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { back } = useRouter();
  const mutate = trpc.user.create.useMutation();

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      setIsLoading(true);
      await mutate.mutateAsync(data);
      back();
      setIsLoading(false);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
      return;
    }
  };
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
  );
}
