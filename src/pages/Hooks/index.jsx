import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import EffectExample from './components/Effect'
import StateExample from './components/State'
import ContextExample from './components/Context'
import ReducerExample from './components/Reducer'
import MemoExample from './components/Memo'
import RefExample from './components/Ref'
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
            <li>
              <Link to="/hooks/context">useContext</Link>
            </li>
            <li>
              <Link to="/hooks/reducer">useReducer</Link>
            </li>
            <li>
              <Link to="/hooks/memo">useMemo</Link>
            </li>
            <li>
              <Link to="/hooks/ref">useRef</Link>
            </li>
          </ul>
        </div>
        <div className="rightSide">
          <Switch>
            <Route path="/hooks/state" component={StateExample}></Route>
            <Route path="/hooks/effect" component={EffectExample}></Route>
            <Route path="/hooks/context" component={ContextExample}></Route>
            <Route path="/hooks/reducer" component={ReducerExample}></Route>
            <Route path="/hooks/memo" component={MemoExample}></Route>
            <Route path="/hooks/ref" component={RefExample}></Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}
