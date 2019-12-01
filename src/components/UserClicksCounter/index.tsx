import ClicksCounter from 'components/ClicksCounter'
import _get from 'lodash.get'
import React from 'react'
import { connect } from 'react-redux'
import { Redux } from '../../@types'
import { selectSession, selectTeam } from '../../store/modules/auth/selectors'
import { selectTeamScores } from '../../store/modules/game/selectors'

interface StateProps {
  team: ReturnType<typeof selectTeam>
  score: ReturnType<typeof selectTeamScores>
  session: ReturnType<typeof selectSession>
}

interface Props extends StateProps {}

const UserClicksCounter = ({ team, score, session }: Props) => {
  const selectedTeamsScore = (score || []).find(teamScore => teamScore.name === team)
  const usersScore = (selectedTeamsScore.members || []).find(member => member.session === session)

  return <ClicksCounter clicks={_get(usersScore, 'clicks')} text="Your clicks:" />
}

const mapStateToProps = (state: Redux) => ({
  team: selectTeam(state),
  score: selectTeamScores(state),
  session: selectSession(state),
})

export default connect(mapStateToProps)(UserClicksCounter)
