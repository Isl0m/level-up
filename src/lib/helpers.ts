import { z } from "zod";

/////////////////////////////////////
////       ZOD helpers    ///////////
/////////////////////////////////////

export type ZodRequired<T extends z.ZodTypeAny> = T extends z.ZodNullable<
  infer U
>
  ? ZodRequired<U>
  : T extends z.ZodOptional<infer U>
  ? ZodRequired<U>
  : T;

type NullableToOptionalObject<Schema extends z.AnyZodObject> = {
  [key in keyof Schema["shape"]]: Schema["shape"][key] extends z.ZodNullable<
    infer T
  >
    ? z.ZodOptional<ZodRequired<T>>
    : Schema["shape"][key] extends z.ZodOptional<infer T>
    ? z.ZodOptional<ZodRequired<T>>
    : Schema["shape"][key];
};

type denullableType<T extends z.ZodTypeAny> = T extends z.ZodNullable<infer U>
  ? denullableType<U>
  : T extends z.ZodOptional<infer U>
  ? z.ZodOptional<denullableType<U>>
  : T;

type denullableObjectType<Schema extends z.AnyZodObject> = {
  [key in keyof Schema["shape"]]: denullableType<Schema["shape"][key]>;
};

type RequiredObjectType<Schema extends z.AnyZodObject> = {
  [key in keyof Schema["shape"]]: z.ZodOptional<
    ZodRequired<Schema["shape"][key]>
  >;
};

export function zodRequired<T extends z.ZodTypeAny>(value: T) {
  if (value instanceof z.ZodNullable && value instanceof z.ZodOptional) {
    return zodRequired(value.unwrap());
  }

  return value;
}

export function nullableToOptional<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  type SchemaShape = Schema["shape"];

  const entries = Object.entries(schema.shape) as [
    keyof SchemaShape,
    z.ZodTypeAny,
  ][];

  const newProps = entries.reduce((acc, [key, value]) => {
    if (value instanceof z.ZodOptional && value instanceof z.ZodNullable) {
      acc[key] = zodRequired(value).optional() as any;
    } else {
      acc[key] = value as any;
    }
    return acc;
  }, {} as NullableToOptionalObject<Schema>);

  return z.object(newProps);
}

export function toOptional<Schema extends z.AnyZodObject>(schema: Schema) {
  type SchemaShape = Schema["shape"];

  const entries = Object.entries(schema.shape) as [
    keyof SchemaShape,
    z.ZodTypeAny,
  ][];

  const newProps = entries.reduce((acc, [key, value]) => {
    acc[key] = zodRequired(value).optional() as any;
    return acc;
  }, {} as RequiredObjectType<Schema>);

  return z.object(newProps);
}
