import { writeFile } from "fs/promises";
import { join } from "path";

import { Heading } from "@ui/heading";
import { Input } from "@ui/input";

export default function ImageFile() {
  const run = async () => {
    const path = join("public", "test.txt");
    console.log(path);
    const data = await writeFile(path, "Hello world!" + Date.now().toString());
    console.log(data);
  };
  run();
  return (
    <main className="container py-8">
      <Heading>File save example</Heading>
    </main>
  );
}
