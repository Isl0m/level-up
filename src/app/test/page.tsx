"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Markdown from "markdown-to-jsx"

import { Heading } from "@ui/heading"
import { Textarea } from "@ui/textarea"

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("")
  return (
    <main className="container flex gap-4 py-8">
      <section>
        <Heading variant={"h3"}>Markdown Editor</Heading>
        <Textarea
          value={markdown}
          onChange={({ target }) => setMarkdown(target.value)}
          placeholder="Markdown"
          rows={10}
          cols={50}
        />
      </section>
      <section>
        <Heading variant={"h3"}>Markdown Preview</Heading>

        <Markdown
          options={{
            overrides: {
              h1: { component: Heading },
              h2: { component: Heading, props: { variant: "h2" } },
              h3: { component: Heading, props: { variant: "h3" } },
              h4: { component: Heading, props: { variant: "h4" } },
              link: { component: Link },
              image: { component: Image },
            },
          }}
        >
          {markdown}
        </Markdown>
      </section>
    </main>
  )
}
