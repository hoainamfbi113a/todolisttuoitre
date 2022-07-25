import React, { useEffect, useState } from 'react'
import {Input} from 'antd'

export default function InputConponent() {

    const [state,setState] = useState({Ten:"",Tuoi:"",DiaChi:"",ChieuCao:"",CanNang:""});

    const handleChange = (e)=>{
        let {name,value} = e.target;
        setState({...state,[name]: value});
    };

    const handleSubmit = (e)=>{
      e.preventDefault();
      localStorage.setItem("information",JSON.stringify(state));
    }

    const checkInfor = ()=>{
      if(localStorage.getItem("information")){
        const infor = JSON.parse(localStorage.getItem("information"));
        setState({
          ...infor
        })
      }
    }

    const deleteInfor = (e)=>{
      e.preventDefault();
      setState({});
    }

    useEffect(()=>{
      checkInfor();
    },[])
    
  return (
    <div style={{width: "25%", marginLeft: "35%"}}>
        <form >
            <Input onChange={handleChange} name="Ten" placeholder="Tên" value={state.Ten !== "" ? state.Ten : ""} ></Input>
            <Input onChange={handleChange} name="Tuoi" placeholder="Tuổi" value={state.Tuoi !== "" ? state.Tuoi : ""}  ></Input>
            <Input onChange={handleChange} name="DiaChi" placeholder="Địa chỉ" value={state.DiaChi !== "" ? state.DiaChi : ""}  ></Input>
            <Input onChange={handleChange} name="ChieuCao" placeholder="Chiều cao" value={state.ChieuCao !== "" ? state.ChieuCao : ""}  ></Input>
            <Input onChange={handleChange} name="CanNang" placeholder="Cân nặng" value={state.CanNang !== "" ? state.CanNang : ""}></Input>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={deleteInfor}>Xóa</button>
        </form>
    </div>
  )
}