import { createStore } from 'redux-dynamic-modules'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { requestsPromiseMiddleware, createRequestInstance, watchRequests } from 'redux-saga-requests'
import { createDriver } from 'redux-saga-requests-fetch'
import { getSagaExtension } from 'redux-dynamic-modules-saga'
import { fork } from 'redux-saga/effects'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const getDebugExtension = () => {
  const log = (module = {}, action) => {
    const consoleColor = 'color: green'

    if (process.env.NODE_ENV === 'development') {
      console.log(`%cModule "${module.id}" ${action}`, consoleColor)
    }
  }

  return {
    onModuleAdded: module => log(module, 'added'),
    onModuleRemoved: module => log(module, 'removed'),
  }
}

const requestSaga = function*() {
  yield createRequestInstance({
    driver: createDriver(window.fetch),
  })

  yield fork(watchRequests)
}

const modules = [
  {
    id: 'initial',
    reducerMap: {
      router: connectRouter(history),
    },
    middlewares: [
      routerMiddleware(history),
      requestsPromiseMiddleware({
        auto: true,
      }),
    ],
    sagas: [requestSaga],
  },
]

const store = createStore({}, [], [getDebugExtension(), getSagaExtension()], modules)

store.history = history

export default store
