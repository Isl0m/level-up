import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type SearchParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type UndefinedToNull<T extends object> = {
  [K in keyof T]-?: T[K] extends undefined ? null : T[K];
};

type ReplaceNullWithUndefined<T> = T extends null ? undefined : T;
type NullToUndefined<T extends object> = {
  [K in keyof T]: ReplaceNullWithUndefined<T[K]>;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Object utils

export function undefinedToNull<T extends object>(data: T): UndefinedToNull<T> {
  const newObject = {} as UndefinedToNull<T>;
  const object = structuredClone(data);

  for (const key in object) {
    const value = object[key];
    newObject[key] = value === undefined ? (null as any) : value;
  }

  return newObject;
}

export function nullToUndefined<T extends object>(data: T): NullToUndefined<T> {
  const newObject = {} as NullToUndefined<T>;
  const object = structuredClone(data);

  for (const key in object) {
    const value = object[key];
    newObject[key] = value === null ? (undefined as any) : value;
  }

  return newObject;
}

export function isKey<Obj extends object>(
  obj: Obj,
  key: PropertyKey
): key is keyof Obj {
  return key in obj;
}
