import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import TodoList from './pages/TodoList/index'
import Home from './pages/Home/index'
import Demo from './pages/Demo/index'
import Test from './pages/Test/index'
import Layout from './pages/Layout'
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
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/test">测试</Link>
          </li>
          <li>
            <Link to="/demo">Demo</Link>
          </li>
          <li>
            <Link to="/todo">TodoList</Link>
          </li>
          <li>
            <Link to="/layout">Layout</Link>
          </li>
        </ul>
        <Route path="/" exact component={Home}></Route>
        <Route path="/test/:id" component={Test}></Route>
        <Route path="/demo" component={Demo}></Route>
        <Route path="/todo" component={TodoList}></Route>
        <Route path="/layout" component={Layout}></Route>
      </BrowserRouter>
    )
  }
}

export default App
