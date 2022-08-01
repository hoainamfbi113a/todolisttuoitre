import { useSelector } from 'react-redux';
import './App.css';
import ToDoListComponent from './toDoList/todoList.jsx'
function App() {

  const {isLoading} = useSelector(state => state.ToDoReducer);
  // console.log(isLoading);

  return (
    <>
      <ToDoListComponent/>
      {isLoading 
        ? 
          <div className="loading">
              IS LOADING
          </div> 
        : 
          ""}
    </>
  );
}

export default App;
