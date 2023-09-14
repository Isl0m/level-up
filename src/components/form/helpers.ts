import { FormState } from "react-hook-form";
import { z } from "zod";

import { nullableToOptional } from "@/lib/helpers";
import { isKey } from "@/lib/utils";

export function getFormInputsSchema<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  return nullableToOptional(schema);
}

export function getDirtyFields<T extends object>(
  data: T,
  formState: FormState<T>
) {
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
}
