const path = require('path')
const SiteConfig = require(`./site-config`)

const plugins = SiteConfig.filesystem.map( (pattern) => {
    return {
        // https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
        // enables the files in these specified paths to be turned into graphQL nodes
        resolve: `gatsby-source-filesystem`,
        options: {
            name: pattern.name,
            path: path.join(__dirname, pattern.path),
            ignore: pattern.ignore
        }
    }
})

module.exports = {
  pathPrefix: SiteConfig.pathPrefix,
  siteMetadata: SiteConfig.siteMetadata,
  plugins: plugins.concat([
    // https://www.gatsbyjs.org/packages/gatsby-transformer-remark/
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // https://www.gatsbyjs.org/packages/gatsby-remark-images/
          // https://www.gatsbyjs.org/packages/gatsby-image/
          // Process images linked in markdown to be mobile-friendly
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          // https://www.gatsbyjs.org/packages/gatsby-remark-responsive-iframe/
          // iFrame inside of markdown adapts size to screen
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          // https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/
          // Copy files referenced in markdown to a specific root subdirectory
          `gatsby-remark-copy-linked-files`,
        ]
      }
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-remark-collection/
    // Group markdown files by path
    `gatsby-plugin-remark-collection`,
    // https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/
    // https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/
    // Nifty image manipulation with access via GraphQL
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    // Track activity via Google Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
    // To enable users to save the website as a native app
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `My Video Channel`,
        short_name: `Username`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/asset/profile.png`
      }
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-offline/
    // For service workers to aid during shakey network connection
    // NOTE: If removing, you must add `gatsby-plugin-remove-serviceworker`
    `gatsby-plugin-offline`,
    // https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/
    // For dynamic site metadata and other document head elements
    `gatsby-plugin-react-helmet`
  ])
}
