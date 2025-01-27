import type { APIRoute } from "astro"

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /
Disallow: /admin/*
Disallow: /tags/*

Sitemap: ${sitemapURL.href}
`

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site)
  return new Response(getRobotsTxt(sitemapURL))
}
