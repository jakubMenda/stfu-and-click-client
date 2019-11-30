import styled, { DefaultTheme, ThemeProps } from 'styled-components'

interface RowProps extends ThemeProps<DefaultTheme> {
  isHighlighted?: boolean
}

export const Wrapper = styled.div``

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  background: ${({ isHighlighted, theme }: RowProps) => (isHighlighted ? theme.colors.primary : 'transparent')};
  color: ${({ isHighlighted, theme }: RowProps) => (isHighlighted ? '#fff' : 'inherit')};
`

export const Head = styled(Row)`
  font-weight: bold;
`

export const Cell = styled.div``
