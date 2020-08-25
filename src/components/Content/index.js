import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
