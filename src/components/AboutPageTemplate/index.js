import React from 'react'
import PropTypes from 'prop-types'
import Content from '../Content'
import ProgressiveImageContainer from '../ProgressiveImageContainer'

const AboutPageTemplate = (props) => {
  const { title, subtitle, author, content, contentComponent, image } = props
  const PageContent = contentComponent || Content

  return <section className='mw8 center'>
    <article className='cf ph3 ph5-ns pv5'>
      <header className='fn fl-ns w-50-ns pr4-ns mb3'>
        <h1 className='f2 lh-title fw4 mb3 mt0 pt3 bt bw2 avenir'>
          {title}
        </h1>

        <h2 className='f3 mid-gray lh-title avenir fw2'>
          {subtitle}
        </h2>

        <time className='f6 ttu tracked gray'>{author}</time>
      </header>

      <div className='fn fl-ns w-50-ns'>
        <ProgressiveImageContainer
          className='w-100 dib f4'
          image={image}
          alt={title}
        />

        <PageContent content={content} className='avenir lh-copy measure f4 mt0 fw1 html-content' />
      </div>
    </article>
  </section>
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.any,
  author: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

export default AboutPageTemplate
