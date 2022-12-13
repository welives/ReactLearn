# Redux 学习

## 安装
项目根目录下打开命令行终端，执行下面的命令进行安装，笔者学习时的版本为<font color=red>4.2.0</font>
```
npm i redux
```

## 初始配置
### 这里以react项目为例
> 首先在项目根目录打开命令行终端, 然后下执行如下命令
```
mkdir src/store
touch src/store/index.js
touch src/store/reducer.js
```

> 接着编辑 reducer.js
```js
const defaultState = {}
export default (state = defaultState, action) => {
  return state
}
```

> 编辑 index.js
```js
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(
  reducer,
  // 开发环境中加上这个,否则chrome的调试插件监听不到state的变化
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
```

## Redux工作流程
### ① 组件告诉Action Creators想要做什么
### ② Action Creators创建action(也就是组件想要做的事情)
### ③ 通过dispatch将action分发出去
### ④ Store对要使用的Reducer进行绑定，然后将action分发到对应的Reducer上
### ⑤ 在Reducer上进行相应的action操作并返回结果给Store
### ⑥ 组件就可以通过Store的API进行获取操作返回的结果

------

## reducer必须是一个纯函数
### 纯函数的概念：
- 纯函数每一次调用时传入同样的参数，返回的都是同样的结果；它不会改变参数的值，也不会改变外部变量的值；它不会依赖于外部的变量，仅依赖于你传入的参数
- 纯函数没有其他副作用
- 如果你每次传入的参数一样，但是返回的结果不一样，则不是一个纯函数

## Redux中的数据操作
reducer
```js
const defaultState = {
  inputValue: '',
  list: [],
}
export default (state = defaultState, action) => {
  // Reducer里的state是只读属性，严禁在这里修改state的值，因为它是一个纯函数
  // 通过action.type来判断要进行的操作
  const nextState = Object.assign({}, state)
  const list = [...nextState.list]
  switch (action.type) {
    case 'getList':
      return { ...nextState, list: [...action.value] }
    case 'inputChange':
      nextState.inputValue = action.value
      return nextState
    case 'addTodoItem':
      list.push(action.value)
      nextState.inputValue = ''
      return { ...nextState, list: list }
    case 'removeTodoItem':
      list.splice(action.value, 1)
      return { ...nextState, list: list }
    default:
      return state
  }
}
```

TodoList组件
```js
class TodoList extends Component {
  constructor(props) {
    super(props)
    // 通过getState获取Redux中的数据
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.storeChange = this.storeChange.bind(this)
  }
  handleInputChange(e) {
    const action = {
      // 必填项,用来告诉Redux本次action要修改的是哪个state
      type: 'inputChange',
      // 非必需,不一定非要叫value,也可以叫data或者其他你喜欢的键名,用来传递新的state值
      value: e.target.value,
    }
    // 通过dispatch分发state变更操作到Store
    store.dispatch(action)
  }
  handleClick(value) {
    store.dispatch({ type: 'addTodoItem', value })
  }
  handleRemove(index) {
    store.dispatch({ type: 'removeTodoItem', value: index })
  }
  storeChange() {
    this.setState(store.getState())
  }
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <div>
          <Input
            placeholder="写点什么吧"
            style={{ width: '250px' }}
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          ></Input>
          <Button
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={this.handleClick.bind(this, this.state.inputValue)}
          >
            增加
          </Button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (
              <List.Item onClick={this.handleRemove.bind(this, index)}>
                {item}
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    )
  }
  componentDidMount() {
    // 组件挂载完成后订阅Redux的状态变化
    store.subscribe(this.storeChange)
    store.dispatch({
      type: 'getList',
      value: [
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
    })
  }
}
```

------

## redux-thunk的安装和配置
项目根目录下打开命令行终端，执行下面的命令进行安装，笔者学习时的版本为<font color=red>2.4.2</font>
```
npm i redux-thunk
```

<font color=red>配置：</font>

编辑 index.js
```js
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 判断redux浏览器插件和redux包中哪个有组合函数
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const store = createStore(reducer, reduxCompose(applyMiddleware(thunk)))

export default store
```

## redux-thunk的使用
① 在TodoList组件生命周期调用 action 中的异步请求
```js
class TodoList extends Component {
  ...
  componentDidMount() {
    // 组件挂载完成后订阅Redux的状态变化
    store.subscribe(this.storeChange)
    store.dispatch(Actions.getListAsync())
  }
  ...
}
```

② 把原先生命周期中的异步请求放到 action 中执行
```js
import { INPUT_CHANGE, ADD_TODO_ITEM, REMOVE_TODO_ITEM, GET_LIST } from './actionTypes'

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
        // 这里之所以能够直接使用dispatch是因为redux-thunk对store.dispatch进行了一层封装，而getListAsync方法返回的是一个执行作用域在store.dispatch内部的闭包
        dispatch(this.getList(result.data))
      }
    })
  }
}
```

------

## redux-saga的安装和配置
项目根目录下打开命令行终端，执行下面的命令进行安装，笔者学习时的版本为<font color=red>1.2.1</font>
```
npm i redux-saga
```

<font color=red>配置：</font>

① 在store目录下新建 sagas.js
```js
export default function* saga() {}
```

② 编辑 index.js
```js
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import saga from './sagas'

// 判断redux浏览器插件和redux包中哪个有组合函数
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  reduxCompose(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(saga)

export default store
```

## redux-saga的使用
① 编辑 sagas.js 的内容为：
```js
import { takeEvery, put } from 'redux-saga/effects'
import { GET_LIST } from './actionTypes'
import Actions from './actions'

function* getList() {
  const data = yield fetch(
    'https://mock.mengxuegu.com/mock/6385a5229433403d6c068a17/example/react_learn'
  ).then(async (res) => {
    const { status, result } = await res.json()
    return status === 'success' ? result.data : []
  })
  yield put(Actions.getList(data))
}

export default function* saga() {
  yield takeEvery(GET_LIST, getList)
}
```

② 在TodoList组件生命周期调用 action
```js
class TodoList extends Component {
  ...
  componentDidMount() {
    // 组件挂载完成后订阅Redux的状态变化
    store.subscribe(this.storeChange)
    store.dispatch(Actions.getList())
  }
  ...
}
```

------

## react-redux的安装和使用
项目根目录下打开命令行终端，执行下面的命令进行安装，笔者学习时的版本为<font color=red>8.0.5</font>
```
npm i react-redux
```

<font color=red>使用：</font>

① react入口文件
```js
import { Provider } from 'react-redux'
import store from './store/index'
...

ReactDOM.render(
  // 将Provider作为整个应用的根组件，并获取store作为其props，以便后续进行下发处理
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

② 需要使用state的组件
```js
import { connect } from 'react-redux'
...
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
 * connect 函数的返回值是一个 WrappedComponent 组件
 * connect 是典型的柯里化函数，它执行两次，第一次是设置参数；第二次是接收一个正常的 展示组件，并在该组件的基础上返回一个容器组件 WrappedComponent。这其实是一种高阶组件（HOC）的用法
 */
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```

## 使用react-redux后，组件的变化
### ① 类组件可以把内部的state和各种操作方法进行解耦，根据解耦情况可以将组件转变为无状态组件
### ② 不再需要对状态进行subscribe和getState
