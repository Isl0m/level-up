import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { EditLectureForm } from "@components/form/edit-lecture-form";

import { getLectureById } from "@/lib/api/lecture/queries";
import { route } from "@/lib/config";
import { Heading } from "@ui/heading";
import { updateLectureSchema } from "@/db/schema/lecture";

export const toUpdateLectureSchema = updateLectureSchema.transform((val) => ({
  ...val,
  description: val.description || undefined,
  video: val.video || undefined,
}));

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EditLecture({ searchParams }: Props) {
  if (!searchParams.id || Array.isArray(searchParams.id)) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  const lecture = await getLectureById(searchParams.id);
  const defaultValues = toUpdateLectureSchema.safeParse(lecture);

  if (!defaultValues.success || !defaultValues.data) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Update Lecture Page
      </Heading>
      <div className="max-w-md ">
        <EditLectureForm
          lectureId={searchParams.id}
          defaultValues={defaultValues.data}
        />
      </div>
    </main>
  );
}
