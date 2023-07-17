import * as React from 'react'
import kebabCase from 'lodash.kebabcase'
import {Link, graphql} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import Layout from '@/components/Layout'
import {
  TypographyH1,
  TypographyLead,
  TypographyList,
  TypographyP,
} from '@/components/ui/typography'

interface ArticlePageTemplateProps {
  data: {
    markdownRemark: {
      id: string
      html: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        metaTitle: string
        metaDescription: string
        cover: {
          childImageSharp: any
          publicURL: string
        }
        date: string
        author: string
        authorLink: string
        tags: string[]
      }
    }
  }
}

const ArticlePageTemplate: React.FC<ArticlePageTemplateProps> = (props) => {
  const {
    data: {
      markdownRemark: {
        html,
        frontmatter: {title, cover, date, author, authorLink, tags},
      },
    },
  } = props

  const image = getImage(cover)!

  return (
    <Layout>
      <article>
        <TypographyH1>{title}</TypographyH1>

        <TypographyLead>
          <Link to={authorLink}>{author}</Link>&nbsp;&nbsp;|&nbsp;&nbsp;{date}
        </TypographyLead>

        <TypographyList>
          {tags.map((tag, idx) => (
            <li key={`${idx}`}>
              <Link to={`/tag/${kebabCase(tag)}`}>#{tag}&nbsp;</Link>
            </li>
          ))}
        </TypographyList>

        <GatsbyImage image={image} alt={title} />

        <TypographyP>
          <div dangerouslySetInnerHTML={{__html: html}} />
        </TypographyP>
      </article>
    </Layout>
  )
}

export default ArticlePageTemplate

export const articleQuery = graphql`
  query Article($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        authorLink
        cover {
          childImageSharp {
            gatsbyImageData(
              quality: 72
              placeholder: BLURRED
              layout: FULL_WIDTH
            )
          }
          publicURL
        }
        metaTitle
        metaDescription
        tags
      }
    }
  }
`
