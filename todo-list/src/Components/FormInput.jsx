import { Button, Form, Input, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { useContext } from 'react';
import { TodoContext } from '../Context';
import { EditOutlined } from '@ant-design/icons';

function FormInput ({sortValue, sortTodoList}){
    const {todoList,editTodo,formControl,setEditTodo, setTodoList} = useContext(TodoContext)
    const onFinish = ({title}) => {
      if(!title) return
      formControl.setFieldsValue({title:''})
      let newTodoList = []
      if(editTodo){
        newTodoList = todoList.map(({id,...rest}) => {
          if(id === editTodo.id){
            return {
              id,
              ...rest,
              title
            }
          }
          return {
            id,
            ...rest
          }
        })
        newTodoList = sortTodoList(newTodoList,sortValue)
      }else{
        newTodoList = [
          ...todoList,
          {
              id:Math.random(),
              title,
              isChecked:false
          }
        ]
        newTodoList = sortTodoList(newTodoList,sortValue)
      }
        setTodoList(newTodoList)
        setEditTodo(null)
        localStorage.setItem('todoList', JSON.stringify(newTodoList))
    };
    
    

    return <Form
    name="basic"
    onFinish={onFinish}
    autoComplete="off"
    
    form={formControl}
  >

    <Row>

   <Col span={22}>
   <Form.Item
      name="title"
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
        {editTodo ? <EditOutlined /> : '+'}
      </Button>
      
    </Form.Item>
   </Col>
    
    </Row>


  </Form>
}

export default FormInput