"use client";

import { useState } from "react";
import YouTube from "react-youtube";

import { Heading } from "@ui/heading";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { Lecture } from "@/db/schema/lecture";

function getVideoId(url: string) {
  const videoIdRegex =
    /(?:embed\/|v=|v\/|youtu\.be\/|\/v\/|\/embed\/|\/watch\?v=|\&v=|\/www\.youtube\.com\/v\/)([\w-]{11})/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : null;
}

export function LecturePlayer({ lectures }: { lectures: Lecture[] }) {
  const [video, setVideo] = useState(lectures[0].video);
  if (!video) return null;

  const handleChange = (value: string) => {
    setVideo(value);
  };
  const videoId = getVideoId(video);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="md:basis-2/3">
        {videoId && (
          <YouTube
            videoId={videoId}
            iframeClassName="w-full md:w-[65dvw] aspect-[16/9]"
          />
        )}
      </div>
      <div>
        <Heading variant={"h3"}>Lectures</Heading>
        <RadioGroup
          className="w-sm mt-4"
          defaultValue={video}
          onValueChange={handleChange}
        >
          {lectures.map(
            (lecture, index) =>
              lecture.video && (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={lecture.video} id={lecture.id} />
                  <Label htmlFor={lecture.id}>{lecture.title}</Label>
                </div>
              )
          )}
        </RadioGroup>
      </div>
    </div>
  );
}
