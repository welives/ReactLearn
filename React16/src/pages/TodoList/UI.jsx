import React from 'react'
import { Input, Button, List } from 'antd'

export default function UI(props) {
  const { inputValue, list, handleInputChange, handleClick, handleRemove } =
    props
  return (
    <div style={{ margin: '10px' }}>
      <div>
        <Input
          placeholder="写点什么吧"
          style={{ width: '250px' }}
          onChange={handleInputChange}
          value={inputValue}
        ></Input>
        <Button
          type="primary"
          style={{ marginLeft: '10px' }}
          onClick={() => handleClick(inputValue)}
        >
          增加
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <List
          bordered
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item onClick={() => handleRemove(index)}>{item}</List.Item>
          )}
        ></List>
      </div>
    </div>
  )
}
