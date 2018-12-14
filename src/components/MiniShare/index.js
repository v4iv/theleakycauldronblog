import React, { Component } from 'react'
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'
import config from '../../../data/config'
import './styles.sass'

class MiniShare extends Component {
  render () {
    const { title, slug, excerpt } = this.props
    const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
    const url = config.siteUrl + realPrefix + slug

    return (
      <div className='social-links-mini'>
        <TwitterShareButton url={url} title={title}>
          <span className='icon has-text-grey'>
            <i className='fab fa-twitter' aria-hidden='true' />
          </span>
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={excerpt}>
          <span className='icon has-text-grey'>
            <i className='fab fa-facebook-f' aria-hidden='true' />
          </span>
        </FacebookShareButton>
        <GooglePlusShareButton url={url}>
          <span className='icon has-text-grey'>
            <i className='fab fa-google-plus-g' aria-hidden='true' />
          </span>
        </GooglePlusShareButton>
        <LinkedinShareButton url={url} title={title} description={excerpt}>
          <span className='icon has-text-grey'>
            <i className='fab fa-linkedin-in' aria-hidden='true' />
          </span>
        </LinkedinShareButton>
        <RedditShareButton url={url} title={title}>
          <span className='icon has-text-grey'>
            <i className='fab fa-reddit-alien' aria-hidden='true' />
          </span>
        </RedditShareButton>
      </div>
    )
  }
}

export default MiniShare
