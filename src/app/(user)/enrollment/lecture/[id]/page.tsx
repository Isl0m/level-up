import Image from "next/image";
import { redirect } from "next/navigation";

import { getLectureById } from "@/lib/api/lecture/queries";
import { route } from "@/lib/config";
import { Heading } from "@ui/heading";

export default async function Lecture({ params }: { params: { id: string } }) {
  const lecture = await getLectureById(params.id);

  if (!lecture) {
    redirect(route.home);
  }

  return (
    <main className="container py-8">
      <Heading>{lecture.title}</Heading>
      <div className="flex items-center gap-8">
        <p className="mt-4 basis-1/2 text-foreground">{lecture.description}</p>
        {lecture.video && (
          <Image
            src={lecture.video}
            alt={lecture.title}
            width={400}
            height={300}
          />
        )}
      </div>
    </main>
  );
}
