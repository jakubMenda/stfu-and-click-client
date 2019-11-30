import AppBar from 'components/AppBar'
import React, { PropsWithChildren } from 'react'
import { Content, Wrapper } from './styled'

interface Props {}

const Layout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <Wrapper>
      <AppBar />
      <Content>{children}</Content>
    </Wrapper>
  )
}

export default Layout
