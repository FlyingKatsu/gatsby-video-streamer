# gatsby-video-streamer

A GatsbyJS project that builds a static YouTube-like personal website from a directory of video files.

- [Read the Docs](http://flyingkatsu.com/gatsby-video-streamer)
- [Live Demo](https://video.flyingkatsu.com) (WIP)

## Requirements

- [NodeJS Package Manager (NPM)](https://www.npmjs.com/get-npm) (npm v5.6.0 / node v10.1.0) to run this project
- [ffmpeg](https://www.ffmpeg.org/download.html) if you need to generate thumbnails automatically or convert video formats
    - Note: The best video formats for web-based video players are `mp4`, `ogg`, and `webm`
- [bento4](https://www.bento4.com/) if you need to generate HLS or DASH stream files from an `mp4` video file
    - [Download Binaries](https://www.bento4.com/downloads/)
    - [Build from Source](https://github.com/axiomatic-systems/Bento4/tree/v1.5.1-624#building)
    - [HLS Docs](https://www.bento4.com/developers/hls/)
    - [DASH Docs](https://www.bento4.com/developers/dash/)