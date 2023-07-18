import * as React from 'react'
import {Link} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'

interface ArticleListProps {
  pages: {
    node: {
      excerpt: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        cover: {
          childImageSharp: any
          publicURL: string
        }
        author: string
        date: string
        templateKey: string
      }
    }
  }[]
}

const ArticleList: React.FC<ArticleListProps> = (props) => {
  const {pages} = props

  return (
    <section className="mx-auto w-full max-w-screen-md">
      {pages
        .filter(
          (page) => page?.node?.frontmatter?.templateKey === 'article-page',
        )
        .map(
          (
            {
              node: {
                excerpt,
                fields: {slug},
                frontmatter: {title, cover, author, date},
              },
            },
            idx,
          ) => {
            const image = getImage(cover)!
            return (
              <article
                key={`${slug}-${idx}`}
                className="py-7 px-3 md:px-0 border-b border-black-10"
              >
                <div className="flex sm:flex-row flex-col">
                  <div className="md:w-90 md:pr-3 pr-0 order-2 md:order-1 md:w-3/5">
                    <Link
                      className="block px-0 lg:px-0 underline-none text-black opacity-100 hover:text-gray-500 transition-colors duration-200"
                      to={slug}
                    >
                      <h2 className="text-2xl font-light font-serif mt-0 leading-tight">
                        {title}
                      </h2>

                      <p className="text-sm sm:text-base leading-normal font-light pt-3">
                        {excerpt}
                      </p>
                    </Link>
                  </div>

                  <div className="md:pl-3 pl-0 order-1 mb-4 md:mb-0 w-full md:w-2/5 md:ml-auto md:order-last">
                    <Link
                      className="block px-0 lg:px-0 underline-none text-black transform hover:scale-105 transition-transform duration-300"
                      to={slug}
                    >
                      <GatsbyImage className="block" image={image} alt={slug} />
                    </Link>
                  </div>
                </div>

                <small className="text-sm leading-relaxed text-gray-500 my-0">
                  By&nbsp;<span className="uppercase">{author}</span>
                </small>

                <time className="block text-black">
                  <small>{date}</small>
                </time>
              </article>
            )
          },
        )}
    </section>
  )
}

export default ArticleList
