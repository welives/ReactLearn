import React, { Component, createContext } from 'react'
import { Button, InputNumber } from 'antd'
import store from '../../../../store/index'
import Actions from '../../../../store/actions'
import { INCREMENT, DECREMENT } from '../../../../store/actionTypes'

// ① 创建一个 Context对象，并传入一个默认值
const CountContext = createContext({
  getCounter: (type) => store.dispatch(Actions.getCounter(type)),
})

// ② 使用Context对象的Provider组件来包裹消费组件,通过value传递state给消费组件
export default class ClassReducer extends Component {
  constructor(props) {
    super(props)
    this.state = { count: store.getState().count }
    this.storeChange = this.storeChange.bind(this)
  }
  // 使用 static 这个类属性来 contextType 后，便可以使用 this.context 来获取最近 Context 上的值，可以在任何生命周期中访问到它，包括 render 函数中
  static contextType = CountContext
  storeChange() {
    this.setState({ count: store.getState().count })
  }
  componentDidMount() {
    store.subscribe(this.storeChange)
  }
  render() {
    return (
      <CountContext.Provider
        value={{ ...this.context, count: this.state.count }}
      >
        {/* 消费组件不管嵌套得多深都能通过 useContext 拿到state */}
        <Counter></Counter>
      </CountContext.Provider>
    )
  }
}

// ③ 定义消费组件
class Counter extends Component {
  render() {
    return (
      <Buttons>
        <Number></Number>
      </Buttons>
    )
  }
}

// ④ 消费组件通过 this.context拿到共享的数据
class Buttons extends Component {
  static contextType = CountContext
  render() {
    return (
      <div>
        <Button
          type="primary"
          size="small"
          icon="minus"
          shape="circle"
          onClick={() => this.context.getCounter(DECREMENT)}
        ></Button>
        {/* 这里的props.children其实是替换了<Number></Number>，类似Vue中的slot */}
        {this.props.children}
        <Button
          type="primary"
          size="small"
          icon="plus"
          shape="circle"
          onClick={() => this.context.getCounter(INCREMENT)}
        ></Button>
      </div>
    )
  }
}

// 消费组件获取共享数据的另一种写法
class Number extends Component {
  render() {
    return (
      <CountContext.Consumer>
        {(context) => (
          <InputNumber
            disabled
            style={{ margin: '0 10px' }}
            defaultValue={context.count}
            value={context.count}
          ></InputNumber>
        )}
      </CountContext.Consumer>
    )
  }
}
