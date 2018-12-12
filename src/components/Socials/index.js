import React, { Component } from 'react'

class Socials extends Component {
  getLinkElements () {
    const { userLinks } = this.props.config
    const { labeled } = this.props
    return userLinks.map(link => (
      <li key={link.label}>
        <a href={link.url} target='_blank' rel='noopener nofollow noreferrer'>
          <span className='icon'>
            <i className={link.iconClassName} aria-hidden='true'>
              {labeled ? link.label : ''}
            </i>
          </span>
        </a>
      </li>
    ))
  }

  render () {
    const { userLinks } = this.props.config
    if (!userLinks) {
      return null
    }
    return (
      <div className='tabs is-small is-right'>
        <ul>
          {this.getLinkElements()}
          <li>
            <a href={`feed:https://theleakycauldronblog.com${this.props.config.siteRss}`}>
              <span className='icon'>
                <i className='fas fa-rss' aria-hidden='true' />
              </span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Socials
