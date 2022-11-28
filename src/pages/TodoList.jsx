import React, { Component } from 'react'
import { Input, Button, List } from 'antd'
import store from '../store/index'

class TodoList extends Component {
  constructor(props) {
    super(props)
    // 通过getState获取Redux中的数据
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.storeChange = this.storeChange.bind(this)
  }
  handleInputChange(e) {
    const action = {
      // 必填项,用来告诉Redux本次action要修改的是哪个state
      type: 'inputChange',
      // 非必需,不一定非要叫payload,也可以是data或者value之类你喜欢的键名,用来传递新的state值
      payload: e.target.value,
    }
    // 通过dispatch分发state变更操作到Store
    store.dispatch(action)
  }
  handleClick() {
    store.dispatch({
      type: 'addTodoItem',
    })
  }
  handleRemove(index) {
    store.dispatch({
      type: 'removeTodoItem',
      payload: index,
    })
  }
  storeChange() {
    this.setState(store.getState())
  }
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <div>
          <Input
            placeholder="写点什么吧"
            style={{ width: '250px' }}
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          ></Input>
          <Button
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={this.handleClick}
          >
            增加
          </Button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (
              <List.Item onClick={this.handleRemove.bind(this, index)}>
                {item}
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    )
  }
  componentDidMount() {
    // 组件挂载完成后订阅Redux的状态变化
    store.subscribe(this.storeChange)
  }
}

export default TodoList
