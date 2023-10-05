import { getVideoDuration, parseVideoDuration } from "./duration";
import { getVideoId } from "./video";

export async function getVideoDurationByLink(link: string) {
  const videoId = getVideoId(link);

  if (videoId) {
    const duration = await getVideoDuration(videoId);
    if (duration) {
      return parseVideoDuration(duration) || null;
    }
  }

  return null;
}
