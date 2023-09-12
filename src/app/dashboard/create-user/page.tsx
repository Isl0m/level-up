import { CreateUserForm } from "@components/form/create-user-form";

import { Heading } from "@ui/heading";

export default function CreateUser() {
  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Crate User Page
      </Heading>
      <div className="max-w-md ">
        <CreateUserForm />
      </div>
    </main>
  );
}
