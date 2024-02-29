type ArticleType = {
  id: string
  templateKey: string
  title: string
  slug: string
  author: string
  authorLink: string
  date: string
  cover: string
  excerpt?: string
  content?: string
  metaTitle: string
  metaDescription: string
  tags: string[]
}

export default ArticleType
