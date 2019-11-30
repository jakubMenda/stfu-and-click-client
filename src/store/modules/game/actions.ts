import { TeamScoreWithTotal } from './@types'

export enum Types {
  SAVE_TEAM_SCORES = 'game/SAVE_TEAM_SCORES',
  SET_TEAM_SCORES_ERROR = 'game/SET_TEAM_SCORES_ERROR',
}

export const saveTeamScores = (scores: TeamScoreWithTotal[]) => ({
  type: Types.SAVE_TEAM_SCORES,
  payload: { scores },
})

export const setTeamScoresError = (error: Error) => ({
  type: Types.SET_TEAM_SCORES_ERROR,
  payload: { error },
})
