import { z } from "zod";

import { SearchParamsProps } from "@/lib/utils";
import { getVideoDurationByLink } from "@/lib/youtube";

import { YtInput } from "./_input";

export default async function YouTube({ searchParams }: SearchParamsProps) {
  const query = await z
    .object({ query: z.string() })
    .transform(({ query }) => query)
    .safeParseAsync(searchParams);

  const duration = query.success && (await getVideoDurationByLink(query.data));

  return (
    <main className="container py-8">
      <h1>YouTube</h1>
      <p>This is the YouTube page.</p>
      <YtInput duration={duration ? duration.string : null} />
    </main>
  );
}
