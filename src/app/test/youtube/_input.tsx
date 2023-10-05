"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@/lib/hook";
import { Input } from "@ui/input";

export function YtInput({ duration }: { duration: string | null | undefined }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [input, setInput] = useState(params.get("query") || "");
  const debouncedInput = useDebounce(input, 300);

  const setSearchParam = (query: string) => {
    router.replace(`${pathname}?query=${query}`);
  };

  useEffect(() => {
    if (debouncedInput) {
      setSearchParam(debouncedInput);
    }
  }, [debouncedInput]);
  return (
    <>
      <Input
        placeholder="Enter youtube video url"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Duration: {duration}</p>
    </>
  );
}
