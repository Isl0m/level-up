import { CreateCourseForm } from "@components/form/create-course-form";

import { Heading } from "@ui/heading";

export default function CreateCourse() {
  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Crate Course Page
      </Heading>
      <div className="max-w-md ">
        <CreateCourseForm />
      </div>
    </main>
  );
}
