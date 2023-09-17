import { CreateEnrollmentForm } from "@components/form/create-enrollment";

import { Heading } from "@ui/heading";

export default function CreateEnrollment() {
  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Crate Enrollment Page
      </Heading>
      <div className="max-w-md ">
        <CreateEnrollmentForm />
      </div>
    </main>
  );
}
