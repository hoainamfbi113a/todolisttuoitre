import { Card,Typography, Button, Space } from 'antd';
import { useContext } from 'react';
import './App.css';
import FormInput from './Components/FormInput';
import TodoList from './Components/TodoList';
import { TodoContext } from './Context';

const {Title} = Typography

function App() {

  const {todoList, setTodoList} = useContext(TodoContext)

  const removeChecked = () => {
    setTodoList(todoList.map(todo =>( {
      ...todo,
      isChecked:false
    })))
  }

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
        <Card style={{ width: 500 }}>
            <Title>TODO LIST</Title>
            <FormInput />
            <TodoList />
            <Space size={'large'}>

            <div style={{position:'relative',width:200, border:'0.5px solid', textAlign:'center', height:30}}>
              <div style={{backgroundColor:'#29e35a', height:28,transition:'all 0.3s linear', width:calculateWidth()}}>
              <span style={{position:'absolute',top:0,left:0,lineHeight:"30px", width:200}}>{calculateAmountTaskDone()} of {todoList.length} task done</span>
              </div>
             
            </div>
            <Button type="primary" onClick={removeChecked}>Remove Checked</Button>
            </Space>
        </Card>
    </div>
    </div>
  );
}

export default App;
