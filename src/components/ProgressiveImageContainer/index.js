import React from 'react'
import PropTypes from 'prop-types'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'

const ProgressiveImageContainer = ({image, alt, className = ''}) => {
  const publicURL = image?.publicURL

  return typeof image === 'string' ? (
    <img className={className} placeholder="blurred" src={image} alt={alt} />
  ) : getImage(image) ? (
    <GatsbyImage image={getImage(image)} className={className} alt={alt} />
  ) : (
    <img
      className={className}
      placeholder="blurred"
      src={publicURL}
      alt={alt}
    />
  )
}

ProgressiveImageContainer.propTypes = {
  image: PropTypes.any,
  alt: PropTypes.string,
  className: PropTypes.string,
}

export default ProgressiveImageContainer
