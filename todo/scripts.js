const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");

const getTasksFromStorage = () => {
  return JSON.parse(localStorage.getItem("tasks")) || []
}

const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

const createTaskElement = (task) => {
  const li = document.createElement("li");
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

  if (task.completed){
    li.classList.add("completed")
  };

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

  const tasks = getTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);

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
    console.log(taskItem)
    taskItem.classList.toggle("completed");

    const id = taskItem.dataset.id;
    const tasks = getTasksFromStorage();

    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = target.checked;
      saveTasksToStorage(tasks);
    }
  }

  if (target.classList.contains("delete-btn")) {
    const taskItem = target.closest(".task");
    const id = taskItem.dataset.id;

    taskItem.classList.add("fade-out");
    setTimeout(() => taskItem.remove(), 300);

    const tasks = getTasksFromStorage();
    const updated = tasks.filter((t) => t.id !== id);
    saveTasksToStorage(updated);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => {
    const taskItem = createTaskElement(task);
    taskList.appendChild(taskItem);
  });
});


// const tablabody = document.querySelector("#tablabody")

// const tareas = [
//   {nombre: "Carlos", edad: 23},
//   {nombre: "Juan", edad: 23},
//   {nombre: "Camilo", edad: 23},
//   {nombre: "Pepe", edad: 23},
//   {nombre: "Ruben", edad: 23}
// ]

// tareas.forEach((t) => {
//   const tr = document.createElement("tr")
//   tr.classList.add("pendiente")

//   tr.innerHTML = `<td >${t.nombre}</td> <td>${t.edad}</td>`

//   tablabody.appendChild(tr)
// })

// const nuevaTarea = {
//   nombre: "Santiago",
//   edad: "34"
// }

// const nuevasTareas = [...tareas, nuevaTarea]

// console.log(nuevasTareas)
// console.log(tareas)

// const localTareas = getTasksFromStorage()
// localTareas.push(nuevaTarea)
// saveTasksToStorage(localTareas)

// tr.classList.contains("pendiente")



