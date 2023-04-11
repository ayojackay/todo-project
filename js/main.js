/* BOOTSTRAP TOOLTIP JS */
const initBootstrapTooltips = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
}
/************************/

const getSessionStorage = (item) => JSON.parse(sessionStorage.getItem(item));
const setSessionStorage = (item, val) => sessionStorage.setItem(item, JSON.stringify(val));

let tasks, completedTasks, todos;
window.onload = () => {
    tasks = getSessionStorage("tasks") || setSessionStorage("tasks", []);
    // completedTasks = getSessionStorage("completedTasks");
    todos = getSessionStorage("todos") || setSessionStorage("todos", []);
    tasks && createTaskItems(tasks);
    initBootstrapTooltips();
}

const taskList = document.getElementById("taskList");
const todosList = document.getElementById("todosList");
const completedList = document.getElementById("completedList");

const todosListCount = document.getElementById("tasksCount");
const completedListCount = document.getElementById("tasksCompleted");

const initRemoveItemTimer = (item) => setTimeout(()=>{
    item.input.remove();
    item.btn.remove();
    
}, 10000);
const cancelTimer = (timer) => clearTimeout(timer);
function createTaskItems(tasks) {
    tasks.forEach((task, index) => {
        let li = createTaskListItem(task.title, index);
        taskList.appendChild(li);
        const taskTodoBtn = document.getElementById(`taskTodoBtn${index}`);
        console.log("fe: ", task);
        taskTodoBtn.addEventListener("click", (e) => {
            const task = document.querySelector(`li#task${e.target.id.replace("taskTodoBtn", "")}`);
            console.log(task,index);
            moveToTodos(task, index);
        })
    });
    
}

function createTodoListItem(task, index, btnAction, forCompleted = false) {
    
    let li = createElement("li", {
        _id: index,
        classes: "row justify-content-between p-0 me-2 my-3 align-items-center border border-2 border-dark"
    });
    const taskNameColumn = createElement("div", { classes: "col-md-6"});
    const taskNameP = createElement("p", {classes: "m-0", text: task});
    taskNameColumn.appendChild(taskNameP);
    const taskActionsColumn = createElement("div", { 
        classes: "col-md-4 d-flex align-items-center justify-content-end m-0 p-0"
    });
    const actionBtn = btnAction("btn border-0 p-0", "Remove from Todo List");
    const completeActionInput =  forCompleted ? 
                                    createCompleteAction(index, true) : 
                                    createCompleteAction(index);
    taskActionsColumn.append(completeActionInput, actionBtn);
    li.append(taskNameColumn, taskActionsColumn);
    return li;
}
function createTaskListItem(taskTitle, index) {
    let li = createElement("li", {
        _id: `task${index}`,
        classes: "row justify-content-between p-0 me-2 my-3 align-items-center border border-2 border-dark"
    });
    const taskNameColumn = createElement("div", { classes: "col-md-6"});
    const taskNameP = createElement("p", {classes: "m-0", text: taskTitle});
    taskNameColumn.appendChild(taskNameP);
    const taskActionsColumn = createElement("div", { 
        classes: "col-md-4 d-flex align-items-center justify-content-end m-0 p-0"
    });
    const actionBtnWrapper = createActionBtn("btn btn-outline-primary", "Move to Todo list", "fa-solid fa-list-check");
    const todoBtn = actionBtnWrapper.querySelector("button");
    todoBtn.id = `taskTodoBtn${index}`;

    taskActionsColumn.append(actionBtnWrapper);
    li.append(taskNameColumn, taskActionsColumn);
    return li;
}

function moveToTodos(taskElement, index) {
    console.log("TASK ELEMENT: ", taskElement);
    // Removes element from DOM
    taskElement.remove();
    // Remove item from the array
    // TBC
    const taskTxt = taskElement.childNodes[0].textContent;
    // Push task to todos array
    console.log("TODOS: ", todos);
    todos.push(taskTxt);
    // Create new completed task id
    // const taskId = `todoTask${todos.at(-1).replace(" ", "")}`;
    const taskId = `todo${todos.indexOf(taskTxt)}`
    
    // Create action undo btn
    const removeBtn = createActionBtn("btn btn-primary", "Remove from todo list", "fa-solid fa-xmark");
    // Create new completed task list item
    const newTask = createTodoListItem(taskTxt, taskId, createActionBtn);
    // const completeActionInput =  createCompleteAction(index);
    // const completeActionInput =  forCompleted ? 
    //                                 createCompleteAction(index, true) : 
    //                                 createCompleteAction(index);
    // newTask.appendChild(completeActionInput, removeBtn);
    todosList.appendChild(newTask);
}

