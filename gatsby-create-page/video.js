const path = require(`path`)

// Component that will render every video page (relative to root)
const pageComponent = path.resolve(`./src/template/VideoPage.js`)
// Query used to collect all video file nodes to turn into pages
const query = `
{
    allFile(filter: { sourceInstanceName: { eq: "video" } }) {
        edges {
            node {
                name
                fields {
                    slug
                }
            }
        }
    }
}
`
// Called by onCreatePages() in gatsby-node.js
exports.createVideoPages = (graphql, createPage, avatar) => {
    return new Promise( (resolve, reject) => {
        resolve(graphql(query)
            .then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }

                const videos = result.data.allFile.edges
                
                videos.forEach((video, index) => {
                    // define the next and previous pages
                    const previous = index === videos.length - 1
                        ? null
                        : videos[index + 1].node
                    const next = index === 0
                        ? null
                        : videos[index - 1].node

                    // define the page
                    createPage({
                        // the web path where this page will be loaded
                        path: video.node.fields.slug,
                        // the component used to render the page
                        component: pageComponent,
                        // context defines $vars passed into the page queries
                        context: {
                            slug: video.node.fields.slug,
                            name: video.node.name,
                            previous,
                            next,
                            avatar
                        }
                    })
                })
            })
        )
    } )
}
