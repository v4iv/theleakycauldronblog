// @ts-check
import { loadEnv } from "vite"
import { defineConfig, fontProviders } from "astro/config"
import react from "@astrojs/react"
import favicons from "astro-favicons"
import sitemap from "@astrojs/sitemap"
import netlify from "@astrojs/netlify"
import partytown from "@astrojs/partytown"
import tailwindcss from "@tailwindcss/vite"

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
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),

    favicons({
      name: APP_NAME,
      short_name: APP_SHORT_NAME,
      pixel_art: true,
      themes: ["#ffffff", "#020617"],
    }),

    sitemap({
      filter: (page) => !page.includes(`/admin/`),
    }),
  ],

  markdown: {
    remarkPlugins: [readingTime],
    shikiConfig: {
      theme: "houston",
    },
  },

  responsiveImages: true,

  experimental: {
    contentIntellisense: true,
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Geist Sans",
        cssVariable: "--font-geist",
        subsets: ["latin", "latin-ext"],
      },
      {
        provider: fontProviders.fontsource(),
        name: "Geist Mono",
        cssVariable: "--font-geist-mono",
        weights: [400, 500, 600, 700],
        subsets: ["latin", "latin-ext"],
      },
      {
        provider: fontProviders.fontsource(),
        name: "Playfair Display",
        cssVariable: "--font-playfair-display",
        subsets: ["latin", "latin-ext"],
      },
    ],
  },

  redirects: {
    "/blog/[...slug]": "/articles/[...slug]",
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
