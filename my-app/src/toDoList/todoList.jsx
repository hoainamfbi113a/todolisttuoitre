import React, { useEffect, useState } from 'react'
import './todolist.css'
import { Button, Divider, Typography } from 'antd';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import Todo from '../Components/Todo/Todo';
import { Progress } from 'antd';
import { getToDoList, removeAllChecked, sortAZ, sortZA } from '../redux/type/type';

export default function ToDoListComponent() {
  const {Title} = Typography;
  const [state,setState] = useState({textTask:""});
  const toDoList = useSelector(state => state.ToDoReducer);
  // console.log("todolist",toDoList)

  const dispatch = useDispatch();

  const toDo = (e)=>{
    let {value} = e.target;
    setState({...state,textTask: value});
  }

  const dispatchToDo = ()=>{
    if(state.textTask === ""){
      alert("Vui lòng nhập việc muốn làm.")
    } else {
      dispatch({
        todo: state,
        type: "addToDoAPI"
      });
      setState({textTask:""});
    }
  }

  const renderList = ()=>{
    // console.log("renderlist",toDoList)
    return toDoList.todo.map((todo,index)=>{
      return <Todo todo={todo} index={todo.id} key={index} />
    })
  }

  useEffect(()=>{
    dispatch({type: getToDoList});
  },[dispatch])
  
  return (
    <div className="background">
      <div className="content">
        <Title style={{color: "#485056"}}>TO DO LIST</Title>
        <div className="content__input">
          <Input style={{fontStyle: "italic",textAlign: "center"}} placeholder="What need to be done" onChange={toDo} value={state?.textTask} />
          <PlusOutlined className="abc" onClick={dispatchToDo} />
        </div>
        <Divider/>
        {toDoList.todo.length > 0 ? renderList() : ""}
        <div className="content__footer">
          <Progress percent={Math.round((toDoList.todo.filter(todo => todo.status === true).length / toDoList.todo.length * 100),2)} />
          <Button onClick={()=>{;
            dispatch({
              checkedArr:toDoList.todo.filter(todo => todo.status === true),
              type: removeAllChecked
            })
          }}>Remove checked box</Button>
          <Button onClick={()=>{
            dispatch({
              type:sortAZ,
              payload:""
            })
          }}>Sort A - Z</Button>
          <Button onClick={()=>{
            dispatch({
              type:sortZA,
              payload:""
            })
          }}>Sort Z - A</Button>
        </div>
      </div>
    </div>
  )
}
