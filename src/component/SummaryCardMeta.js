import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SummaryCardMeta ({ description, image, imageAlt, playerURL, streamURL, width, height, lang, meta, keywords, title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${ data.site.siteMetadata.title }`}
            meta={[
              {
                name: `twitter:card`,
                content: `summary_large_image`,
              },
              {
                name: `twitter:site`,
                content: data.site.siteMetadata.social.twitter,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.social.twitter,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: description,
              },
              {
                name: `twitter:image`,
                content: image,
              },
              {
                name: `twitter:image:alt`,
                content: imageAlt,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                    name: `keywords`,
                    content: keywords.join(`, `),
                  }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SummaryCardMeta.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SummaryCardMeta.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SummaryCardMeta

const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        social {
            twitter
        }
      }
    }
  }
`
