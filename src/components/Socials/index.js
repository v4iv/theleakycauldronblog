/**
 * Created by vaibhav on 9/4/18
 */
import React, { Component } from 'react'
import Link from 'gatsby-link'

class Socials extends Component {
  getLinkElements() {
    const { userLinks } = this.props.config
    const { labeled } = this.props
    return userLinks.map(link => (
      <li key={link.label}>
        <a href={link.url} target="_blank" rel="noopener nofollow">
          <span className="icon">
            <i className={link.iconClassName} aria-hidden="true">
              {labeled ? link.label : ''}
            </i>
          </span>
        </a>
      </li>
    ))
  }

  render() {
    const { userLinks } = this.props.config
    if (!userLinks) {
      return null
    }
    return (
      <div className="tabs is-small is-right">
        <ul>
          {this.getLinkElements()}
          <li>
            <Link to={this.props.config.siteRss}>
              <span className="icon">
                <i className="fas fa-rss" aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Socials
