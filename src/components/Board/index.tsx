import ScoreList from 'components/ScoreList'
import TeamNameForm from 'components/TeamNameForm'
import routes from 'constants/routes'
import useGameSubscription from 'hooks/useSubscription'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Redux } from '../../@types'
import Footer from '../../Footer'
import { saveTeam } from '../../store/modules/auth/actions'
import { selectSession, selectTeam } from '../../store/modules/auth/selectors'
import { saveTeamScores, setTeamScoresError } from '../../store/modules/game/actions'
import { selectTeamScores } from '../../store/modules/game/selectors'
import { FormWrapper, ListWrapper, Quotation, QuotationAuthor, QuotationWrapper, Wrapper } from './styled'

interface StateProps {
  teamName: string
  session: string
  teamScores: ReturnType<typeof selectTeamScores>
}

interface DispatchProps {
  saveTeamScores: typeof saveTeamScores
  setTeamScoresError: typeof setTeamScoresError
  saveTeam: typeof saveTeam
}

interface Props extends StateProps, DispatchProps {}

const Board = ({ session, teamName, saveTeamScores, setTeamScoresError, teamScores, saveTeam }: Props) => {
  useGameSubscription({ session, team: teamName }, saveTeamScores, setTeamScoresError)

  const handleTeamClick = (teamName: string) => {
    saveTeam(teamName)
  }

  if (teamName) {
    return <Redirect to={`${routes.GAME}/${encodeURIComponent(teamName)}`} />
  }

  return (
    <Wrapper>
      <QuotationWrapper>
        <Quotation>"It's really simple, you just need to click as fast as you can."</Quotation>
        <QuotationAuthor>- Anonymous</QuotationAuthor>
      </QuotationWrapper>
      <FormWrapper>
        <TeamNameForm />
      </FormWrapper>
      {teamScores && (
        <ListWrapper>
          <Scrollbars hideTracksWhenNotNeeded universal>
            <ScoreList score={teamScores} onItemClick={handleTeamClick} />
            <Footer />
          </Scrollbars>
        </ListWrapper>
      )}
    </Wrapper>
  )
}

const mapStateToProps = (state: Redux) => ({
  teamName: selectTeam(state),
  session: selectSession(state),
  teamScores: selectTeamScores(state),
})

export default connect(mapStateToProps, { saveTeamScores, setTeamScoresError, saveTeam })(Board)
