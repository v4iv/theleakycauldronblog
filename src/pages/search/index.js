import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import 'tachyons-sass/tachyons.scss'
import SearchBox from '../../components/SearchBox'

const SearchPage = () => (
  <StaticQuery
    query={graphql`
            query SearchIndexQuery {
                siteSearchIndex {
                    index
                }
            }
        `}
    render={data =>
      <>
        <Helmet
          htmlAttributes={{
            lang: `en`,
          }}
          title='Search | The Leaky Cauldron Blog'
          meta={[
            {
              name: `description`,
              content: `Search The Leaky Cauldron Blog!`,
            },
            {
              name: `viewport`,
              content: `width=device-width, initial-scale=1`,
            },
          ]}
        />
        <section className='vh-100 avenir'>
          <SearchBox searchIndex={data.siteSearchIndex.index} />
        </section>
      </>}
  />
)

export default SearchPage
