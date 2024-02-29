import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import matter from 'gray-matter'

import ArticleType from '@/types/article.type'
import AboutType from '@/types/about.type'
import ContactType from '@/types/contact.type'

const articlesDirectory = path.join(process.cwd(), 'src', 'content', 'blogs')
const aboutPath = path.join(
  process.cwd(),
  'src',
  'content',
  'about',
  'index.md',
)
const contactPath = path.join(
  process.cwd(),
  'src',
  'content',
  'contact',
  'index.md',
)

const getExcerpt = (file: matter.GrayMatterFile<string>) => {
  file.excerpt = file.content.slice(0, 200)
}

export function getArticles() {
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the article metadata section
    const matterResult = matter(fileContents, {
      // @ts-ignore
      excerpt: getExcerpt,
    })

    // Combine the data with the id
    return {
      id,
      excerpt: matterResult.excerpt,
      content: matterResult.content,
      ...matterResult.data,
    } as ArticleType
  })
  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAbout() {
  const fileContents = fs.readFileSync(aboutPath, 'utf8')

  const matterResult = matter(fileContents)

  return {content: matterResult.content, ...matterResult.data} as AboutType
}

export function getContact() {
  const fileContents = fs.readFileSync(contactPath, 'utf8')

  const matterResult = matter(fileContents)

  return {content: matterResult.content, ...matterResult.data} as ContactType
}

export function getArticleBySlug(slug: string) {
  const articles = getArticles()

  return articles.find((article) => article.slug === slug) as ArticleType
}

export function getArticlesByTag(tag: string) {
  const articles = getArticles()

  // Filter articles by slugified tags
  const filteredArticles = articles.filter((article) =>
    article.tags?.some((articleTag) => slugify(articleTag) === tag),
  )

  return {articles: filteredArticles, totalCount: filteredArticles.length} as {
    articles: ArticleType[]
    totalCount: number
  }
}

export function getTags() {
  const articles = getArticles()

  // Create a map to store tag counts
  const tagCounts = new Map<string, number>()
  for (const article of articles) {
    if (article.tags) {
      for (const tag of article.tags) {
        // Increment count for the tag
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      }
    }
  }

  // Convert map entries to an array of objects
  return Array.from(tagCounts.entries()).map(([tag, count]) => ({
    fieldValue: tag,
    totalCount: count,
  })) as {fieldValue: string; totalCount: number}[]
}
