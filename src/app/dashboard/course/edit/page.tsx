import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { EditCourseForm } from "@components/form/edit-course-form";

import { getCourseById } from "@/lib/api/course/queries";
import { route } from "@/lib/config";
import { nullToUndefined } from "@/lib/utils";
import { Heading } from "@ui/heading";
import { selectCourseSchema } from "@/db/schema/course";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EditCourse({ searchParams }: Props) {
  if (!searchParams.id || Array.isArray(searchParams.id)) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  const course = await getCourseById(searchParams.id);
  const parsedCourse = selectCourseSchema.safeParse(course);

  if (!parsedCourse.success || !parsedCourse.data) {
    redirect(route.dashboard.self, RedirectType.replace);
  }
  const defaultValues = nullToUndefined(parsedCourse.data);
  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Update Course Page
      </Heading>
      <div className="max-w-md ">
        <EditCourseForm
          courseId={searchParams.id}
          defaultValues={defaultValues}
        />
      </div>
    </main>
  );
}
