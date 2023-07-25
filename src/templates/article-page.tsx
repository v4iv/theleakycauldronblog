import * as React from 'react'
import slugify from 'slugify'
import {Link, graphql, PageProps, HeadProps} from 'gatsby'
import 'prismjs/themes/prism-twilight.css'
import {badgeVariants} from '@/components/ui/badge'
import {Separator} from '@/components/ui/separator'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'
import ImageBox from '@/components/ImageBox'
import Content from '@/components/Content'
import Share from '@/components/Share'
import CommentBox from '@/components/CommentBox'

type DataProps = {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
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
    site: {
      siteMetadata: {siteUrl},
    },
    markdownRemark: {
      html,
      id,
      fields: {slug},
      frontmatter: {
        title,
        cover,
        date,
        author,
        authorLink,
        tags,
        metaDescription,
      },
    },
  },
}: PageProps<DataProps>) {
  return (
    <Layout>
      <article>
        <div className="mx-auto w-full max-w-screen-md">
          <div className="px-3 md:px-0 py-3 md:py-5">
            <header className="space-y-3">
              <TypographyH1>{title}</TypographyH1>

              <div className="flex items-center h-6 space-x-2">
                <TypographyLead>
                  <a
                    className="hover:text-primary"
                    rel="noreferrer nofollow noopener"
                    href={authorLink}
                  >
                    {author}
                  </a>
                </TypographyLead>

                <Separator orientation="vertical" />

                <TypographyLead>{date}</TypographyLead>
              </div>

              <div className="flex flex-wrap gap-y-1">
                {tags.map((tag, idx) => (
                  <Link
                    key={`${slugify(tag)}-${idx}`}
                    className={`${badgeVariants({variant: 'default'})} mr-2`}
                    to={`/tags/${slugify(tag)}`}
                  >
                    #{tag}&nbsp;
                  </Link>
                ))}
              </div>
            </header>
          </div>
        </div>

        <ImageBox
          className="h-auto w-full object-cover aspect-video"
          image={cover}
          alt={title}
        />

        <div className="mx-auto w-full max-w-screen-md">
          <div className="px-3 md:px-0 py-3 md:py-5">
            <Content html={html} />
          </div>

          <Share
            title={title}
            slug={slug}
            excerpt={metaDescription}
            siteURL={siteUrl}
          />

          <CommentBox id={id} slug={slug} title={title} siteURL={siteUrl} />
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
  query Article($id: String!, $language: String!) {
    locales: allLocale(
      filter: {ns: {in: ["common"]}, language: {eq: $language}}
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
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
