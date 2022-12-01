import React, { useState } from 'react'
import { Button, InputNumber } from 'antd'

export default function FuncState() {
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
    </div>
  )
}
