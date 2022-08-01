import {combineReducers,legacy_createStore as createStore ,applyMiddleware} from "redux"
import {ToDoReducer} from './toDoReducer/todoReducer'
import { rootSaga } from "./rootSaga";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleWare = createSagaMiddleware(rootSaga);

const rootReducer = combineReducers({
    ToDoReducer,
});

export const store = createStore(rootReducer,applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);