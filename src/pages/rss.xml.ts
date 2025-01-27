import rss from "@astrojs/rss"
import type { AstroGlobal } from "astro"
import MarkdownIt from "markdown-it"
import sanitizeHtml from "sanitize-html"
import { getCollection, getEntry, type CollectionEntry } from "astro:content"

import { useTranslations } from "@/i18n/utils"
import { defaultLang } from "@/i18n/ui"

const parser = new MarkdownIt()

const t = useTranslations(defaultLang)

export async function GET(context: AstroGlobal) {
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

        // TODO: Replace image links with the correct path
        const html = sanitizeHtml(parser.render(article.body ?? ""), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        })
          .replace(/href="\//g, `href="${siteUrl}`)
          .replace(/src="\//g, `src="${siteUrl}`)

        return {
          title: article.data.title,
          description: article.data.description,
          pubDate: new Date(article.data.pubDate),
          author: author.data.name,
          link: `/articles/${article.id}`,
          content: html,
        }
      }),
    ),
    // (optional) inject custom xml
    // customData: `<language>en</language>`,
  })
}
