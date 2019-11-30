import TeamNameForm from 'components/TeamNameForm'
import routes from 'constants/routes'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Redux } from '../../@types'
import { selectTeam } from '../../store/modules/auth/selectors'

interface StateProps {
  teamName: string
}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps {}

const Board = ({ teamName }: Props) => {
  if (teamName) {
    return <Redirect to={routes.GAME} />
  }

  return (
    <div>
      <TeamNameForm />
    </div>
  )
}

const mapStateToProps = (state: Redux) => ({
  teamName: selectTeam(state),
})

export default connect(mapStateToProps)(Board)
