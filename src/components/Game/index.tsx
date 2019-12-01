import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Loader from 'components/Loader'
import ScoreList from 'components/ScoreList'
import TeamClicksCounter from 'components/TeamClicksCounter'
import UserClicksCounter from 'components/UserClicksCounter'
import routes from 'constants/routes'
import useGameSubscription from 'hooks/useSubscription'
import React, { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { ReadyStateEnum } from 'react-use-websocket/dist/lib/use-websocket'
import { Redux } from '../../@types'
import Footer from '../../Footer'
import { saveTeam } from '../../store/modules/auth/actions'
import { selectSession, selectTeam } from '../../store/modules/auth/selectors'
import { saveTeamScores, setTeamScoresError } from '../../store/modules/game/actions'
import { selectTeamScores, selectTeamScoresError } from '../../store/modules/game/selectors'
import {
  ButtonWrapper,
  Counter,
  CountersWrapper,
  ListWrapper,
  LoaderWrapper,
  Message,
  MessageWrapper,
  Notion,
  PopoverMessage,
  UppercaseMessage,
  UrlInput,
  Wrapper,
} from './styled'

interface StateProps {
  teamScores: ReturnType<typeof selectTeamScores>
  error: ReturnType<typeof selectTeamScoresError>
  session: ReturnType<typeof selectSession>
  team: ReturnType<typeof selectTeam>
}

interface DispatchProps {
  saveTeamScores: typeof saveTeamScores
  setTeamScoresError: typeof setTeamScoresError
  saveTeam: typeof saveTeam
}

interface Props extends StateProps, DispatchProps, RouteComponentProps<{ teamName: string }> {}

const Game = ({ teamScores, saveTeamScores, error, setTeamScoresError, team, session, match, saveTeam }: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { handleClick, connectionState } = useGameSubscription({ session, team }, saveTeamScores, setTeamScoresError)
  const teamNameFromUrl = match.params.teamName

  const handleCopyToClipBoard = e => {
    if (e.target.select) {
      e.target.select()
      e.target.setSelectionRange(0, 99999)

      document.execCommand('copy')
      setPopoverOpen(true)
      setAnchorEl(e.currentTarget)
    }
  }

  const handlePopoverClose = () => {
    setPopoverOpen(false)
    setAnchorEl(null)
  }

  useEffect(() => {
    if (teamNameFromUrl && team !== teamNameFromUrl) {
      saveTeam(decodeURIComponent(teamNameFromUrl))
    }
  }, [teamNameFromUrl])

  const renderError = (message: string) => (
    <MessageWrapper>
      <Message>{message}</Message>
      <ButtonWrapper>
        <Button variant="contained" color="primary" onClick={() => location.reload()}>
          Reload
        </Button>
      </ButtonWrapper>
    </MessageWrapper>
  )

  if (!team && !teamNameFromUrl) {
    return <Redirect to={routes.ROOT} />
  }

  if ([ReadyStateEnum.Closed, ReadyStateEnum.Closing].includes(connectionState)) {
    return renderError(`You've been too lazy - connection was closed. Try reloading.`)
  }

  if (error) {
    return renderError('Something went wrong...')
  }

  if (!teamScores || connectionState === ReadyStateEnum.Connecting) {
    return (
      <LoaderWrapper>
        <Message>Wait for it...</Message>
        <Loader />
      </LoaderWrapper>
    )
  }

  return (
    <Wrapper>
      <UppercaseMessage>
        Clicking for team <b>{team}</b>
      </UppercaseMessage>
      <Notion>
        Too lazy to click? Let your pals click for you:
        <UrlInput value={window.location.href} onClick={handleCopyToClipBoard} onChange={() => null} />
      </Notion>
      <Popover
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <PopoverMessage>
          Copied <b>{window.location.href}</b> to clipboard!
        </PopoverMessage>
      </Popover>
      <ButtonWrapper>
        <Button variant="contained" color="secondary" size="large" onClick={() => handleClick(1)}>
          Click
        </Button>
      </ButtonWrapper>
      <ListWrapper>
        <Scrollbars hideTracksWhenNotNeeded universal>
          <CountersWrapper>
            <Counter>
              <UserClicksCounter />
            </Counter>
            <Counter>
              <TeamClicksCounter />
            </Counter>
          </CountersWrapper>
          <ScoreList score={teamScores} />
          <Footer />
        </Scrollbars>
      </ListWrapper>
    </Wrapper>
  )
}

const mapStateToProps = (state: Redux) => ({
  teamScores: selectTeamScores(state),
  error: selectTeamScoresError(state),
  session: selectSession(state),
  team: selectTeam(state),
})

export default connect(mapStateToProps, { saveTeamScores, setTeamScoresError, saveTeam })(Game)
