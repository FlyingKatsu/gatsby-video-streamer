| [GitHub Repo](https://github.com/FlyingKatsu/gatsby-video-streamer) | [Live Demo](https://demo.flyingkatsu.com/video-stream) |

# Table of Content

- [Overview](#overview)
- [Stream File Generation](/gatsby-video-streamer/stream-file)
- [Configuration](/gatsby-video-streamer/configuration)
- [File System](/gatsby-video-streamer/file-system)
- [Deploy](/gatsby-video-streamer/deploy)

## Overview

### Installation

First, make sure you have the [NodeJS Package Manager (NPM)](https://www.npmjs.com/get-npm) installed.

Then, follow these instructions:

1. Make a directory for your project `my-video-stream`
2. Clone the repo into that directory `git clone https://github.com/FlyingKatsu/gatsby-video-streamer.git my-video-stream`
3. Change into the repo directory `cd my-video-stream/gatsby-video-streamer`
4. Install all the necessary NodeJS packages `npm install` (you may need to update your NPM version first, with `npm install -g npm@latest`).
5. Install the gatsby command line interface with `npm install -g gatsby-cli`
6. Copy `site-config.sample.js` and rename the copy `site-config.js`
7. Test the installation with `gatsby build` which will compile the website files into the `public` folder. You can check it out in a browser with `gatsby serve -o`
8. If the site loads in your browser without error, continue to [Adding Content](#adding-content)

### Adding Content

#### Video Pages

Every video file in `content/video/` (configurable at the bottom of `site-config.js`) is listed on the video index page `/video/` and gets its own webpage with a video player at `/video/video-name/`. 

If you want it to have a description, title, etc. you should create a Markdown file and add it to `content/detail`. The file should look like the following:

```md
---
video_name: Your video file name without the extension
title: Optional
description: Optional
date: Optional, 2019-01-30
thumb_dir: Optional, the name of the directory in `content/thumb` containing your video's thumbnail images
thumb_order: Optional, 1-indexed, alphabetical order [4,3,2,1]
---

Whatever text, links, images, etc. you want to have on this page, write it here with Markdown formatting.
```

For information on how to convert video files to `MP4`, `HLS`, or `DASH`, see [Stream File Generation](/gatsby-video-streamer/stream-file)

##### Thumbnails

Put your video's thumbnails in `content/thumb/video-name` and set `thumb_dir: video-name` in the video's associated Markdown file. **_The Markdown file is required in order to link the video to the thumbnail._** This may change in a later version...

For information on how to generate thumbnails from your `MP4` video files, see [Generating Thumbnails](/gatsby-video-streamer/stream-file#generating-thumbnails)

#### Playlists

Playlists are collections of video pages. Create a Markdown file and add it to `content/playlist`. **_Every video in the playlist must have its own Markdown file in order to link the video information to the playlist._** This may change in a later version...

The playlist file should look like the following:

```md
---
name: Used for the webpage URL `/playlist/name/`
video: [Your video file names, without the extension]
title: Optional
description: Optional
---

Whatever text, links, images, etc. you want to have on this page, write it here with Markdown formatting.
```

#### Blog Posts (optional)

To be continued (WIP)

#### Other Pages

To be continued (WIP)
