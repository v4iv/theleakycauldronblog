// @ts-check
import { defineConfig } from "astro/config"
import { loadEnv } from "vite"
import react from "@astrojs/react"
import favicons from "astro-favicons"
import sitemap from "@astrojs/sitemap"
import netlify from "@astrojs/netlify"
import tailwind from "@astrojs/tailwind"

import { readingTime } from "./src/plugins/remark/reading-time"

const { URL, APP_NAME, APP_SHORT_NAME } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "",
)

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),

  site: URL,

  integrations: [
    react(),
    favicons({
      name: APP_NAME,
      short_name: APP_SHORT_NAME,
      pixel_art: true,
      themes: ["#ffffff", "#020617"],
    }),
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
