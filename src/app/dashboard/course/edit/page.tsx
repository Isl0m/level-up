import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { EditCourseForm } from "@components/auth/edit-course-form"

import { route } from "@/lib/config"
import { toUpdateCourseSchema } from "@/lib/validators/course"
import { Heading } from "@ui/heading"
import { getCourseById } from "@/db/queries"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function EditCourse({ searchParams }: Props) {
  if (!searchParams.id || Array.isArray(searchParams.id)) {
    redirect(route.dashboard, RedirectType.replace)
  }

  const course = await getCourseById(searchParams.id)
  const defaultValues = toUpdateCourseSchema.safeParse(course)

  if (!defaultValues.success || !defaultValues.data) {
    redirect(route.dashboard, RedirectType.replace)
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
  )
}
