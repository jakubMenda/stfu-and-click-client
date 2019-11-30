export enum Types {
  SAVE_SESSION = 'auth/SAVE_SESSION',
  SAVE_TEAM = 'auth/SAVE_TEAM',
  RESET_TEAM = 'auth/RESET_TEAM',
}

export const saveSession = () => ({
  type: Types.SAVE_SESSION,
})

export const saveTeam = (team: string) => ({
  type: Types.SAVE_TEAM,
  payload: { team },
})

export const resetTeam = () => ({
  type: Types.RESET_TEAM,
})
