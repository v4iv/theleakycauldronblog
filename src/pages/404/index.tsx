import * as React from 'react'
import {Link, HeadFC, PageProps} from 'gatsby'
import Layout from '@/components/Layout'
import {
  TypographyH1,
  TypographyLead,
  TypographyList,
  TypographyP,
} from '@/components/ui/typography'
import {Separator} from '@/components/ui/separator'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div>
        <TypographyH1>404 | Page Not Found</TypographyH1>

        <TypographyLead>
          Sorry, we can&apos;t find the page you are looking for.
        </TypographyLead>
      </div>

      <Separator />

      <div>
        <TypographyP>Are you looking for one of these?</TypographyP>

        <TypographyList>
          <li>
            <Link to="/" replace>
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" replace>
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" replace>
              Contact
            </Link>
          </li>
        </TypographyList>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>404: Page Not Found</title>
