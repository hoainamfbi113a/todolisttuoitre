import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { useContext } from 'react';
import { TodoContext } from '../Context';

function FormInput (){
    const {todoList,editTodo, setTodoList} = useContext(TodoContext)
    const onFinish = ({title}) => {
      const newTodoList = [
        ...todoList,
        {
            id:Math.random(),
            title,
            isChecked:false
        }
    ]
        setTodoList(newTodoList)
        localStorage.setItem('todoList', JSON.stringify(newTodoList))
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return <Form
    name="basic"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

    <Row>

   <Col span={22}>
   <Form.Item
      name="title"
      
    //   ]}
    >
      <Input placeholder='What needs to be done' />
    </Form.Item>
   </Col>
   <Col span={2} >
   <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        +
      </Button>
    </Form.Item>
   </Col>
    
    </Row>


  </Form>
}

export default FormInput