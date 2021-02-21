import React from 'react'
import PropTypes from 'prop-types'
import ContactPageTemplate from '../../components/ContactPageTemplate'

const ContactPagePreview = (props) => {
  const { entry } = props
  const title = entry.getIn(['data', 'title'])
  const subtitle = entry.getIn(['data', 'subtitle'])
  const metaTitle = entry.getIn(['data', 'metaTitle'])
  const metaDescription = entry.getIn(['data', 'metaDescription'])

  return <div>
    <ContactPageTemplate
      title={title}
      subtitle={subtitle}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
    />
  </div>
}

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default ContactPagePreview
