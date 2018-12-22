import React, {Component} from 'react'
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'
import config from '../../../config'

class Share extends Component {
  render () {
    const {title, slug, excerpt} = this.props
    const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
    const url = config.siteUrl + realPrefix + slug

    return (
      <div className='pv4 ph3 ph5-ns tc'>
        <div className='dib mr3' style={{cursor: 'pointer'}}>
          <RedditShareButton url={url} title={title}>
            <span className='link grow gray dib h2 w2 br-100 pa2 bg-near-white ba b--black-10'>
              <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={{fill: 'currentcolor'}}>
                <title>Reddit icon</title>
                <path
                  d='M2.204 14.049c-.06.276-.091.56-.091.847 0 3.443 4.402 6.249 9.814 6.249 5.41 0 9.812-2.804 9.812-6.249 0-.274-.029-.546-.082-.809l-.015-.032c-.021-.055-.029-.11-.029-.165-.302-1.175-1.117-2.241-2.296-3.103-.045-.016-.088-.039-.126-.07-.026-.02-.045-.042-.067-.064-1.792-1.234-4.356-2.008-7.196-2.008-2.815 0-5.354.759-7.146 1.971-.014.018-.029.033-.049.049-.039.033-.084.06-.13.075-1.206.862-2.042 1.937-2.354 3.123 0 .058-.014.114-.037.171l-.008.015zm9.773 5.441c-1.794 0-3.057-.389-3.863-1.197-.173-.174-.173-.457 0-.632.176-.165.46-.165.635 0 .63.629 1.685.943 3.228.943 1.542 0 2.591-.3 3.219-.929.165-.164.45-.164.629 0 .165.18.165.465 0 .645-.809.808-2.065 1.198-3.862 1.198l.014-.028zm-3.606-7.573c-.914 0-1.677.765-1.677 1.677 0 .91.763 1.65 1.677 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm7.233 0c-.914 0-1.678.765-1.678 1.677 0 .91.764 1.65 1.678 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm4.548-1.595c1.037.833 1.8 1.821 2.189 2.904.45-.336.719-.864.719-1.449 0-1.002-.815-1.816-1.818-1.816-.399 0-.778.129-1.09.363v-.002zM2.711 9.963c-1.003 0-1.817.816-1.817 1.818 0 .543.239 1.048.644 1.389.401-1.079 1.172-2.053 2.213-2.876-.302-.21-.663-.329-1.039-.329v-.002zm9.217 12.079c-5.906 0-10.709-3.205-10.709-7.142 0-.275.023-.544.068-.809C.494 13.598 0 12.729 0 11.777c0-1.496 1.227-2.713 2.725-2.713.674 0 1.303.246 1.797.682 1.856-1.191 4.357-1.941 7.112-1.992l1.812-5.524.404.095s.016 0 .016.002l4.223.993c.344-.798 1.138-1.36 2.065-1.36 1.229 0 2.231 1.004 2.231 2.234 0 1.232-1.003 2.234-2.231 2.234s-2.23-1.004-2.23-2.23l-3.851-.912-1.467 4.477c2.65.105 5.047.854 6.844 2.021.494-.464 1.144-.719 1.833-.719 1.498 0 2.718 1.213 2.718 2.711 0 .987-.54 1.886-1.378 2.365.029.255.059.494.059.749-.015 3.938-4.806 7.143-10.72 7.143l-.034.009zm8.179-19.187c-.74 0-1.34.599-1.34 1.338 0 .738.6 1.34 1.34 1.34.732 0 1.33-.6 1.33-1.334 0-.733-.598-1.332-1.347-1.332l.017-.012z' />
              </svg>
            </span>
          </RedditShareButton>
        </div>
        <div className='dib mr3' style={{cursor: 'pointer'}}>
          <TwitterShareButton url={url} title={title}>
            <span className='link grow gray dib h2 w2 br-100 pa2 bg-near-white ba b--black-10'>
              <svg data-icon='twitter' viewBox='0 0 32 32' style={{fill: 'currentcolor'}}>
                <title>twitter icon</title>
                <path
                  d='M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4' />
              </svg>
            </span>
          </TwitterShareButton>
        </div>
        <div className='dib mr3' style={{cursor: 'pointer'}}>
          <GooglePlusShareButton url={url}>
            <span className='link grow gray dib h2 w2 br-100 pa2 bg-near-white ba b--black-10'>
              <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={{fill: 'currentcolor'}}>
                <title>Google+ icon</title>
                <path
                  d='M7.635 10.909v2.619h4.335c-.173 1.125-1.31 3.295-4.331 3.295-2.604 0-4.731-2.16-4.731-4.823 0-2.662 2.122-4.822 4.728-4.822 1.485 0 2.479.633 3.045 1.178l2.073-1.994c-1.33-1.245-3.056-1.995-5.115-1.995C3.412 4.365 0 7.785 0 12s3.414 7.635 7.635 7.635c4.41 0 7.332-3.098 7.332-7.461 0-.501-.054-.885-.12-1.265H7.635zm16.365 0h-2.183V8.726h-2.183v2.183h-2.182v2.181h2.184v2.184h2.189V13.09H24' />
              </svg>
            </span>
          </GooglePlusShareButton>
        </div>
        <div className='dib mr3' style={{cursor: 'pointer'}}>
          <FacebookShareButton url={url} quote={excerpt}>
            <span className='link grow gray dib h2 w2 br-100 pa2 bg-near-white ba b--black-10'>
              <svg data-icon='facebook' viewBox='0 0 32 32' style={{fill: 'currentcolor'}}>
                <title>facebook icon</title>
                <path
                  d='M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z' />
              </svg>
            </span>
          </FacebookShareButton>
        </div>
        <div className='dib mr3' style={{cursor: 'pointer'}}>
          <LinkedinShareButton url={url} title={title} description={excerpt}>
            <span className='link grow gray dib h2 w2 br-100 pa2 bg-near-white ba b--black-10'>
              <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={{fill: 'currentcolor'}}>
                <title>LinkedIn icon</title>
                <path
                  d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
              </svg>
            </span>
          </LinkedinShareButton>
        </div>
      </div>
    )
  }
}

export default Share
