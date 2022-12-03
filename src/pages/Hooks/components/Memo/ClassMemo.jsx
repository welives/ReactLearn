import React, { Component } from 'react'
import { Button } from 'antd'

export default class ClassMemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cat: '猫猫在睡觉',
      dog: '狗子也在睡觉',
    }
  }
  render() {
    return (
      <>
        <Button
          type="primary"
          size="small"
          onClick={() => this.setState({ cat: +new Date() })}
        >
          猫猫
        </Button>
        <Button
          type="primary"
          size="small"
          style={{ marginLeft: '10px' }}
          onClick={() =>
            this.setState({ dog: +new Date() + '===>狗子发现屋外有动静' })
          }
        >
          狗子
        </Button>
        <ChildComponent cat={this.state.cat}>{this.state.dog}</ChildComponent>
      </>
    )
  }
}

class ChildComponent extends Component {
  state = {
    catBehavior: '',
  }
  catDoSomething(cat) {
    console.log('类组件==========猫猫睡醒了')
    return cat + '===>猫猫正在吃小鱼干'
  }
  componentDidMount() {
    this.setState({ catBehavior: this.catDoSomething(this.props.cat) })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.cat !== this.props.cat) {
      this.setState({ catBehavior: this.catDoSomething(nextProps.cat) })
      return true
    }
    if (nextProps.children !== this.props.children) {
      return true
    }
    return false
  }
  render() {
    return (
      <>
        <div style={{ color: 'orange' }}>{this.state.catBehavior}</div>
        <div>{this.props.children}</div>
      </>
    )
  }
}
