import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DemoChild extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    // 通过props传递进来的方法来操作父组件中的变量
    this.props.removeItem(this.props.index)
  }
  // 子组件渲染优化
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
      return true
    }
    return false
  }
  render() {
    return (
      <>
        <li
          onClick={this.handleClick}
          dangerouslySetInnerHTML={{
            __html: this.props.place + this.props.content,
          }}
        ></li>
      </>
    )
  }
}

// props类型校验
DemoChild.propTypes = {
  place: PropTypes.string,
  content: PropTypes.string.isRequired,
  index: PropTypes.number,
  removeItem: PropTypes.func,
}
DemoChild.defaultProps = {
  place: '广西',
}

export default DemoChild
