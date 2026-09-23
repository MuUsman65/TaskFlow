// Variable looks through HTML document and finds element with this ID
const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const priorityInput = document.getElementById("priorityInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

// for (let i = 0; i < tasks.length; i++) {
//     displayTask(tasks[i], i);
// }

let totalTasks = 0;
taskCount.textContent = "Total tasks: " + tasks.length;

function addTask() {
    //console.log(taskInput.value);
    //console.log(priorityInput.value);
    
    let priorityClass = "";

    const newTask = {
        "text" : taskInput.value,
        "priority" : priorityInput.value,
        "completed" : false
    }

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (taskInput.value !== "") {
        if (priorityInput.value === "High") {
            priorityClass = "high";
        }
        if (priorityInput.value === "Medium") {
            priorityClass = "medium";
        }
        if (priorityInput.value === "Low") {
            priorityClass = "low";
        }
        //console.log(priorityClass);

        
        taskInput.value = "";

        //totalTasks++;
        taskCount.textContent = "Total tasks: " + tasks.length;
        priorityInput.value = "Medium";
    }

    displayTask(newTask);
}

function displayTask(task, index) {
    taskList.innerHTML += `
    <li>
        ${task.text} - <span class=${task.priority.toLowerCase()}>${task.priority}</span>
        <button data-index="${index}">Delete</button>
    </li>
    `;
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener("click", function(event) {
    //console.log(event.target.textContent);
    if (event.target.textContent === "Delete") {
        //event.target.parentElement.remove();
        //console.log(event.target.dataset.index)
        

        //totalTasks--;
        tasks.splice(event.target.dataset.index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        taskCount.textContent = "Total tasks: " + tasks.length;
    }

    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
    }
});

function renderTasks() {
    console.log("renderTasks started");
    console.log(tasks);

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        displayTask(tasks[i], i);
        console.log("Displaying task:", tasks[i]);
    }
}

renderTasks();