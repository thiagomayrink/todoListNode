import { existsSync, readFileSync, writeFileSync } from 'fs';
import {App} from '../todo.js'

function loadFiles() {
    if (existsSync('./data/todos.json')){
        const todoList = JSON.parse(readFileSync('./data/todos.json',{encoding:'utf8'}));
        App(todoList);
    } else {
        const todoList = [];
        App(todoList);
    };
};
function saveChanges(todoList) {
    writeFileSync('./data/todos.json', JSON.stringify(todoList, null, 4), 'utf-8');
}
function addItem(todoList, item) {
    console.log(todoList);
    const todo = { check: false, name: "" };
    todo.name = item.toString();
    todoList = [...todoList, todo];
    console.log(todoList);
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
    todoList.splice(item);
    saveChanges(todoList);
}
function toggleCheck(todoList, item) {
    todoList[item].check = !todoList[item].check;
    saveChanges(todoList);
}

export {addItem, renderTodoList, removeItem, toggleCheck, loadFiles};