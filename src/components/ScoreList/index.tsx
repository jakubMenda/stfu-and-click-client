import { sortScore } from 'components/ScoreList/utils'
import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { connect } from 'react-redux'
import { Redux } from '../../@types'
import { selectTeam } from '../../store/modules/auth/selectors'
import { TeamScoreWithTotal } from '../../store/modules/game/@types'
import { Cell, Head, Row, Wrapper } from './styled'

interface ComponentProps {
  score: TeamScoreWithTotal[]
  onItemClick?: (teamName: string) => void
}

interface StateProps {
  team: string
}

interface Props extends ComponentProps, StateProps {}

const ScoreList = ({ score, team, onItemClick }: Props) => {
  const [sortedScore, setSortedScore] = useState(sortScore(score))

  useEffect(() => {
    setSortedScore(sortScore(score))
  }, [score])

  if (!score) {
    return null
  }

  return (
    <Wrapper>
      <Head>
        <Cell>Team</Cell>
        <Cell>Score</Cell>
      </Head>
      <FlipMove>
        {sortedScore.map(({ _id, name, total }) => (
          <Row
            clickable={!!onItemClick}
            onClick={() => {
              onItemClick && onItemClick(name)
            }}
            isHighlighted={name === team}
            key={_id}
          >
            <Cell>{name}</Cell>
            <Cell>{total}</Cell>
          </Row>
        ))}
      </FlipMove>
    </Wrapper>
  )
}

const mapStateToProps = (state: Redux) => ({
  team: selectTeam(state),
})

export default connect(mapStateToProps)(ScoreList)
