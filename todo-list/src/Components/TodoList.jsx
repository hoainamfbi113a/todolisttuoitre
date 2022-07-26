import {  List } from 'antd';
import { useContext } from "react";
import { TodoContext } from "../Context";
import TodoItem from './TodoItem';

function TodoList({sortValue, sortTodoList}){
    const {todoList} = useContext(TodoContext)

    return <>
    <List
      size="large"
      
      dataSource={todoList}
      renderItem={item => <TodoItem sortTodoList={sortTodoList} sortValue={sortValue} itemId={item.id} todo={item} isChecked={item.isChecked}>{item.title}</TodoItem>}
    />
    </>
}


export default TodoList