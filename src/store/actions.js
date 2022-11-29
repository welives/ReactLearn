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
  getListAsync = () => (dispatch) => {
    fetch(
      'https://mock.mengxuegu.com/mock/6385a5229433403d6c068a17/example/react_learn'
    ).then(async (res) => {
      const { status, result } = await res.json()
      if (status === 'success') {
        // 这里的 getListAsync 方法返回的是一个闭包，而这个闭包的执行作用域是在store.dispatch内部，dispatch是由redux-thunk处理后提供的
        dispatch(this.getList(result.data))
      }
    })
  }
}

export default new Actions()
