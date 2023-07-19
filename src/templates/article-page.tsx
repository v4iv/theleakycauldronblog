import * as React from 'react'
import kebabCase from 'lodash.kebabcase'
import {Link, graphql, PageProps, HeadProps} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import 'prismjs/themes/prism.css'
import {badgeVariants} from '@/components/ui/badge'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'

type DataProps = {
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

function ArticlePageTemplate({
  data: {
    markdownRemark: {
      html,
      frontmatter: {title, cover, date, author, authorLink, tags},
    },
  },
}: PageProps<DataProps>) {
  const image = getImage(cover)!

  return (
    <Layout>
      <article>
        <header className="mx-auto w-full max-w-screen-md">
          <section className="px-3 md:px-0 py-3 md:py-5">
            <TypographyH1>{title}</TypographyH1>

            <div className="my-3">
              <TypographyLead>
                <Link to={authorLink}>{author}</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                {date}
              </TypographyLead>
            </div>

            {tags.map((tag, idx) => (
              <Link
                key={`${kebabCase(tag)}-${idx}`}
                className={`${badgeVariants({variant: 'default'})} my-3 mr-2`}
                to={`/tags/${kebabCase(tag)}`}
              >
                #{tag}&nbsp;
              </Link>
            ))}
          </section>
        </header>

        <GatsbyImage
          className="h-auto w-auto object-cover aspect-video"
          image={image}
          alt={title}
        />

        <div className="mx-auto w-full max-w-screen-md">
          <div className="px-3 md:px-0 py-3 md:py-5">
            <div dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default ArticlePageTemplate

export function Head({
  location: {pathname},
  data: {
    markdownRemark: {
      frontmatter: {author, cover, metaTitle, metaDescription},
    },
  },
}: HeadProps<DataProps>) {
  return (
    <SEO
      pathname={pathname}
      title={metaTitle}
      description={metaDescription}
      author={author}
      image={cover.publicURL}
    />
  )
}

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
