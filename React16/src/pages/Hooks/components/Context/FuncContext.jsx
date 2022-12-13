import React, { useContext, useState } from 'react'
import { Button, InputNumber } from 'antd'
import CountContext from './countContext'

export default function FuncContext() {
  const [count, setCount] = useState(0)
  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Counter></Counter>
    </CountContext.Provider>
  )
}

function Counter() {
  const { count, setCount } = useContext(CountContext)
  return (
    <>
      <Button
        onClick={() => setCount(count - 1)}
        type="primary"
        size="small"
        icon="minus"
        shape="circle"
      ></Button>
      <InputNumber
        defaultValue={count}
        disabled
        style={{ margin: '0 10px' }}
        value={count}
      ></InputNumber>
      <Button
        onClick={() => setCount(count + 1)}
        type="primary"
        size="small"
        icon="plus"
        shape="circle"
      ></Button>
    </>
  )
}
