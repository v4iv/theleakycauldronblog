import type { APIRoute } from "astro"
import rss from "@astrojs/rss"
import MarkdownIt from "markdown-it"
import sanitizeHtml from "sanitize-html"
import { parse as htmlParser } from "node-html-parser"
import { getImage } from "astro:assets"
import { getCollection, getEntry, type CollectionEntry } from "astro:content"

import { defaultLang } from "@/i18n/ui"
import { useTranslations } from "@/i18n/utils"

const markdownParser = new MarkdownIt()

const t = useTranslations(defaultLang)

// get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/media/*.{jpeg,jpg,png,gif}", // add more image formats if needed
)

export const GET: APIRoute = async (context) => {
  const siteUrl = context.site ?? new URL(import.meta.env.SITE)
  const articles: CollectionEntry<"articles">[] = (
    await getCollection("articles")
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  return rss({
    // `<title>` field in output xml
    title: t("meta.title"),
    // `<description>` field in output xml
    description: t("meta.description"),
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: siteUrl,
    trailingSlash: false,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: await Promise.all(
      articles.map(async (article) => {
        const author = await getEntry(article.data.author)

        // convert markdown to html string
        const body = markdownParser.render(article.body ?? "")
        // convert html string to DOM-like structure
        const html = htmlParser.parse(body)
        // hold all img tags in variable images
        const images = html.querySelectorAll("img")

        for (const img of images) {
          const src = img.getAttribute("src")!

          // from - https://billyle.dev/posts/adding-rss-feed-content-and-fixing-markdown-image-paths-in-astro
          if (src.startsWith("src/assets/media")) {
            // call the dynamic import and return the module
            const imagePath = await imagesGlob[`/${src}`]?.()?.then(
              (res) => res.default,
            )

            if (imagePath) {
              const optimizedImg = await getImage({ src: imagePath })

              // set the correct path to the optimized image
              img.setAttribute(
                "src",
                context.site + optimizedImg.src.replace("/", ""),
              )
            }
          } else if (src.startsWith("https")) {
            continue
          } else {
            throw Error("src unknown")
          }
        }

        const contentEncoded = html
          .toString()
          .replace(/href="\//g, `href="${siteUrl}`)

        return {
          title: article.data.title,
          description: article.data.description,
          pubDate: new Date(article.data.pubDate),
          author: author.data.name,
          link: `/articles/${article.data.slug}`,
          content: sanitizeHtml(contentEncoded, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          }),
        }
      }),
    ),
    // (optional) inject custom xml
    // customData: `<language>en</language>`,
  })
}
