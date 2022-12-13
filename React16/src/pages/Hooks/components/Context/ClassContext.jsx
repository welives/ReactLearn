import React, { Component } from 'react'
import { Button, InputNumber } from 'antd'

class Counter extends Component {
  render() {
    return (
      <InputNumber
        defaultValue={this.props.count}
        disabled
        style={{ margin: '0 10px' }}
        value={this.props.count}
      ></InputNumber>
    )
  }
}

export default class ClassContext extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }
  render() {
    return (
      <>
        <Button
          onClick={() => this.setState({ count: this.state.count - 1 })}
          type="primary"
          size="small"
          icon="minus"
          shape="circle"
        ></Button>
        <Counter count={this.state.count}></Counter>
        <Button
          onClick={() => this.setState({ count: this.state.count + 1 })}
          type="primary"
          size="small"
          icon="plus"
          shape="circle"
        ></Button>
      </>
    )
  }
}
