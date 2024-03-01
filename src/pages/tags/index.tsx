import React from 'react'
import {HeadProps, Link, PageProps, graphql} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import slugify from 'slugify'
import {useSiteMetadata} from '@/hooks/useSiteMetadata'
import {Separator} from '@/components/ui/separator'
import {badgeVariants} from '@/components/ui/badge'
import {TypographyH1} from '@/components/ui/typography'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'

type DataProps = {
  allMarkdownRemark: {
    group: {
      fieldValue: string
      totalCount: number
    }[]
  }
}

function TagsPage({
  data: {
    allMarkdownRemark: {group: tags},
  },
}: PageProps<DataProps>) {
  const {t} = useTranslation('common')

  return (
    <Layout>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <header className="space-y-3">
            <TypographyH1>{t('tags')}</TypographyH1>

            <Separator />
          </header>

          <div className="flex flex-wrap gap-y-4 py-12">
            {tags?.map((tag, idx) => (
              <Link
                key={`${tag.fieldValue}-${idx}`}
                to={`/tags/${slugify(tag.fieldValue)}/`}
                className={`${badgeVariants({
                  variant: 'outline',
                })} mr-4 font-mono`}
              >
                #{tag.fieldValue} ({tag.totalCount})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TagsPage

export function Head({location: {pathname}}: HeadProps) {
  const {title} = useSiteMetadata()

  return <SEO pathname={pathname} title={`Tags | ${title}`} />
}

export const tagPageQuery = graphql`
  query Tags($language: String!) {
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
    allMarkdownRemark(limit: 1000) {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`
