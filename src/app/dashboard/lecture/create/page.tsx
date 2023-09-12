import { CreateLectureForm } from "@components/form/create-lecture-form";

import { Heading } from "@ui/heading";

export default function CreateLecture() {
  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Crate Lecture Page
      </Heading>
      <div className="max-w-md ">
        <CreateLectureForm />
      </div>
    </main>
  );
}
