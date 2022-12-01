import React from 'react'
import ClassState from './ClassState'
import FuncState from './FuncState'

export default function StateExample() {
  return (
    <div className="rightContent">
      <div className="left">
        <h3>传统写法</h3>
        <ClassState></ClassState>
      </div>
      <div className="right">
        <h3>Hooks写法</h3>
        <FuncState></FuncState>
      </div>
    </div>
  )
}
