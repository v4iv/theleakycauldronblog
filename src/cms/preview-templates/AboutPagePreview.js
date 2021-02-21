import React from 'react'
import PropTypes from 'prop-types'
import AboutPageTemplate from '../../components/AboutPageTemplate'

const AboutPagePreview = (props) => {
  const { entry, widgetFor } = props

  const title = entry.getIn(['data', 'title'])
  const subtitle = entry.getIn(['data', 'subtitle'])
  const author = entry.getIn(['data', 'author'])
  const image = { publicURL: entry.getIn(['data', 'image']) }
  const metaTitle = entry.getIn(['data', 'metaTitle'])
  const metaDescription = entry.getIn(['data', 'metaDescription'])
  const content = widgetFor('body')

  return <div>
    <AboutPageTemplate
      title={title}
      subtitle={subtitle}
      author={author}
      image={image}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      content={content}
    />
  </div>
}

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
