import {List, Checkbox, Space} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { TodoContext } from '../Context';

function TodoItem({itemId,isChecked,children}){
    const {todoList, setTodoList} = useContext(TodoContext)
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
        localStorage.setItem(newTodoList)
    }

    const handleDeleteTodo = itemId => {
        setTodoList(todoList.filter(({id}) => itemId !== id))
    }

    return   <>
            <List.Item>
                    <Space>
                        <Checkbox onChange={onChange} checked={isChecked}></Checkbox>
                        <span  className={`${isChecked ? 'line' :''}`}>

                            hjkjhkhk{children}
                        </span>
                    </Space>
                    <Space>
                    <EditOutlined />
                    <DeleteOutlined onClick={()=>handleDeleteTodo(itemId)}/>
                    </Space>
                    
                </List.Item>
    </>
}
export default TodoItem





