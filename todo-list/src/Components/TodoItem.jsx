import {List, Checkbox, Space, } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { TodoContext } from '../Context';


function TodoItem({itemId,todo,isChecked,children, sortValue, sortTodoList}){
    const {todoList,editTodo, setTodoList,formControl, setEditTodo} = useContext(TodoContext)
    const onChange = (e) =>{
        const newTodoList =  todoList.map(({id, ...rest}) => (
            id === itemId ? {
                id,
                ...rest,
                isChecked:e.target.checked
            }:{
                id,
                ...rest
            }
        ))
        setTodoList(sortTodoList(newTodoList, sortValue))
        localStorage.setItem('todoList',JSON.stringify(newTodoList))
    }

    const handleDeleteTodo = itemId => {
        if(editTodo){
            if(editTodo.id === itemId){
                setEditTodo(null)
                formControl.setFieldsValue({title:''})
            }
        }
        const newTodoList = todoList.filter(({id}) => itemId !== id)
        setTodoList(newTodoList)
        localStorage.setItem('todoList',JSON.stringify(newTodoList))
    }

    const handleSelectTodo = todo => {
        setEditTodo(todo)
        formControl.setFieldsValue(todo)
    }

    return   <>
            <List.Item >
                    <Space size={'large'}>
                        <Checkbox onChange={onChange} checked={isChecked}></Checkbox>
                        <span  className={`${isChecked ? 'line' :''}`}>
                            {children}
                        </span>
                        <span>
                            {isChecked ? "done" : "in progress"}
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





