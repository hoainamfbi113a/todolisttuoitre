import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Table from "./components/Table/Table";
import Employee from "./components/Employee/Employee";
import Border from "./components/Border/Border";
import Employ from "./components/Employ/Employ";
function App() {
  return (
   <div className="App"style={{
    background:'pink',
    width:1154,
    height: 900,
    top:0,
    left:0,
    borderRadius: 12
    }}>
      <Employee/>
      <Table/>
      <hr style={{marginTop:527, maxWidth:800, align:'center'}}/>
      <Employ/>
      <Border/>
    </div>
  );
}

export default App;
