const stateDefault = {
    todo: [
        {content:"dắt chó",status:false}
    ]   
}

export const ToDoReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case "todoDispatch": {
            return {...state, todo: {...action.todo,status: false}}
        }
        default: return {...state}
    }
} 