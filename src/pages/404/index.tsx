import React from 'react'
import {graphql} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'

import {useSiteMetadata} from '@/hooks/useSiteMetadata'
import {Separator} from '@/components/ui/separator'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'

function NotFoundPage() {
  const {t} = useTranslation('common')

  return (
    <Layout>
      <header className="mx-auto flex min-h-screen w-full max-w-screen-md items-center justify-center">
        <div className="flex h-8 items-center space-x-4">
          <h1 className="text-sm text-muted-foreground md:text-xl">404</h1>

          <Separator orientation="vertical" />

          <p className="text-sm text-muted-foreground md:text-xl">
            {t('page-not-found')}
          </p>
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
