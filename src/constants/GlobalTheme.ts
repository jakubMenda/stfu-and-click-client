import { createGlobalStyle, DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  colors: {
    primary: '#3F51B5',
    background: '#efefef',
    lightText: '#dddddd',
  },
  resolution: {
    height: {
      md: 600,
    },
  },
}

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Roboto, sans-serif;
  }
`

export default theme
