import { createGlobalStyle } from 'styled-components'

// Apply props given to GlobalStyle to HTML elements

const GlobalStyle = createGlobalStyle`
html {
    font-size: 16px;
}
html, body {
    margin: 0;
    padding: 0;
}
body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
    background-color: ${props => props.theme.colors.background};
}
.markdown-body {
    text-align: left;
    margin: 0 auto;
    padding: 1em;
    width: 32em;
    background-color: rgba(255,255,255,0.2)
}
#bio {
    padding: 1em;
}
header.top {
    padding: 1em 0;
    background-color: ${props => props.theme.colors.dark};
    color: white;
}
header.top a, header.top a:visited, a, a:visited {
    color: white;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
header.top a:hover, a, a:visited {
    color: ${props => props.theme.colors.theme};
}
header.top h1 {
    margin: none;
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    width: 60%;
    font-size: 1.5em;
}
header.top p {
    margin: none;
    text-align: right;
    display: inline-block;
    vertical-align: middle;
    width: 20%;
    font-size: 1.25em;
}
footer {
    padding: 4em 0;
    border-top: 1px solid white;
    background-color: ${props => props.theme.colors.dark};
    color: white; 
}
`

export default GlobalStyle

// Use like this:
//<ThemeProvider theme={{ fontFamily: 'Helvetica Neue' }}>
//  <React.Fragment>
//    <Navigation /> {/* example of other top-level stuff */}
//    <GlobalStyle whiteColor />
//  </React.Fragment>
//</ThemeProvider>