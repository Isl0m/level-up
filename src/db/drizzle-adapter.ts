import { Adapter } from "next-auth/adapters";
import { DB } from ".";
import { users } from "./schema";
import { createId } from "@paralleldrive/cuid2";

export function DrizzleAdapter(db: DB): Adapter {
  return {
    createUser(user) {
      db.insert(users).values({ id: createId(), ...user });
    },
  };
}
