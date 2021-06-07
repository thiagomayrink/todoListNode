import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { existsSync, writeFileSync, readFileSync } from 'fs';

if (existsSync('./todos.json')){
    const todoList = readFileSync('./todos.json',{encoding:'utf8'})
    App(todoList)
} else {
    const todoList = []
    App(todoList);    
}

function App(todoList) {
    function addItem(item) {
        const todo = { status: 'unCheck', name: "" };
        todo.name = item.toString();
        todoList = [...todoList, todo];
        writeFileSync('./todos.json', JSON.stringify(todoList, null, 4), 'utf-8');
    }
    
    function removeItem(item) {
        todoList.splice(item)
    }
    
    if (todoList){
        const functions = ['add', 'list', 'remove'];
        const index = readlineSync.keyInSelect(functions, 'Type your command? ');
        
        if (functions[index] === 'add') {
            const item = readlineSync.question('What do you want to do? ');
            addItem(item)
        }
        if (functions[index] === 'list') {
            todoList.forEach(e => {
              console.log(e);
            });
        }
        if (functions[index] === 'remove') {
            const item = readlineSync.keyInSelect(todoList,'What task do you want to remove? ');
            removeItem(item);
        }
    }
}

//console.log(chalk.blueBright.bold('Ok, ' + animals[index] + ' goes to your room.')); //'🟢' '🔴'