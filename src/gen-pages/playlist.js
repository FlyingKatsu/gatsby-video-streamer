import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import SEO from '../component/SEO'

import HorizontalList from '../component/container/HorizontalList'
import FullThumb from '../component/thumbnail/FullThumb'

class PlaylistIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const playlists = this.props.data.playlists.edges

    return (
      <Layout location={this.props.location} title={siteTitle} 
        copyrightInfo={this.props.data.site.siteMetadata.copyrightInfo}>
        <SEO
          title="All playlists"
          keywords={[`video`, `playlist`, `gatsby`, `javascript`, `react`]}
        />
        <Bio avatar={this.props.data.avatar} />
        {playlists ? playlists.map(({ node },index) => (
          <HorizontalList key={index}
            title={node.fields.title || node.fields.slug}
            link={ {path: node.fields.slug, name: `Play All`} }
            count={3}
          >
            {node.frontmatter.videos? node.frontmatter.videos.map( (video,index) => {
                if (video) {
                    const vfiles = video.fields.video_websafe || video.fields.video_other
                    const vfile = (vfiles && vfiles.length) > 0 ? vfiles[0] : {fields: {}}
                    const thumbs = video.fields.thumbnails || []
                    const thumbIndex = video.fields.thumb_order[0] - 1 || 0
                    return (
                        <FullThumb key={index}
                        title={video.fields.title || video.fields.slug}
                        link={ {path: video.fields.slug, name: ``} }
                        image={thumbs[thumbIndex]}
                        timeSince={video.frontmatter.date || vfile.mtime}
                        duration={0}//{vfile.fields.duration || 0}
                        />
                    )
                }
            }) : ''}
          </HorizontalList>
        )) : ''}
      </Layout>
    )
  }
}

export default PlaylistIndex

export const pageQuery = graphql`
  query getPlaylistIndex($avatar: String!) {
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
    playlists: allMarkdownRemark(
      filter: {fields: {collection: {eq: "playlist"}}}
      sort: { fields: [fields___title], order: ASC }
      ) {
      edges {
        node {
          fields {
            collection
            slug
            title
            name
          }
          frontmatter {
            date(fromNow:true)
            videos {
              frontmatter {
                date(fromNow:true)
              }
              fields {
                slug
                title
                thumb_order
                thumbnails {
                  childImageSharp {
                    fixed(width: 256, height: 144) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
                video_websafe {
                  mtime(fromNow: true)
                }
              }
            }
          }
        }
      }
    }
  }
`
