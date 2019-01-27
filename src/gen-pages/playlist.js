import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import SEO from '../component/SEO'

class PlaylistIndex extends React.Component {
  render () {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const playlists = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}  copyrightInfo={data.site.siteMetadata.copyrightInfo}>
        <SEO
          title="All playlists"
          keywords={[`video`, `playlist`, `gatsby`, `javascript`, `react`]}
        />
        <Bio avatar={data.avatar} />
        {playlists.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default PlaylistIndex

export const pageQuery = graphql`
  query getPlaylistIndex($avatar: String!){
    site {
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
    allMarkdownRemark(
        filter: { fields: { collection: {eq: "playlist"} } }
        limit: 10
    ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              videos {
                frontmatter {
                    title
                    video_name
                }
              }
            }
          }
        }
    }
    thumbs: allFile(
        filter: {
          sourceInstanceName: {eq: "thumb"}
        }
        sort: {
          fields: [name]
          order: ASC
        }
      ) {
        group(field: relativeDirectory) {
            fieldValue
            edges {
              node {
                relativePath
                publicURL
                name
                extension
              }
            }
         }
    }
  }
`
