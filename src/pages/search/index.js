import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import 'tachyons-sass/tachyons.scss'
import SearchBox from '../../components/SearchBox'

const SearchPage = (props) => {
  const { data, location } = props
  return <>
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
      <SearchBox location={location} searchIndex={data.siteSearchIndex.index}/>
    </section>
  </>
}

SearchPage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.any,
}

export default SearchPage

export const searchPageQuery = graphql`
    query SearchIndexQuery {
        siteSearchIndex {
            index
        }
    }
`
