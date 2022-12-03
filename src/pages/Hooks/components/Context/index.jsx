import React from 'react'
import ClassContext from './ClassContext'
import FuncContext from './FuncContext'

export default function ContextExample() {
  return (
    <div className="rightContent">
      <div className="left">
        <h3>传统写法：类组件中通过props传递数据</h3>
        <ClassContext></ClassContext>
      </div>
      <div className="right">
        <h3>Hooks写法：函数式组件中通过useContext跨组件共享数据</h3>
        <FuncContext></FuncContext>
      </div>
    </div>
  )
}
