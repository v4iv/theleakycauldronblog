// @ts-check
import { defineConfig } from "astro/config"
import { loadEnv } from "vite"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

import { readingTime } from "./src/plugins/remark/reading-time"

const { URL } = loadEnv(import.meta.env.MODE, process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  site: URL,
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes(`/admin/`) && !page.includes(`/tags/`),
    }),
  ],
  markdown: {
    remarkPlugins: [readingTime],
    shikiConfig: {
      theme: "houston",
    },
  },
  experimental: {
    responsiveImages: true,
    contentIntellisense: true,
  },
  redirects: {
    "/blog/[...slug]": "/articles/[...slug]",
  },
})
