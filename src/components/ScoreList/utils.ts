import { TeamScoreWithTotal } from '../../store/modules/game/@types'

export const sortScore = (score: TeamScoreWithTotal[]): TeamScoreWithTotal[] => {
  if (!score) {
    return null
  }

  return score.sort((a, b) => b.total - a.total)
}
