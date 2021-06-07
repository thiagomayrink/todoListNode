import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { existsSync, writeFileSync, readFileSync } from 'fs';

if (existsSync('./todos.json')){
    const todoList = JSON.parse(readFileSync('./todos.json',{encoding:'utf8'}))
    App(todoList)
} else {
    const todoList = []
    App(todoList);
}

function App(todoList) {

    function saveChanges(todoList) {
        writeFileSync('./todos.json', JSON.stringify(todoList, null, 4), 'utf-8');
    }
    
    function addItem(item) {
        const todo = { check: false, name: "" };
        todo.name = item.toString();
        todoList = [...todoList, todo];
        saveChanges(todoList);
    }

    function renderTodoList() {
        const myTodoList = todoList.map((t)=>{
            if (t.check === false){
                return `🔴 ${t.name}`;
            } else if (t.check === true){
                return `🟢 ${t.name}`;
            }
        })
        return myTodoList;
    }

    function removeItem(item) {
        todoList.splice(item)
        saveChanges(todoList);
    }

    function toggleCheck(item) {
        todoList[item].check = !todoList[item].check;
        saveChanges(todoList);
    }
    
    if (todoList){
        const functions = ['add', 'list', 'remove'];
        const index = readlineSync.keyInSelect(functions, 'Type your command? ');
        
        if (functions[index] === 'add') {
            renderTodoList()
            const item = readlineSync.question('What task do you want to do? ');
            addItem(item)
        }
        if (functions[index] === 'list') {
            renderTodoList()
            const item = parseInt(readlineSync.keyInSelect(renderTodoList(), 'What task do you want to check/uncheck? '))
            item !== -1 ? toggleCheck(item) : App(todoList);
        }
        if (functions[index] === 'remove') {
            renderTodoList()
            const item = readlineSync.keyInSelect(renderTodoList(),'What task do you want to remove? ');
            removeItem(item);
        }
    }
}

//console.log(chalk.blueBright.bold('Ok, ' + animals[index] + ' goes to your room.')); //'🟢' '🔴'