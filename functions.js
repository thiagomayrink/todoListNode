import {writeFileSync} from 'fs';

function saveChanges(todoList) {
    writeFileSync('./todos.json', JSON.stringify(todoList, null, 4), 'utf-8');
}
function addItem(todoList, item) {
    console.log('executado')
    const todo = { check: false, name: "" };
    todo.name = item.toString();
    todoList = [...todoList, todo];
    saveChanges(todoList);
}
function renderTodoList(todoList) {
    const myTodoList = todoList.map((t)=>{
        if (t.check === false){
            return `🔴 ${t.name}`;
        } else if (t.check === true){
            return `🟢 ${t.name}`;
        }
    })
    return myTodoList;
}
function removeItem(todoList, item) {
    todoList.splice(item)
    saveChanges(todoList);
}
function toggleCheck(todoList, item) {
    todoList[item].check = !todoList[item].check;
    saveChanges(todoList);
}

export {addItem, renderTodoList, removeItem, toggleCheck}