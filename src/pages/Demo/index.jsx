import React, { Component } from 'react'
import DemoChild from '../../components/DemoChild'

class Demo extends Component {
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
      list: ['西瓜', '荔枝', '木瓜'],
    }
    // react16.3版本之后,通过此方法来创建ref, 然后赋值给一个变量, 通过该ref变量的current属性可以拿到DOM节点或组件的实例
    this.ulDOM = React.createRef()
    this.handleRemove = this.handleRemove.bind(this)
  }

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
    // react16 要加事件池, 从react17 开始废除事件池
    e.persist()

    // 这样写是无效的,不能直接操作state中的变量,要始终通过setState来更新变量
    // this.state.inputValue = e.target.value

    // 要这样写才行,是不是觉得和原生小程序很像
    this.setState({ inputValue: e.target.value })

    // 或者这种函数的写法
    // this.setState((state) => ({
    //   inputValue: e.target.value
    // }))
  }
  handleClick = () => {
    // 变量写法
    this.setState(
      {
        inputValue: '',
        list: [...this.state.list, this.state.inputValue],
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

    // 函数写法
    // this.setState((state) => {
    //   return {
    //     inputValue: '',
    //     list: [...state.list, state.inputValue]
    //   }
    // })
  }
  handleRemove(index) {
    const list = this.state.list
    list.splice(index, 1)
    this.setState({ list: list })
  }
  render() {
    return (
      <div>
        <div>
          {/* 在react16.3之前的写法①, 但这种写法在入口文件的根节点渲染时不能使用严格模式, 通过 this.refs.label 这种形式访问DOM节点 */}
          {/* <label ref="label" htmlFor="add"> */}
          <label htmlFor="add">增加服务：</label>
          <input
            id="add"
            type="text"
            value={this.state.inputValue}
            onChange={this.inputChange.bind(this)}
            // 在react16.3之前的写法②, 通过this.input 这种形式访问DOM节点
            // ref={(input) => (this.input = input)}
          />
          <button onClick={this.handleClick}>增加</button>
        </div>
        {/* react16.3版本之后, 将创建的ref变量挂载到DOM节点或组件上 */}
        <ul ref={this.ulDOM}>
          {this.state.list.map((el, index) => (
            /*
             <li
              onClick={() => this.handleRemove(index)}
              key={index}
              dangerouslySetInnerHTML={{ __html: el }}
              ></li>
             */
            <DemoChild
              content={el}
              index={index}
              key={index}
              removeItem={this.handleRemove}
            ></DemoChild>
          ))}
        </ul>
      </div>
    )
  }
}

export default Demo
