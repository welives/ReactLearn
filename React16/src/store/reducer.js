import {
  INPUT_CHANGE,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  GET_LIST,
  INCREMENT,
  DECREMENT,
} from './actionTypes'
const defaultState = {
  count: 0,
  inputValue: '',
  list: [],
}

const reducer = (state = defaultState, action) => {
  //! Reducer里的state是只读属性，严禁在这里修改state的值，因为它是一个纯函数
  // 通过action.type来判断要进行的操作
  const nextState = Object.assign({}, state)
  const list = [...nextState.list]
  switch (action.type) {
    case GET_LIST:
      return { ...nextState, list: [...action.value] }
    case INPUT_CHANGE:
      nextState.inputValue = action.value
      return nextState
    case ADD_TODO_ITEM:
      list.push(action.value)
      nextState.inputValue = ''
      return { ...nextState, list: list }
    case REMOVE_TODO_ITEM:
      list.splice(action.value, 1)
      return { ...nextState, list: list }
    case INCREMENT:
      return { ...nextState, count: nextState.count + 1 }
    case DECREMENT:
      return { ...nextState, count: nextState.count - 1 }
    default:
      return state
  }
}

export default reducer
