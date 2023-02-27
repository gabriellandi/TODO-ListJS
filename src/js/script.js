//Botoes do Menu
var newTask = {};
var bottomNewTask = document.getElementById('new-task');
var bottonListTask = document.getElementById('list-task');
var areaNewTask = document.getElementById('cadastro-area')
var areaListTask = document.getElementById('listar-area')

bottomNewTask.onclick = function () {
    if(areaNewTask.style.display == 'none'){
        areaNewTask.style.display = 'block'
    } else {
        areaNewTask.style.display = 'none'
    }
    areaListTask.style.display = 'none'
}

bottonListTask.onclick = function () {
    if(areaListTask.style.display == 'none'){
        areaListTask.style.display = 'flex'
    } else {
        areaListTask.style.display = 'none'
    }
    areaNewTask.style.display = 'none'

}

//Adiciona Tarefa

let nomeTask = document.getElementById('nome-task');
let dataTask = document.getElementById('data-termino');
let statusTask = document.getElementById('status');
let categoriaTask = document.getElementById('categoria');
let prioridadeTask = document.getElementById('prioridade');
let descricaoTask = document.getElementById('descricao');

let botaoSalvaTask = document.getElementById('salva-task');


//Evento

botaoSalvaTask.addEventListener("click", (e) => {
    e.preventDefault()

    let dataTermino = new Date(dataTask.value);
    let dia = dataTermino.getDate();
    let mes = dataTermino.getMonth() + 1; // adiciona 1 porque os meses começam em zero
    let ano = dataTermino.getFullYear();
    let dataFormatada = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${ano.toString()}`;


    newTask = {
        "nome": nomeTask.value,
        "data": dataFormatada,
        "dataReal": dataTask.value,
        "status": statusTask.value,
        "categoria": categoriaTask.value,
        "prioridade": prioridadeTask.value,
        "descrição": descricaoTask.value
    }

    saveTask(newTask);

    nomeTask.value = ""
    dataTask.value = ""
    statusTask.value = "1"
    categoriaTask.value = "1"
    prioridadeTask.value = "1"
    descricaoTask.value = ""
});


//Botoes
document.addEventListener("click", (e) => {

    const targetEl = e.target;
    const tarefaEl = targetEl.closest("div")

    if (targetEl.classList.contains("avancar")) { // assumes there is a delete button within the tarefaEl
        avancaTask(tarefaEl);
    }

    if (targetEl.classList.contains("editar")){
        editaTask(tarefaEl);
    }

    if (targetEl.classList.contains("remover")){
        tarefaEl.remove();
    }
})



// Lista as tarefas
const listaTarefasTODO = document.getElementById("tarefas-todo");
const listaTarefasDOING = document.getElementById("tarefas-doing");
const listaTarefasDONE = document.getElementById("tarefas-done");

//Função
const saveTask = (object) => {

    const tarefa = document.createElement("div");
    if(object.prioridade == "Alta"){
        tarefa.classList.add("alta")
    } else if (object.prioridade == "Normal") {
        tarefa.classList.add("normal")
    } else if (object.prioridade == "Baixa") {
        tarefa.classList.add("baixa")
    }

    tarefa.innerHTML = `
        <div class = "titulo-task">${object.nome}</div>
        <p>Data: ${object.data}</p>
        <p style="display: none">Data: ${object.dataReal}</p>
        <p>Descrição: ${object.descrição}</p>
      `;

    const infoTarefa = document.createElement("ul");

    infoTarefa.innerHTML = `
        <li>Categoria: ${object.categoria}</li>
        <li>Prioridade: ${object.prioridade}</li>
      `;

    tarefa.appendChild(infoTarefa);

    const avancaBtn = document.createElement("button");
    avancaBtn.classList.add("botao");
    avancaBtn.classList.add("avancar");
    avancaBtn.innerHTML = 'Avançar';
    tarefa.appendChild(avancaBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("botao");
    editBtn.classList.add("editar");
    editBtn.innerHTML = 'Editar';
    tarefa.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("botao");
    deleteBtn.classList.add("remover");
    deleteBtn.innerHTML = 'Remover';

    tarefa.appendChild(deleteBtn);



    // Adiciona o elemento de lista de tarefas ao elemento da lista de tarefas na página HTML
    if(object.status == "TODO"){
        tarefa.classList.add("todo")
        listaTarefasTODO.appendChild(tarefa);
    } else if (object.status == "DOING"){
        tarefa.classList.add("doing")
        listaTarefasDOING.appendChild(tarefa)
    } else if (object.status == "DONE") {
        tarefa.classList.add("done")
        listaTarefasDONE.appendChild(tarefa)
    }
}

const avancaTask = (object) => {
    const tarefa = object.cloneNode(true);


    if(tarefa.classList.contains("todo")){
        tarefa.classList.remove("todo")
        tarefa.classList.add("doing")
        listaTarefasDOING.appendChild(tarefa);
    } else if (tarefa.classList.contains("doing")){
        tarefa.classList.remove("doing")
        tarefa.classList.add("done")
        listaTarefasDONE.appendChild(tarefa)
    } else if (tarefa.classList.contains("done")) {
        let confirma = window.confirm("Deseja apagar a tarefa?")
        if(confirma == true){
            tarefa.remove()
        } else {
            listaTarefasDONE.appendChild(tarefa)
        }
    }

    object.remove();
};


const editaTask = (object) => {
    const tarefa = object.cloneNode(true);
    console.log(tarefa)

    nomeTask.value = tarefa.querySelector('.titulo-task').textContent;
    dataTask.value = tarefa.querySelector('p:nth-of-type(2)').textContent.replace('Data: ', '');
    categoriaTask.value = tarefa.querySelector('li:nth-of-type(1)').textContent.replace('Categoria: ', '');
    prioridadeTask.value = tarefa.querySelector('li:nth-of-type(2)').textContent.replace('Prioridade: ', '');
    descricaoTask.value = tarefa.querySelector('p:nth-of-type(2)').textContent.replace('Descrição: ', '');

    object.remove();
    tarefa.remove();
    areaNewTask.style.display = 'flex'
}
