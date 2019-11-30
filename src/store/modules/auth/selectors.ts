import { Redux } from '@types.d'

const subState = (state: Redux) => state.auth

export const selectSession = (state: Redux) => subState(state).session
export const selectTeam = (state: Redux) => subState(state).team
