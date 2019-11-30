import { teamNameValidation } from 'components/TeamNameForm/validation'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { saveTeam } from '../../store/modules/auth/actions'

interface StateProps {}

interface DispatchProps {
  saveTeam: typeof saveTeam
}

interface Props extends StateProps, DispatchProps {

}

const TeamNameForm = ({ saveTeam }: Props) => {
  const [teamName, setTeamName] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    try {
      e.preventDefault()

      teamNameValidation.validateSync(teamName)
      saveTeam(teamName)
    } catch(e) {
      if (!e.errors) {
        setErrors(['An error occurred'])
      } else {
        setErrors(e.errors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {!!errors.length && errors.map(err => <div>{err}</div>)}
      <input value={teamName} onChange={e => setTeamName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default connect(null, { saveTeam })(TeamNameForm)
