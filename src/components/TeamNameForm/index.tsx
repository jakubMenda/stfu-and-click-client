import Button from '@material-ui/core/Button'
import { teamNameValidation } from 'components/TeamNameForm/validation'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { saveTeam } from '../../store/modules/auth/actions'
import { Form, StyledTextField } from './styled'

interface StateProps {}

interface DispatchProps {
  saveTeam: typeof saveTeam
}

interface Props extends StateProps, DispatchProps {}

const TeamNameForm = ({ saveTeam }: Props) => {
  const [teamName, setTeamName] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = e => {
    try {
      e.preventDefault()

      teamNameValidation.validateSync(teamName)
      saveTeam(teamName)
    } catch (e) {
      if (!e.errors) {
        setErrors(['An error occurred'])
      } else {
        setErrors(e.errors)
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <StyledTextField
        fullWidth
        label="Your team name"
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
        error={!!errors.length}
        helperText={errors[0]}
      />
      <Button variant="contained" color="primary" type="submit">
        Click
      </Button>
    </Form>
  )
}

export default connect(null, { saveTeam })(TeamNameForm)
