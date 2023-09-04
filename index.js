import chalk from 'chalk';
import fs from 'fs';
import process from 'process';
const taskFile = 'tasks.json';

//import args from 'args';



function readTasks(){
    try{
        const data = fs.readFileSync(taskFile, 'utf8');
        return JSON.parse(data);
    } catch(e){
        return [];
    }
}
function saveTasks(tasks){
    fs.writeFileSync(taskFile, JSON.stringify(tasks,null, 2 ), 'utf8');
}

function addTask(taskName){
    const tasks = readTasks();
    tasks.push({name: taskName});
    saveTasks(tasks);
    console.log(`Task ${taskName} added Successfully`);
}

const [,, command, ...args] =process.argv;
if (command === 'add'){
    
    if (args.length===0){
        console.log('Please provide a task name');
    }
    else{
        addTask(args.join(' '));
    }
}