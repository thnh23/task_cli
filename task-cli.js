const { log } = require('console');
const { create } = require('domain');
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, "tasks.json");

const STATUS = ["todo", "in-progress", "done"]

const readTasks = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, 'utf-8')
  return data ? JSON.parse(data) : [];
}

const writeTasks = (tasks) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}
const generateId = (tasks) => {
  return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1
}


const addTask = (description) => {
  const tasks = readTasks()

  const newTask = {
    id: generateId(tasks),
    description,
    status: STATUS[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  tasks.push(newTask)
  writeTasks(tasks)
  console.log(`Task added successfully (ID: ${newTask.id})`)
}

const updateTask = (id, description) => {
  const tasks = readTasks()

  const task = tasks.find(t => t.id == id)

  if (!task) {
    console.log("Task not found")
    return
  }

  task.description = description;
  task.updatedAt = new Date().toISOString()

  writeTasks(tasks)
  console.log(`Task updated successfully (ID: ${task.id})`)
}

const deleteTask = (id) => {
  const tasks = readTasks()

  const filtered = tasks.filter(t => t.id != id)

  if (tasks.length === filtered.length) {
    console.log("Task not found")
    return
  }

  writeTasks(filtered)
  console.log(`Task deleted successfully (ID: ${id})`)
}

const markTask = (id, status) => {
  const tasks = readTasks()

  const task = tasks.find(t => t.id == id)

  if (!task) {
    console.log('Task not found');
    return
  }

  task.status = status
  task.updatedAt = new Date().toISOString()
  writeTasks(tasks)

  console.log(`Task marked as ${status}`)
}

const listTasks = (filter) => {
  const tasks = readTasks()
  let result = tasks;
  if (filter) {
     result = tasks.filter(t => t.status === filter)
  }
  if (result.length === 0) {
    console.log('No task found');
    return
  }

  console.log(`Tasks [${filter ? filter : 'All'}]: `);
  result.forEach(t => {
    console.log(t);
  })

}

const args = process.argv.slice(2)
const command = args[0]
switch (command) {
  case "add":
    addTask(args.slice(1).join(" "));
    break;

  case "update":
    updateTask(args[1], args.slice(2).join(" "));
    break;

  case "delete":
    deleteTask(args[1]);
    break;

  case "mark-in-progress":
    markTask(args[1], STATUS[1]);
    break;

  case "mark-done":
    markTask(args[1], STATUS[2]);
    break;

  case "list":
    listTasks(args[1]); 
    break;

  default:
    console.log(`
Usage:
  node task-cli.js add "task description"
  node task-cli.js update <id> "new description"
  node task-cli.js delete <id>
  node task-cli.js mark-in-progress <id>
  node task-cli.js mark-done <id>
  node task-cli.js list
  node task-cli.js list done
  node task-cli.js list todo
  node task-cli.js list in-progress
    `);
}



