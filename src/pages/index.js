import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../component/Bio'
import Layout from '../component/Layout'
import SEO from '../component/SEO'

class Index extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle} copyrightInfo={data.site.siteMetadata.copyrightInfo}>
                <SEO
                    title="All videos"
                    keywords={[`video`, `gatsby`, `javascript`, `react`]}
                />
                <Bio avatar={data.avatar} />
            </Layout>
        )
    }
}

export default Index

export const pageQuery = graphql`
  query getIndex($avatar: String!) {
    site: site {
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
  }
`
