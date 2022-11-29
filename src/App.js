import React, { Component } from 'react'
// import Demo from './pages/Demo'
import TodoList from './pages/TodoList/index'
import './App.css'

/**
 * 旧版react的组件写法
 */
class App extends Component {
  /**
   * JSX写法: 支持在js代码中书写html代码
   * 简单的概括就是: 遇到<>包裹的代码解析成html代码, 遇到{}包裹的代码解析成js代码
   */
  render() {
    return (
      <div>
        {/* <Demo></Demo> */}
        <TodoList></TodoList>
      </div>
    )
  }
}

export default App
