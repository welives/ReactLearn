import React, { Component, createRef } from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
    this.asyncFlag = createRef(false)
  }
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <List
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item>
              <Link to={`/test/${item.id}`}>{item.title}</Link>
            </List.Item>
          )}
        ></List>
      </div>
    )
  }
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
}

export default Home
