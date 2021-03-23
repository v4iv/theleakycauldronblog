import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'
import { Index } from 'elasticlunr'
import withLocation from '../withLocation'

const SearchBox = (props) => {
  let index = null

  const { search, searchIndex } = props

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [active, setActive] = useState(false)

  const handleChange = evt => {
    const queryValue = evt.target.value

    navigate(`?q=${encodeURIComponent(queryValue)}`, { replace: true })
  }

  useEffect(() => {
    const { q = '' } = search

    setQuery(decodeURIComponent(q))

    setActive(!!decodeURIComponent(q))

    if (search && search.q) {
      index = index || Index.load(searchIndex)

      setResults(
        index
          .search(decodeURIComponent(q), { expand: true }) // Accept partial matches
          // Map over each ID and return the full document
          .map(({ ref }) => index.documentStore.getDoc(ref)),
      )
    }
  }, [search])

  return (
    <div className='measure center pa3'>
      <fieldset className='cf bn ma0 pa0'>
        <div className='cf'>
          <small
            id='name-desc' className='f6 black-60 db mb2 tr' style={{ cursor: 'pointer' }}
            onClick={() => window.history.back()}
          >
            Close
          </small>

          <label className='clip' htmlFor='search'>Search</label>

          <input
            className='f4 f5-l input-reset ba b--black-20 fl black-80 bg-white pa3 lh-solid w-100 br2-ns br--left-ns'
            placeholder='Search...'
            type='text'
            value={query}
            onChange={handleChange}
            id='search'
            name='search'
            aria-label='Search'
          />
        </div>
      </fieldset>

      {(active && results.length)
        ? results
          .filter(page => page.templateKey === 'article-page')
          .map(page => (
            <article key={page.slug} className='pv4 bb b--black-10 ph3 ph0-l'>
              <Link className='db ph0-l no-underline black dim' key={page.id} to={page.slug} replace>
                <h1 className='f3 fw1 baskerville mt0 lh-title'>{page.title}</h1>
              </Link>
            </article>
          ))
        : <div>
          <p className='fw1 i tc mt4 mt5-l f4 f3-l'>Are you looking for one of these?</p>

          <ul className='list tc pl0 w-100 mt5'>
            <li className='dib'>
              <Link
                className='f5 f4-ns link black db pv2 ph3 hover-light-blue' to='/'
                replace
              >
                Home
              </Link>
            </li>

            <li className='dib'>
              <Link
                className='f5 f4-ns link black db pv2 ph3 hover-light-green'
                to='/about' replace
              >
                About
              </Link>
            </li>

            <li className='dib'>
              <Link
                className='f5 f4-ns link black db pv2 ph3 hover-light-yellow'
                to='/contact' replace
              >
                Contact
              </Link>
            </li>

            <li className='dib'>
              <Link
                className='f5 f4-ns link black db pv2 ph3 hover-light-purple'
                to='/tags' replace>
                Tags
              </Link>
            </li>
          </ul>
        </div>}
    </div>
  )
}

SearchBox.propTypes = {
  search: PropTypes.shape({
    q: PropTypes.string,
  }),
  searchIndex: PropTypes.any,
}

export default withLocation(SearchBox)
