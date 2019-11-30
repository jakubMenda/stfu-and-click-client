export interface GameReducer {
  teamScores: {
    isLoading: boolean
    error: Error
    data: TeamScoreWithTotal[]
  }
}

export interface TeamScore {
  _id: string
  name: string
  members: Member[]
}

export interface TeamScoreWithTotal extends TeamScore {
  total: number
}

interface Member {
  session: string
  clicks: number
}
