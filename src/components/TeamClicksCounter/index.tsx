import ClicksCounter from 'components/ClicksCounter'
import _get from 'lodash.get'
import React from 'react'
import { connect } from 'react-redux'
import { Redux } from '../../@types'
import { selectTeam } from '../../store/modules/auth/selectors'
import { selectTeamScores } from '../../store/modules/game/selectors'

interface StateProps {
  team: ReturnType<typeof selectTeam>
  score: ReturnType<typeof selectTeamScores>
}

interface Props extends StateProps {}

const TeamClicksCounter = ({ team, score }: Props) => {
  const selectedTeamsScore = (score || []).find(teamScore => teamScore.name === team)

  return <ClicksCounter clicks={_get(selectedTeamsScore, 'total')} text="Team clicks:" />
}

const mapStateToProps = (state: Redux) => ({
  team: selectTeam(state),
  score: selectTeamScores(state),
})

export default connect(mapStateToProps)(TeamClicksCounter)
