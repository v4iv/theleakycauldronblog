import React, {useEffect, useState} from 'react'
import slugify from 'slugify'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {Link, graphql, PageProps, HeadProps} from 'gatsby'
import {ChevronsUp} from 'lucide-react'
import 'prismjs/themes/prism-twilight.css'

import {useSiteMetadata} from '@/hooks/useSiteMetadata'
import {Button} from '@/components/ui/button'
import {badgeVariants} from '@/components/ui/badge'
import {TypographyH1, TypographyLead} from '@/components/ui/typography'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'
import ImageBox from '@/components/ImageBox'
import Content from '@/components/Content'
import ShareSheet from '@/components/ShareSheet'
import CommentBox from '@/components/CommentBox'

type DataProps = {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
  markdownRemark: {
    id: string
    html: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      metaTitle: string
      metaDescription: string
      cover: {
        childImageSharp: any
        publicURL: string
      }
      date: string
      author: string
      authorLink: string
      tags: string[]
    }
  }
}

function ArticlePageTemplate({
  data: {
    site: {
      siteMetadata: {siteUrl},
    },
    markdownRemark: {
      html,
      id,
      fields: {slug},
      frontmatter: {title, cover, date, author, authorLink, tags},
    },
  },
}: PageProps<DataProps>) {
  const {t} = useTranslation()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Button is displayed after scrolling for 300 pixels
    const handleScrollButtonVisiblity = () => {
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
        ? setShowButton(true)
        : setShowButton(false)
    }

    window.addEventListener('scroll', handleScrollButtonVisiblity)
    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisiblity)
    }
  }, [])

  return (
    <Layout>
      <article>
        <div className="mx-auto w-full max-w-screen-md">
          <div className="p-3 md:px-0 md:py-5">
            <header className="space-y-3">
              <TypographyH1>{title}</TypographyH1>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-x-2">
                  <TypographyLead>
                    <a
                      className="font-mono text-aquablue-500 hover:text-aquablue-900"
                      rel="noreferrer nofollow noopener"
                      href={authorLink}
                    >
                      {author}
                    </a>
                  </TypographyLead>

                  <TypographyLead>&middot;</TypographyLead>

                  <TypographyLead className="font-mono">{date}</TypographyLead>
                </div>

                <div className="hidden md:flex">
                  <ShareSheet title={title} slug={slug} siteURL={siteUrl} />
                </div>
              </div>

              <div className="flex flex-wrap gap-y-3">
                {tags.map((tag, idx) => (
                  <Link
                    key={`${slugify(tag)}-${idx}`}
                    className={`${badgeVariants({variant: tag === 'guest author' ? 'destructive' : 'default'})} mr-2 font-mono`}
                    to={`/tags/${slugify(tag)}/`}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </header>
          </div>
        </div>

        <ImageBox
          className="aspect-video h-auto w-full object-cover"
          image={cover}
          alt={title}
        />

        <div className="mx-auto w-full max-w-screen-md">
          <div className="p-3 md:px-0 md:py-5">
            <Content html={html} />
          </div>

          <div className="flex justify-center">
            <ShareSheet
              title={title}
              slug={slug}
              siteURL={siteUrl}
              side="top"
              orientation="horizontal"
            />
          </div>

          <CommentBox id={id} slug={slug} title={title} siteURL={siteUrl} />

          {showButton && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={t('scroll-to-top')}
                  size="icon"
                  variant="destructive"
                  className="fixed bottom-5 right-2"
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                >
                  <ChevronsUp className="size-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="left">{t('scroll-to-top')}</TooltipContent>
            </Tooltip>
          )}
        </div>
      </article>
    </Layout>
  )
}

export default ArticlePageTemplate

export function Head({
  location: {pathname},
  data: {
    markdownRemark: {
      frontmatter: {
        author,
        authorLink,
        cover,
        date,
        metaTitle,
        metaDescription,
      },
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
          '@id': siteUrl + pathname,
          name: title,
          image: cover.publicURL,
        },
      },
    ],
  }

  const blogPostingSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    url: siteUrl + pathname,
    name: title,
    headline: metaTitle,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteUrl + pathname,
    },
    author: {
      '@type': 'Person',
      name: author,
      url: authorLink,
    },
    image: {
      '@type': 'ImageObject',
      url: cover.publicURL,
    },
    datePublished: date,
    dateModified: date,
    publisher: {
      '@type': 'Organization',
      name: title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon-512.png`,
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
      image={cover.publicURL}
    >
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchemaOrgJSONLD)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(blogPostingSchemaOrgJSONLD)}
      </script>
    </SEO>
  )
}

export const articleQuery = graphql`
  query Article($id: String!, $language: String!) {
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
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(id: {eq: $id}) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        authorLink
        cover {
          childImageSharp {
            gatsbyImageData(
              quality: 75
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, AVIF, WEBP]
            )
          }
          publicURL
        }
        metaTitle
        metaDescription
        tags
      }
    }
  }
`
