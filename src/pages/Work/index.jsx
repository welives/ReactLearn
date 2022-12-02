import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Talk from './components/Talk'
import Moyu from './components/Moyu'

export default function Work() {
  return (
    <div>
      <div className="topNav">
        <ul>
          <li>
            <Link to="/layout/work/moyu">摸鱼攻略</Link>
          </li>
          <li>
            <Link to="/layout/work/talk">话术技巧</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <h3>视频教程</h3>
        <Switch>
          <Route path="/layout/work/moyu" component={Moyu}></Route>
          <Route path="/layout/work/talk" component={Talk}></Route>
        </Switch>
      </div>
    </div>
  )
}
