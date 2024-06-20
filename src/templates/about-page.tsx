import React from 'react'
import {HeadProps, PageProps, graphql} from 'gatsby'

import {useSiteMetadata} from '@/hooks/useSiteMetadata'
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
        <div className="p-3 md:px-0 md:py-5">
          <header className="space-y-3">
            <TypographyH1 className="font-mono animate-in slide-in-from-top">
              {title}
            </TypographyH1>

            <TypographyLead className="font-mono animate-in slide-in-from-right">
              {subtitle}
            </TypographyLead>

            <TypographyLarge className="font-mono text-aquablue-700 animate-in slide-in-from-bottom dark:text-aquamarine-500">
              {author}
            </TypographyLarge>
          </header>
        </div>
      </div>

      <ImageBox
        className="h-auto w-full object-cover"
        image={image}
        alt={author}
      />

      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
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
  const {title, siteUrl} = useSiteMetadata()

  const breadcrumbSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': siteUrl,
          name: 'Home',
          image: `${siteUrl}/icon-512.png`,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': `${siteUrl}/about/`,
          name: 'About',
          image: `${siteUrl}/icon-512.png`,
        },
      },
    ],
  }

  const aboutPageSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'AboutPage',
    url: `${siteUrl}/about/`,
    headline: metaTitle,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/about/`,
    },
    image: {
      '@type': 'ImageObject',
      url: image.publicURL,
      width: 3120,
      height: 1394,
    },
    publisher: {
      '@type': 'Organization',
      name: title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    description: metaDescription,
  }

  return (
    <SEO
      pathname={pathname}
      title={metaTitle}
      description={metaDescription}
      author={author}
      image={image.publicURL}
    >
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchemaOrgJSONLD)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(aboutPageSchemaOrgJSONLD)}
      </script>
    </SEO>
  )
}

export const aboutPageQuery = graphql`
  query About($id: String!, $language: String!) {
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
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        title
        subtitle
        author
        image {
          childImageSharp {
            gatsbyImageData(
              quality: 85
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, AVIF, WEBP]
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
