import React from 'react'
import ReactDOM from 'react-dom'
import Demo from './Demo'

// render(要渲染的组件, 组件的挂载点)
ReactDOM.render(
  // <React.StrictMode>
  //   <Demo />
  // </React.StrictMode>,
  <Demo />,
  document.getElementById('root')
)
