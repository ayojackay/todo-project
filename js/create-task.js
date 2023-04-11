// GLOBAL SCOPE
let tasks;
window.onload = () => {
    if(sessionStorage.getItem("tasks")) {
        // sessionStorage.removeItem("tasks");
        // sessionStorage.clear();
        tasks = JSON.parse(sessionStorage.getItem("tasks"));
    } else {
        sessionStorage.setItem("tasks", JSON.stringify([]));
        tasks = JSON.parse(sessionStorage.getItem("tasks"));
    }
    // LOCAL SCOPE
    console.log("Create task javascript file invoked")
    const createTaskForm = document.getElementById("createTaskForm");
    console.log(createTaskForm);
    createTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("FORM SUBMITTED");
        const title = createTaskForm["taskTitle"].value;
        const completedBy = createTaskForm["completedBy"].value;

        // VALIDATION CAN GO HERE?

        const newTask = {
            // title: title,
            title,
            // completedB: completedBy,
            completedBy,
            isCompleted: false
        }
        tasks.push(newTask);
        sessionStorage.setItem("tasks", JSON.stringify(tasks));
        console.log("SESSION STORAGE DATA: ", JSON.parse(sessionStorage.getItem("tasks")));
    });
}


// TODO
// 1. Make session storage data for: tasks, todos, and completed
// 2. When creating new tasks, make sure to add validation
//     a. Make sure that task title DOES NOT begin with a Number
//     b. Make sure that task title and complete by inputs are NOT empty - if so, alert the User
//     c. BONUS
//     - Add validation notifications as elements in the form to warn user if input begins with a number (task title) or if values are empty
//     - If values are empty, disable form button. Form button can remove the disabled attribute IF values are NOT empty.
//     - Refactor functionality for all functions to work better