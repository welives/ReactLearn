import {
  INPUT_CHANGE,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  GET_LIST,
} from './actionTypes'

class Actions {
  inputChange = (value) => ({ type: INPUT_CHANGE, value })
  addTodoItem = (value) => ({ type: ADD_TODO_ITEM, value })
  removeTodoItem = (value) => ({ type: REMOVE_TODO_ITEM, value })
  getList = (value) => ({ type: GET_LIST, value })
  /**
   * redux-thunk 异步请求演示
   */
  getListAsync = () => (dispatch) => {
    fetch(
      'https://mock.mengxuegu.com/mock/6385a5229433403d6c068a17/example/react_learn'
    ).then(async (res) => {
      const { status, result } = await res.json()
      if (status === 'success') {
        // 这里之所以能够直接使用dispatch是因为redux-thunk对store.dispatch进行了一层封装，而getListAsync方法返回的是一个执行作用域在store.dispatch内部的闭包
        dispatch(this.getList(result.data))
      }
    })
  }
}

export default new Actions()
