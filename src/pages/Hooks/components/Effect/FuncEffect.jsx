import React, { useEffect, useState } from 'react'
import { Input } from 'antd'

export default function FuncEffect() {
  const [msg, setMsg] = useState('')
  useEffect(() => {
    console.log('Hooks新写法useEffect：组件挂载完毕')
    // 通过返回一个匿名函数来模拟componentWillUnmount生命周期
    return () => {
      console.log('Hooks新写法useEffect：组件将要卸载')
    }
  }, [])
  useEffect(() => {
    console.log('Hooks新写法useEffect：只首次渲染和msg改变时才会触发')
  }, [msg])
  return (
    <div>
      <Input
        addonBefore="msg"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        style={{ width: 200 }}
      ></Input>
    </div>
  )
}
