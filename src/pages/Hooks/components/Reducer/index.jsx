import React from 'react'
import ClassReducer from './ClassReducer'
import FuncReducer from './FuncReducer'

export default function ReducerExample() {
  return (
    <div className="rightContent">
      <div className="left">
        <h3>传统写法：类组件中通过Context对象和Redux操作state</h3>
        <ClassReducer></ClassReducer>
      </div>
      <div className="right">
        <h3>Hooks写法：函数式组件通过useContext和useReducer代替Redux</h3>
        <FuncReducer></FuncReducer>
      </div>
    </div>
  )
}
