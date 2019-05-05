import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import SEO from '../component/SEO'
import CustomHead from '../component/CustomHead'

import HorizontalList from '../component/container/HorizontalList'
import FullThumb from '../component/thumbnail/FullThumb'

class PlaylistTemplate extends React.Component {
    render() {
        const playlist = this.props.data.playlist
        const siteTitle = this.props.data.site.siteMetadata.title
        const { previous, next } = this.props.pageContext

        return (
            <Layout location={this.props.location} title={siteTitle} copyrightInfo={this.props.data.site.siteMetadata.copyrightInfo}>
                {
                    //<SEO title={playlist.fields.title} description={playlist.excerpt} />
                }
                <CustomHead>
                    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css' />
                </CustomHead>

                <h1>{playlist.fields.title}</h1>
                <p>{playlist.fields.date}</p>
                <div className={`markdown-body`} dangerouslySetInnerHTML={{ __html: playlist.html }} />
                <HorizontalList>
                    {playlist.frontmatter.videos? playlist.frontmatter.videos.map( (video,index) => {
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
                <hr />
                <Bio avatar={this.props.data.avatar} />

                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.fields.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.fields.title} →
              </Link>
                        )}
                    </li>
                </ul>
            </Layout>
        )
    }
}

export default PlaylistTemplate

export const pageQuery = graphql`
  query PlaylistBySlug($slug: String!, $avatar: String!) {
    site {
      siteMetadata {
        title
        author
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
    playlist: markdownRemark(fields: {slug: {eq: $slug}}) {
          html
          excerpt(pruneLength: 160)
          fields {
            collection
            slug
            title
            name
            videos
            description
            tagged
            date
          }
          frontmatter {
            date(fromNow: true)
            videos {
              frontmatter {
                date(fromNow: true)
              }
              fields {
                slug
                title
                description
                tagged
                date
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
`
