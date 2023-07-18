import * as React from 'react'
import {graphql} from 'gatsby'
import {Separator} from '@/components/ui/separator'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import Layout from '@/components/Layout'
import {ContactForm} from '@/components/_forms'

interface ContactPageTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        subtitle: string
      }
    }
  }
}

const ContactPageTemplate: React.FC<ContactPageTemplateProps> = (props) => {
  const {
    data: {
      markdownRemark: {
        frontmatter: {title, subtitle},
      },
    },
  } = props

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

export const contactPageQuery = graphql`
  query Contact($id: String!) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
        subtitle
      }
    }
  }
`
