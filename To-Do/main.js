var taskInput = document.getElementById("taskInput");
var addButton = document.getElementById("addButton");
var taskTableBody = document.getElementById("task-table-body");
var filterSelect = document.getElementById("filterSelect");
var getTasksFromStorage = function () {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
};
var saveTasksToStorage = function (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
var createTaskRow = function (task) {
    var tr = document.createElement("tr");
    var tdCheckbox = document.createElement("td");
    var tdSpan = document.createElement("td");
    var tdDeleteButton = document.createElement("td");
    var checkbox = document.createElement("input");
    var span = document.createElement("span");
    var deleteButton = document.createElement("button");
    tr.dataset.id = task.id;
    tr.classList.add("task");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");
    tdCheckbox.appendChild(checkbox);
    span.textContent = task.text;
    span.classList.add("task-text");
    tdSpan.appendChild(span);
    deleteButton.textContent = "🗑";
    deleteButton.classList.add("delete-btn");
    tdDeleteButton.appendChild(deleteButton);
    tr.appendChild(tdCheckbox);
    tr.appendChild(tdSpan);
    tr.appendChild(tdDeleteButton);
    return tr;
};
var handleAddTask = function () {
    var taskText = taskInput.value;
    var newTask = {
        id: crypto.randomUUID(),
        text: taskText,
        completed: false
    };
    var tasks = getTasksFromStorage();
    tasks.push(newTask);
    saveTasksToStorage(tasks);
    var taskItem = createTaskRow(newTask);
    taskTableBody === null || taskTableBody === void 0 ? void 0 : taskTableBody.appendChild(taskItem);
    taskInput.value = "";
    taskInput.focus();
};
var renderTasks = function () {
    var tasks = getTasksFromStorage();
    var filter = filterSelect.value;
    taskTableBody.innerHTML = "";
    tasks.forEach(function (task) {
        var shouldShow = filter === "all" ||
            (filter === "completed" && task.completed) ||
            (filter === "pending" && !task.completed);
        if (shouldShow) {
            var taskItem = createTaskRow(task);
            taskTableBody === null || taskTableBody === void 0 ? void 0 : taskTableBody.appendChild(taskItem);
        }
    });
};
taskTableBody.addEventListener("click", function (e) {
    var target = e.target;
    var row = target.closest("tr");
    if (!row)
        return;
    var id = row.dataset.id;
    var tasks = getTasksFromStorage();
    if (target.classList.contains("task-checkbox")) {
        var checkbox = target;
        var task = tasks.find(function (t) { return t.id === id; });
        if (task) {
            task.completed = checkbox.checked;
            saveTasksToStorage(tasks);
            renderTasks();
        }
    }
    if (target.classList.contains("delete-btn")) {
        tasks = tasks.filter(function (t) { return t.id !== id; });
        saveTasksToStorage(tasks);
        renderTasks();
    }
});
taskInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        handleAddTask();
    }
});
filterSelect.addEventListener("change", renderTasks);
addButton.addEventListener("click", handleAddTask);
window.addEventListener("DOMContentLoaded", renderTasks);
