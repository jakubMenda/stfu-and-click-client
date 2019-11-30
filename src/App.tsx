import Authentication from 'components/Authentication'
import Loader, { LoaderType } from 'components/Loader'
import GlobalTheme, { GlobalStyle } from 'constants/GlobalTheme'
import routes from 'constants/routes'
import React, { lazy, Suspense } from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import store, { persistor } from './store/configureStore'
import Layout from './templates/Layout'

const App = () => {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <Provider store={store}>
        <PersistGate loading={<Loader type={LoaderType.OVERLAY} />} persistor={persistor}>
          <Suspense fallback={<Loader type={LoaderType.OVERLAY} />}>
            <GlobalStyle />
            <Authentication>
              <Router>
                <Layout>
                  <Route path={routes.ROOT} component={() => <Redirect to={routes.BOARD} />} exact />
                  <Route path={routes.BOARD} component={lazy(() => import('components/Board'))} exact />
                  <Route path={`${routes.GAME}/:teamName`} component={lazy(() => import('components/Game'))} exact />
                </Layout>
              </Router>
            </Authentication>
          </Suspense>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default hot(module)(App)
