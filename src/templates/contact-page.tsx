import React from 'react'
import {HeadProps, PageProps, graphql} from 'gatsby'

import {Separator} from '@/components/ui/separator'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'
import {ContactForm} from '@/components/_forms'

type DataProps = {
  markdownRemark: {
    frontmatter: {
      title: string
      subtitle: string
      metaTitle: string
      metaDescription: string
    }
  }
}

function ContactPageTemplate({
  data: {
    markdownRemark: {
      frontmatter: {title, subtitle},
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

            <Separator />
          </header>

          <div className="py-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPageTemplate

export function Head({
  location: {pathname},
  data: {
    markdownRemark: {
      frontmatter: {metaTitle, metaDescription},
    },
  },
}: HeadProps<DataProps>) {
  return (
    <SEO pathname={pathname} title={metaTitle} description={metaDescription} />
  )
}

export const contactPageQuery = graphql`
  query Contact($id: String!, $language: String!) {
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
      frontmatter {
        title
        subtitle
        metaTitle
        metaDescription
      }
    }
  }
`
