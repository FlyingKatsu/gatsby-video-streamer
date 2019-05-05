| [GitHub Repo](https://github.com/FlyingKatsu/gatsby-video-streamer) | [Live Demo](https://demo.flyingkatsu.com/video-stream) |

# Configuration

(WIP)

## Default Values

You can specify default values for playlist and video Markdown file frontmatter (title, description, tags, date, etc.) on lines 98 through 118 of `site-config.js`.

```js
// Defaults for Markdown file data
frontmatterDefaults: {
    playlist: {
        title: `Untitled Playlist`,
        description: ``,
        name: ``,
        videos: [],
        tagged: [],
        publish: false,
        date: ``, // 2019-01-30
    },
    video: {
        title: `Untitled Video`,
        description: ``,
        video_name: ``,
        thumb_dir: ``,
        thumb_order: [1], // 1-indexed
        tagged: [],
        publish: false,
        date: ``, // 2019-01-30
    }
},
```

## Ignore Files in Build

You can choose not to build everything (like `/blog` pages, or `BigBuckBunny.mp4`) by specifying ignore patterns.

### Ignoring a Page Generator

Page Generators are in the `gatsby-create-page` directory:
- blog.js
- playlist.js
- video.js

If you don't want all of these types of pages, you can ignore them on line 125 (pick from NamingScheme.blog, NamingScheme.playlist, and NamingScheme.video)

### Ignoring specific data files

Sometimes you just don't want a certain video or playlist page to be generated just yet. You can ignore specific files and directories with `ignore: ['glob', 'pattern']` inside the appropriate set of brackets at the bottom of `site-config.js`. 

For example:

```js
// Video files from which to make video pages
{
    name: NamingScheme.video,
    path: `content/video`,
    // don't want any subdirectories or fragmented mp4 files
    ignore: [`**/dash`, `**/hls`, `**/*\.frag\.*`, `**/*-frag\.*`]
}
```