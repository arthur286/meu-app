const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const favoriteTasksList = document.getElementById("favorite-tasks-list");
const homeTasksList = document.getElementById("home-tasks-list");
const workTasksList = document.getElementById("work-tasks-list");
const collegeTasksList = document.getElementById("college-tasks-list");
const allTasksBtn = document.getElementById("all-tasks-btn");
const favoriteTasksBtn = document.getElementById("favorite-tasks-btn");
const homeTasksBtn = document.getElementById("home-tasks-btn");
const workTasksBtn = document.getElementById("work-tasks-btn");
const collegeTasksBtn = document.getElementById("college-tasks-btn");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const notification = document.getElementById("notification");
const categorySelect = document.getElementById("category-select");

let tasks = [];
let completedTaskCount = 0; // Contador de tarefas concluídas

addTaskBtn.addEventListener("click", addTask);
allTasksBtn.addEventListener("click", showAllTasks);
favoriteTasksBtn.addEventListener("click", showFavoriteTasks);
homeTasksBtn.addEventListener("click", showHomeTasks);
workTasksBtn.addEventListener("click", showWorkTasks);
collegeTasksBtn.addEventListener("click", showCollegeTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value; // Obter a categoria selecionada
    if (taskText !== "") {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            favorite: false,
            category: category, // Adicionar categoria
            createdAt: Date.now(), // Adicionar data de criação
            completedAt: null, // Adicionar data de conclusão
        };
        tasks.push(newTask);
        taskInput.value = "";
        renderTasks(); //
        renderTasks(); // Renderizar as tarefas após adicionar
        updateProgress();
        checkNotification();
    }
}

function renderTasks() {
    // Limpar todas as listas
    taskList.innerHTML = "";
    favoriteTasksList.innerHTML = "";
    homeTasksList.innerHTML = "";
    workTasksList.innerHTML = "";
    collegeTasksList.innerHTML = "";

    // Renderizar tarefas em "Todas as Tarefas"
    tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card" + (task.completed ? " completed" : "");
        taskCard.innerHTML = `
            <h3>${task.text}</h3>
            <p>Categoria: ${task.category.charAt(0).toUpperCase() + task.category.slice(1)}</p>
            <button class="completeBtn" onclick="toggleComplete(${task.id})">${task.completed ? "Desfazer" : "Completar"}</button>
            <button class="favoriteBtn" onclick="toggleFavorite(${task.id})">${task.favorite ? "Remover Favorito" : "Favoritar"}</button>
            <button class="deleteBtn" onclick="deleteTask(${task.id})">Excluir</button>
        `;
        taskList.appendChild(taskCard);

        // Renderizar na lista de favoritos
        if (task.favorite) {
            const favoriteCard = taskCard.cloneNode(true);
            favoriteTasksList.appendChild(favoriteCard);
        }

        // Renderizar nas listas de categorias
        if (task.category === "lazer") {
            const homeCard = taskCard.cloneNode(true);
            homeTasksList.appendChild(homeCard);
        } else if (task.category === "trabalho") {
            const workCard = taskCard.cloneNode(true);
            workTasksList.appendChild(workCard);
        } else if (task.category === "faculdade") {
            const collegeCard = taskCard.cloneNode(true);
            collegeTasksList.appendChild(collegeCard);
        }
    });
}

function toggleComplete(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    task.completed = !task.completed;
    task.completedAt = task.completed ? Date.now() : null; // Registrar a data de conclusão
    renderTasks();
    updateProgress();
    checkNotification();
}

function toggleFavorite(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    task.favorite = !task.favorite;
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
    updateProgress();
}

function updateProgress() {
    completedTaskCount = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks ? (completedTaskCount / totalTasks) * 100 : 0;
    progressBar.value = progressPercentage;
    progressText.innerText = `${Math.round(progressPercentage)}% Concluído`;
}

function checkNotification() {
    if (completedTaskCount % 3 === 0 && completedTaskCount > 0) {
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 5000); // Oculta a notificação após 5 segundos
    }
}

function showAllTasks() {
    taskList.style.display = "block";
    favoriteTasksList.style.display = "none";
    homeTasksList.style.display = "none";
    workTasksList.style.display = "none";
    collegeTasksList.style.display = "none";
}

function showFavoriteTasks() {
    taskList.style.display = "none";
    favoriteTasksList.style.display = "block";
    homeTasksList.style.display = "none";
    workTasksList.style.display = "none";
    collegeTasksList.style.display = "none";
}

function showHomeTasks() {
    taskList.style.display = "none";
    favoriteTasksList.style.display = "none";
    homeTasksList.style.display = "block";
    workTasksList.style.display = "none";
    collegeTasksList.style.display = "none";
}

function showWorkTasks() {
    taskList.style.display = "none";
    favoriteTasksList.style.display = "none";
    homeTasksList.style.display = "none";
    workTasksList.style.display = "block";
    collegeTasksList.style.display = "none";
}

function showCollegeTasks() {
    taskList.style.display = "none";
    favoriteTasksList.style.display = "none";
    homeTasksList.style.display = "none";
    workTasksList.style.display = "none";
    collegeTasksList.style.display = "block";
}