import React, {Component} from 'react'
import {Link} from 'gatsby'
import {Index} from 'elasticlunr'

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      isActive: false,
    }
  }

  render () {
    return (
      <div className='measure center pa3'>
        <fieldset className='cf bn ma0 pa0'>
          <div className='cf'>
            <small id='name-desc' className='f6 black-60 db mb2 tr' style={{cursor: 'pointer'}}
              onClick={() => window.history.back()}>Close
            </small>
            <label className='clip' htmlFor='search'>Search</label>
            <input
              className='f4 f5-l input-reset ba b--black-20 fl black-80 bg-white pa3 lh-solid w-100 br2-ns br--left-ns'
              placeholder='Search...'
              type='text'
              name='search'
              onChange={this.search}
              value={this.state.query}
              id='search' />
          </div>
        </fieldset>
        {(this.state.isActive && this.state.results.length)
          ? this.state.results
            .filter(page => page.templateKey === 'article-page')
            .map(page => (
              <article className='pv4 bb b--black-10 ph3 ph0-l'>
                <Link className='db ph0-l no-underline black dim' key={page.id} to={page.slug} replace>
                  <h1 className='f3 fw1 baskerville mt0 lh-title'>{page.title}</h1>
                </Link>
              </article>
            ))
          : <div>
            <p className='fw1 i tc mt4 mt5-l f4 f3-l'>Are you looking for one of these?</p>
            <ul className='list tc pl0 w-100 mt5'>
              <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-blue' to='/'
                replace>Home</Link>
              </li>
              <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-green'
                to='/about' replace>About</Link>
              </li>
              <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-yellow'
                to='/contact' replace>Contact</Link>
              </li>
              <li className='dib'><Link className='f5 f4-ns link black db pv2 ph3 hover-light-purple'
                to='/tags' replace>Tags</Link>
              </li>
            </ul>
          </div>
        }
      </div>
    )
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {expand: true}) // Accept partial matches
        // Map over each ID and return the full document
        .map(({ref}) => this.index.documentStore.getDoc(ref)),
      isActive: !!query,
    })
  }
}
