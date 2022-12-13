# React Router 学习

## 安装
项目根目录下打开命令行终端，执行下面的命令进行安装，笔者学习时的版本为<font color=red>5.3.4</font>
```
npm i react-router-dom
```

## 使用
> Switch的作用是只渲染当前匹配到的路由组件
```js
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
...
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/test">测试</Link>
          </li>
          <li>
            <Link to="/demo">Demo</Link>
          </li>
          <li>
            <Link to="/todo">TodoList</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/test/:id" component={Test}></Route>
          <Route path="/demo" component={Demo}></Route>
          <Route path="/todo" component={TodoList}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
```

## 动态传值
```js
// ① 定义要接收参数的路由
<Route path="/test/:id" component={Test}></Route>

// ② 然后在有需要的地方将参数拼接到url链接上
<Link to={`/test/${item.id}`}>{item.title}</Link>

// ③ 在路由地址的着陆页面生命周期中可以获取到url上的参数
componentDidMount() {
  console.log(this.props.match)
}
```

## 重定向 Redirect
```js
// 声明式
<Redirect to="/todo" />

// 编程式
this.props.history.replace('/todo')
```

> 重定向的使用中有个小坑，就是在组件挂载期间，在的异步方法中有更新state的操作。紧接着，在异步方法没有执行完毕前就将组件重定向到其他路由导致组件被卸载，这时候react会抛出警告：不能操作已卸载组件内的state，会有内存泄漏的风险。

> 要解决这个问题也很简单，定义一个ref引用来判断是否该进行state的更新操作。类组件中使用createRef，函数组件中使用useRef
```js
this.asyncFlag = createRef(false)
...
componentDidMount() {
  fetch(
    'https://mock.mengxuegu.com/mock/6385a5229433403d6c068a17/example/list'
  ).then(async (res) => {
    const { status, result } = await res.json()
    if (status === 'success') {
      if (!this.asyncFlag.current) {
        this.setState({ list: result.data })
      }
    }
  })
}
componentWillUnmount() {
  this.asyncFlag.current = true
}
```
