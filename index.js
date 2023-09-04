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

function addTask(taskName, remark, status ='Pending'){
    const tasks = readTasks();
    tasks.push({name: taskName, remark, status});
    saveTasks(tasks);
    console.log(chalk.green(`Task ${taskName} added Successfully with remark ${remark} and status: ${status}`));
}

function listTasks(){
    const tasks = readTasks();
    if (tasks.length === 0){
        console.log(chalk.red('No tasks found'));
    }else {
        console.log(chalk.green(`Tasks:`));
        tasks.forEach((task, index)=> {
            console.log(chalk.green(`${index +1}. Name: ${task.name}, Remark: ${task.remark}, Status: ${task.status}`));
        })
    }
}

function viewTaskStatus(taskName){
    const tasks = readTasks();
    const task = tasks.find((t) => t.name === taskName);
    if (task) {
        console.log(chalk.green(`The Status of ${taskName} is:  ${task.status}`));
    }else {
        console.log(chalk.red(`Task ${taskName} is not found`));
    }
}

const [,, command, ...args] =process.argv;
if (command === 'add'){

    if (args.length<2){
        console.log('Please provide both a task name and a remark.');
    }
    else{
        const taskName = args[0];
        const remark = args[1];
        const status = args[2] || 'Pending' ; 
        addTask(taskName, remark, status);
    }
}else if (command === 'List'){
    listTasks();
}else if (command === 'status'){
    if (args.length ===0){
        console.log(chalk.yellow('Please provide the task  name to view its status'))

    } else {
        const taskName = args[0];
        viewTaskStatus(taskName);
    }
}