import { useForm } from "antd/lib/form/Form";
import { createContext, useEffect, useState } from "react";


const TodoContext = createContext()
export  {TodoContext}

function TodoProvider({children}){

    const [todoList, setTodoList] = useState([])
    const [editTodo, setEditTodo] = useState(null)
    const [formControl] = useForm()

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('todoList'))
        if(data){
            setTodoList(data)
        }
    },[])

    return <TodoContext.Provider value={{todoList,formControl, setTodoList, editTodo, setEditTodo}}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider