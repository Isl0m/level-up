"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@/lib/hook";
import { Input } from "@ui/input";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const query = params.get("query") || "";
  const [input, setInput] = useState(query);
  const debouncedInput = useDebounce(input, 300);

  const setSearchParam = (query: string) => {
    router.replace(`${pathname}?query=${query}`);
  };

  useEffect(() => {
    if (debouncedInput !== query) {
      setSearchParam(debouncedInput);
    }
  }, [debouncedInput]);

  return (
    <div className="mt-4">
      <Input
        placeholder="Search"
        className="max-w-md"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </div>
  );
}
