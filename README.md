# React16 学习

## 入口文件 index.js
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// render(要渲染的组件, 组件的挂载点)
ReactDOM.render(
  // 使用create-react-app脚手架创建的工程默认开启严格模式,在严格模式下,组件的render生命周期会刻意执行两次
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

## 组件定义
```js
/**
 * 旧版react的组件写法
 */
class App extends Component {
  /**
   * JSX写法: 支持在js代码中书写html代码
   * 简单的概括就是: 遇到<>包裹的代码解析成html代码, 遇到{}包裹的代码解析成js代码
   */
  render() {
    return <div className="test">Hello {true ? 'Jandan' : 'World'}</div>
  }
}
```

## 定义响应式变量
```js
class App extends Component {
  /**
   * 用途: 1)初始化props  2)初始化state,但此时不能调用setState  3)用来写bind this
   * @param {any} props 来自父元素的属性
   */
  constructor(props) {
    super(props)
    /**
     * 定义响应式变量, 这里的state 类似vue中的 data
     */
    this.state = {
      inputValue: '',
      list: []
    }
  }
}
```

## 响应式变量的赋值操作
```js
class App extends Component {
  inputChange(e) {
    // react16 要加事件池, 从react17 开始废除事件池
    e.persist()

    // 这样写是无效的,不能直接操作state中的变量,要始终通过setState来更新变量
    // this.state.inputValue = e.target.value

    // 要这样写才行,是不是觉得和原生小程序很像
    this.setState({
      inputValue: e.target.value
    })

    // 或者这种函数的写法
    this.setState((state) => ({
      inputValue: e.target.value
    }))
  }
}
```

## class组件中的<font color=red>this指向问题</font>
```js
class App extends Component {
  /**
   * 关于在react中class组件的this指向问题的总结
   * 先明确一些基础概念:
   * ① 类中的方法是挂在类实例的原型对象上的。
   * ② 类中的方法中是严格模式的。
   * ③ 使用类的实例调用类中的方法，this指向的是类的实例
   * 根据React中类组件的内部原理可知，React的类组件由React对其进行实例化，所以在React类组件内部的this指向都是当前组件的实例化对象。
   * 以 onChange={this.inputChange}为例，在这里，React的事件处理相当于一个赋值函数。其过程是onChange通过this找到了原型链上的inputChange函数，当onChange被触发的时候，直接执行inputChange相当于inputChange()。此时的this为undefined，而不是windows的原因就是上诉的概念②
   *
   * 要解决这个this指向问题，有三种办法
   * ① 可以使用bind()将该方法绑定给指向类组件实例对象的this，即 onChange={this.inputChange.bind(this)}
   * ② 可以使用箭头函数把实例方法包装起来，即 onChange={(e) => this.inputChange(e)}
   * ③ 在定义方法的时候使用箭头函数，即 inputChange = () => {}
   */
  inputChange(e) {
    console.log(this)
  }
  handleClick = (e) => {
    console.log(this)
  }
}
```

## 渲染html标签使用<font color=red>dangerouslySetInnerHTML</font>属性(等效vue中的v-html)
```js

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['西瓜', '荔枝', '木瓜']
    }
  }
  handleRemove(index) {
    const list = this.state.list
    list.splice(index, 1)
    this.setState({
      list: list
    })
  }
  render() {
    return (
      <ul>
        {this.state.list.map((el, index) => (
          <li
            onClick={() => this.handleRemove(index)}
            key={index}
            dangerouslySetInnerHTML={{ __html: el }}
          ></li>
        ))}
      </ul>
    )
  }
}
```

## 父组件通过<font color=red>props</font>往子组件传值
```js
class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['西瓜', '荔枝', '木瓜']
    }
  }
  handleRemove(index) {
    const list = this.state.list
    list.splice(index, 1)
    this.setState({
      list: list
    })
  }
  render() {
    return (
      <ul>
        {this.state.list.map((el, index) => (
          <DemoChild
            content={el}
            index={index}
            key={index}
            removeItem={() => this.handleRemove(index)}
          ></DemoChild>
        ))}
      </ul>
    )
  }
}
```

## 子组件<b><font color=red>不能直接修改props</font></b>的值(单向数据流)
```js
class DemoChild extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    // 通过props传递进来的方法来操作父组件中的变量
    this.props.removeItem(this.props.index)
  }
  render() {
    return (
      <>
        <li
          onClick={this.handleClick}
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        ></li>
      </>
    )
  }
}
```

## props类型校验
```js
import PropTypes from 'prop-types'

DemoChild.propTypes = {
  place: PropTypes.string,
  content: PropTypes.string.isRequired,
  index: PropTypes.number,
  removeItem: PropTypes.func
}
DemoChild.defaultProps = {
  place: '广西'
}
```

## ref操作DOM(尽量避免使用, 有性能问题和增加维护成本)
```js
class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: ['西瓜', '荔枝', '木瓜']
    }
    // react16.3版本之后,通过此方法来创建ref, 然后赋值给一个变量, 通过该ref变量的current属性可以拿到DOM节点或组件的实例
    this.ulDOM = React.createRef()
  }
  inputChange(e) {
    this.setState({
      inputValue: this.input.value
    })
  }
  handleClick = () => {
    this.setState(
      {
        inputValue: '',
        list: [...this.state.list, this.state.inputValue]
      },
      () => {
        /**
         * 通过setState的回调函数, 就能访问到DOM更新后的数据了
         * 在Vue中要达到同样的效果则是使用 this.$nextTick()
         */
        console.log(this.ulDOM.current.querySelectorAll('li').length)
      }
    )
    // 这样访问到的是DOM更新前的数据, 因为 setState是异步的
    // console.log(this.ulDOM.current.querySelectorAll('li').length)
  }
  render() {
    return (
      <div>
        <div>
          {/* 在react16.3之前的写法①, 但这种写法在入口文件的根节点渲染时不能使用严格模式, 通过 this.refs.label 这种形式访问DOM节点 */}
          <label ref="label" htmlFor="add">
            增加服务：
          </label>
          <input
            id="add"
            type="text"
            value={this.state.inputValue}
            onChange={this.inputChange.bind(this)}
            // 在react16.3之前的写法②, 通过this.input 这种形式访问DOM节点
            ref={(input) => (this.input = input)}
          />
          <button onClick={this.handleClick}>增加</button>
        </div>
        {/* react16.3版本之后, 将创建的ref变量挂载到DOM节点或组件上 */}
        <ul ref={this.ulDOM}>
          {this.state.list.map((el, index) => (
            <li
            onClick={() => this.handleRemove(index)}
            key={index}
            dangerouslySetInnerHTML={{ __html: el }}
            ></li>
          ))}
        </ul>
      </div>
    )
  }
}
```

## [生命周期](https://zhuanlan.zhihu.com/p/392532496)
## 在<font color=red>React16.3</font>之前可以分为四个阶段
### ① 初始化阶段 Initialization
组件的构造函数（constuctor）部分，继承React Component，在constructor中通过super(props)调用父类React Component的构造函数，才拥有了之后的生命周期。
- <font color=#00d8ff>constructor</font> 构造函数部分
  > 在这个阶段，会获取到外层传递的`props`数据，这里进行组件初始化的工作，内部`state`的定义，和组件本身逻辑的初始化。

### ② 挂载阶段 Mounting
- <font color=#00d8ff>componentWillMount</font>
  > 在组件被挂载到DOM上之前调用，原本在这里也是做一些初始化工作，和调用接口获取初始数据。但是由于和`constructor`的工作重复，且若在服务端渲染，`componentWillMount`会在服务端和客户端各自执行一次，这会导致请求两次，而接下来的`componentDidMount`这会在客户端进行，而且之后有了Fiber之后，由于任务可以中断，`componentWillMount`可能会被执行多次。
  
  > 所以在React17中，这个生命周期被正式废弃了，初始化的工作在`constructor`中处理，获取初始数据的工作在`componentDidMount`里处理。

- <font color=#00d8ff>render</font>
  > 组件的渲染阶段，`props`或`state`有更新的时候，如果没有在`shouldComponentUpdate`中禁止的话，会触发重新渲染，而DOM层的实际重绘过程是一个复杂的过程，这个过程React会通过虚拟DOM的方式和复杂算法进行处理。`render`函数是一个纯函数，它的返回只依赖传递的参数。这里不能进行`state`的更新处理，可能会导致无限循环。

- <font color=#00d8ff>componentDidMount</font>
  > 在组件被挂载到DOM上之后调用，只会调用一次，异步数据的获取工作在这里处理。

### ③ 更新阶段 Updation
在父组件重新render或者传入的props或内部的state有更新时，都会进入更新阶段。
- <font color=#00d8ff>componentWillReceiveProps</font>
  > 此生命周期为更新阶段的`props`独有，其他的四个生命周期是`props`和`state`共有

  > 此生命周期的触发条件是：① 组件首次挂载到DOM时,此生命周期是不会被执行的。② 如果组件已经存在于DOM中,此生命周期才会被执行

  > 在React16.3之前，这个生命周期可是非常常用，对于外部传递的`props`的响应工作在这里处理。比如我的props里传了一个数值变量num，本来num = 1，外部有更新将num变为2，会触发当前组件内也进行更新，在`componentWillReceiveProps`阶段，我可以获取到`prevProps`和`nextProps`，这样我就可以比对，是哪个值变化导致的更新，就可以针对这个变化运行我内部的处理逻辑，可以将外部传递的`props`更新成内部使用的`state`。

  > 但通过这个方式来处理`props`和`state`的关系十分不优雅，这样不但会破坏`state`的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。所以这个生命周期在React17也正式废弃了，这里的工作交由新的生命周期`getDerivedStateFromProps`和`componentDidUpdate`来处理。

- <font color=#00d8ff>shouldComponentUpdate</font>
  > 大量的数据更新会触发组件一遍又一遍的更新，会造成不小的性能损耗，这里就需要`shouldComponentUpdate`来进行优化工作。它有两个参数，`nextProps`和`nextState`，在这里通过传的更新后数据和当前数据`this.props`、`this.state`里的数据进行比对，可以筛选哪些变化可以触发重绘，哪些进行拦截。如果拦截则返回false。如果返回true，则先进行React elements比对，如果相同，则不会触发重绘，如果不同再进行绘制。

- <font color=#00d8ff>componentWillUpdate</font>
  > 这个方法会在`render`之前调用，可以处理一些更新前需要处理的工作。在React16.3之后会结合新生命周期`getDerivedStateFromProps`一起来处理`props`和`state`的同步问题。

- <font color=#00d8ff>render</font>
  > 上面的挂载阶段介绍过，这里只是重新调用。

- <font color=#00d8ff>componentDidUpdate</font>
  > 这个方法会在`render`之后调用，在这里可以操作更新后的组件DOM。

### ④ 卸载阶段 Unmounting
- <font color=#00d8ff>componentWIllUnmount</font>
  > 在组件被卸载前调用，这里会进行一些数据清理、定时器清理等工作来避免内存泄露。

------

## 在<font color=red>React16.4</font>之后可以分为三个阶段
> React为了优化因为复杂层次深的组件树的更新导致的跳帧问题，进行了优化，推出了React Fiber，它通过调用`requestIdleCallback`方法，可以中断主线程中正在执行的任务，将使用权交由渲染层使用。因为任务的可中断，之前的生命周期会受到影响，可能会导致周期函数多次调用，所以在React16.4后对生命周期也做了改变。

> 之前，在`render`前会调用的方法有`componentWillMount`、`componentWillReceiveProps`、`shouldComponentUpdate`、`componentWillUpdate`，除了`shouldComponentUpdate`之外的三个方法都废弃了，用`getDerivedStateFromProps`来替代。
### ① 挂载阶段 Mounting
- 将之前版本中初始化阶段的<font color=#00d8ff>constructor</font> 移入挂载阶段
- 新增了<font color=#25d366>getDerivedStateFromProps</font>

- 废弃了<font color=red>componentWillMount</font>
- <font color=#00d8ff>componentDidMount</font> 没变

### ② 更新阶段 Updation
- 废弃了<font color=red>componentWillReceiveProps</font>
- 废弃了<font color=red>componentWillUpdate</font>
- 新增了<font color=#25d366>getDerivedStateFromProps</font>
  > 首先这个新的方法独特的地方是`static`，它是一个静态方法，在这里不能调用`this`，也就是一个纯函数，开发者使用时不能写出副作用的代码，这是React通过Api来约束开发者写出更好的代码。它传了两个参数，一个是新的 `nextProps` ，一个是之前的 `prevState` ，所以开发者只能通过`prevState`而不是 `prevProps` 来做对比，保证了 `state` 和 `props` 之间的简单关系以及不需要处理第一次渲染时 `prevProps` 为空的情况。也基于以上两点，将原本 `componentWillReceiveProps` 里进行的更新工作分成两步来处理，一步是 `setState` 状态变化，更新 `state` 在 `getDerivedStateFromProps` 里直接处理，另一步是昂贵操作，即我们自己的运行逻辑，在 `componentDidUpdate` 里来处理。

  > 与 `componentWillReceiveProps` 类似，许多开发者也会在 `componentWillUpdate` 中根据 `props` 的变化去触发一些回调。但不论是 `componentWillReceiveProps` 还是 `componentWillUpdate`，都有可能在一次更新中被调用多次，也就是说写在这里的回调函数也有可能会被调用多次，这显然是不可取的。与 `componentDidMount` 类似，`componentDidUpdate` 也不存在这样的问题，一次更新中 `componentDidUpdate` 只会被调用一次，所以将原先写在 `componentWillUpdate` 中的回调迁移至 `componentDidUpdate` 就可以解决这个问题。

- <font color=#00d8ff>shouldComponentUpdate</font> 没变
- <font color=#00d8ff>render</font> 没变
- 新增了<font color=#25d366>getSnapshotBeforeUpdate</font>
  > 在`render`之后，可以读取但无法调用DOM的时候调用。它返回的值作为 `componentDidUpdate` 的第三个参数。

  > 如果我们需要获取DOM元素状态，但是由于在fiber中，`render`可打断，可能在 `componentWillMount` 中获取到的元素状态很可能与实际需要的不同，这里就需要 `getSnapshotBeforeUpdate` 这个新增的生命周期函数来解决。
  
  > 与 `componentWillMount` 不同的是，`getSnapshotBeforeUpdate` 会在最终确定的`render`执行之前执行，也就是能保证其获取到的元素状态与`componentDidUpdate`中获取到的元素状态相同。
- <font color=#00d8ff>componentDidUpdate</font> 没变
### ③ 卸载阶段 Unmounting
- <font color=#00d8ff>componentWIllUnmount</font> 没变
