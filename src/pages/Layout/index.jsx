import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Main from './Main'
import Video from '../Video'
import Work from '../Work'
import './layout.css'

export class Layout extends Component {
  render() {
    return (
      <div className="main">
        <div className="leftNav">
          <h3>一级导航</h3>
          <ul>
            <li>
              <Link to="/layout">博客首页</Link>
            </li>
            <li>
              <Link to="/layout/video">视频教程</Link>
            </li>
            <li>
              <Link to="/layout/work">职场技能</Link>
            </li>
          </ul>
        </div>
        <div className="rightBox">
          <Route path="/layout" exact component={Main}></Route>
          <Route path="/layout/video" component={Video}></Route>
          <Route path="/layout/work" component={Work}></Route>
        </div>
      </div>
    )
  }
}

export default Layout
