import styled from 'styled-components'

export const Wrapper = styled.div`
  text-align: center;
`

export const Clicks = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  font-weight: bold;

  @media screen and (min-height: ${({ theme }) => theme.resolution.height.md}px) {
    font-size: 2.5rem;
  }
`

export const Text = styled.span`
  display: block;
  font-size: 0.8rem;

  @media screen and (min-height: ${({ theme }) => theme.resolution.height.md}px) {
    font-size: 1rem;
  }
`
