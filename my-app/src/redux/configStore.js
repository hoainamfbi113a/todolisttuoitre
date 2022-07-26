import {combineReducers,legacy_createStore as createStore} from "redux"
import {ToDoReducer} from './toDoReducer/todoReducer'

const rootReducer = combineReducers({
    ToDoReducer: ToDoReducer
});

export const store = createStore(rootReducer);