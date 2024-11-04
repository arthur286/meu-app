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
        renderTasks();
        updateProgress();
    }
}

function renderTasks() {
    taskList.innerHTML = "";
    favoriteTasksList.innerHTML = "";
    homeTasksList.innerHTML = "";
    workTasksList.innerHTML = "";
    collegeTasksList.innerHTML = "";

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card" + (task.completed ? " completed" : "");
        taskCard.innerHTML = `
            <h3>${task.text} (${task.category})</h3>
            <div>
                <button class="completeBtn" onclick="toggleComplete(${task.id})">Completar</button>
                <button class="favoriteBtn" onclick="toggleFavorite(${task.id})">${task.favorite ? 'Remover Favorito' : 'Favoritar'}</button>
                <button class="moveBtn" onclick="moveTask(${task.id})">Mover</button>
                <button class="deleteBtn" onclick="deleteTask(${task.id})">Deletar</button>
            </div>
            ${task.completed ? `<p>Tempo para conclusão: ${calculateTimeElapsed(task.createdAt, task.completedAt)} segundos</p>` : ""}
        `;
        
        // Renderizar nas listas apropriadas
        taskList.appendChild(taskCard); // Adiciona à lista de todas as tarefas

        if (task.favorite) {
            favoriteTasksList.appendChild(taskCard.cloneNode(true)); // Clone para favoritos
        } 
        if (task.category === "lazer") {
            homeTasksList.appendChild(taskCard.cloneNode(true)); // Clone para lazer
        } else if (task.category === "trabalho") {
            workTasksList.appendChild(taskCard.cloneNode(true)); // Clone para Trabalho
        } else if (task.category === "faculdade") {
            collegeTasksList.appendChild(taskCard.cloneNode(true)); // Clone para Faculdade
        }
    });
}

function calculateTimeElapsed(createdAt, completedAt) {
    const elapsedTime = (completedAt - createdAt) / 1000; // Tempo em segundos
    return Math.round(elapsedTime);
}

function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? Date.now() : null; // Atualiza a data de conclusão
        completedTaskCount += task.completed ? 1 : -1; // Atualiza o contador
        renderTasks();
        updateProgress();
        checkRestNotification(); // Verifica se deve mostrar notificação
    }
}

function checkRestNotification() {
    if (completedTaskCount > 0 && completedTaskCount % 3 === 0) {
        showNotification();
    }
}

function showNotification() {
    notification.innerText = "🧘‍♂ Pausa para relaxar! Você já concluiu três tarefas! Que tal dar uma respirada, esticar as pernas, ou tomar um café? Cuidar de você também é produtividade! 🌱";
    notification.classList.remove("hidden");
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000);
}

function toggleFavorite(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.favorite = !task.favorite;
        renderTasks();
    }
}

function moveTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newCategory = prompt("Para qual categoria você deseja mover? (lazer, trabalho, faculdade)");
        if (["lazer", "trabalho", "faculdade"].includes(newCategory)) {
            task.category = newCategory;
            renderTasks();
        } else {
            alert("Categoria inválida! Por favor, escolha entre casa, trabalho ou faculdade.");
        }
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    updateProgress();
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.value = progressPercentage;
    progressText.innerText = `${Math.round(progressPercentage)}% Concluído`;
}
