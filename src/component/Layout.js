import React from 'react'
import { Link } from 'gatsby'
import StyleWrapper from './styled/StyleWrapper'
import styled from 'styled-components'
import { NamingScheme, NavTitles, ignorePages } from '../../site-config'

const NavBarLink = styled.li`
    list-style-type: none;
    display: inline-block;
    font-size: 1.25em;
    margin: 0 0.5em;
`

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
            <ol className='navbar'>{
                // If the page is not ignored, create a link to it for the nav bar
                Object.keys(NavTitles).map( (e) => {
                    if (ignorePages.indexOf(NamingScheme[e]) < 0) {
                        return (<NavBarLink><Link to={NamingScheme[e]}>{NavTitles[e]}</Link></NavBarLink>)
                    }
                })
            }</ol>
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
