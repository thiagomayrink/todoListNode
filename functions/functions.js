import { existsSync, readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';
import ora from 'ora';

import {App} from '../todo.js';

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
};
function addItem(todoList, item) {
    const todo = { check: false, name: "" };
    todo.name = item.toString();
    todoList = [...todoList, todo];
    saveChanges(todoList);
};
function renderTodoList(todoList) {
    const myTodoList = todoList.map((t)=>{
        if (t.check === false && !t.pomodoro){
            return `🔴 ${t.name}`;
        } else if (t.check === true && !t.pomodoro){
            return `🟢 ${t.name}`;
        }else if (t.check === false && t.pomodoro>0){
            const qtd = (t.pomodoro).toFixed(0);
            return `🔴 ${t.name} (${qtd}x🍅)`;
        } else if (t.check === true && t.pomodoro>0){
            const qtd = (t.pomodoro).toFixed(0);
            return `🟢 ${t.name} (${qtd}x🍅)`;
        }
    })
    return myTodoList;
};
function removeItem(todoList, item) {
    todoList.splice(item);
    saveChanges(todoList);
};
function toggleCheck(todoList, item) {
    todoList[item].check = !todoList[item].check;
    saveChanges(todoList);
};
function doPomodoro(todoList,item) {
    const spinner = ora(`Doing Pomodoro of ${chalk.bold(`${todoList[item].name}`)}`).start();
    setTimeout(()=>{
        spinner.color = 'magenta';
        spinner.text = '🍅 ... ⏰';
    }, 2000)
    setTimeout(() => {
        if (todoList[item].pomodoro > 0){
            todoList[item].pomodoro +=1;
            saveChanges(todoList);
        } else {
            todoList[item].pomodoro = 1;
            saveChanges(todoList);
        }
        spinner.stop()
    }, 1500000);
}
export {addItem, renderTodoList, removeItem, toggleCheck, doPomodoro, loadFiles};