import { parseDataToMessage, parseMessageToTeamScore } from 'hooks/useSubscription/utils'
import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { TeamScoreWithTotal } from '../../store/modules/game/@types'

interface PlayerData {
  team: string
  session: string
}

export enum ConnectionStatus {
  CONNECTING = 0,
  OPEN,
  CLOSING,
  CLOSED,
}

const useGameSubscription = (
  playerData: PlayerData,
  setScore: (score: TeamScoreWithTotal[]) => void,
  setError: (error: Error) => void,
) => {
  const { session, team } = playerData
  const [sendMessage, lastMessage, readyState] = useWebSocket(process.env.WS_URI)

  const handleClick = (clicks: number) => {
    try {
      const requestData = parseDataToMessage({ team, clicks, session })
      sendMessage(requestData)
    } catch(e) {
      setError(e)
    }

  }

  useEffect(() => {
    try {
      if (lastMessage) {
        const score = parseMessageToTeamScore(lastMessage.data)
        setScore(score)
      }
    } catch(e) {
      setError(e)
    }
  }, [lastMessage])

  return {
    connectionState: readyState,
    handleClick,
  }
}

export default useGameSubscription
