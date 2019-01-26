import React from 'react'
import { Link } from 'gatsby'

class Layout extends React.Component {
  render () {
    const { location, title, copyrightInfo, children } = this.props
    const rootPath = `/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`}>
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link to={`/`}>
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div>
        {header}
        <Link to='blog'>Blog</Link> | <Link to='video'>Videos</Link> | <Link to='playlist'>Playlists</Link>
        {children}
        <footer>
          {copyrightInfo}
          {` `}
          Built with <a href="https://github.com/FlyingKatsu/gatsby-video-streamer">gatsby-video-streamer</a>, a <a href="https://www.gatsbyjs.org">GatsbyJS</a> project.
        </footer>
      </div>
    )
  }
}

export default Layout
