import Button from '@material-ui/core/Button'
import Loader from 'components/Loader'
import ScoreList from 'components/ScoreList'
import routes from 'constants/routes'
import useGameSubscription from 'hooks/useSubscription'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ReadyStateEnum } from 'react-use-websocket/dist/lib/use-websocket'
import { Redux } from '../../@types'
import { selectSession, selectTeam } from '../../store/modules/auth/selectors'
import { saveTeamScores, setTeamScoresError } from '../../store/modules/game/actions'
import { selectTeamScores, selectTeamScoresError } from '../../store/modules/game/selectors'
import { ButtonWrapper, ListWrapper, LoaderWrapper, Message, MessageWrapper, UppercaseMessage } from './styled'

interface StateProps {
  teamScores: ReturnType<typeof selectTeamScores>
  error: ReturnType<typeof selectTeamScoresError>
  session: ReturnType<typeof selectSession>
  team: ReturnType<typeof selectTeam>
}

interface DispatchProps {
  saveTeamScores: typeof saveTeamScores
  setTeamScoresError: typeof setTeamScoresError
}

interface Props extends StateProps, DispatchProps {}

const Game = ({ teamScores, saveTeamScores, error, setTeamScoresError, team, session }: Props) => {
  const { handleClick, connectionState } = useGameSubscription({ session, team }, saveTeamScores, setTeamScoresError)

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

  if (!team) {
    return <Redirect to={routes.ROOT} />
  }

  if ([ReadyStateEnum.Closed, ReadyStateEnum.Closing].includes(connectionState)) {
    return renderError('Connection was closed. Try reloading.')
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
    <div>
      <UppercaseMessage>Clicking for {team}</UppercaseMessage>
      <ButtonWrapper>
        <Button variant="contained" color="secondary" size="large" onClick={() => handleClick(1)}>
          Click
        </Button>
      </ButtonWrapper>
      <ListWrapper>
        <ScoreList score={teamScores} />
      </ListWrapper>
    </div>
  )
}

const mapStateToProps = (state: Redux) => ({
  teamScores: selectTeamScores(state),
  error: selectTeamScoresError(state),
  session: selectSession(state),
  team: selectTeam(state),
})

export default connect(mapStateToProps, { saveTeamScores, setTeamScoresError })(Game)
