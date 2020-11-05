import React from 'react'
import { get } from 'lodash'
import Img from 'gatsby-image'

const ProgressiveImageContainer = ({ image, alt, className = '' }) => (typeof image === 'string')
  ? <img className={className} src={image} alt={alt} />
  : (get(image, ['childImageSharp', 'fluid']))
    ? <Img className={className} fluid={get(image, ['childImageSharp', 'fluid'])} alt={alt} />
    : <img className={className} src={get(image, ['publicURL'], '')} alt={alt} />

export default ProgressiveImageContainer
