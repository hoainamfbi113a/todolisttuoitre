import React, { useState } from 'react'
import './todolist.css'
import { Typography } from 'antd';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import Todo from '../Components/Todo/Todo';

export default function ToDoListComponent() {
  const {Title} = Typography;
  const [state,setState] = useState({});
  const toDoList = useSelector(state=> state.ToDoReducer);
  const dispatch = useDispatch();

  console.log(toDoList.todo)
  

  const toDo = (e)=>{
    const {value} = e.target;
    setState({...state,content: value})
    console.log(state)
  }

  const dispatchToDo = ()=>{
    dispatch({
      todo: state,
      type: "todoDispatch"
    })
  }

  const renderList = ()=>{
    return toDoList.todo.map((todo,index)=>{
      return <Todo content={todo.content} key={index} />
    })
  }
  
  return (
    <div className="background">
      <div className="content">
        <Title style={{color: "#485056"}}>TODOLIST</Title>
        <div className="content__input">
          <Input style={{fontStyle: "italic"}} placeholder="What need to be done" onChange={toDo}/>
          <PlusOutlined onClick={dispatchToDo} />
        </div>
        {renderList()}
      </div>
    </div>
  )
}
