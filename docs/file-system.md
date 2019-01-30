| [GitHub Repo](https://github.com/FlyingKatsu/gatsby-video-streamer) | [Live Demo](https://demo.flyingkatsu.com/video-stream) |

# File System

## Development Files

```
gatsby-video-streamer/
    .gitignore
    package.json
    content/
        asset/
            profile.png
        blog/
            my-post.md
        thumb/
            my-video/
                01.jpg
                02.jpg
        detail/
            my-video.md
        playlist/
            my-list.md
        video/
            dash/
                my-video/
                    stream.mpd
            hls/
                my-video/
                    stream.m3u8
            my-video.mp4
    src/
        component/
            container/
            styled/
            thumbnail/
            Layout.js
        gen-pages/
            index.js
            blog.js
            playlist.js
            video.js
        template/
            BlogPost.js
            PlaylistPage.js
            VideoPage.js
    gatsby-create-page/
    gatsby-config.js
    gatsby-node.js
    site-config.js
```

## Webhost Files

```
www/
    _stream/
        dash/
            my-video/
                stream.mpd
        hls/
            my-video/
                stream.m3u8
        my-video.mp4
    public/
        static/
        blog/
        playlist/
        video/
        index.html
```