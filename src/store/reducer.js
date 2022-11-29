import {
  INPUT_CHANGE,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  GET_LIST,
} from './actionTypes'
const defaultState = {
  inputValue: '',
  list: [],
}
export default (state = defaultState, action) => {
  //! Reducer里的state是只读，切忌严禁在这里修改state的值
  // 通过action.type来判断要进行的操作
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case GET_LIST:
      nextState.list = action.value
      return nextState
    case INPUT_CHANGE:
      nextState.inputValue = action.value
      return nextState
    case ADD_TODO_ITEM:
      nextState.list.push(action.value)
      nextState.inputValue = ''
      return nextState
    case REMOVE_TODO_ITEM:
      nextState.list.splice(action.value, 1)
      return nextState
    default:
      return state
  }
}
