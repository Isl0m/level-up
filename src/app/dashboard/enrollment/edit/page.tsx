import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { EditEnrollmentForm } from "@components/form/edit-enrollment-form";

import { getOnlyEnrollmentById } from "@/lib/api/enrollment/queries";
import { route } from "@/lib/config";
import { nullToUndefined } from "@/lib/utils";
import { Heading } from "@ui/heading";
import { selectEnrollmentSchema } from "@/db/schema/enrollment";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EditEnrollment({ searchParams }: Props) {
  if (!searchParams.id || Array.isArray(searchParams.id)) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  const enrollment = await getOnlyEnrollmentById(searchParams.id);
  const parsedEnrollment = selectEnrollmentSchema.safeParse(enrollment);

  if (!parsedEnrollment.success || !parsedEnrollment.data) {
    redirect(route.dashboard.self, RedirectType.replace);
  }

  const defaultValues = nullToUndefined(parsedEnrollment.data);
  return (
    <main className="mx-auto max-w-md py-8">
      <Heading variant={"h2"} className="mb-8">
        Update Enrollment Page
      </Heading>
      <div className="max-w-md ">
        <EditEnrollmentForm
          enrollmentId={searchParams.id}
          defaultValues={defaultValues}
        />
      </div>
    </main>
  );
}
