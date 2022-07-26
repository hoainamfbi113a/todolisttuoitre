import React, {  useEffect, useState } from 'react'
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { Divider } from 'antd';
import { useDispatch } from 'react-redux';

export default function Todo(props) {

    const {index} = props;

    const [state,setState]=useState({content:props.content});
    const [disabled,setDisabled]=useState(true);

    const dispatch = useDispatch();

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleChange = (e)=>{
      const {value} = e.target;
      setState({
        content: value
      })
    }

    const editToDo = (content)=>{
      dispatch({
        todo:content,
        type: "editToDo"
      })
    }

    const deleteToDo = (index)=>{
      dispatch({
        index,
        type: "deleteToDo"
      })
    }

    useEffect(()=>{
      setState({content:props.content});
    },[props])

  return (
    <>
      <div className="todolist">
            <Checkbox onChange={onChange} />
            <input type="text" value={state.content} disabled={disabled} onChange={handleChange} />
            <EditFilled onClick={ () => {  
              setDisabled(!disabled);
              console.log(!disabled)
              if(!disabled === true){
                    editToDo({content:state,key:index})
              }
            }} />
            <CloseOutlined onClick={()=>{
              deleteToDo(index)
            }} />
      </div>
      <Divider/>
    </>
  )
}
