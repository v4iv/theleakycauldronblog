import * as React from 'react'
import {Link, graphql} from 'gatsby'
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from '@/components/ui/typography'
import Layout from '@/components/Layout'

interface TagPageTemplateProps {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: {
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
          }
        }
      }[]
    }
  }
  pageContext: {
    tag: string
  }
}

const TagPageTemplate: React.FC<TagPageTemplateProps> = (props) => {
  const {
    data: {
      allMarkdownRemark: {totalCount, edges: articles},
    },
    pageContext: {tag},
  } = props

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <Layout>
      <section>
        <TypographyH1># {tag}</TypographyH1>
        <TypographyLead>{tagHeader}</TypographyLead>
      </section>

      <div>
        {articles.map((article: any, idx: number) => {
          const articleTitle = article.node.frontmatter.title
          const slug = article.node.fields.slug

          return (
            <article key={`${slug}-${idx}`}>
              <TypographyH2>
                <Link to={slug}>{articleTitle}</Link>
              </TypographyH2>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default TagPageTemplate

export const tagQuery = graphql`
  query Tag($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
