import { INPUT_CHANGE, ADD_TODO_ITEM, REMOVE_TODO_ITEM } from './actionTypes'
const defaultState = {
  inputValue: '',
  list: [
    '8点起床',
    '刷牙洗脸',
    '出门买早餐',
    '搭车去上班',
    '到公司开始摸鱼',
    '吃午餐',
    '午休',
    '下午继续摸鱼',
    '下班回家',
  ],
}
export default (state = defaultState, action) => {
  //! Reducer里的state是只读，切忌严禁在这里修改state的值
  // 通过action.type来判断要进行的操作
  const nextState = Object.assign({}, state)
  switch (action.type) {
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
