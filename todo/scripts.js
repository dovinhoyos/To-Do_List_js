const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect")

const createTaskElement = (text) => {
  const li = document.createElement("li");
  li.classList.add("task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("task-text");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
};

const handleAddTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("No podés agregar una tarea vacía, maestro.");
    return;
  }

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  taskInput.value = "";
  taskInput.focus();
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
}

filterSelect.addEventListener("change", filterTasks)
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
  }

  if (target.classList.contains("delete-btn")) {
    const taskItem = target.closest(".task");
    taskItem.classList.add("fade-out");
    taskItem.remove();
  }
});
