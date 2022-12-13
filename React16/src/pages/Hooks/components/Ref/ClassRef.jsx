import React, { Component, createRef } from 'react'
import { Input, Button } from 'antd'

export default class ClassRef extends Component {
  constructor(props) {
    super(props)
    this.inputDom = createRef()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.inputDom.current.focus()
  }
  render() {
    return (
      <>
        <Input
          ref={this.inputDom}
          style={{ width: 200, marginRight: '10px' }}
        ></Input>
        <Button type="primary" onClick={this.handleClick}>
          点我设置输入框焦点
        </Button>
      </>
    )
  }
}
