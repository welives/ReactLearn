import React from 'react'
import ClassCustom from './ClassCustom'
import FuncCustom from './FuncCustom'

export default function CustomExample() {
  return (
    <div className="rightContent">
      <div className="left">
        <h3>传统写法：类组件中实现监听浏览器窗口大小变化</h3>
        <ClassCustom></ClassCustom>
      </div>
      <div className="right">
        <h3>函数式组件中通过自定义hook实现监听浏览器大小变化</h3>
        <FuncCustom></FuncCustom>
      </div>
    </div>
  )
}
