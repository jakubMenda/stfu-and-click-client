import { AuthReducer } from './store/modules/auth/@types'
import { GameReducer } from './store/modules/game/@types'

export interface Redux {
  auth: AuthReducer
  game: GameReducer
}
