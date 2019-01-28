const path = require(`path`)

// Component that will render every playlist page (relative to root)
const pageComponent = path.resolve(`./src/template/PlaylistPage.js`)
// Query used to collect all blog nodes to turn into pages
const query = `
{
  allMarkdownRemark(
    filter: { fields: { collection: {eq: "playlist"} } }
  ) {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
`
// Called by onCreatePages() in gatsby-node.js
exports.createPlaylistPages = (graphql, createPage, avatar) => {
    return new Promise( (resolve, reject) => {
        resolve(graphql(query)
            .then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }
                
                const posts = result.data.allMarkdownRemark.edges

                posts.forEach((post, index) => {
                    const previous = index === posts.length - 1
                        ? null
                        : posts[index + 1].node
                    const next = index === 0
                        ? null
                        : posts[index - 1].node

                    createPage({
                        path: post.node.fields.slug,
                        component: pageComponent,
                        context: {
                            slug: post.node.fields.slug,
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
