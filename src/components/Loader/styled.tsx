import styled from 'styled-components'

export const Overlay = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Offset = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`
