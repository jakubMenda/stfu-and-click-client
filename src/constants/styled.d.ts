import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      background: string
      lightText: string
    }
    resolution: {
      height: {
        md: number
      }
    }
  }
}
