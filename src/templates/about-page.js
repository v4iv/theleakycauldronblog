/**
 * Created by vaibhav on 9/4/18
 */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Content, { HTMLContent } from '../components/Content'
import config from "../../meta/config";

export const AboutPageTemplate = ({ title, content, image, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <section>
                <div className="content">
                  <h3 className="has-text-weight-semibold is-size-2 title">
                    {title}
                  </h3>
                </div>
              </section>
              <img src={image} alt={title} className="image is-full" style={{ width: "100%" }}/>
              <div className="section">
                <PageContent className="content" content={content} />
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
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  const breadcrumbSchemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": config.siteUrl,
          name: "Home",
          image: config.siteUrl + "/icons/icon-512x512.png"
        }
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": config.siteUrl + '/about/',
          name: "About",
          image: config.siteUrl + "/icons/icon-512x512.png"
        }
      }
    ]
  };

  const aboutPageSchemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "AboutPage",
    url: config.siteUrl + '/about/',
    headline: post.frontmatter.title,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": config.siteUrl + '/about/',
    },
    image: {
      "@type": "ImageObject",
      url: post.frontmatter.image,
      width: 3120,
      height: 1394
    },
    publisher: {
      "@type": "Organization",
      name: config.siteTitle,
      logo: {
        "@type": "ImageObject",
        url: config.siteUrl + "/icons/icon-512x512.png",
        width: 512,
        height: 512
      }
    },
    description: post.frontmatter.meta_description
  }

  return (
    <div>
      <Helmet>
        <title>{post.frontmatter.meta_title}</title>
        <meta name="description" content={post.frontmatter.meta_description} />
        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaOrgJSONLD)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(aboutPageSchemaOrgJSONLD)}
        </script>
      </Helmet>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </div>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image
        meta_title
        meta_description
      }
    }
  }
`
