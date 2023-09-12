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

export type SearchParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export type denullableType<T extends z.ZodTypeAny> = T extends z.ZodNullable<
  infer U
>
  ? denullableType<U>
  : T extends z.ZodOptional<infer U>
  ? z.ZodOptional<denullableType<U>>
  : T;

type denullableObjectType<Schema extends z.AnyZodObject> = {
  [key in keyof Schema["shape"]]: denullableType<Schema["shape"][key]>;
};

export function denullableObject<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  type SchemaShape = Schema["shape"];

  const entries = Object.entries(schema.shape) as [
    keyof SchemaShape,
    z.ZodTypeAny,
  ][];

  const newProps = entries.reduce((acc, [key, value]) => {
    acc[key] = value instanceof z.ZodNullable ? value.unwrap() : value;
    return acc;
  }, {} as denullableObjectType<Schema>);

  return z.object(newProps);
}

type nullableToOptionalObjectType<Schema extends z.AnyZodObject> = {
  [key in keyof Schema["shape"]]: Schema["shape"][key] extends z.ZodNullable<
    infer U
  >
    ? z.ZodOptional<denullableType<U>>
    : Schema["shape"][key];
};

export function nullableToOptionalObject<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  type SchemaShape = Schema["shape"];

  const entries = Object.entries(schema.shape) as [
    keyof SchemaShape,
    z.ZodTypeAny,
  ][];

  const newProps = entries.reduce((acc, [key, value]) => {
    acc[key] =
      value instanceof z.ZodNullable ? value.unwrap().optional() : value;
    return acc;
  }, {} as nullableToOptionalObjectType<Schema>);

  return z.object(newProps);
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type UndefinedToNull<T extends object> = {
  [K in keyof T]-?: T[K] extends undefined ? null : T[K];
};

export function undefinedToNull<T extends object>(data: T): UndefinedToNull<T> {
  const newObject = {} as UndefinedToNull<T>;
  const object = structuredClone(data);

  for (const key in object) {
    const value = object[key];
    newObject[key] = value === undefined ? (null as any) : value;
  }

  return newObject;
}

type ReplaceNullWithUndefined<T> = T extends null ? undefined : T;
export type NullToUndefined<T extends object> = {
  [K in keyof T]: ReplaceNullWithUndefined<T[K]>;
};

export function nullToUndefined<T extends object>(data: T): NullToUndefined<T> {
  const newObject = {} as NullToUndefined<T>;
  const object = structuredClone(data);

  for (const key in object) {
    const value = object[key];
    newObject[key] = value === null ? (undefined as any) : value;
  }

  return newObject;
}
