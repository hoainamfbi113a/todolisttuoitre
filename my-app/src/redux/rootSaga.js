import {takeEvery, call, put} from "redux-saga/effects"
import { addToDoAPI, checkedToDo, deleteToDo, editToDo, getList, removeAllToDoChecked } from "./API/API";
import {getToDoList, removeAllChecked} from "./type/type";


function* getToDoListAPI(){
    // console.log("getToDoListAPI rootSaga")
    const list = yield call(getList);
    yield put({type: 'getToDoListReducer', list});
}

function* addToDo(payload){
    const {textTask} = payload.todo;
    yield put({type: "setIsLoading"});
    yield call(addToDoAPI,textTask);
    // console.log(textTask);
    yield call(getToDoListAPI);
}

function* editToDoAPI(payload){
    const {todo} = payload;
    // console.log(todo)
    yield put({type: "setIsLoading"});
    yield call(editToDo,todo);
    yield call(getToDoListAPI);
}

function* deleteToDoAPI(payload){
    yield put({type: "setIsLoading"});
    yield call(deleteToDo,payload.index);
    yield call(getToDoListAPI);
}

function* checkedToDoAPI(payload){
    const {checked,index} = payload.checkedToDo;
    yield put({type: "setIsLoading"});
    yield call(checkedToDo,checked,index)
    yield call(getToDoListAPI);
}

function* removeAllCheckedAPI(payload){
    yield put({type: "setIsLoading"});
    yield call(removeAllToDoChecked,payload.checkedArr);
    yield call(getToDoListAPI);
}

export function* rootSaga(){
    yield takeEvery(getToDoList,getToDoListAPI);
    yield takeEvery("addToDoAPI",addToDo);
    yield takeEvery("editToDoAPI",editToDoAPI);
    yield takeEvery("deleteToDoAPI",deleteToDoAPI);
    yield takeEvery("checked",checkedToDoAPI);
    yield takeEvery(removeAllChecked,removeAllCheckedAPI);
}