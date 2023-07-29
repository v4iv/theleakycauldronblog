import * as React from 'react'
import {graphql} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {Separator} from '@/components/ui/separator'
import {TypographyH1, TypographyH2} from '@/components/ui/typography'
import {useSiteMetadata} from '@/hooks/useSiteMetadata'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'

function NotFoundPage() {
  const {t} = useTranslation('common')

  return (
    <Layout>
      <header className="mx-auto w-full max-w-screen-md min-h-screen flex items-center justify-center">
        <div className="flex h-12 items-center space-x-4">
          <TypographyH1>404</TypographyH1>
          <Separator orientation="vertical" />
          <TypographyH2>{t('page-not-found')}</TypographyH2>
        </div>
      </header>
    </Layout>
  )
}

export default NotFoundPage

export function Head() {
  const {title} = useSiteMetadata()

  return <SEO title={`404: Page Not Found | ${title}`} />
}

export const notFoundQuery = graphql`
  query NotFound($language: String!) {
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
  }
`
