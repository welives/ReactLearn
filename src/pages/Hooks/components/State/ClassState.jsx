import React, { Component } from 'react'
import { Button, InputNumber } from 'antd'

export default class ClassState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ count: this.state.count - 1 })}
          type="primary"
          size="small"
          icon="minus"
          shape="circle"
        ></Button>
        <InputNumber
          defaultValue={this.state.count}
          disabled
          style={{ margin: '0 10px' }}
          value={this.state.count}
        ></InputNumber>
        <Button
          onClick={() => this.setState({ count: this.state.count + 1 })}
          type="primary"
          size="small"
          icon="plus"
          shape="circle"
        ></Button>
      </div>
    )
  }
}
