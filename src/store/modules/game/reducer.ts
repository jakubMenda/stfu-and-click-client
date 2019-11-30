import createReducer from 'utils/createReducer'
import { GameReducer } from './@types'
import * as actions from './actions'

export const initialState: GameReducer = {
  teamScores: {
    isLoading: false,
    error: null,
    data: null,
  },
}

export default createReducer(initialState, {
  [actions.Types.SAVE_TEAM_SCORES]: (state: GameReducer, action: ReturnType<typeof actions.saveTeamScores>): GameReducer => {
    const { scores } = action.payload

    return {
      ...state,
      teamScores: {
        ...state.teamScores,
        data: scores,
      },
    }
  },
  [actions.Types.SET_TEAM_SCORES_ERROR]: (state: GameReducer, action: ReturnType<typeof actions.setTeamScoresError>): GameReducer => {
    const { error } = action.payload

    return {
      ...state,
      teamScores: {
        ...state.teamScores,
        isLoading: false,
        error,
      },
    }
  },
})
