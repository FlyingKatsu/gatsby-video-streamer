const { siteMetadata, ignorePages, NamingScheme, frontmatterDefaults } = require(`./site-config`);

/**
 * Create pages from graphQL nodes
 */

const { createBlogPages } = require(`./gatsby-create-page/blog.js`)
const { createVideoPages } = require(`./gatsby-create-page/video.js`)
const { createPlaylistPages } = require(`./gatsby-create-page/playlist.js`)

const pageGen = {
    blog: createBlogPages,
    video: createVideoPages,
    playlist: createPlaylistPages,
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    // Don't use the createXPages function if X is in ignorePages
    const prunedGen = Object.keys(pageGen).reduce( (acc, path) => {
        if (ignorePages.indexOf(path) < 0) acc.push(pageGen[path])
        return acc;
    }, [])

    return Promise.all(prunedGen.map( (fn) => {
        // Calls the createXPages function with these params
        fn(graphql, createPage, siteMetadata.avatar)
    } )).catch(console.error)
}

/**
 * Define custom fields for each graphQL node
 */

const { createFilePath } = require(`gatsby-source-filesystem`)
const { getVideoDurationInSeconds } = require('get-video-duration')

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    // NOTE: gatsby build hates it when I use switch-case for some reason
    // so make do with a bunch of if-else statements ugh

    // Markdown Files
    if (node.internal.type === `MarkdownRemark`) {
        if (node.fields.collection === NamingScheme.playlist) {
            // page url will end with 'playlist/filename/'
            const relativeURL = createFilePath({ node, getNode });
            createNodeField({ node, name: 'slug', value: `/${NamingScheme.playlist}${relativeURL}` })
            // Set default fields from frontmatter
            Object.keys(frontmatterDefaults.playlist).map(key => {
                createNodeField({
                    node,
                    name: key,
                    value: node.frontmatter ? node.frontmatter[key]
                        || frontmatterDefaults.playlist[key] : frontmatterDefaults.playlist[key]
                })
            })
        }
        else if (node.fields.collection === NamingScheme.videoDetail) {
            // Set default fields from frontmatter
            Object.keys(frontmatterDefaults.video).map(key => {
                createNodeField({
                    node,
                    name: key,
                    value: (node.frontmatter) ? node.frontmatter[key] 
                        || frontmatterDefaults.video[key] : frontmatterDefaults.video[key]
                })
            })
            // Create stubs for custom fields (to avoid unwanted errors)
            createNodeField({ node, name: 'video_dash', value: ''})
            createNodeField({ node, name: 'video_hls', value: ''})
            createNodeField({ node, name: 'video_websafe', value: []})
            createNodeField({ node, name: 'video_other', value: []})
            createNodeField({ node, name: 'thumbnails', value: []})
        }
        else if (node.fields.collection === NamingScheme.blog) {
            // page url will end with 'blog/filename/'
            const relativeURL = createFilePath({ node, getNode });
            createNodeField({ node, name: 'slug', value: `/${NamingScheme.blog}${relativeURL}` })
        }
        else {
            // Don't need any pages for any other markdown files, but if you want them:
            // page url will end with 'md/filename/'
            // const relativeURL = createFilePath({ node, getNode });
            // createNodeField({ node, name: 'slug', value: `/md${relativeURL}` })
        }
    }
    // Other files
    else if (node.sourceInstanceName === NamingScheme.video) {
        // page url will end with 'video/filename/'
        const relativeURL = createFilePath({ node, getNode });
        createNodeField({ node, name: 'slug', value: `/${NamingScheme.video}${relativeURL}` })
        // get length of video in seconds
        // This seems to have broken since upgrading..? comment out for now
        // if (node.relativePath) {
        //     getVideoDurationInSeconds(`content/vid/${node.relativePath}`)
        //         .then( duration =>
        //             createNodeField({ node, name: 'duration', value: duration})
        //         ).catch( err => {
        //             console.error(err)
        //             createNodeField({ node, name: 'duration', value: 0})
        //         });
        // } else {
        //     createNodeField({ node, name: 'duration', value: 0})
        // }
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

/**
 * Modify existing nodes for custom mappings
 */

exports.sourceNodes = ({ actions, getNodes, getNode }) => {
    const { createNodeField } = actions

    // THUMBNAILS
    const thumbsOfVideos = {}
    const thumbNodes = getNodes()
        .filter( node => node.internal.type === "File" &&
            node.sourceInstanceName === NamingScheme.thumbnail)
        .sort( (a, b) => a.name - b.name )

    thumbNodes.forEach( node => {
        // Get associated markdown file
        const videoNode = getNodes()
            .find( vNode => vNode.internal.type === "MarkdownRemark" &&
                vNode.fields.collection === NamingScheme.videoDetail &&
                vNode.frontmatter.thumb_dir === node.relativeDirectory)
        if (videoNode) {
            if ( !thumbsOfVideos[videoNode.id] ) {
                thumbsOfVideos[videoNode.id] = [];
            }
            thumbsOfVideos[videoNode.id].push(node.id)
        }
    } )
    
    Object.entries(thumbsOfVideos)
        .forEach( ([videoNodeId, thumbIds]) => {
            createNodeField({
                node: getNode(videoNodeId),
                name: "thumbnails",
                value: thumbIds
            })
        })

    // VIDEO FILES
    const filesOfVideos = {}
    const fileNodes = getNodes()
        .filter( node => node.internal.type === "File" &&
            node.sourceInstanceName === NamingScheme.video)

    fileNodes.forEach( node => {
        // Get associated markdown file
        const videoNode = getNodes()
            .find( vNode => vNode.internal.type === "MarkdownRemark" &&
                vNode.fields.collection === NamingScheme.videoDetail &&
                vNode.frontmatter.video_name === node.name)
        if (videoNode) {
            const ext = (["ogg", "mp4", "webm"].indexOf(node.extension) > 0) ? 'websafe' : 'other'
            if ( !filesOfVideos[videoNode.id] ) {
                filesOfVideos[videoNode.id] = {};
                if ( !filesOfVideos[videoNode.id][ext] ) {
                    filesOfVideos[videoNode.id][ext] = []
                }
            }
            filesOfVideos[videoNode.id][ext].push(node.id)
            if (!videoNode.fields.slug) {
                createNodeField({
                    node: videoNode,
                    name: `slug`,
                    value: node.fields.slug
                })
            }
            createNodeField({
                node: node,
                name: `detail`,
                value: videoNode.id
            })
        }
    } )
    
    Object.entries(filesOfVideos)
        .forEach( ([videoNodeId, types]) => {
            Object.entries(types).forEach( ([type, ids]) => {
                createNodeField({
                    node: getNode(videoNodeId),
                    name: `video_${type}`,
                    value: ids
                })
            } )
        })

    // DASH FILES
    const dashNodes = getNodes()
        .filter( node => node.internal.type === "File" &&
            node.sourceInstanceName === NamingScheme.streamDASH)

    dashNodes.forEach( node => {
        // Get associated markdown file
        const videoNode = getNodes()
            .find( vNode => vNode.internal.type === "MarkdownRemark" &&
                vNode.fields.collection === NamingScheme.videoDetail &&
                vNode.frontmatter.video_name === node.relativeDirectory)
        if (videoNode) {
            createNodeField({
                node: videoNode,
                name: "video_dash",
                value: node.id
            })
        }
    } )

    // HLS FILES
    const hlsNodes = getNodes()
        .filter( node => node.internal.type === "File" &&
            node.sourceInstanceName === NamingScheme.streamHLS)

    hlsNodes.forEach( node => {
        // Get associated markdown file
        const videoNode = getNodes()
            .find( vNode => vNode.internal.type === "MarkdownRemark" &&
                vNode.fields.collection === NamingScheme.videoDetail &&
                vNode.frontmatter.video_name === node.relativeDirectory)
        if (videoNode) {
            createNodeField({
                node: videoNode,
                name: "video_hls",
                value: node.id
            })
        }
    } )
}