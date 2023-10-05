export function getVideoId(url: string) {
  const regex = /https:\/\/youtu\.be\/([^\?]+)/;
  let match = regex.exec(url);
  if (match) {
    return match[1];
  }

  return null;
}
