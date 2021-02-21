import React from 'react'
import PropTypes from 'prop-types'
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Share = (props) => {
  const { title, slug, excerpt, pathPrefix, siteURL } = props
  const realPrefix = pathPrefix === '/' ? '' : pathPrefix
  const url = siteURL + realPrefix + slug

  return (
    <div className='pv4 ph3 ph5-ns tc'>
      <div className='avenir v-mid ma2'>
        <small>
          SHARE
        </small>
      </div>

      <div className='dib ma2 v-mid' style={{ cursor: 'pointer' }}>
        <RedditShareButton url={url} title={title}>
          <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
            <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={{ fill: 'currentcolor' }}>
              <title>Share on Reddit</title>

              <path
                d='M2.204 14.049c-.06.276-.091.56-.091.847 0 3.443 4.402 6.249 9.814 6.249 5.41 0 9.812-2.804 9.812-6.249 0-.274-.029-.546-.082-.809l-.015-.032c-.021-.055-.029-.11-.029-.165-.302-1.175-1.117-2.241-2.296-3.103-.045-.016-.088-.039-.126-.07-.026-.02-.045-.042-.067-.064-1.792-1.234-4.356-2.008-7.196-2.008-2.815 0-5.354.759-7.146 1.971-.014.018-.029.033-.049.049-.039.033-.084.06-.13.075-1.206.862-2.042 1.937-2.354 3.123 0 .058-.014.114-.037.171l-.008.015zm9.773 5.441c-1.794 0-3.057-.389-3.863-1.197-.173-.174-.173-.457 0-.632.176-.165.46-.165.635 0 .63.629 1.685.943 3.228.943 1.542 0 2.591-.3 3.219-.929.165-.164.45-.164.629 0 .165.18.165.465 0 .645-.809.808-2.065 1.198-3.862 1.198l.014-.028zm-3.606-7.573c-.914 0-1.677.765-1.677 1.677 0 .91.763 1.65 1.677 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm7.233 0c-.914 0-1.678.765-1.678 1.677 0 .91.764 1.65 1.678 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm4.548-1.595c1.037.833 1.8 1.821 2.189 2.904.45-.336.719-.864.719-1.449 0-1.002-.815-1.816-1.818-1.816-.399 0-.778.129-1.09.363v-.002zM2.711 9.963c-1.003 0-1.817.816-1.817 1.818 0 .543.239 1.048.644 1.389.401-1.079 1.172-2.053 2.213-2.876-.302-.21-.663-.329-1.039-.329v-.002zm9.217 12.079c-5.906 0-10.709-3.205-10.709-7.142 0-.275.023-.544.068-.809C.494 13.598 0 12.729 0 11.777c0-1.496 1.227-2.713 2.725-2.713.674 0 1.303.246 1.797.682 1.856-1.191 4.357-1.941 7.112-1.992l1.812-5.524.404.095s.016 0 .016.002l4.223.993c.344-.798 1.138-1.36 2.065-1.36 1.229 0 2.231 1.004 2.231 2.234 0 1.232-1.003 2.234-2.231 2.234s-2.23-1.004-2.23-2.23l-3.851-.912-1.467 4.477c2.65.105 5.047.854 6.844 2.021.494-.464 1.144-.719 1.833-.719 1.498 0 2.718 1.213 2.718 2.711 0 .987-.54 1.886-1.378 2.365.029.255.059.494.059.749-.015 3.938-4.806 7.143-10.72 7.143l-.034.009zm8.179-19.187c-.74 0-1.34.599-1.34 1.338 0 .738.6 1.34 1.34 1.34.732 0 1.33-.6 1.33-1.334 0-.733-.598-1.332-1.347-1.332l.017-.012z'
              />
            </svg>
          </span>
        </RedditShareButton>
      </div>

      <div className='dib ma2 v-mid' style={{ cursor: 'pointer' }}>
        <TwitterShareButton url={url} title={`${title} via @aleakycauldron`}>
          <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
            <svg data-icon='twitter' viewBox='0 0 32 32' style={{ fill: 'currentcolor' }}>
              <title>Share on Twitter</title>

              <path
                d='M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4'
              />
            </svg>
          </span>
        </TwitterShareButton>
      </div>

      <div className='dib ma2 v-mid' style={{ cursor: 'pointer' }}>
        <FacebookShareButton url={url} quote={excerpt}>
          <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
            <svg data-icon='facebook' viewBox='0 0 32 32' style={{ fill: 'currentcolor' }}>
              <title>Share on Facebook</title>

              <path
                d='M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z'
              />
            </svg>
          </span>
        </FacebookShareButton>
      </div>

      <div className='dib ma2 v-mid' style={{ cursor: 'pointer' }}>
        <WhatsappShareButton url={url} title={title}>
          <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
            <svg data-icon='whatsapp' viewBox='0 0 24 24' style={{ fill: 'currentcolor' }}>
              <title>Share on WhatsApp</title>

              <path
                d='M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411' />
            </svg>
          </span>
        </WhatsappShareButton>
      </div>

      <div className='dib ma2 v-mid' style={{ cursor: 'pointer' }}>
        <LinkedinShareButton url={url} title={title} description={excerpt}>
          <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
            <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={{ fill: 'currentcolor' }}>
              <title>Share on LinkedIn</title>

              <path
                d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
              />
            </svg>
          </span>
        </LinkedinShareButton>
      </div>

      <div className='dib ma2 v-mid' style={{ cursor: 'pointer' }}>
        <CopyToClipboard text={url} onCopy={() => alert('URL copied to clipboard.')}>
          <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
            <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={{ fill: 'currentcolor' }} fillRule='evenodd' clipRule='evenodd'>
              <title>Copy Link URL</title>

              <path
                d='M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z' />
            </svg>
          </span>
        </CopyToClipboard>
      </div>
    </div>
  )
}

Share.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  excerpt: PropTypes.string,
  pathPrefix: PropTypes.string,
  siteURL: PropTypes.string,
}

export default Share
