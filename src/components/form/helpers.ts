import { z } from "zod";

import { nullableToOptional } from "@/lib/helpers";

export function getFormInputsSchema<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  return nullableToOptional(schema);
}
