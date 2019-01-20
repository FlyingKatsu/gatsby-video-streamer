import React from 'react'
import { Link, graphql, withPrefix } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import SEO from '../component/SEO'

import { externalPathDev, externalPathServ } from '../../site-config'

class VideoPageTemplate extends React.Component {

    constructor(props) {
        super(props)
    }

    getVideoPlayer(video,title,thumbs) {
        const thumbComp = (thumbs) ? thumbs.map( (thumb) => (<img src={withPrefix(thumb.node.publicURL)} width={320} height={180} />)) : ''
        if (['video/mp4','video/ogg','video/webm'].indexOf(video.internal.mediaType) < 0) {
            return (
                <div>
                    <div>{thumbComp}</div>
                    <p>HTML5 Video player does not support the <b>.{video.extension}</b> file type, 
                        but you can still download the video to watch on your own video player:{' '}
                        <a href={withPrefix(video.publicURL)} title={`Download ${title} video`}>
                            {`${video.name}.${video.extension}`}</a> ({video.prettySize})</p>
                </div>
            )
        }
        return (
            <div>
                <video width={640} height={360} controls autoPlay playsInline>
                    <source src={withPrefix(video.publicURL)} type={video.internal.mediaType} />
                    {`Your browser does not currently support the HTML5 <video> tag`}
                </video>
                <div>{thumbComp}</div>
            </div>
        )
    }

  render () {
    //const external = (location.hostname === 'localhost') ? `file://localhost/${externalPathDev}` : externalPathServ;
    const external =  externalPathServ
    const site = this.props.data.site
    const video = this.props.data.video
    const dash = this.props.data.dash
    const hls = this.props.data.hls
    const thumbs = this.props.data.thumbs ? this.props.data.thumbs.edges : null // TODO: create a component for rendering one thumb at a time
    const post = this.props.data.post
    const order = (post) ? post.frontmatter.thumb_order : []

    const chosenThumbs = (order) ? 
        order.reduce((acc,index) => {
            if (thumbs[index-1]) {
                acc.push(thumbs[index-1])
            }
            return acc
        },[]) : ''

    const videoDetail = {
        title: 'Untitled',
        desc: `video shared by ${site.siteMetadata.author}`,
        content: {__html: '<p>No description</p>'},
    }

    if (post) {
        if (post.frontmatter) {
            videoDetail.title = post.frontmatter.title || videoDetail.title
            videoDetail.desc = post.frontmatter.decription || `${videoDetail.title} ${videoDetail.desc}`
        }
        videoDetail.content = {__html: post.html} || videoDetail.content
    }

    const siteTitle = site.siteMetadata.title
    const { slug, name, previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle} copyrightInfo={site.siteMetadata.copyrightInfo}>
        <SEO title={videoDetail.title} description={videoDetail.desc} />
        <h1>{videoDetail.title}</h1>
        <div>
            {this.getVideoPlayer(video,videoDetail.title,chosenThumbs)}
        </div>
        <div>
            <p>{(dash) ? <a href={`${external}/dash/${dash.relativePath}`}>Dash Stream</a> : 'No dash stream' }</p>
            <p>{(hls) ? <a href={`${external}/hls/${hls.relativePath}`}>HLS Stream</a> : 'No hls stream' }</p>
        </div>
        <div dangerouslySetInnerHTML={videoDetail.content}></div>
        <hr/>
        <Bio avatar={this.props.data.avatar}/>

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
                ← {previous.name}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.name} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default VideoPageTemplate

export const pageQuery = graphql`
query VideoBySlug($slug: String!, $name: String!, $avatar: String!) {
    site {
      siteMetadata {
        title
        author
        description
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
    video: file(fields: {slug: {eq: $slug}}) {
      extension
      modifiedTime(formatString: "MMMM DD, YYYY")
      name
      prettySize
      publicURL
      internal {
          mediaType
      }
    }
    dash: file(
      sourceInstanceName: {eq: "vid-dash"}
      relativeDirectory: {eq: $name}
    ) {
      base
      relativeDirectory
      relativePath
    }
    hls: file(
      sourceInstanceName: {eq: "vid-hls"}
      relativeDirectory: {eq: $name}
    ) {
      base
      relativeDirectory
      relativePath
    }
    thumbs: allFile(
        filter: {
          sourceInstanceName: {eq: "thumb"}
          relativeDirectory: {eq: $name}
        }
        sort: {
          fields: [name]
          order: ASC
        }
      ) {
          edges {
            node {
              relativePath
              publicURL
              name
              extension
            }
        }
    }
    post: markdownRemark(
        fields: { collection: {eq: "md-video-detail"} }
        frontmatter: { video_name: {eq: $name} }
      ) {
        id
        excerpt(pruneLength: 160)
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          publish
          patreontier
          category
          tagged
          thumb_order
        }
    }
  }
`
