module.exports = {
    // If the site will be hosted in a subdirectory like www/pathPrefix or root/pathPrefix
    // such as when you host on a subdomain like www.pathPrefix.domain.com
    // so that www.pathPrefix.domain.com/page loads www/pathPrefix/page/index.html
    pathPrefix: '/video-stream',

    // siteMetadata fields are queryable with graphQL
    siteMetadata: {
      // These are used for metadata like Twitter cards
      title: `My Video Channel`,
      author: `Username`,
      description: `An index of videos shared by Username`,
      siteUrl: `https://demo.website.com/video-stream`,

      // Username information for any social media pages you want to link
      social: {
        twitter: `@username`
      },

      // The file to use for your profile image in the Bio component
      avatar: `profile.png`,
      // Appears next to your profile image in the Bio component
      tagline: `Great videos for everyone`
    },

    // Use these to specify the locations and names of files you want to query over
    // NOTE: `ignore` patterns are used are similar to glob patterns
    // but it seems that negation does not work
    // NOTE: `path` should be relative to the root directory
    filesystem: [
        // Markdown files that should be turned into blog posts
        {
            name: `blog`,
            path: `content/blog`
        },
        // Markdown files that should be turned into playlist pages
        {
            name: `playlist`,
            path: `content/playlist`
        },
        // Markdown files that add more information to video pages
        {
            name: `md-video-detail`,
            path: `content/video-detail`
        },
        // Any standard files you want to have queryable
        {
            name: `asset`,
            path: `content/asset`
        },
        // Image files to use for video thumbnails
        {
            name: `thumb`,
            path: `../content/img/thumb`
        },
        // Video files from which to make video pages
        {
            name: `video`,
            path: `../content/vid`,
            // don't want any subdirectories or fragmented mp4 files
            ignore: [`**/dash`, `**/hls`, `**/*\.frag\.*`, `**/*-frag\.*`]
        },
        // Video DASH stream files for the video player
        {
            name: `vid-dash`,
            path: `../content/vid/dash`,
            // only want the generated .mpd file
            ignore: [`**/*\.m4s`, `**/*\.mp4`]
        },
        // Video HLS stream files for the video player
        {
            name: `vid-hls`,
            path: `../content/vid/hls`,
            // only want the top level generated .m3u8 file
            // (media-1/ is default subdir made by bento4's mp42hls)
            ignore: [`**/*\.ts`, `**/media-1`]
        }
    ]
}