import { Card,Typography, Button, Space, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import FormInput from './Components/FormInput';
import TodoList from './Components/TodoList';
import { TodoContext } from './Context';

const {Title} = Typography
const { Option } = Select;

function App() {

  const {todoList, setTodoList} = useContext(TodoContext)

  const [sortValue, setSortValue] = useState(false)

  const removeChecked = () => {
    const newTodoList = todoList.map(todo =>( {
      ...todo,
      isChecked:false
    }))
    setTodoList(newTodoList)
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  const checkAll = () => {
    const newTodoList = todoList.map(todo =>( {
      ...todo,
      isChecked:true
    }))
    setTodoList(newTodoList)
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  const sortTodoList = (todoList, value) => todoList.sort(({isChecked}) => isChecked === value ? -1:1)

  const handleChange = (value) => {
    setSortValue(value)
    setTodoList(sortTodoList(todoList,value))
  };


  const calculateAmountTaskDone = () => {
    let count = 0

    todoList.forEach(({isChecked}) => {
      if(isChecked){
        count ++
      }
    })

    return count
  }

  const calculateWidth = () => {
    let result = Math.round(198 / todoList.length * calculateAmountTaskDone())
    if(isNaN(result))
      result = 0
    return result
  }

  
  return (
    <div className="App">
      <div style={{background:'#fff'}}>
        <Card >
            <Title>TODO LIST</Title>
            <Select defaultValue={sortValue} style={{ width: 120 }} onChange={handleChange}>
              <Option value={false}>In Progress</Option>
              <Option value={true}>Done</Option>
            </Select>
            <FormInput sortTodoList={sortTodoList} sortValue={sortValue}/>
            <TodoList sortTodoList={sortTodoList} sortValue={sortValue}/>
            <Space size={'large'}>

            <div style={{position:'relative',width:200, border:'0.5px solid', textAlign:'center', height:30}}>
              <div style={{backgroundColor:'#29e35a', height:28,transition:'all 0.3s linear', width:calculateWidth()}}>
              <span style={{position:'absolute',top:0,left:0,lineHeight:"30px", width:200}}>{calculateAmountTaskDone()} of {todoList.length} task done</span>
              </div>
             
            </div>
            <Button type="primary" onClick={removeChecked}>Remove Checked</Button>
            <Button type="primary" onClick={checkAll}>Check All</Button>
            </Space>
        </Card>
    </div>
    </div>
  );
}

export default App;
