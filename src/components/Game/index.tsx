import routes from 'constants/routes'
import useGameSubscription from 'hooks/useSubscription'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Redux } from '../../@types'
import { selectSession, selectTeam } from '../../store/modules/auth/selectors'
import { saveTeamScores, setTeamScoresError } from '../../store/modules/game/actions'
import { selectTeamScores, selectTeamScoresError } from '../../store/modules/game/selectors'

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

  if (!team) {
    return <Redirect to={routes.ROOT} />
  }

  if (error) {
    return <div>chyba!</div>
  }

  if (!teamScores) {
    return <div>loading...</div>
  }

  return (
    <div>
      <span>The WebSocket is currently {connectionState}</span>
      <button onClick={() => handleClick(1)}>click</button>
      {teamScores.map(teamScore => (<div key={teamScore.name}>{teamScore.name} - {teamScore.total}</div>))}
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
