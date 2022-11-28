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
export default (prevState = defaultState, action) => {
  //! Reducer里的state是只读，切忌严禁在这里修改state的值
  // 通过action.type来判断要进行的操作
  const nextState = Object.assign({}, prevState)
  switch (action.type) {
    case 'inputChange':
      nextState.inputValue = action.payload
      return nextState
    case 'addTodoItem':
      nextState.list.push(prevState.inputValue)
      nextState.inputValue = ''
      return nextState
    case 'removeTodoItem':
      nextState.list.splice(action.payload, 1)
      return nextState
    default:
      return prevState
  }
}
