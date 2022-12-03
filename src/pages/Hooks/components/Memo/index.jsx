import React from 'react'
import ClassMemo from './ClassMemo'
import FuncMemo from './FuncMemo'

export default function MemoExample() {
  return (
    <div className="rightContent">
      <div className="left">
        <h3>传统写法：类组件中使用shouldComponentUpdate</h3>
        <ClassMemo></ClassMemo>
      </div>
      <div className="right">
        <h3>Hooks写法：函数式组件中通过useMemo模拟shouldComponentUpdate</h3>
        <FuncMemo></FuncMemo>
      </div>
    </div>
  )
}
