const stateDefault = {
    todo: [
        {content:"dắt chó",status:false},
        {content:"dắt chó 1",status:false},
        {content:"dắt chó 2",status:false},
    ]   
}

export const ToDoReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case "todoDispatch": {
            const {content} = action.todo;
            const newToDo = [...state.todo,{content: content,status:false}];
            const newState = {...state,todo:[...newToDo]};
            state = newState;
            return {...state}
        };
        case "editToDo":{
            const {content,key} = action.todo;
            let newToDo = [...state.todo];
            newToDo[key].content = content.content;
            state.todo = [...newToDo];
            console.log("edit",state)
            return {...state}
        };
        case "deleteToDo":{
            let {index} = action;
            let newToDo = [...state.todo];
            newToDo.splice(index,1);
            state.todo = [...newToDo];
            console.log("delete",state)
            return {...state}
        }
        default: return {...state}
    }
} 