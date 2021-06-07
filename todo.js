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
    function addItem(item) {
        const todo = { check: false, name: "" };
        todo.name = item.toString();
        todoList = [...todoList, todo];
        writeFileSync('./todos.json', JSON.stringify(todoList, null, 4), 'utf-8');
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
        console.log(myTodoList)
    }

    function removeItem(item) {
        todoList.splice(item)
        writeFileSync('./todos.json', JSON.stringify(todoList, null, 4), 'utf-8');
    }

    function toggleCheck(index) {
        todoList[index].check = !todoList[index].check;
        writeFileSync('./todos.json', JSON.stringify(todoList, null, 4), 'utf-8');
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
            const index = parseInt(readlineSync.keyInSelect(renderTodoList(), 'What task do you want to check/uncheck? '))
            toggleCheck(index);
        }
        if (functions[index] === 'remove') {
            renderTodoList()
            const item = readlineSync.keyInSelect(renderTodoList(),'What task do you want to remove? ');
            removeItem(item);
        }
    }
}

//console.log(chalk.blueBright.bold('Ok, ' + animals[index] + ' goes to your room.')); //'🟢' '🔴'