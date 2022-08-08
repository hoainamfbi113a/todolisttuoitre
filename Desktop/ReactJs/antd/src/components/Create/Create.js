import React, {useState} from "react";
import "./Create.css";
import { Input,Checkbox, Button, Modal } from "antd";
import {DeleteOutlined,PlusCircleOutlined,CloseOutlined} from '@ant-design/icons';

export default function Create() {
 
  return (
    <div className="create-process">
   
    {/* <CloseOutlined style={{
          background: '#f6f6f6',

        width: 8.81,
        height: 51.19,
        color:'#000000',
        marginLeft:570,
        cursor:'pointer',
    }}/> */}
      <h1
        style={{
          width: 587.15,
          height: 38.98,
          marginLeft:150 ,
          fontWeight: 700,
          fontSize: 26,
          // textAlign: "center",
          color: " #000000",
        }}
      >
        Bước chấm điểm
      </h1>
      <p
        style={{
          width: 73,
          height: 19,
          marginLeft: 75,
          fontWeight: 600,
          fontSize: 15,
          color: "#3F4254",
          opacity: 0.8,
        }}
      >
        Tên nhóm:
      </p>
      <Input
        placeholder="Group Name"
        style={{
          width: 350,
          height: 40,
          background: "#F0F5FA",
          borderRadius: 3,
          marginLeft: 75,
          marginBottom: 10,
        }}
      />
      
      
      <p
        style={{
          width: 89,
          height: 19,
          marginLeft: 75,
          fontWeight: 600,
          fontSize: 15,
          color: "#3F4254",
          opacity: 0.8,
        }}
      >
        Người chấm:
      </p>      
      <Input
        placeholder="Scorer"
        style={{
          width: 350,
          height: 40,
          background: "#F0F5FA",
          borderRadius: 3,
          marginLeft: 75,
          marginBottom: 10,
        }}
      />
      <p
        style={{
          width: 75,
          height: 19,
          marginLeft: 75,
          fontWeight: 600,
          fontSize: 15,
          color: "#3F4254",
          opacity: 0.8,
        }}
      >
        Cấp chấm:
      </p>
      <Input
        placeholder="Grade level"
        style={{
          width: 350,
          height: 40,
          background: "#F0F5FA",
          borderRadius: 3,
          marginLeft: 75,
          marginBottom: 10,
        }}
      />
      <p
        style={{
          width: 44,
          height: 19,
          marginLeft: 75,
          fontWeight: 600,
          fontSize: 15,
          color: "#3F4254",
          opacity: 0.8,
        }}
      >
        Hệ số:
      </p>
      <Input
        placeholder="Coefficient"
        style={{
          width: 350,
          height: 40,
          background: "#F0F5FA",
          borderRadius: 3,
          marginLeft: 75,
          marginBottom: 10,
        }}
      />
      <br/>
      <Checkbox style={{
        width:22,
        height:22,
        background:' #F0F5FA',
        borderRadius:5,
        marginLeft:77,
        marginBottom:21,
        color:'#434349',
        fontWeight:500,
        fontSize:15,
      }}/>  Chấm tham khảo
      <br/>
      <Checkbox style={{
        width:22,
        height:22,
        background:' #F0F5FA',
        borderRadius:5,
        marginLeft:77,
        color:'#434349',
        fontWeight:500,
        fontSize:15,
      }}/>  Chấm kết thúc
      <br/> <br/>
    <Button style={{
        width: 110,
        height: 44,
        background: "#FFFFFF",
        border:'1px solid #35794A',
        borderRadius:3,
        color:'#35794A',
        marginLeft: 142
    }}><DeleteOutlined />Xóa</Button>
    <Button style={{
        width:110,
        height:44,
        background:'#35794A',
        border:'1px solid #35794A',
        borderRadius:3,
        fontSize:18,
        color:'#FFFFFF',
        marginLeft: 21
    }}><PlusCircleOutlined />Tạo</Button>

    
    </div>
  );
}
