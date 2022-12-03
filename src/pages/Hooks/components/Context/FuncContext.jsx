import React, { useContext, useState } from 'react'
import { Button, InputNumber } from 'antd'
import CountContext from './countContext'

function Counter() {
  const count = useContext(CountContext)
  return (
    <InputNumber
      defaultValue={count}
      disabled
      style={{ margin: '0 10px' }}
      value={count}
    ></InputNumber>
  )
}

export default function FuncContext() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Button
        onClick={() => setCount(count - 1)}
        type="primary"
        size="small"
        icon="minus"
        shape="circle"
      ></Button>
      <CountContext.Provider value={count}>
        <Counter></Counter>
      </CountContext.Provider>
      <Button
        onClick={() => setCount(count + 1)}
        type="primary"
        size="small"
        icon="plus"
        shape="circle"
      ></Button>
    </div>
  )
}
