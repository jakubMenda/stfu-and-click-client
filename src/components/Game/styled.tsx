import styled from 'styled-components'

export const LoaderWrapper = styled.div``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Message = styled.p`
  text-align: center;
  font-size: 1.4rem;
  flex: 0 1 auto;
`

export const UppercaseMessage = styled(Message)`
  text-transform: uppercase;
  flex: 0 1 auto;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  flex: 0 1 auto;
`

export const ListWrapper = styled.div`
  flex: 1 1 auto;
`

export const MessageWrapper = styled.div`
  padding: 30px 0;
  flex: 0 1 auto;
`

export const CountersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  flex: 0 1 auto;
`

export const Counter = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`

export const Notion = styled.p`
  text-align: center;
  margin-bottom: 20px;
`

export const UrlInput = styled.input`
  padding: 5px 10px;
  margin-left: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightText};
  transition: 0.25s linear background;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const PopoverMessage = styled.span`
  padding: 0 10px;
  line-height: 30px;
`
