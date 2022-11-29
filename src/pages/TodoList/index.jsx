import React, { Component } from 'react'
import store from '../../store/index'
import Actions from '../../store/actions'
import TodoListUI from './UI'

class TodoList extends Component {
  constructor(props) {
    super(props)
    // 通过getState获取Redux中的数据
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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
      <TodoListUI
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleClick={this.handleClick}
        handleRemove={this.handleRemove}
      ></TodoListUI>
    )
  }
  componentDidMount() {
    // 组件挂载完成后订阅Redux的状态变化
    store.subscribe(this.storeChange)
    fetch(
      'https://mock.mengxuegu.com/mock/6385a5229433403d6c068a17/example/react_learn'
    ).then(async (res) => {
      const { status, result } = await res.json()
      if (status === 'success') {
        store.dispatch(Actions.getList(result.data))
      }
    })
  }
}

export default TodoList
