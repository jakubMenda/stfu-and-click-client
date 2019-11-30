import { AnyAction, Reducer } from 'redux'

const isObject = item => item && typeof item === 'object' && !Array.isArray(item)

const createReducer = <StateType, HandlersType>(initialState: StateType, handlers: HandlersType): Reducer<StateType> => {
  if (initialState === undefined) {
    throw new Error('undefined passed to `createReducer` as initial state.')
  }

  if (!(handlers === undefined) && !isObject(handlers)) {
    throw new Error('Invalid handlers object passed to `createReducer`')
  }

  return (state: StateType = initialState, action: AnyAction) => {
    if (handlers && handlers.hasOwnProperty(action.type)) {
      const handler = handlers[action.type]
      return handler(state, action)
    }

    return state
  }
}

export default createReducer
