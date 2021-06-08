import chalk from 'chalk';
import readlineSync from 'readline-sync';
import {addItem, renderTodoList, removeItem, toggleCheck, loadFiles} from './functions/functions.js';
import {add, list, remove} from './styles/styles.js';

loadFiles();
function App(todoList) {
    if (todoList){
        const options = [add, list, remove];
        const index = readlineSync.keyInSelect(options, 'Type your command? ',{cancel: chalk.bold('cancel')});
        if (options[index] === add) {
            const item = readlineSync.question('What task do you want to do? ');
            item !== -1 ? addItem(todoList,item) : loadFiles();
        };
        if (options[index] === list) {
            renderTodoList(todoList)
            const item = parseInt(readlineSync.keyInSelect(renderTodoList(todoList), 'What task do you want to check/uncheck? '));
            item !== -1 ? toggleCheck(todoList,item) : loadFiles();
        };
        if (options[index] === remove) {
            renderTodoList(todoList)
            const item = readlineSync.keyInSelect(renderTodoList(todoList),'What task do you want to remove? ');
            item !== -1 ? removeItem(todoList,item) : loadFiles();
        };
    };
};

export {App};