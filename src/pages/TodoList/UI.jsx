import React, { Component } from 'react'
import { Input, Button, List } from 'antd'

class UI extends Component {
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <div>
          <Input
            placeholder="写点什么吧"
            style={{ width: '250px' }}
            onChange={this.props.handleInputChange}
            value={this.props.inputValue}
          ></Input>
          <Button
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={this.props.handleClick}
          >
            增加
          </Button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <List
            bordered
            dataSource={this.props.list}
            renderItem={(item, index) => (
              <List.Item onClick={() => this.props.handleRemove(index)}>
                {item}
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    )
  }
}

export default UI
