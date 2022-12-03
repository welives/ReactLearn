import React, { useRef } from 'react'
import { Input, Button } from 'antd'

export default function FuncRef() {
  const inputDom = useRef()
  const handleClick = () => {
    inputDom.current.focus()
  }
  return (
    <>
      <Input ref={inputDom} style={{ width: 200, marginRight: '10px' }}></Input>
      <Button type="primary" onClick={handleClick}>
        点我设置输入框焦点
      </Button>
    </>
  )
}
