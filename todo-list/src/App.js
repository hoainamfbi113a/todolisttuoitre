import { Card } from 'antd';
import { Typography, Button, Space } from 'antd';
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

  return (
    <div className="App">
      <div style={{background:'#fff'}}>
        <Card style={{ width: 500 }}>
            <Title>TODO LIST</Title>
            <FormInput/>
            <TodoList />
            <Space size={'large'}>

            <div style={{width:200, border:'0.5px solid', textAlign:'center', padding:'4px 0'}}>
              <div>3 of 5 task done</div>
            </div>
            <Button type="primary" onClick={removeChecked}>Remove Checked</Button>
            </Space>
        </Card>
    </div>
    </div>
  );
}

export default App;
