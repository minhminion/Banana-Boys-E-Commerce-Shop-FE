import React, { useState } from "react";
import { Input } from "antd";
import { SendOutlined } from '@ant-design/icons'
const Compose = ({ onSubmit }) => {

  const [content, setContent] = useState('')

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const handlePressEnter = () => {
    if(content.length > 0) {
      onSubmit(content)
      setContent('')
    }
  }

  return (
    <div className="compose">
      <Input
        className="compose-input"
        value={content}
        placeholder="Type a message, @name"
        onPressEnter={handlePressEnter}
        onChange={onChangeContent}
      />
      <div className="toolbar-button" onClick={handlePressEnter}>
        <SendOutlined />
      </div>
    </div>
  );
};

export default Compose;
