import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
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
    render={data => (
      <section className='vh-100 avenir'>
        <SearchBox searchIndex={data.siteSearchIndex.index} />
      </section>)}
  />
)

export default SearchPage
