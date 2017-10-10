import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const isProduction = process.env.NODE_ENV === 'production'
const middlewares = [
  thunkMiddleware
]
const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = isProduction ? compose : devToolsCompose || compose
const enhancer = applyMiddleware(...middlewares)
const store = createStore(rootReducer, {}, composeEnhancers(enhancer))

export default store
