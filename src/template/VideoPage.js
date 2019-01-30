import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import CustomHead from '../component/CustomHead'
import SEO from '../component/SEO'

import { externalPathDev, externalPathServ } from '../../site-config'
//const external = (location.hostname === 'localhost') ? `file://localhost/${externalPathDev}` : externalPathServ;
const external =  externalPathDev

if (typeof window !== `undefined`) {
    const OpenPlayer = require('openplayerjs')
}

class VideoPageTemplate extends React.Component {

    constructor(props) {
        super(props)
        this.playable = (this.props.data.video.fields.detail && this.props.data.video.fields.detail.fields.video_websafe)
    }

    getVideoPlayer(video,title,thumbs) {

        const thumbComp = (thumbs != null && thumbs[0].image) ? <Image fixed={this.props.image.childImageSharp.fixed} /> : ''
        if (!this.playable) {
            return (
                <div>
                    <div>{thumbComp}</div>
                    <p>HTML5 Video player does not support the <b>.{video.extension}</b> file type, 
                        but you can still download the video to watch on your own video player:{' '}
                        <a href={`${external}/${video.relativePath}`} title={`Download ${title} video`}>
                            {`${video.name}.${video.extension}`}</a> ({video.prettySize})</p>
                </div>
            )
        }
        // <source src='https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd' type='application/dash+xml'></source>
        // <source src='https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8' type='application/x-mpegURL' />
        return (
            <div>
                <video id={'videoPlayer'} className={`op-player op-player__media`} width={640} height={360} controls playsInline>
                    {(video.fields.detail.fields.video_dash) ? 
                      <source src={`${external}/dash/${video.fields.detail.fields.video_dash.relativePath}`}
                        type='application/dash+xml'/> : ``}
                    {(video.fields.detail.fields.video_hls) ? 
                      <source src={`${external}/hls/${video.fields.detail.fields.video_hls.relativePath}`}
                        type='application/x-mpegURL'/> : ``}
                    {(video.fields.detail.fields.title === `Big Buck Bunny`) ? 
                        <source src='https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8' type='application/x-mpegURL' />
                        : ''}
                    {(video.fields.detail.fields.video_websafe) ? 
                        <source src={`${external}/${video.fields.detail.fields.video_websafe[0].relativePath}`}
                          type={video.fields.detail.fields.video_websafe[0].internal.mediaType} /> : ''}
                    {`Your browser does not currently support the HTML5 <video> tag`}
                </video>
                <div>{thumbComp}</div>
            </div>
        )
    }

  componentDidMount() {
    // playerID, [advert URLs], fullScreenDefault, options
    const player = new OpenPlayer('videoPlayer', null, false, {
        // hidePlayBtnTimer: 350,
        // step: 0.05,
        startVolume: 0.5,
        startTime: 0,
        // ads: { url, debug },
        // hls: { /*options https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning*/ }
        // dash: { /*options*/ }
        hls: {
            startLevel: -1
        }
    })
    player.init()
  }

  render () {
    const site = this.props.data.site
    const video = this.props.data.video
    const post = this.props.data.video.fields.detail
    const siteTitle = site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const chosenThumbs = (post != null && post.fields.thumbnails != null) ? post.fields.thumb_order
        .reduce((acc,index) => {
            const i = (index-1 < post.fields.thumbnails.length) ? index-1 : 0
            const thumb = post.fields.thumbnails[i]
            if (thumb) {
                acc.push(thumb)
            }
            return acc
        },[]) : null

    const videoDetail = {
        title: 'Untitled',
        desc: `video shared by ${site.siteMetadata.author}`,
        content: {__html: '<p>No description</p>'},
    }

    if (post) {
        videoDetail.title = post.fields.title || videoDetail.title
        videoDetail.desc = post.fields.description || `${videoDetail.title} ${videoDetail.desc}`
        videoDetail.content = {__html: post.html} || videoDetail.content
    }

    return (
      <Layout location={this.props.location} title={siteTitle} copyrightInfo={site.siteMetadata.copyrightInfo}>
        {
            //<SEO title={videoDetail.title} description={videoDetail.desc} />
        }
        <CustomHead>
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/openplayerjs@1.7.0/dist/openplayer.min.css' />
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css' />
        </CustomHead>
        
        <h1>{videoDetail.title}</h1>
        <div>
            {this.getVideoPlayer(video,videoDetail.title,chosenThumbs)}
        </div>
        <div className={`markdown-body`} dangerouslySetInnerHTML={videoDetail.content}></div>
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
query VideoBySlug($slug: String!, $avatar: String!) {
    site {
      siteMetadata {
        title
        author
        description
        copyrightInfo
      }
    }
    avatar: file(relativePath: {eq: $avatar}) {
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
        relativePath
        internal {
          mediaType
        }
        fields {
          slug
          duration
          detail {
            html
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              tagged
              description
            }
            fields {
              title
              slug
              thumb_order
              thumbnails {
                publicURL
              }
              video_websafe {
                extension
                internal {
                  mediaType
                }
                relativePath
              }
              video_dash {
                relativePath
              }
              video_hls {
                relativePath
              }
            }
          }
        }
      }
  }  
`
