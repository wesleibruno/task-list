//1 - selecionar o input
//2 - selecionar o botão de adicionar tarefa
//3 - selecionar ul
//4 - capturar evento de click no botão de adicionar tarefas

const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputTarefa.value ) return;
        criaTarefa(inputTarefa.value);
    }
});

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefa();
}

function salvarTarefa() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    // console.log(tarefasJSON);
    localStorage.setItem('tarefas', tarefasJSON);
}

btnTarefa.addEventListener('click', function () {
    if(!inputTarefa.value ) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;
    // console.log(el)

    if(el.classList.contains('apagar')) {
        // console.log('apagar clicado');
        // console.log(el.parentElement)
        el.parentElement.remove();
        salvarTarefa();
    }
})

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }

}
adicionaTarefasSalvas();