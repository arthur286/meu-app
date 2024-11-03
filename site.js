const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const voiceBtn = document.getElementById('voiceBtn');

let completedTasks = 0; // Contador de tarefas concluídas

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = document.createElement('div');
        newTask.className = 'task-card';
        newTask.innerHTML = `
            <h3>${taskText}</h3>
            <p>Data: ${new Date().toLocaleDateString()}</p>
            <button class="completeBtn">Concluir</button>
            <button class="favoriteBtn">⭐ Favoritar</button>
        `;
        taskList.appendChild(newTask);
        taskInput.value = ''; // Limpa o campo de entrada

        // Adiciona evento ao botão de concluir
        const completeBtn = newTask.querySelector('.completeBtn');
        completeBtn.addEventListener('click', () => completeTask(newTask));

        // Adiciona evento ao botão de favoritar
        const favoriteBtn = newTask.querySelector('.favoriteBtn');
        favoriteBtn.addEventListener('click', () => toggleFavorite(newTask));
    }
}

// Função para concluir uma tarefa
function completeTask(task) {
    task.classList.add('completed'); // Adiciona a classe para estilizar
    task.querySelector('.completeBtn').disabled = true; // Desabilita o botão
    completedTasks++; // Incrementa o contador de tarefas concluídas

    // Verifica se o número de tarefas concluídas é um múltiplo de 3
    if (completedTasks % 3 === 0) {
        askHealthQuestions();
    }
}

// Função para favoritar/desfavoritar uma tarefa
function toggleFavorite(task) {
    task.classList.toggle('favorite'); // Alterna a classe de favorita
    const favoriteBtn = task.querySelector('.favoriteBtn');

    // Altera o texto do botão de favorito
    if (task.classList.contains('favorite')) {
        favoriteBtn.textContent = '⭐ Favoritado';
    } else {
        favoriteBtn.textContent = '⭐ Favoritar';
    }
}

// Função para fazer as perguntas
function askHealthQuestions() {
    const response1 = prompt("Já bebeu água hoje?");
    const response2 = prompt("Como está a sua saúde mental?");
    const response3 = prompt("Como está se sentindo hoje?");
    
    // Aqui você pode processar as respostas como quiser
    console.log(response1, response2, response3);
}

// Adiciona evento ao botão "Adicionar tarefa"
addTaskBtn.addEventListener('click', addTask);

// Configura o reconhecimento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'pt-BR';

// Inicia o reconhecimento de voz
voiceBtn.addEventListener('click', () => {
    recognition.start();
});

// Lida com o resultado do reconhecimento de voz
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    taskInput.value = transcript; // Coloca o texto reconhecido no campo de entrada
    addTask(); // Adiciona a tarefa automaticamente
};

// Lida com erros
recognition.onerror = (event) => {
    console.error('Erro no reconhecimento de voz: ', event.error);
};
