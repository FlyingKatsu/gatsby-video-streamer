import React from 'react'
import { Link, graphql, withPrefix } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import SEO from '../component/SEO'

class PlaylistTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = this.props.data.site.siteMetadata.title
        const { previous, next } = this.props.pageContext
        const thumbs = this.props.data.thumbs

        const thumbMap = thumbs ? thumbs.group.reduce( (acc,group) => {
            acc[group.fieldValue] = group.edges
            return acc
        }, {}) : {}
        console.log(thumbMap)

        const videos = post.frontmatter.videos.map((vid) => {
            const name = vid.frontmatter.video_name
            return (
                <li key={vid.id}><a href={`/video/${name}`}>
                    {(thumbMap[name]) ? (<img src={withPrefix(thumbMap[name][1].node.publicURL)} width={320} height={180} />) : ''}
                    <p>{vid.frontmatter.title}</p>
                </a></li>
            )
        })

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title={post.frontmatter.title} description={post.excerpt} />
                <h1>{post.frontmatter.title}</h1>
                <div>
                    <ol>
                        {videos}
                    </ol>
                </div>
                <p>
                    {post.frontmatter.date}
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
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
  query PlaylistBySlug($slug: String!, $videos: [String!], $avatar: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    avatar: file(relativePath: { eq: $avatar }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        publish
        videos {
            id
            frontmatter {
                title
                video_name
            }
        }
      }
    }
    thumbs: allFile(
        filter: {
          sourceInstanceName: {eq: "thumb"}
          relativeDirectory: {in: $videos}
        }
        sort: {
          fields: [internal___contentDigest]
          order: ASC
        }
        skip: 1
        limit: 4
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
