import React, { Component } from 'react'

export class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return <div style={{ margin: '10px' }}>{this.props.match.params.id}</div>
  }
  componentDidMount() {
    console.log(this.props.match)
  }
}

export default Test
