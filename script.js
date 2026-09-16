// Variable looks through HTML document and finds element with this ID
const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const priorityInput = document.getElementById("priorityInput");

let totalTasks = 0;

function addTask() {
    //console.log(taskInput.value);
    //console.log(priorityInput.value);
    
    let priorityClass = "";

    

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
        console.log(priorityClass);

        taskList.innerHTML += `
        <li>
            ${taskInput.value} - <span class=${priorityClass}>${priorityInput.value}</span>
            <button>Delete</button>
        </li>
        `;
        taskInput.value = "";

        totalTasks++;
        taskCount.textContent = "Total tasks: " + totalTasks;
        priorityInput.value = "Medium";
    }
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
        event.target.parentElement.remove();

        totalTasks--;
        taskCount.textContent = "Total tasks: " + totalTasks;
    }

    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
    }
});