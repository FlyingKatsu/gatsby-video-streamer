import React from 'react'
import { Link } from 'gatsby'
import StyleWrapper from './styled/StyleWrapper'

class Layout extends React.Component {
  render () {
    const { location, title, copyrightInfo, children } = this.props

    return (
      <StyleWrapper>
          <header className={`top`}>
            <h1>
                <Link to={`/`}>
                    {title}
                </Link>
            </h1>
            <p><Link to='blog'>Blog</Link> | <Link to='video'>Videos</Link> | <Link to='playlist'>Playlists</Link></p>
          </header>
        {children}
        <footer>
          <p>{copyrightInfo}</p>
          <p> Markdown CSS from <a href="https://github.com/sindresorhus/github-markdown-css">github-markdown-css</a>. 
            Video Player CSS from <a href="https://www.openplayerjs.com/">OpenPlayerJS</a>.
          </p>
          <p>Built with <a href="https://github.com/FlyingKatsu/gatsby-video-streamer">gatsby-video-streamer</a>, a <a href="https://www.gatsbyjs.org">GatsbyJS</a> project.</p>
        </footer>
      </StyleWrapper>
    )
  }
}

export default Layout
