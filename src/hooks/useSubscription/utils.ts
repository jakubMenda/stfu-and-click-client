import { teamScoresRequestValidation, teamScoresResponseValidation } from 'hooks/useSubscription/validation'
import { TeamScoreWithTotal } from '../../store/modules/game/@types'

interface IncrementClicksRequestData {
  session: string
  team: string
  clicks: number
}

export const parseMessageToTeamScore = (message: string): TeamScoreWithTotal[] => {
  if (typeof message !== 'string') {
    throw new Error('Invalid format')
  }
  const parsed = JSON.parse(message)
  teamScoresResponseValidation.validateSync(parsed)

  return parsed
}

export const parseDataToMessage = (data: IncrementClicksRequestData): string => {
  teamScoresRequestValidation.validateSync(data)

  return JSON.stringify(data)
}
