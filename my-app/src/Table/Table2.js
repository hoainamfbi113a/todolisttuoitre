import { Col, Table, Tag, Space } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import React from 'react'

export default function Table2() {
  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <Table dataSource={data}>
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName"/>
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      <Column title="Age" dataIndex="age" key="age"></Column>
      <Column title="Address" dataIndex="address" key="address"></Column>
      <Column title="Tags" dataIndex="tags" key="address" render={(tags)=>{
        return <>
             {tags.map(tag => {
              return <Tag color="blue" key={tag} >
                {tag}
              </Tag>
            })}
          </>
      }} ></Column>
      <Column title="Action" key="action" render={record=>{
        return <Space size="middle" >
                  <a>Invite {record.lastName}</a>
                  <a>Delete</a>
              </Space>
      }} />
    </Table>
  )
}
