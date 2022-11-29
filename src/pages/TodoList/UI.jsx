import React from 'react'
import { Input, Button, List } from 'antd'

export default function (props) {
  return (
    <div style={{ margin: '10px' }}>
      <div>
        <Input
          placeholder="写点什么吧"
          style={{ width: '250px' }}
          onChange={props.handleInputChange}
          value={props.inputValue}
        ></Input>
        <Button
          type="primary"
          style={{ marginLeft: '10px' }}
          onClick={props.handleClick}
        >
          增加
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <List
          bordered
          dataSource={props.list}
          renderItem={(item, index) => (
            <List.Item onClick={() => props.handleRemove(index)}>
              {item}
            </List.Item>
          )}
        ></List>
      </div>
    </div>
  )
}
