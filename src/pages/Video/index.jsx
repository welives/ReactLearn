import React from 'react'
import { Route, Link } from 'react-router-dom'
import Vue from './components/Vue'
import Express from './components/Express'
import Flutter from './components/Flutter'

export default function Video() {
  return (
    <div>
      <div className="topNav">
        <ul>
          <li>
            <Link to="/layout/video/vue">Vue教程</Link>
          </li>
          <li>
            <Link to="/layout/video/express">Express教程</Link>
          </li>
          <li>
            <Link to="/layout/video/flutter">Flutter教程</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <h3>视频教程</h3>
        <Route path="/layout/video/vue" component={Vue}></Route>
        <Route path="/layout/video/express" component={Express}></Route>
        <Route path="/layout/video/flutter" component={Flutter}></Route>
      </div>
    </div>
  )
}
