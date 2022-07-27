import React, { useState } from 'react'
import './todolist.css'
import { Button, Divider, Typography } from 'antd';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import Todo from '../Components/Todo/Todo';
import { Progress } from 'antd';
import { addToDo, removeAllChecked } from '../redux/type/type';

export default function ToDoListComponent() {
  const {Title} = Typography;
  const [state,setState] = useState({content:""});
  const toDoList = useSelector(state => state.ToDoReducer);
  // console.log("todolist",toDoList)

  const dispatch = useDispatch();

  const toDo = (e)=>{
    let {value} = e.target;
    setState({...state,content: value});
  }

  const dispatchToDo = ()=>{
    if(state.content === ""){
      alert("Vui lòng nhập việc muốn làm.")
    } else {
      dispatch({
        todo: state,
        type: addToDo
      });
      setState({content:""});
    }
    
  }

  const renderList = ()=>{
    // console.log("renderlist",toDoList)
    return toDoList.todo.map((todo,index)=>{
      return <Todo todo={todo} index={index} key={index} />
    })
  }
  
  return (
    <div className="background">
      <div className="content">
        <Title style={{color: "#485056"}}>TODOLIST</Title>
        <div className="content__input">
          <Input style={{fontStyle: "italic",textAlign: "center"}} placeholder="What need to be done" onChange={toDo} value={state?.content} />
          <PlusOutlined className="abc" onClick={dispatchToDo} />
        </div>
        <Divider/>
        {toDoList.todo.length > 0 ? renderList() : ""}
        <div className="content__footer">
          <Progress percent={Math.round((toDoList.todo.filter(todo => todo.status === true).length / toDoList.todo.length * 100),2)} />
          <Button onClick={()=>{
            dispatch({
              payload:"",
              type: removeAllChecked
            })
          }}>Remove checked box</Button>
        </div>
      </div>
    </div>
  )
}
