import { createContext, useState } from "react";


const TodoContext = createContext()
export  {TodoContext}

function TodoProvider({children}){

    const [todoList, setTodoList] = useState([])
    const [editTodo, setEditTodo] = useState(null)

    return <TodoContext.Provider value={{todoList, setTodoList, editTodo, setEditTodo}}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider