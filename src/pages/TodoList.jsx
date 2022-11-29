import React, { Component } from 'react'
import { Input, Button, List } from 'antd'
import store from '../store/index'
import Actions from '../store/actions'

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
    // 通过dispatch分发state变更操作到Store
    store.dispatch(Actions.inputChange(e.target.value))
  }
  handleClick() {
    store.dispatch(Actions.addTodoItem(this.state.inputValue))
  }
  handleRemove(index) {
    store.dispatch(Actions.removeTodoItem(index))
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
    store.dispatch(
      Actions.getList([
        '8点起床',
        '刷牙洗脸',
        '出门买早餐',
        '搭车去上班',
        '到公司开始摸鱼',
        '吃午餐',
        '午休',
        '下午继续摸鱼',
        '下班回家',
      ])
    )
  }
}

export default TodoList
