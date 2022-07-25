import React from 'react'
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { Checkbox } from 'antd';

export default function Todo(props) {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };

  return (
    <div className="todolist">
          <Checkbox onChange={onChange} />
          <p>{props.content}</p>
          <EditFilled />
          <CloseOutlined />
    </div>
  )
}
