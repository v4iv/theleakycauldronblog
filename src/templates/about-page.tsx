import * as React from 'react'
import {graphql} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import {
  TypographyH1,
  TypographyLarge,
  TypographyLead,
  TypographyP,
} from '@/components/ui/typography'
import Layout from '@/components/Layout'

interface AboutPageProps {
  data: {
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
      }
    }
  }
}

const AboutPage: React.FC<AboutPageProps> = (props) => {
  const {
    data: {
      markdownRemark: {
        html,
        frontmatter: {title, subtitle, author, image},
      },
    },
  } = props

  const aboutImage = getImage(image)!

  return (
    <Layout>
      <TypographyH1>{title}</TypographyH1>
      <TypographyLead>{subtitle}</TypographyLead>
      <TypographyLarge>{author}</TypographyLarge>

      <GatsbyImage image={aboutImage} alt={author} />

      <TypographyP>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </TypographyP>
    </Layout>
  )
}

export default AboutPage

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
              width: 500
              layout: CONSTRAINED
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
