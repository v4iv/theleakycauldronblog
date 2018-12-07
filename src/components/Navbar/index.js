import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import SearchBox from '../SearchBox'

const Navbar = ({toggleNavbar, isActive}) => (

  <StaticQuery
    query={graphql`
            query SearchIndexQuery {
                siteSearchIndex {
                    index
                }
            }
        `}
    render={data => (
      <nav
        className='navbar is-transparent'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='container'>
          <div className='navbar-brand'>
            <Link className='navbar-item is-uppercase has-text-black' to='/'>
              <strong>The Leaky Cauldron &nbsp;</strong>Blog
            </Link>

            <a
              role='button'
              className={`button navbar-burger has-text-black ${isActive ? 'is-active' : ''}`}
              data-target='navMenu'
              aria-label='menu'
              aria-expanded='false'
              onClick={toggleNavbar}
            >
              <span aria-hidden='true' />
              <span aria-hidden='true' />
              <span aria-hidden='true' />
            </a>
          </div>
          <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id='navMenu'>
            <div className='navbar-end'>
              <SearchBox searchIndex={data.siteSearchIndex.index} />
              <Link className='navbar-item has-text-black' to='/'>
                Home
              </Link>
              <Link className='navbar-item has-text-black' to='/about'>
                About
              </Link>
              <Link className='navbar-item has-text-black' to='/contact'>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )}
  />
)

export default Navbar
