import React, { Component } from 'react'

export default class ClassCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    }
    this.onResize = this.onResize.bind(this)
  }
  onResize() {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    })
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
  render() {
    return (
      <div>
        页面宽高为：{this.state.size.width}x{this.state.size.height}
      </div>
    )
  }
}
