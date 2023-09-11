import { getLecturesAndCourse } from "@/lib/api/lecture/queries";

export async function GET(request: Request) {
  const data = await getLecturesAndCourse();

  return new Response(JSON.stringify(data));
}
