import { defineCollection, reference, z } from "astro:content"
import { glob } from "astro/loaders"

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().trim(),
      description: z.string().trim(),
      slug: z.string().trim(),
      pubDate: z.coerce.date(),
      author: reference("authors"),
      cover: image(),
      tags: z.array(z.string().trim().min(1)).default(["others"]),
    }),
})

const authors = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string().trim(),
    link: z.string().trim(),
  }),
})

export const collections = { articles, authors }
