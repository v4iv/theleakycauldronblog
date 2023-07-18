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
      <section>
        <TypographyH1>{title}</TypographyH1>
        <TypographyLead>{subtitle}</TypographyLead>
      </section>

      <Separator />

      <div>
        <ContactForm />
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
