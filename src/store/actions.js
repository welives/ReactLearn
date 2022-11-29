import { INPUT_CHANGE, ADD_TODO_ITEM, REMOVE_TODO_ITEM } from './actionTypes'

class Actions {
  inputChange = (value) => ({ type: INPUT_CHANGE, value })
  addTodoItem = (value) => ({ type: ADD_TODO_ITEM, value })
  removeTodoItem = (index) => ({ type: REMOVE_TODO_ITEM, value: index })
}

export default new Actions()
