---
title: My Video Page
name: sample
date: '2015-05-28T22:40:32.169Z'
category: [ videos, stuff ] 
tagged: [ cool, awesome, wow ]
description: something about stuff
---

# FrontMatter Section

The top of this page surrounded by `---` defines frontmatter, 
which are fields that get passed to the page renderer for 
generating HTML pages from MarkDown.

Most of the rendered page is defined in a page template file, 
with some customization according to the frontmatter values.

The frontmatter values are also used for making GraphQL queries,
such as when we want to find all pages tagged `cool`

Everything below the ending `---` is standard MarkDown, which 
will get transformed into valid HTML as you would expect.

`thumb_order` specifies the set and order of thumbnails you wish to display
on the playlist and video pages. For playlist, 
the default video thumbnail is the first file alphabetically (1)

`video_name` is the unique human-friendly identifier of videos, and is used
in the playlist `videos` array, for stream and thumbnail subdirectories on asset paths,
and for page slugs (ending url)

# Page Links

The name of each MarkDown file becomes the ending path for the page URL.
For example, `about me.md` becomes `http://mywebsite.com/page/about-me`

# SEO and Twitter Cards

If you want to be able to share your webpages on social media 
with a fancy video player or preview, be sure to set the appropriate
metadata frontmatter.

NOTE: Twitter will only accept secure URLs (HTTPS), including website url,
image URL, and video URL. Make sure you have a valid SSL/TLS certificate 
on your server. You can get one for free with [Let's Encrypt](https://letsencrypt.org/getting-started/)

## Video Player Metadata
- `title`
- `summary`
- `image`
- `twitter` the @username you want associated with this video;  
(defaults to the social.twitter value specified in site config)

The `og:type` will be `video.other`, while the `twitter:card` will be `player`.  
If you do not specify video, embed will render as a summary card instead.

## Summary Metadata
- `title` title for your content (60 characters or less)
- `summary` a short, unique description of the content;  
(180 characters or less, optional)
- `image` the filename of an image in /content/asset  
(less than 5MB; twitter expects 2:1 width/height ratio)
- `twitter` the @username you want associated with this content;  
(defaults to the social.twitter value specified in site config)

The `og:type` will be `website`, while the `twitter:card` will be `summary_large_image`.

## Webpage Metadata
- `title` title for your content (60 characters or less)
- `summary` a short, unique description of the content;  
(180 characters or less, optional)
- `image` the filename of an image in /content/asset  
(less than 5MB; twitter will crop this to a square)
- `twitter` the @username you want associated with this webpage;  
(defaults to the social.twitter value specified in site config)

The `og:type` will be `website`, while the `twitter:card` will be `summary`.


# MarkDown Section

Fill in this area with standard if you'd like to have 
more interesting page content than what is defined in the template.

For example, you could
- Add a nested list of information
- [Link to another page or video](http://google.com)
- Stylize some words or phrases
    - *Italics*
    - **Bold**
    - **_Boldly Italic_**
    - ~~Strikethrough~~

## A note about links

If a link does not begin with 'http', the generator will assume it is
an internal link!

- `[www.google.com](www.google.com)` ==> [www.google.com](www.google.com) ==> `localhost/path/www.google.com`
- `[www.google.com](http://www.google.com)` ==> [www.google.com](http://www.google.com) ==> `http://www.google.com`

## Document Headings

You can also have headings and subheadings. 
[See the full cheatsheet here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Plugins

If you want to add something special that normal markdown doesnt support, 
you can install a plugin, like these:

- [Embed emojis in MarkDown](https://www.gatsbyjs.org/packages/gatsby-remark-emojis/)
- [Embed videos in MarkDown](https://www.gatsbyjs.org/packages/gatsby-remark-better-embed-video/)
- [Embed custom behavior blocks](https://www.gatsbyjs.org/packages/gatsby-remark-custom-blocks/)

There's also plugins that modify how these files are rendered:

- [Specify template in frontmatter](https://www.gatsbyjs.org/packages/gatsby-plugin-markdown-pages/)
- [Validate and set default values for frontmatter](https://www.gatsbyjs.org/packages/gatsby-plugin-node-fields/)

Just be aware that some plugins are not up-to-date with Gatsby v2.