import React from 'react'
import ClassRef from './ClassRef'
import FuncRef from './FuncRef'

export default function RefExample() {
  return (
    <div className="rightContent">
      <div className="left">
        <h3>传统写法：类组件中使用createRef</h3>
        <ClassRef></ClassRef>
      </div>
      <div className="right">
        <h3>Hooks写法：函数式组件中使用useRef</h3>
        <FuncRef></FuncRef>
      </div>
    </div>
  )
}
