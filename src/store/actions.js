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
}

export default new Actions()
