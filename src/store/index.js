import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 判断redux浏览器插件和redux包中哪个有组合函数
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const store = createStore(reducer, reduxCompose(applyMiddleware(thunk)))

export default store
