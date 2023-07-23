import * as React from 'react'
import {HeadProps, PageProps, graphql} from 'gatsby'
import {
  TypographyH1,
  TypographyLarge,
  TypographyLead,
} from '@/components/ui/typography'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'
import ImageBox from '@/components/ImageBox'
import Content from '@/components/Content'

type DataProps = {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
      subtitle: string
      author: string
      image: {
        childSharpImage: any
        publicURL: string
      }
      metaTitle: string
      metaDescription: string
    }
  }
}

function AboutPage({
  data: {
    markdownRemark: {
      html,
      frontmatter: {title, subtitle, author, image},
    },
  },
}: PageProps<DataProps>) {
  return (
    <Layout>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <header className="space-y-3">
            <TypographyH1>{title}</TypographyH1>

            <TypographyLead>{subtitle}</TypographyLead>

            <TypographyLarge>{author}</TypographyLarge>
          </header>
        </div>
      </div>

      <ImageBox
        className="h-auto w-full object-cover"
        image={image}
        alt={author}
      />

      <div className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <Content html={html} />
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage

export function Head({
  location: {pathname},
  data: {
    markdownRemark: {
      frontmatter: {metaTitle, metaDescription, author, image},
    },
  },
}: HeadProps<DataProps>) {
  return (
    <SEO
      pathname={pathname}
      title={metaTitle}
      description={metaDescription}
      author={author}
      image={image.publicURL}
    />
  )
}

export const aboutPageQuery = graphql`
  query About($id: String!) {
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        title
        subtitle
        author
        image {
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
      }
    }
  }
`
