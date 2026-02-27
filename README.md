# Task Tracker CLI

A simple command line application to manage tasks using Node.js.

## Features
- Add task
- Update task
- Delete task
- Mark task as in-progress or done
- List tasks
- Filter tasks by status

## Usage

Run commands with:

node task-cli.js <command>

### Commands

Add a task:
node task-cli.js add "Task name"

Update a task:
node task-cli.js update <id> "New description"

Delete a task:
node task-cli.js delete <id>

Mark as in progress:
node task-cli.js mark-in-progress <id>

Mark as done:
node task-cli.js mark-done <id>

List all tasks:
node task-cli.js list

List by status:
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done

## Data Storage

Tasks are saved in tasks.json file.

## Requirements

- Node.js