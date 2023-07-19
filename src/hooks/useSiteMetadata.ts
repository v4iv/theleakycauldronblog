import {graphql, useStaticQuery} from 'gatsby'

export function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query MetaData {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
          twitterUsername
        }
      }
    }
  `)

  return data.site.siteMetadata
}
