import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Input } from 'antd'

class ClassEffect extends Component {
  constructor(props) {
    super(props)
    this.state = { msg: '' }
  }
  componentDidMount() {
    console.log('传统写法componentDidMount：组件挂载完毕')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('传统写法componentDidUpdate：msg的值改变了')
  }
  componentWillUnmount() {
    console.log('传统写法componentWillUnmount：组件将要卸载')
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.msg !== this.state.msg) {
      return true
    }
    return false
  }
  render() {
    return (
      <div>
        <Input
          addonBefore="msg"
          onChange={(e) => this.setState({ msg: e.target.value })}
          value={this.state.msg}
          style={{ width: 200 }}
        ></Input>
      </div>
    )
  }
}

export default withRouter(ClassEffect)
