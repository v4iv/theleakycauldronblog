import * as React from 'react'
import {HeadProps, PageProps, graphql} from 'gatsby'
import {Separator} from '@/components/ui/separator'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import Layout from '@/components/Layout'
import {ContactForm} from '@/components/_forms'
import SEO from '@/components/SEO'

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
        <div className="px-3 md:px-0 py-3 md:py-5">
          <TypographyH1>{title}</TypographyH1>

          <div className="my-3">
            <TypographyLead>{subtitle}</TypographyLead>
          </div>

          <Separator />

          <div className="py-12 md:p-12">
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
  query Contact($id: String!) {
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
