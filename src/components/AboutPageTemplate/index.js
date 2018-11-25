import React from 'react'
import PropTypes from 'prop-types'
import Content from '../Content'

const AboutPageTemplate = ({ title, content, image, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <section className='section section--gradient'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-10 is-offset-1'>
              <section>
                <div className='content'>
                  <h3 className='has-text-weight-semibold is-size-2 title'>
                    {title}
                  </h3>
                </div>
              </section>
              <img src={image} alt={title} className='image is-full' style={{ width: '100%' }} />
              <div className='section'>
                <PageContent className='content' content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  image: PropTypes.string,
  contentComponent: PropTypes.func,
};

export default AboutPageTemplate
