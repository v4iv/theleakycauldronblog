import * as React from 'react'
import {HeadProps, PageProps, graphql} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import {
  TypographyH1,
  TypographyLarge,
  TypographyLead,
} from '@/components/ui/typography'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'

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
  const aboutImage = getImage(image)!

  return (
    <Layout>
      <header className="mx-auto w-full max-w-screen-md">
        <section className="px-3 md:px-0 py-3 md:py-5">
          <TypographyH1>{title}</TypographyH1>
          <TypographyLead>{subtitle}</TypographyLead>
          <TypographyLarge>{author}</TypographyLarge>
        </section>
      </header>

      <GatsbyImage
        className="h-auto w-auto object-cover aspect-video"
        image={aboutImage}
        alt={author}
      />

      <div className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <div dangerouslySetInnerHTML={{__html: html}} />
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
