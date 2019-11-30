import Cookies from 'cookies-js'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import createSagaMiddleware from 'redux-saga'
import rootSagas from 'store/sagas'
import auth from './modules/auth/reducer'
import game from './modules/game/reducer'

const persistConfig = {
  key: 'auth',
  storage: new CookieStorage(Cookies),
  whitelist: ['session', 'team'],
}

export const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
  game,
})

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

rootSagas.map((saga: any) => sagaMiddleware.run(saga, store.dispatch))

export const persistor = persistStore(store)
export default store
