import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Img from 'gatsby-image'
import Content from '../Content'

const AboutPageTemplate = (props) => {
  const { title, content, contentComponent, image } = props
  const PageContent = contentComponent || Content

  return <section className='mw8 center'>
    <article className='cf ph3 ph5-ns pv5'>
      <header className='fn fl-ns w-50-ns pr4-ns mb3'>
        <h1 className='f2 lh-title fw4 mb3 mt0 pt3 bt bw2 avenir'>
          {title}
        </h1>
        <h2 className='f3 mid-gray lh-title avenir fw2'>
          A brew of awesomeness with a pinch of magic...
        </h2>
        <time className='f6 ttu tracked gray'>The Leaky Cauldron Blog</time>
      </header>
      <div className='fn fl-ns w-50-ns'>
        {(typeof image === 'string')
          ? <img
            className='w-100 dib f4'
            src={image}
            alt={title}
          />
          : (_.get(image, ['childImageSharp', 'fluid']))
            ? <Img
              className='w-100 dib f4'
              fluid={_.get(image, ['childImageSharp', 'fluid'])}
              alt={title}
            />
            : <img
              className='w-100 dib f4'
              src={_.get(image, ['publicURL'], '')}
              alt={title} />}
        <PageContent content={content} className='avenir lh-copy measure f4 mt0 fw1 html-content' />
      </div>
    </article>
  </section>
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

export default AboutPageTemplate
