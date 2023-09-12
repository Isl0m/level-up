import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { EditCourseForm } from "@components/auth/edit-course-form";

import { getCourseById } from "@/lib/api/course/queries";
import { route } from "@/lib/config";
import { Heading } from "@ui/heading";
import { updateCourseSchema } from "@/db/schema/course";

export const toUpdateCourseSchema = updateCourseSchema.transform((val) => ({
  ...val,
  description: val.description || undefined,
  image: val.image || undefined,
  rating: val.rating || undefined,
  reviews: val.reviews || undefined,
  price: val.price || undefined,
}));

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EditCourse({ searchParams }: Props) {
  if (!searchParams.id || Array.isArray(searchParams.id)) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  const course = await getCourseById(searchParams.id);
  const defaultValues = toUpdateCourseSchema.safeParse(course);

  if (!defaultValues.success || !defaultValues.data) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Update Course Page
      </Heading>
      <div className="max-w-md ">
        <EditCourseForm
          courseId={searchParams.id}
          defaultValues={defaultValues.data}
        />
      </div>
    </main>
  );
}
