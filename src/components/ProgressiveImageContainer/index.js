import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ProgressiveImageContainer = ({ image, alt, className = '' }) => (typeof image === 'string')
  ? <img className={className} src={image} alt={alt} />
  : (get(image, ['childImageSharp', 'fluid']))
    ? <GatsbyImage
      image={getImage(image)}
      className={className}
      alt={alt} />
    : <img className={className} src={get(image, ['publicURL'], '')} alt={alt} />

ProgressiveImageContainer.propTypes = {
  image: PropTypes.any,
  alt: PropTypes.string,
  className: PropTypes.string,
}

export default ProgressiveImageContainer
