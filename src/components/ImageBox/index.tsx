import React from 'react'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'

interface ImageBoxProps {
  image: any
  alt: string
  className?: string
}

function ImageBox({image, alt, className}: ImageBoxProps) {
  const publicURL = image?.publicURL

  return typeof image === 'string' ? (
    <img className={className} src={image} alt={alt} />
  ) : getImage(image) ? (
    <GatsbyImage image={getImage(image)!} className={className} alt={alt} />
  ) : (
    <img className={className} src={publicURL} alt={alt} />
  )
}

export default ImageBox
