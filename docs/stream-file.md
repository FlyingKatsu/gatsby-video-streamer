| [GitHub Repo](https://github.com/FlyingKatsu/gatsby-video-streamer) | [Live Demo](https://demo.flyingkatsu.com/video-stream) |

# Stream File Generation

## Using OBS

### Any recorded video to MP4

1. Go to `File > Remux Recordings`
2. In the `OBS Recording` field, type your video filepath, such as `MY-VIDEO.EXT`
3. In the `Target File` field, type the output filepath, such as `MY-VIDEO.mp4`
4. Click `Remux`

This assumes a folder structure like:

```
content/
    video/
        MY-VIDEO.EXT
        MY-VIDEO.mp4
```

### MP4 to HLS

1. Go to `File > Remux Recordings`
2. In the `OBS Recording` field, type your video filepath, such as `MY-VIDEO.mp4`
3. In the `Target File` field, type the output filepath, such as `hls/MY-VIDEO/stream.m3u8`
4. Click `Remux`

This assumes a folder structure like:

```
content/
    video/
        hls/
            MY-VIDEO/
                MY-VIDEO.m3u8
                segment0.ts
                segment1.ts
        MY-VIDEO.mp4
```

### MP4 to DASH

As of version 22.0.2, OBS Studio does not support conversion to DASH files

## Using ffmpeg and bento4

### Any video file to Fragmented MP4

`ffmpeg -i MY-VIDEO.EXT -c:v copy -c:a copy -movflags frag_keyframe+empty_moov+default_base_moof MY-VIDEO.frag.mp4`  
where `EXT` is something like `MOV` or `AVI` or `MPG`

**NOTE**: This has only been tested on `MOV`

### Any MP4 to Fragmented MP4

1. Check if your file is already fragmented `mp4info MY-VIDEO.mp4 | grep frag`
2. If not, remux to fragmented `ffmpeg -i MY-VIDEO.mp4 -movflags frag_keyframe+empty_moov+default_base_moof MY-VIDEO.frag.mp4`

Alternatively, just do `mp4fragment MY-VIDEO.mp4 MY-VIDEO.frag.mp4`

### Fragmented MP4 to HLS

To be continued (WIP)

### Fragmented MP4 to DASH

To be continued (WIP)

## Generating Thumbnails

The following [ffmpeg](https://www.ffmpeg.org/download.html) command will choose the best frame out of 50 images at every eighth of the given video file:

```
ffmpeg -i MY-VIDEO.mp4 -vf thumbnail=n=50,fps=8/VIDEO-LENGTH -s SIZE '../img/thumb/MY-VIDEO/0%d.jpg'
```

where  
- `MY-VIDEO` is the name of your video (assuming you run this command in a directory full of video files)
- `VIDEO-LENGTH` is the total runtime (in seconds) of your video (ex: 2h:30m:00s = 9000 seconds)
- `SIZE` is the output dimensions, such as WxH (like `1280x720`) or a [preset](https://ffmpeg.org/ffmpeg-utils.html#Video-size) (like `ntsc` for `720x480`)

This assumes a folder structure like:

```
content/
    video/
        MY-VIDEO.mp4
        (this is where your shell should run the ffmpeg command)
    img/
        thumb/
            MY-VIDEO/
                01.jpg
                02.jpg
                03.jpg
                04.jpg
                05.jpg
                06.jpg
                07.jpg
                08.jpg
```

**NOTE**: `ffmpeg` will fail if the output filepath does not yet exist! A bash script would probably make this smoother... or maybe create a NodeJS script that gets called like `npm run gen-thumb`?