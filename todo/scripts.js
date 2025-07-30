const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");

const createTaskElement = (task) => {
  const li = document.createElement("li");
  console.log(li)
  li.classList.add("task");
  li.dataset.id = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed;

  const span = document.createElement("span");
  span.textContent = task.text;
  span.classList.add("task-text");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn");

  if (task.completed) li.classList.add("completed");

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
};

const handleAddTask = () => {
  const taskText = taskInput.value;
  if (taskText === "") {
    alert("No podés agregar una tarea vacía, maestro.");
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    text: taskText,
    completed: false,
  };

  const taskItem = createTaskElement(newTask);
  taskList.appendChild(taskItem);

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  taskInput.focus();

  filterTasks()
};

const filterTasks = () => {
  const filter = filterSelect.value;
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    const isCompleted = task.classList.contains("completed");

    switch (filter) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        task.style.display = isCompleted ? "flex" : "none";
        break;
      case "pending":
        task.style.display = !isCompleted ? "flex" : "none";
        break;
    }
  });
};

filterSelect.addEventListener("change", filterTasks);
addButton.addEventListener("click", handleAddTask);

taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleAddTask();
  }
});

taskList.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("task-checkbox")) {
    const taskItem = target.closest(".task");
    taskItem.classList.toggle("completed");

    const id = taskItem.dataset.id;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = target.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  if (target.classList.contains("delete-btn")) {
    const taskItem = target.closest(".task");
    console.log(taskItem);
    const id = taskItem.dataset.id;

    taskItem.classList.add("fade-out");
    setTimeout(() => taskItem.remove(), 300);

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskItem = createTaskElement(task);
    taskList.appendChild(taskItem);
  });
});
