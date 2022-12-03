import React, { useMemo, useState } from 'react'
import { Button } from 'antd'

export default function FuncMemo() {
  const [cat, setCat] = useState('猫猫在睡觉')
  const [dog, setDog] = useState('狗子也在睡觉')
  return (
    <>
      {/* 想要实现的效果是: 点击猫猫按钮时触发猫猫的行为逻辑 */}
      <Button type="primary" size="small" onClick={() => setCat(+new Date())}>
        猫猫
      </Button>
      {/* 想要实现的效果是: 点击狗子按钮时不触发猫猫的行为逻辑 */}
      <Button
        type="primary"
        size="small"
        style={{ marginLeft: '10px' }}
        onClick={() => setDog(+new Date() + '===>狗子发现屋外有动静')}
      >
        狗子
      </Button>
      <ChildComponent cat={cat}>{dog}</ChildComponent>
    </>
  )
}

function ChildComponent({ cat, children }) {
  // 在函数式组件中，因为没有了shouldComponentUpdate生命周期，
  // 所以在默认的情况下，当父组件中的任何一个state更新时都会触发内部子组件的重新渲染，这会造成不必要的性能损失
  const catDoSomething = (cat) => {
    console.log('函数式组件============猫猫睡醒了')
    return cat + '===>猫猫正在吃小鱼干'
  }
  const catBehavior = useMemo(() => catDoSomething(cat), [cat])
  return (
    <>
      <div style={{ color: 'orange' }}>{catBehavior}</div>
      <div>{children}</div>
    </>
  )
}
