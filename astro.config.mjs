// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"

import { readingTime } from "./src/plugins/remark/reading-time"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: process.env.URL || "http://localhost:4321",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        page !== `${process.env.URL || "http://localhost:4321"}/admin/`,
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
  prefetch: {
    defaultStrategy: "viewport",
  },
  redirects: {
    "/blog/[...slug]": "/articles/[...slug]",
  },
})
