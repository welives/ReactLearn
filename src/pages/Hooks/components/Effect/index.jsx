import React from 'react'
import ClassEffect from './ClassEffect'
import FuncEffect from './FuncEffect'

export default function EffectExample() {
  return (
    <div className="rightContent">
      <div className="left">
        <h3>传统写法：类组件中使用生命周期</h3>
        <ClassEffect></ClassEffect>
      </div>
      <div className="right">
        <h3>Hooks写法：函数式组件中通过useEffect模拟生命周期</h3>
        <FuncEffect></FuncEffect>
      </div>
    </div>
  )
}
