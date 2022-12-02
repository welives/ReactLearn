import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import EffectExample from './components/Effect'
import StateExample from './components/State'
import './hooks.css'

export default function HooksDemo() {
  return (
    <div className="hooks">
      <div className="main">
        <div className="leftSide">
          <ul>
            <li>
              <Link to="/hooks/state">useState</Link>
            </li>
            <li>
              <Link to="/hooks/effect">useEffect</Link>
            </li>
          </ul>
        </div>
        <div className="rightSide">
          <Switch>
            <Route path="/hooks/state" component={StateExample}></Route>
            <Route path="/hooks/effect" component={EffectExample}></Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}
