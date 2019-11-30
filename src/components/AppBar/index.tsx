import { AppBar as MUIAppBar, Button, Typography } from '@material-ui/core'
import TeamIcon from '@material-ui/icons/People'
import routes from 'constants/routes'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Redux } from '../../@types'
import { resetTeam } from '../../store/modules/auth/actions'
import { selectTeam } from '../../store/modules/auth/selectors'
import { StyledToolbar } from './styled'

interface StateProps {
  teamName: string
}

interface DispatchProps {
  resetTeam: typeof resetTeam
}

interface Props extends StateProps, DispatchProps {}

const AppBar = ({ teamName, resetTeam }: Props) => {
  const { replace } = useHistory()

  const handleResetClick = () => {
    resetTeam()
    replace(routes.ROOT)
  }
  return (
    <MUIAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">STFU and CLICK!</Typography>
        {teamName && (
          <Button onClick={handleResetClick} color="inherit" startIcon={<TeamIcon />}>
            Switch team
          </Button>
        )}
      </StyledToolbar>
    </MUIAppBar>
  )
}

const mapStateToProps = (state: Redux) => ({
  teamName: selectTeam(state),
})

export default connect(mapStateToProps, { resetTeam })(AppBar)
