import {List, Checkbox, Space} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { TodoContext } from '../Context';

function TodoItem({itemId,todo,isChecked,children}){
    const {todoList, setTodoList,formControl, setEditTodo} = useContext(TodoContext)
    const onChange = (e) =>{
        const newTodoList=  todoList.map(({id, ...rest}) => (
            id === itemId ? {
                id,
                ...rest,
                isChecked:e.target.checked
            }:{
                id,
                ...rest
            }
        ))
        setTodoList(newTodoList)
        localStorage.setItem('todoList',newTodoList)
    }

    const handleDeleteTodo = itemId => {
        const newTodoList = todoList.filter(({id}) => itemId !== id)
        setTodoList(newTodoList)
        localStorage.setItem('todoList',newTodoList)
    }

    const handleSelectTodo = todo => {
        setEditTodo(todo)
        formControl.setFieldsValue(todo)
    }

    return   <>
            <List.Item >
                    <Space>
                        <Checkbox onChange={onChange} checked={isChecked}></Checkbox>
                        <span  className={`${isChecked ? 'line' :''}`}>
                            {children}
                        </span>
                    </Space>
                    <Space>
                    <EditOutlined onClick={()=> handleSelectTodo(todo)}/>
                    <DeleteOutlined onClick={()=>handleDeleteTodo(itemId)}/>
                    </Space>
                    
                </List.Item>
    </>
}
export default TodoItem





