import React, {  useEffect, useState } from 'react'
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { Divider } from 'antd';
import { useDispatch } from 'react-redux';

export default function Todo(props) {

    const {index} = props;

    // console.log(props)

    const [state,setState]=useState({...props.todo});
    let [disabled,setDisabled]=useState(true);

    // console.log(state)

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
        type: "editToDoAPI"
      })
    }

    const handleDeleteToDo = (index)=>{
      dispatch({
        index,
        type: "deleteToDoAPI"
      })
    }

    useEffect(()=>{
      setState({...props.todo});
    },[props])

  return (
    <>
      <div className="todolist">
            <Checkbox checked={state.status} onChange={(e)=>{onChange(e,index)}} />
            <input type="text" value={state.textTask} disabled={disabled} onChange={handleChange} />
            <EditFilled onClick={ () => {  
              setDisabled(!disabled);
              if(state.content === "" && !disabled === true){
                alert("Vui lòng nhập việc cần làm.");
                setDisabled(disabled = false);
              } else if(!disabled === true && state.content !== ""){
                handleEditToDo({content:state.content,key: index})
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
