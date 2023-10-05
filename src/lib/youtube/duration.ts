import { google } from "googleapis";

const youtube = google.youtube("v3");

const regex = {
  days: /(\d+)D/,
  hours: /(\d+)H/,
  minutes: /(\d+)M/,
  seconds: /(\d+)S/,
};

function parseStringData(duration: string, type: keyof typeof regex) {
  return Number(regex[type].exec(duration)?.[1]) || 0;
}

export function parseVideoDuration(duration: string) {
  const days = parseStringData(duration, "days");
  const hours = parseStringData(duration, "hours");
  const minutes = parseStringData(duration, "minutes");
  const seconds = parseStringData(duration, "seconds");

  const totalDurationInSeconds =
    days * 86400 + hours * 3600 + minutes * 60 + seconds;
  return {
    seconds: totalDurationInSeconds,
    string: `${days}d${hours}h${minutes}m${seconds}s`,
  };
}

const apiKey = "AIzaSyCM8kieNMcVRjjV0ELOqZ86pGz_u5gBzX0";

export async function getVideoDuration(videoId: string) {
  const response = await youtube.videos.list({
    part: ["snippet,contentDetails,statistics"],
    key: apiKey,
    id: [videoId],
  });

  const items = response.data.items;

  if (items?.length) {
    const videoDuration = items[0].contentDetails?.duration;
    return videoDuration;
  }

  return null;
}
