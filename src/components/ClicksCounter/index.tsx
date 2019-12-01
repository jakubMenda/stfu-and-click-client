import React from 'react'
import { Clicks, Text, Wrapper } from './styled'

interface Props {
  clicks: number
  text: string
}

const ClicksCounter = ({ clicks = 0, text = '' }: Props) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
      <Clicks>{clicks}</Clicks>
    </Wrapper>
  )
}

export default ClicksCounter
