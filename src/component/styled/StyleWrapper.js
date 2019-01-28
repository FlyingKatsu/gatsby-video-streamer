import React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import GlobalStyle from './GlobalStyle'
import { colors } from '../../../site-config'

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
`

const StyleWrapper = ({ children }) => (
  <ThemeProvider theme={{ 
      fontFamily: 'Helvetica Neue',
      colors
  }}>
      <Wrapper>
        <GlobalStyle 
            whiteColor={true}
        />
        {children}
    </Wrapper>
  </ThemeProvider>
)

export default StyleWrapper