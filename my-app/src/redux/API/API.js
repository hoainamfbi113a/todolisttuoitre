import axios from "axios";

export async function getList(){
    try {
        const res = await axios({
            url: "https://6006de003698a80017de21f1.mockapi.io/api/todo-list",
            method: "GET"
        });
        // console.log("getList API", res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addToDoAPI(toDo){
    try {
        const res = await axios({
            url: "https://6006de003698a80017de21f1.mockapi.io/api/todo-list",
            method: "POST",
            data: {
                textTask: toDo
            }
        });
        return res.data;
        // console.log("getList API")
    } catch (error) {
        console.log(error);
    }
};

export async function editToDo(todo){
    try {
        const res = await axios({
            url: `https://6006de003698a80017de21f1.mockapi.io/api/todo-list/${todo.key}`,
            method: "PUT",
            data: {
                textTask: todo.content
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteToDo(index){
    try {
        const res = await axios({
            url: `https://6006de003698a80017de21f1.mockapi.io/api/todo-list/${index}`,
            method:"DELETE"
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function checkedToDo(checked,index){
    try {
        const res = await axios({
            url: `https://6006de003698a80017de21f1.mockapi.io/api/todo-list/${index}`,
            method: "PUT",
            data: {
                status: checked
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeAllToDoChecked(checkArr){
    try {
        for(let todo of checkArr){
            await axios({
                url: `https://6006de003698a80017de21f1.mockapi.io/api/todo-list/${todo.id}`,
                method: "PUT",
                data: {
                    status: false
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}