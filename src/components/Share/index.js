import React, { Component } from 'react'
import {
  FacebookShareButton,
  FacebookShareCount,
  GooglePlusShareButton,
  GooglePlusShareCount,
  LinkedinShareButton,
  LinkedinShareCount,
  RedditShareButton,
  RedditShareCount,
  TwitterShareButton,
} from 'react-share'
import config from '../../../data/config'
import './styles.sass'

class Share extends Component {
  render () {
    const { title, slug, excerpt } = this.props
    const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
    const url = config.siteUrl + realPrefix + slug

    // const iconSize = mobile ? 36 : 48;
    const filter = count => (count > 0 ? count : '')

    return (
      <div className='social-links'>
        <RedditShareButton url={url} title={title}>
          <span className='icon has-text-grey'>
            <i className='fab fa-reddit fa-2x' aria-hidden='true' />
          </span>
          <RedditShareCount url={url}>
            {count => <div className='share-count'>{filter(count)}</div>}
          </RedditShareCount>
        </RedditShareButton>
        <TwitterShareButton url={url} title={title}>
          <span className='icon has-text-grey'>
            <i className='fab fa-twitter fa-2x' aria-hidden='true' />
          </span>
        </TwitterShareButton>
        <GooglePlusShareButton url={url}>
          <span className='icon has-text-grey'>
            <i className='fab fa-google-plus fa-2x' aria-hidden='true' />
          </span>
          <GooglePlusShareCount url={url}>
            {count => <div className='share-count'>{filter(count)}</div>}
          </GooglePlusShareCount>
        </GooglePlusShareButton>
        <FacebookShareButton url={url} quote={excerpt}>
          <span className='icon has-text-grey'>
            <i className='fab fa-facebook fa-2x' aria-hidden='true' />
          </span>
          <FacebookShareCount url={url}>
            {count => <div className='share-count'>{filter(count)}</div>}
          </FacebookShareCount>
        </FacebookShareButton>
        <LinkedinShareButton url={url} title={title} description={excerpt}>
          <span className='icon has-text-grey'>
            <i className='fab fa-linkedin fa-2x' aria-hidden='true' />
          </span>
          <LinkedinShareCount url={url}>
            {count => <div className='share-count'>{filter(count)}</div>}
          </LinkedinShareCount>
        </LinkedinShareButton>
      </div>
    )
  }
}

export default Share