function createElement(
    element,
    options = { _id: "", classes: "", text: "" }
) {
    const el = document.createElement(element);

    for(const property in options) {
        // 
        // 
        switch(property) {
            case "classes":
                el.classList = options[property];
                break;
            case "_id":
                el.id = options[property];
                break;
            case "text":
                el.textContent = options[property];
                break;
            default:
                
                // return "";
        }
    }

    return el;
}

function createActionForm(type, index) {
    const form = createElement("form", { classes: "text-center px-2 py-2"});
    const label = createElement("label", { classes: "visually-hidden", text: type === "checkbox" && "Complete"});
    let input = createElement("input");
    let _id;
    if(type !== "checkbox") {
        let btn = createActionBtn("btn btn-danger", "Delete", "fa-solid fa-trash-can");
        btn.type = "submit";
        form.append(btn);
    } else {
        input.type = "checkbox";
        _id = `${type}${index}`;
        input.id = _id;
        label.setAttribute("for", _id);
        form.append(label, input);
    }
    
    return form;
}

function createActionBtn(elClasses, elTitle, icon="") {
    const btnWrapper = createElement("div", { classes: "px-2 py-2"});
    const btn = createElement("button", {classes: elClasses});
    btn.setAttribute("data-bs-toggle", "tooltip");
    btn.setAttribute("data-bs-title", elTitle);
    btn.setAttribute("type", "button");
    btn.innerHTML = 
    `
    ${icon ? `
    <span aria-hidden="true">
        <i class="${icon}"></i>
    </span>
    `: ""}
    <span class="${icon ? "visually-hidden" : ""}">
        ${elTitle}
    </span>
    `;
    btnWrapper.appendChild(btn);
    return btnWrapper;
}
function moveToCompleted(taskElement) {
    // Removes element from DOM
    taskElement.remove();
    // Remove item from the array
    // TBC
    console.log("MOVE TO COMPLETED IS TRIGGERING")
    const taskTxt = taskElement.childNodes[0].textContent;
    // Push task to completed list
    completedTasks.push(taskTxt);
    // Create new completed task id
    const taskId = `completed${completedTasks.at(-1).replace(" ", "")}`;
    // Create action undo btn
    const undoBtn = createActionBtn("btn btn-primary", "Undo", "Undo");
    // Create new completed task list item
    const newTask = createListItem(taskTxt, taskId, true);
    
    undoBtn.id="undoBtn";
    const timerId = initRemoveItemTimer({ input: newTask.querySelector("input"), btn: undoBtn})
    undoBtn.addEventListener("click", () => {
        cancelTimer(timerId);
        newTask.remove();
        tasks.push(taskTxt);
        todosList.appendChild(taskElement);
        completedTasks.pop();
    })
    newTask.appendChild(undoBtn);
    completedList.appendChild(newTask);

}

todosList.addEventListener("change", (e) => {
    
    const task = document.querySelector(`li#todo${e.target.id.replace("todoInput", "")}`);
    
    const taskTxt = task.childNodes[0].textContent;
    const isConfirmed = confirm(`Are you sure you want to mark task, ${taskTxt}, as complete?`);
    if(isConfirmed) {
        alert(`You've marked task, ${taskTxt}, as complete. You'll have a window of 3 minutes before you're able to undo this action if it was a mistake.`);
        moveToCompleted(task);
    } else {
        e.target.checked = false;
        alert("No changes made.");
    }
});


function createItem(item = { index: 0,title: "", type: "task", actions: [] }) {
    const li = createElement("li", {
        _id: `${itemType}${index}`,
        classes: "row justify-content-between p-0 me-2 my-3 align-items-center border border-2 border-dark"
    });
    const taskNameColumn = createElement("div", { classes: "col-md-6"});
    const taskNameP = createElement("p", {classes: "m-0", text: title});
    taskNameColumn.appendChild(taskNameP);
    const taskActionsColumn = createElement("div", { 
        classes: "col-md-4 d-flex align-items-center justify-content-end m-0 p-0"
    });

    actions.length < 0 && actions.forEach(action => {
        let actionEl = createAction(action);
        taskActionsColumn.appendChild(action);
    })

}

function createAction(type) {
    
    let form = createElement("form", { classes: "text-center px-2 py-2"});
    let label = createElement("label", { classes: "visually-hidden", text: `${type[0].toUpperCase()}${type.slice(1)}`});
    const btn = createElement("button");
    switch(type) {
        case "task":

            break;
        case "todo":
            break;
        case "completed":
            break;
        default:
            console.log("Nothing matched...");
    }
}