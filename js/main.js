/*
TODO
- Create a function to create new task list item
- Create a function to move item from Todo list to Completed list (and also remove from todo list)
- Create a function to undo moving an item from Completed list to Todo list
*/ 
let tasks = [
    "Take out trash",
    "Clean dishes",
    "Pick up dry cleaning",
    "Pick up groceries",
];
let completedTasks = [];

const todosList = document.getElementById("todosList");
// const todosList = document.querySelector("ul#todosList");  // option

const completedList = document.getElementById("completedList");

const todosListCount = document.getElementById("tasksCount");
const completedListCount = document.getElementById("tasksCompleted");

function createTaskListItem(task, index, forCompleted = false) {
    // Create a list item
    let li = document.createElement("li");
    // "row justify-content-between p-0 me-2 align-items-center border border-2 border-dark"
    // const listItemStyles = ["row", "justify-content-between", "p-0", "me-2", "align-items-center", "border", "border-2", "border-dark"];
    // li.classList.add(...listItemStyles);
    li.classList = "row justify-content-between p-0 me-2 my-3 align-items-center border border-2 border-dark";
    // Create an id for the list item
    let taskId = `task${index}`;
    // Add ID name
    li.id = taskId;
    // Add text to list item content
    li.textContent = task;
    // return list item
    return li;
}

todosList.appendChild(createTaskListItem("Practice javascript", 2))