import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import SEO from '../component/SEO'

class VideoIndex extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const videos = data.videos.edges
        const thumbs = data.thumbs ? data.thumbs.edges : null // TODO: make component for rendering thumbnails

        return (
            <Layout location={this.props.location} title={siteTitle} copyrightInfo={data.site.siteMetadata.copyrightInfo}>
                <SEO
                    title="All videos"
                    keywords={[`video`, `gatsby`, `javascript`, `react`]}
                />
                <Bio avatar={data.avatar} />
                {videos.map(({ node }) => {
                    const title = node.name || node.fields.slug
                    return (
                        <div key={node.fields.slug}>
                            <h3>
                                <Link to={node.fields.slug}>
                                    {title}
                                </Link>
                                {' '}- <small><time dateTime={node.modifiedTime}>{node.modifiedTime}</time></small>
                            </h3>
                            {thumbs ? <img src={thumbs[0].publicURL} /> : ''}
                        </div>
                    )
                })}
            </Layout>
        )
    }
}

export default VideoIndex

export const pageQuery = graphql`
  query getVideoIndex($avatar: String!) {
    site: site {
      siteMetadata {
        title
        copyrightInfo
      }
    }
    avatar: file(relativePath: { eq: $avatar }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    videos: allFile(
        filter: { sourceInstanceName: { eq: "video" } }
        sort: { fields: modifiedTime, order: DESC }
        limit: 20
    ) {
      edges {
        node {
          extension
          publicURL
          modifiedTime(formatString: "MMMM DD, YYYY")
          name
          fields {
            slug
          }
        }
      }
    }
    thumbs: allFile(
        filter: { sourceInstanceName: { eq: "thumb" } }
        limit: 4
    ) {
      edges {
        node {
          extension
          publicURL
          name
          relativeDirectory
        }
      }
    }
  }
`
