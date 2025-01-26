import { defineCollection, reference, z } from "astro:content"
import { glob } from "astro/loaders"

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      pubDate: z.coerce.date(),
      author: reference("authors"),
      cover: image(),
      tags: z.array(z.string()).default(["others"]),
    }),
})

const authors = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    link: z.string().url(),
  }),
})

export const collections = { articles, authors }
