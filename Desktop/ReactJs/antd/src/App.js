import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Table from "./components/Table/Table";
import Employee from "./components/Employee/Employee";
import Border from "./components/Border/Border";
import Employ from "./components/Employ/Employ";
import Create from './components/Create/Create';
function App() {
  return (
   <div className="App"
   style={{
  
    margin:'auto',
    background:'pink',
    width:1154,
    height: '106.25rem',
    top:0,
    left:0,
    borderRadius: 12
    }}>
      <Employee/>
      <Table/>      
      
      <Employ/>
      <Border/>
      {/* <div >
        <Create/>
      </div> */}
    </div>
   
  );
}

export default App;
