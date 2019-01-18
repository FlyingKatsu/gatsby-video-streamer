import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

class Bio extends React.Component {
    render() {
        return (
            <StaticQuery
                query={bioQuery}
                render={data => {
                    const { author, social, tagline } = data.site.siteMetadata
                    return (
                        <div>
                            {<Image
                                fixed={this.props.avatar.childImageSharp.fixed}
                                alt={author}
                            />}
                            <p>
                                Hi, I'm <strong>{author}</strong>!
                                {` `}
                                {tagline}
                                {` `}
                                <a href={`https://twitter.com/${social.twitter}`}>
                                    Follow me on Twitter
                                 </a>
                            </p>
                        </div>
                    )
                }}
            />
        )
    }
}


const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
        tagline
      }
    }
  }
`

export default Bio
