const path = require('path')
const SiteConfig = require(`./site-config`)

const plugins = SiteConfig.filesystem.reduce( (acc,pattern) => {
    if (SiteConfig.ignorePages.indexOf(pattern.name) < 0) {
        // Only include data files of the pages we want
        acc.push( {
            // https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
            // enables the files in these specified paths to be turned into graphQL nodes
            resolve: `gatsby-source-filesystem`,
            options: {
                name: pattern.name,
                path: path.join(__dirname, pattern.path),
                ignore: pattern.ignore
            }
        } )
    }
    return acc
}, [])

// As of PR https://github.com/gatsbyjs/gatsby/pull/11304
// you can use glob patterns to ignore matching files
// The following assumes SiteConfig.ignorePages only lists filenames of JS files in src/gen-pages
const ignorePagePatterns = SiteConfig.ignorePages.reduce( (acc,name) => {
    return acc.push(`${name}.js`)
}, [] )

module.exports = {
  pathPrefix: SiteConfig.pathPrefix,
  siteMetadata: SiteConfig.siteMetadata,
  mapping: SiteConfig.mapping,
  plugins: plugins.concat([
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-page-creator
    // Creates pages from JS files in src/pages or the provided path
    {
        resolve: `gatsby-plugin-page-creator`,
        options: {
            path: path.join(__dirname, `src/gen-pages`),
            ignore: {
                patterns: ignorePagePatterns,
                options: { nocase: true }
            }
        }
    },
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
    // Use styled components for easy CSS
    // https://www.gatsbyjs.org/docs/styled-components/
    `gatsby-plugin-styled-components`,
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    // Track activity via Google Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: SiteConfig.googleAnalyticsID,
      }
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
    // To enable users to save the website as a native app
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: SiteConfig.siteMetadata.title,
        short_name: SiteConfig.siteMetadata.shortName,
        description: SiteConfig.siteMetadata.description,
        start_url: `/`,
        background_color: SiteConfig.colors.background,
        theme_color: SiteConfig.colors.theme,
        display: `standalone`,
        icon: `content/asset/${SiteConfig.siteMetadata.avatar}`
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
