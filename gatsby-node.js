const { siteMetadata } = require(`./site-config`);

/**
 * Create pages from graphQL nodes
 */

const { createBlogPages } = require(`./gatsby-create-page/blog.js`)
const { createVideoPages } = require(`./gatsby-create-page/video.js`)
const { createPlaylistPages } = require(`./gatsby-create-page/playlist.js`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return createBlogPages(graphql, createPage, siteMetadata.avatar)
        .then(() => { return createVideoPages(graphql, createPage, siteMetadata.avatar) })
        .then( () => { return createPlaylistPages(graphql, createPage, siteMetadata.avatar) } )
        .catch(console.error)
}

/**
 * Define custom fields for each graphQL node
 */

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    // NOTE: gatsby build hates it when I use switch-case for some reason
    // so make do with a bunch of if-else statements ugh

    // Markdown Files
    if (node.internal.type === `MarkdownRemark`) {
        if (node.fields.collection === `playlist`) {
            // page url will end with 'playlist/filename/'
            const relativeURL = createFilePath({ node, getNode });
            createNodeField({ node, name: 'slug', value: `/playlist${relativeURL}` })
        }
        else if (node.fields.collection === `blog`) {
            // page url will end with 'blog/filename/'
            const relativeURL = createFilePath({ node, getNode });
            createNodeField({ node, name: 'slug', value: `/blog${relativeURL}` })
        }
        else {
            // Don't need any pages for any other markdown files, but if you want them:
            // page url will end with 'md/filename/'
            // const relativeURL = createFilePath({ node, getNode });
            // createNodeField({ node, name: 'slug', value: `/md${relativeURL}` })
        }
    }
    // Other files
    else if (node.sourceInstanceName === `video`) {
        // page url will end with 'video/filename/'
        const relativeURL = createFilePath({ node, getNode });
        createNodeField({ node, name: 'slug', value: `/video${relativeURL}` })
    }

    else {
        // Don't need any pages for any other files, but if you want them:
        // page url will end with 'other/filename/'
        // const relativeURL = createFilePath({ node, getNode });
        // createNodeField({ node, name: 'slug', value: `/other${relativeURL}` })
    }


}

/**
 * Pass context to pages
 * https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#pass-context-to-pages
 */

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions
    
    deletePage(page)

    createPage({
        ...page,
        context: {
            avatar: siteMetadata.avatar,
        },
    })
}