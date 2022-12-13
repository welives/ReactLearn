import React, { createContext, useContext, useReducer } from 'react'
import { Button, InputNumber } from 'antd'
import { INCREMENT, DECREMENT } from '../../../../store/actionTypes'

// ① 创建一个 Context对象
const CountContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

// ② 使用Context对象的Provider组件来包裹消费组件,通过value传递state给消费组件
export default function FuncReducer() {
  // 使用useReducer代替useState来创建state
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <CountContext.Provider value={{ count, dispatch }}>
      {/* 消费组件不管嵌套得多深都能通过 useContext 拿到state */}
      <Counter></Counter>
    </CountContext.Provider>
  )
}
// ③ 定义消费组件
function Counter() {
  return (
    <Buttons>
      <Number></Number>
    </Buttons>
  )
}

// ④ 消费组件通过useContext拿到state
function Buttons(props) {
  const { dispatch } = useContext(CountContext)
  return (
    <>
      <Button
        type="primary"
        size="small"
        icon="minus"
        shape="circle"
        onClick={() => dispatch({ type: DECREMENT })}
      ></Button>
      {/* 这里的props.children其实是替换了<Number></Number>，类似Vue中的slot */}
      {props.children}
      <Button
        type="primary"
        size="small"
        icon="plus"
        shape="circle"
        onClick={() => dispatch({ type: INCREMENT })}
      ></Button>
    </>
  )
}
function Number() {
  const { count } = useContext(CountContext)
  return (
    <InputNumber
      disabled
      style={{ margin: '0 10px' }}
      defaultValue={count}
      value={count}
    ></InputNumber>
  )
}
