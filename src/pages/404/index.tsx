import * as React from 'react'
import {Separator} from '@/components/ui/separator'
import {TypographyH1, TypographyH2} from '@/components/ui/typography'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'

function NotFoundPage() {
  return (
    <Layout>
      <header className="mx-auto w-full max-w-screen-md min-h-screen flex items-center justify-center">
        <div className="flex h-12 items-center space-x-4">
          <TypographyH1>404</TypographyH1>
          <Separator orientation="vertical" />
          <TypographyH2>Page Not Found</TypographyH2>
        </div>
      </header>
    </Layout>
  )
}

export default NotFoundPage

export function Head() {
  return <SEO title="404: Page Not Found | The Leaky Cauldron Blog" />
}
