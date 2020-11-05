import React from 'react'
import PropTypes from 'prop-types'
import AboutPageTemplate from '../../components/AboutPageTemplate'

const AboutPagePreview = (props) => {
  const { entry, widgetFor } = props

  const title = entry.getIn(['data', 'title'])
  const subtitle = entry.getIn(['data', 'subtitle'])
  const author = entry.getIn(['data', 'author'])
  const image = { publicURL: entry.getIn(['data', 'image']) }
  const meta_title = entry.getIn(['data', 'meta_title'])
  const meta_description = entry.getIn(['data', 'meta_description'])
  const content = widgetFor('body')

  return <div>
    <AboutPageTemplate
      title={title}
      subtitle={subtitle}
      author={author}
      image={image}
      meta_title={meta_title}
      meta_description={meta_description}
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
