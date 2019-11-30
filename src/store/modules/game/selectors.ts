import { Redux } from '@types.d'

const subState = (state: Redux) => state.game
const selectTeamScoresSubState = (state: Redux) => subState(state).teamScores

export const selectTeamScores = (state: Redux) => selectTeamScoresSubState(state).data
export const selectTeamScoresLoading = (state: Redux) => selectTeamScoresSubState(state).isLoading
export const selectTeamScoresError = (state: Redux) => selectTeamScoresSubState(state).error
