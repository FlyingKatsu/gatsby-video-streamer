import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function VideoCardMeta ({ description, image, imageAlt, playerURL, streamURL, width, height, lang, meta, keywords, title }) {
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
                content: `player`,
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
              {
                name: `twitter:player`,
                content: playerURL,
              },
              {
                name: `twitter:player:width`,
                content: width,
              },
              {
                name: `twitter:player:height`,
                content: height,
              },
              {
                name: `twitter:player:stream`,
                content: streamURL,
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

VideoCardMeta.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

VideoCardMeta.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default VideoCardMeta

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
