import React, {  useEffect, useState } from 'react'
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { Divider } from 'antd';
import { useDispatch } from 'react-redux';
import {editToDo,deleteToDo} from "../../redux/type/type";

export default function Todo(props) {

    const {index} = props;

    const [state,setState]=useState({...props.todo});
    const [disabled,setDisabled]=useState(true);

    const dispatch = useDispatch();

    const onChange = (e,index) => {
      let {checked} = e.target;
      dispatch({
        checkedToDo: {checked,index},
        type: "checked"
      })
    };

    const handleChange = (e)=>{
      const {value} = e.target;
      setState({
        content: value
      })
    }

    const handleEditToDo = (content)=>{
      dispatch({
        todo:content,
        type: editToDo
      })
    }

    const handleDeleteToDo = (index)=>{
      dispatch({
        index,
        type: deleteToDo
      })
    }

    useEffect(()=>{
      setState({...props.todo});
    },[props])

  return (
    <>
      <div className="todolist">
            <Checkbox checked={state.status} onChange={(e)=>{onChange(e,index)}} />
            <input type="text" value={state.content} disabled={disabled} onChange={handleChange} />
            <EditFilled onClick={ () => {  
              setDisabled(!disabled);
              if(!disabled === true){
                handleEditToDo({content:state,key:index})
              }
            }} />
            <CloseOutlined onClick={()=>{
              handleDeleteToDo(index)
            }} />
      </div>
      <Divider/>
    </>
  )
}
