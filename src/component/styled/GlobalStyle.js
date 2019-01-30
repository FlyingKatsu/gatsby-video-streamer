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
    background-color: ${props => props.theme.colors.background} 
}
.markdown-body {
    text-align: left;
    margin: 0 auto;
    padding: 1em;
    width: 32em;
    background-color: rgba(255,255,255,0.2)
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