import React from 'react'
import { Link } from 'gatsby'

const pathPrefix = ''

class Layout extends React.Component {
  render () {
    const { location, title, children } = this.props
    const rootPath = `${ pathPrefix }/`
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
        {children}
        <footer>
          Copyright © 2018 HeatPhoenix.
          {` `}
          Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
