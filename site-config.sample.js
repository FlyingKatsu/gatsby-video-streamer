// Define the UNIQUE names for the various files to be parsed
// Also used for excluding files from generation
const NamingScheme = {
    // Used for miscellaneous assets
    asset: `asset`,
    // Used for /blog and /blog/post-title
    blog: `blog`,
    // Used for /playlist and links to video details
    playlist: `playlist`,
    // Links video to playlist, details, and thumbnails
    videoDetail: `md-video-detail`,
    // Used for /video
    video: `video`,
    // Links video to HLS stream file
    streamHLS: `vid-hls`,
    // Links video to DASH stream file
    streamDASH: `vid-dash`,
    // Links thumbnails to video detail and playlist
    thumbnail: `thumb`,
}

module.exports = {
    NamingScheme,

    // If the site will be hosted in a subdirectory like www/pathPrefix or root/pathPrefix
    // such as when you host on a subdomain like www.pathPrefix.domain.com
    // so that www.pathPrefix.domain.com/page loads www/pathPrefix/page/index.html
    pathPrefix: '/video-stream',

    // siteMetadata fields are queryable with graphQL
    siteMetadata: {
      // These are used for metadata like Twitter cards
      title: `My Video Channel`,
      shortName: `MyVideo`,
      author: `Username`,
      description: `An index of videos shared by Username`,
      siteUrl: `https://demo.website.com/video-stream`,

      // Username information for any social media pages you want to link
      social: {
        twitter: `@username`
      },

      // The file to use for your profile image in the Bio component (located in content/asset/)
      avatar: `profile.png`,
      // Appears next to your profile image in the Bio component
      tagline: `Great videos for everyone`,

      // Global copyright disclaimer
      copyrightInfo: 'Copyright © 2019 Username. All rights reserved.',
    },

    googleAnalyticsID: null,

    colors: {
        background: `#5E5E66`,
        light: `#9B9BA2`,
        dark: `#1E1E26`,
        theme: `#D32F2F`,
    },

    // Video Stream File Path
    // Use this to specify the path to assets that require a specific directory structure
    // and should not be cached due to their size
    // absolute path must lead with `http` (when running `gatsby develop` or `gatsby serve`)
    // You may want to have your files copied to your live server so you can reference them in development
    // because Chrome will not allow the running dev server to use local files
    externalPathDev: `https://demo.flyingkatsu.com/_stream`,
    // relative to your server's webpage root (www/ or public_html/) (when running `gatsby build` and deploying)
    // likely protected by htaccess to prevent hotlinking
    externalPathServ: `/_stream`,
    
    // Mappings
    // Maps the frontmatter of one markdown file to the frontmatter of another markdown file
    // NOTE: the values of these frontmatter fields must be unique since they are used for identification
    // ex: don't give two different files the same id
    mapping: {
        // playlist/VideoName.md videos : video-detail/VideoName.md video_name 
        // (video_name should be the same as the mp4/md filenames and stream/thumb directories)
        'MarkdownRemark.frontmatter.videos' : 'MarkdownRemark.frontmatter.video_name',
        // These next mappings are custom defined in gatsby-node.js sourceNodes
        'MarkdownRemark.fields.thumbnails' : 'File',
        'MarkdownRemark.fields.video_websafe' : 'File',
        'MarkdownRemark.fields.video_other' : 'File',
        'MarkdownRemark.fields.video_dash' : 'File',
        'MarkdownRemark.fields.video_hls' : 'File',
        'File.fields.detail' : 'MarkdownRemark',
    },

    // IgnorePages
    // Any name in this array will be excluded from page generation
    // ex: NamingScheme.blog will tell gatsby not to generate /blog and /blog/my-post
    // Pending PR https://github.com/gatsbyjs/gatsby/pull/11304
    ignorePages: [
        // NamingScheme.blog
    ],

    // Use these to specify the locations and names of files you want to query over
    // NOTE 1: `ignore` patterns are used are similar to glob patterns
    // but it seems that negation does not work
    // NOTE 2: `path` should be relative to the root directory
    // NOTE 3: If you do not need one of these patterns, just add its name to ignorePages above ^
    // NOTE 4: If you want to add more than this, 
    // modify gatsby-node.js and add the appropriate files to gatsby-create-page/
    filesystem: [
        // Markdown files that should be turned into blog posts
        {
            name: NamingScheme.blog,
            path: `content/blog`
        },
        // Markdown files that should be turned into playlist pages
        {
            name: NamingScheme.playlist,
            path: `content/playlist`
        },
        // Markdown files that add more information to video pages
        {
            name: NamingScheme.videoDetail,
            path: `content/video-detail`
        },
        // Any standard files you want to have queryable
        {
            name: NamingScheme.asset,
            path: `content/asset`
        },
        // Image files to use for video thumbnails
        {
            name: NamingScheme.thumbnail,
            path: `content/img/thumb`
        },
        // Video files from which to make video pages
        {
            name: NamingScheme.video,
            path: `content/vid`,
            // don't want any subdirectories or fragmented mp4 files
            ignore: [`**/dash`, `**/hls`, `**/*\.frag\.*`, `**/*-frag\.*`]
        },
        // Video DASH stream files for the video player
        {
            name: NamingScheme.streamDASH,
            path: `content/vid/dash`,
            // only want the generated .mpd file
            ignore: [`**/*\.m4s`, `**/*\.mp4`]
        },
        // Video HLS stream files for the video player
        {
            name: NamingScheme.streamHLS,
            path: `content/vid/hls`,
            // only want the top level generated .m3u8 file
            // (media-1/ is default subdir made by bento4's mp42hls)
            ignore: [`**/*\.ts`, `**/media-1`]
        }
    ]
}