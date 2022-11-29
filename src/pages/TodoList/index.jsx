import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../store/actions'
import TodoListUI from './UI'

function TodoList(props) {
  const { inputValue, list, handleInputChange, handleClick, handleRemove } =
    props
  return (
    <TodoListUI
      inputValue={inputValue}
      list={list}
      handleInputChange={handleInputChange}
      handleClick={handleClick}
      handleRemove={handleRemove}
    ></TodoListUI>
  )
}

/**
 * 把Redux中的state映射成组件所需要的props
 * @param {Object} state Redux中的state
 */
function mapStateToProps(state) {
  return {
    inputValue: state.inputValue,
    list: state.list,
  }
}

/**
 * 把dispatch映射成组件所需要的props
 * @param {Function} dispatch
 */
function mapDispatchToProps(dispatch) {
  dispatch(Actions.getListAsync())
  return {
    handleInputChange(e) {
      dispatch(Actions.inputChange(e.target.value))
    },
    handleClick(e) {
      dispatch(Actions.addTodoItem(e))
    },
    handleRemove(index) {
      dispatch(Actions.removeTodoItem(index))
    },
  }
}

/**
 * connect 函数的返回值是一个容器组件
 * connect 是典型的柯里化函数，它执行两次，第一次是设置参数；第二次是接收一个正常的 展示组件，并在该组件的基础上返回一个容器组件。这其实是一种高阶组件（HOC）的用法
 */
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
