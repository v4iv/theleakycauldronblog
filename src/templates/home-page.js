import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import config from '../../config'
import Layout from '../components/Layout'
import ArticleList from '../components/ArticleList'

const PaginationLink = props => {
  if (!props.test) {
    return (
      <Link
        to={props.url}
        className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4'
      >
        <span className='pl1'>{props.text}</span>
      </Link>
    )
  } else {
    return null
  }
}

PaginationLink.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
}

const HomePage = (props) => {
  const { pageContext: { group, index, first, last } } = props
  const previousUrl = index - 1 === 1 ? '/' : '/' + (index - 1).toString()
  const nextUrl = '/' + (index + 1).toString()

  /*eslint-disable */
  const websiteSchemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": config.siteUrl,
    "name": config.siteTitle,
    "alternateName": config.siteTitleAlt ? config.siteTitleAlt : '',
    "potentialAction": {
      "@type": "SearchAction",
      "name": `${config.siteTitle} Search`,
      "target": `${config.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
  /* eslint-enable */

  return (
    <Layout>
      <Helmet>
        <title>Home | {config.siteTitle}</title>

        {/* Schema.org tags */}
        <script type='application/ld+json'>
          {JSON.stringify(websiteSchemaOrgJSONLD)}
        </script>

        {/* Open Graph Tags */}
        <meta property='og:url' content={`${config.siteUrl}/contact`} />

        <meta property='og:title' content={config.siteTitle} />

        <meta property='og:description' content={config.siteDescription} />

        <link rel='canonical' href={`${config.siteUrl}`} />
      </Helmet>

      <div>
        <ArticleList posts={group} />

        <div className='flex items-center justify-center pa4'>
          <PaginationLink test={first} url={previousUrl} text='Previous Page' />

          <PaginationLink test={last} url={nextUrl} text='Next Page' />
        </div>
      </div>
    </Layout>
  )
}

HomePage.propTypes = {
  pageContext: PropTypes.shape({
    index: PropTypes.number,
    first: PropTypes.boolean,
    last: PropTypes.boolean,
    group: PropTypes.array,
  }),
}

export default HomePage
