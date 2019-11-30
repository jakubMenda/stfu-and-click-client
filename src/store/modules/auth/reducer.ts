import createReducer from 'utils/createReducer'
import { AuthReducer } from './@types'
import * as actions from './actions'
import { createSession } from './utils'

export const initialState: AuthReducer = {
  session: null,
  team: null,
}

export default createReducer(initialState, {
  [actions.Types.SAVE_SESSION]: (state: AuthReducer): AuthReducer => {
    const newSession = createSession()

    return {
      ...state,
      session: state.session || newSession,
    }
  },
  [actions.Types.SAVE_TEAM]: (state: AuthReducer, action: ReturnType<typeof actions.saveTeam>): AuthReducer => ({
    ...state,
    team: action.payload.team,
  }),
  [actions.Types.RESET_TEAM]: (state: AuthReducer): AuthReducer => ({
    ...state,
    team: null,
  }),
})
