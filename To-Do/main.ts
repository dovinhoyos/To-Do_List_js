const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const taskTableBody = document.getElementById(
  "task-table-body"
) as HTMLTableSectionElement;
const filterSelect = document.getElementById(
  "filterSelect"
) as HTMLSelectElement;

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const getTasksFromStorage = (): Task[] => {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
};

const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTaskRow = (task: Task): HTMLTableRowElement => {
  const tr = document.createElement("tr") as HTMLTableRowElement;
  const tdCheckbox = document.createElement("td") as HTMLTableCellElement;
  const tdSpan = document.createElement("td") as HTMLTableCellElement;
  const tdDeleteButton = document.createElement("td") as HTMLTableCellElement;
  const checkbox = document.createElement("input") as HTMLInputElement;
  const span = document.createElement("span") as HTMLSpanElement;
  const deleteButton = document.createElement("button") as HTMLButtonElement;

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

const handleAddTask = () => {
  const taskText = taskInput.value;

  const newTask: Task = {
    id: crypto.randomUUID(),
    text: taskText,
    completed: false,
  };

  const tasks = getTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);

  const taskItem = createTaskRow(newTask);
  taskTableBody?.appendChild(taskItem);

  taskInput.value = "";
  taskInput.focus();
};

const renderTasks = () => {
  const tasks = getTasksFromStorage();
  const filter = filterSelect.value;

  taskTableBody.innerHTML = "";

  tasks.forEach((task) => {
    const shouldShow =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    if (shouldShow) {
      const taskItem = createTaskRow(task);
      taskTableBody?.appendChild(taskItem);
    }
  });
};

taskTableBody.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  const row = target.closest("tr") as HTMLTableRowElement | null;
  if (!row) return;

  const id = row.dataset.id;

  let tasks = getTasksFromStorage();

  if (target.classList.contains("task-checkbox")) {
    const checkbox = target as HTMLInputElement;
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = checkbox.checked;
      saveTasksToStorage(tasks);
      renderTasks();
    }
  }

  if (target.classList.contains("delete-btn")) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasksToStorage(tasks);
    renderTasks();
  }
});

taskInput.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    handleAddTask();
  }
});

filterSelect.addEventListener("change", renderTasks);
addButton.addEventListener("click", handleAddTask);
window.addEventListener("DOMContentLoaded", renderTasks);
