import { addToDo, checked, deleteToDo, editToDo, removeAllChecked } from "../type/type";

const stateDefault = {
    todo: [
    ]   
}

export const ToDoReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case addToDo: {
            const {content} = action.todo;
            const newToDo = [...state.todo,{content: content,status:false}];
            const newState = {...state,todo:[...newToDo]};
            state = newState;
            return {...state}
        };
        case editToDo:{
            const {content,key} = action.todo;
            let newToDo = [...state.todo];
            newToDo[key].content = content.content;
            state.todo = [...newToDo];
            return {...state}
        };
        case deleteToDo:{
            let {index} = action;
            let newToDo = [...state.todo];
            newToDo.splice(index,1);
            state.todo = [...newToDo];
            return {...state}
        };
        case checked:{
            let {checked,index} = action.checkedToDo;
            let newToDoList = [...state.todo];
            newToDoList[index].status = checked;
            state.todo = [...newToDoList];
            return {...state};
        };
        case removeAllChecked: {
            let newToDoList = [...state.todo];
            newToDoList.forEach(work => work.status = false); 
            state.todo = [...newToDoList];
            return {...state};
        };
        default: return {...state}
    }
} 