// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: process.env.URL || "http://localhost:4321",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false, }),
  ],
  markdown: {
      shikiConfig: {
        theme: "houston"
      }
    },
    experimental: {
      responsiveImages: true,
    },
    prefetch: {
      defaultStrategy: 'viewport'
    }
});
