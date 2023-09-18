"use client";

import { useState } from "react";
import YouTube from "react-youtube";

import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { Lecture } from "@/db/schema/lecture";

function getVideoId(url: string | null) {
  if (!url) return null;
  const videoIdRegex =
    /(?:embed\/|v=|v\/|youtu\.be\/|\/v\/|\/embed\/|\/watch\?v=|\&v=|\/www\.youtube\.com\/v\/)([\w-]{11})/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : null;
}

export function LecturePlayer({ lectures }: { lectures: Lecture[] }) {
  const [video, setVideo] = useState(getVideoId(lectures[0].video));
  const defaultId = lectures[0].id;
  if (!video) return null;

  const handleChange = (value: string) => {
    setVideo(value);
  };

  return (
    <div className="">
      {video && <YouTube videoId={video} />}
      <RadioGroup
        className="w-sm mt-4"
        defaultValue={video}
        onValueChange={handleChange}
      >
        {lectures.map(
          (lecture, index) =>
            lecture.video && (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  value={getVideoId(lecture.video)}
                  id={lecture.id}
                />
                <Label htmlFor={lecture.id}>{lecture.title}</Label>
              </div>
            )
        )}
      </RadioGroup>
    </div>
  );
}
