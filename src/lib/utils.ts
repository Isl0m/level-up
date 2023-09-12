import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makeOptionalPropsNullable<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  const entries = Object.entries(schema.shape) as [
    keyof Schema["shape"],
    z.ZodTypeAny,
  ][];
  const newProps = entries.reduce(
    (acc, [key, value]) => {
      acc[key] =
        value instanceof z.ZodOptional ? value.unwrap().nullable() : value;
      return acc;
    },
    {} as {
      [key in keyof Schema["shape"]]: Schema["shape"][key] extends z.ZodOptional<
        infer T
      >
        ? z.ZodNullable<T>
        : Schema["shape"][key];
    }
  );
  return z.object(newProps);
}

export function makeNullablePropsOptional<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  type SchemaShape = Schema["shape"];

  const entries = Object.entries(schema.shape) as [
    keyof SchemaShape,
    z.ZodTypeAny,
  ][];

  const newProps = entries.reduce(
    (acc, [key, value]) => {
      acc[key] =
        value instanceof z.ZodNullable ? value.unwrap().optional() : value;
      return acc;
    },
    {} as {
      [key in keyof SchemaShape]: SchemaShape[key] extends z.ZodNullable<
        infer T
      >
        ? z.ZodOptional<T>
        : SchemaShape[key];
    }
  );

  return z.object(newProps);
}

export type denullable<T extends z.ZodTypeAny> = T extends z.ZodNullable<
  infer U
>
  ? denullable<U>
  : T extends z.ZodOptional<infer U>
  ? z.ZodOptional<denullable<U>>
  : T;

export function denullableObject<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  type SchemaShape = Schema["shape"];

  const entries = Object.entries(schema.shape) as [
    keyof SchemaShape,
    z.ZodTypeAny,
  ][];

  const newProps = entries.reduce(
    (acc, [key, value]) => {
      acc[key] = value instanceof z.ZodNullable ? value.unwrap() : value;
      return acc;
    },
    {} as {
      [key in keyof SchemaShape]: denullable<SchemaShape[key]>;
    }
  );

  return z.object(newProps);
}
