import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { EditLectureForm } from "@components/form/edit-lecture-form";

import { getLectureById } from "@/lib/api/lecture/queries";
import { route } from "@/lib/config";
import { nullToUndefined } from "@/lib/utils";
import { Heading } from "@ui/heading";
import { selectLectureSchema } from "@/db/schema/lecture";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EditLecture({ searchParams }: Props) {
  if (!searchParams.id || Array.isArray(searchParams.id)) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  const lecture = await getLectureById(searchParams.id);
  const lectureParsed = selectLectureSchema.safeParse(lecture);

  if (!lectureParsed.success || !lectureParsed.data) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  const defaultValues = nullToUndefined(lectureParsed.data);

  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Update Lecture Page
      </Heading>
      <div className="max-w-md ">
        <EditLectureForm
          lectureId={searchParams.id}
          defaultValues={defaultValues}
        />
      </div>
    </main>
  );
}
