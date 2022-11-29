import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import App from './App'

// render(要渲染的组件, 组件的挂载点)
ReactDOM.render(
  // 将Provider作为整个应用的根组件，并获取store作为其props，以便后续进行下发处理
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
