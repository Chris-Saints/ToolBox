const receberItem = document.getElementById("receber-item") as HTMLInputElement; // Recebe o input do Html

const botao = document.getElementById("botao") as HTMLButtonElement; //Recebe o botao do Html

const listaTarefaConcluida = document.getElementById("tarefas-concluidas") as HTMLUListElement;

const listaDeTarefa = document.getElementById("adicionar-tarefa") as HTMLUListElement; //recebe o elemento ul do html onde ficara a lista de tarefas




//Funcao Para Local Storage

type Tarefa = {
    texto: string;
    completed: boolean;
} //Tipo criado para salvar as informaçoes no localStorage (Assim que a informação vai estar)



function salvarTarefas(): void {
    const tarefas: Tarefa[] = []; //criou o array onde vao ficar

    //acessa TODAS as tarefas na lista Pendente. Depois passa por cada elemento span e se ele existir será salvo na array tarefas dessa forma
    listaDeTarefa.querySelectorAll("li").forEach(li => {
        const span = li.querySelector("span");
        if(span) {
            tarefas.push({texto: span.textContent || "", completed: false});
        }
    });

    //A mesma coisa aqui, mas na lista de tarefas concluidas
    listaTarefaConcluida.querySelectorAll("li").forEach(li => {
        const span = li.querySelector("span");
        if(span) {
            tarefas.push({texto: span.textContent || "", completed: true})
        }
    });

    localStorage.setItem("todo-tasks", JSON.stringify(tarefas)); //Salva a array tarefas transformando elas em strings.

};

//Recupera as informacoes armazenadas no local storage
function recuperarTarefas(): void {
    const arquivos = localStorage.getItem("todo-tasks"); // arquivos recebe todas as informacoes arquivadas
    if (!arquivos) return; //se nao houver nenhuma informacao no localstorage nada acontece

    const tarefas: Tarefa[] = JSON.parse(arquivos); //Cria uma const array onde recebe todas as informacoes salvas no arquvios e transforma de string para seus valores reais anteriores

    tarefas.forEach(tarefa => criarTarefa(tarefa.texto, tarefa.completed)); //Passa por cada arquivo usando a função de criar a tarefa fazendo com que eles apareçam novamente em Tela
}





//Função que cria a tarefa
function criarTarefa(tarefa: string, completed = false): void {

    const li = document.createElement("li"); //Cria um elemento li dentro do ul no html


    const checkbox = document.createElement("input"); //cria um elemento input
    checkbox.type = "checkbox"; //acrescenta o tipo checkbox
    checkbox.checked = completed; // recebe o argumento completed da função inicialmente como false e futuramente esse falor ira para a const checkado. (logo abaixo)



    const spanTexto = document.createElement("span"); //cria um elemento span que vai adquirir o texto do input
    spanTexto.textContent = tarefa //adquirindo o texto do input

    const editar = document.createElement("button");
    editar.innerHTML = '<img src="../Assets/edit_icon.svg" alt="Editar">';//criei a variavel que vai guardar o botao editar e coloquei o texto nele.
    editar.setAttribute("data-tooltip", "Editar");

    //Botao de Editar/Salvar
    editar.addEventListener("click", () => {

        const previousInput = document.querySelector("li input[type='text']") as HTMLInputElement; //Procura se existe alguma tarefa com input de texto ativo
        const previousEditar = document.querySelector("li button.editing") as HTMLButtonElement; //Procura o botao que esta com a classe editar, ou seja aquele que esta com a palavra Salvar

        if (previousInput && previousEditar && previousEditar !== editar) {
            // se existe um input e se existe um botao editar e se esse botao editar nso for o que acabou de clicar acontecesse isso ->
            const previousSpan = document.createElement("span"); //Cria um elemento de texto
            previousSpan.textContent = previousInput.value.trim() || "Tarefa sem texto"; //adiciona no texto da span o valor presente no input ou se nao tiver nada acrescenta o texto padrao

            const liPai = previousInput.closest("li"); // Busca o elemento li pai mais proximo do input
            if(liPai && liPai.contains(previousInput)) {
                liPai.replaceChild(previousSpan, previousInput);
            } //Troca o novo elemento pelo span com segurança
            previousEditar.innerHTML = '<img src="../Assets/edit_icon.svg" alt="Editar">';
            previousEditar.setAttribute("data-tooltip", "Editar");
            previousEditar.classList.remove("editing"); //Remove Classe editing
        }


        if(editar.innerHTML === '<img src="../Assets/edit_icon.svg" alt="Editar">') {
            //Verifica se o Botao esta como editar

            const spanAtual = li.querySelector("span"); 
            //Ele busca o span atual para que o span editado nao se perca e de erro, fazendo vc editar mais de 1 vez
            
            if(spanAtual) {
                const input = document.createElement("input"); //Cria um novo elemento input e salva na variavel
                input.type = 'text'; //adiciona o tipo texto no input
                input.value = spanAtual.textContent || ""; //Coloca o valor do spanTexto no input
                li.replaceChild(input, spanAtual); //Substitui o texto anterior pelo input
                editar.innerHTML = '<img src="../Assets/save_icon.svg" alt="salvar">'; //Muda o Botao para Salvar
                editar.classList.add("editing"); //Adiciona classe editing
                editar.setAttribute("data-tooltip", "Salvar");

                let jaSalvou = false; //Variavel para evitar q o evento blur aconteça junto com o enter

                //Salva quando clica em enter
                input.addEventListener("keydown", (e) => {
                    if(e.key === "Enter" && !jaSalvou) {
                        jaSalvou = true;
                        salvarEdicao();
                    }
                });

                
                //Salva quando o input nao é mais o foco (clicar fora)
                input.addEventListener("blur", () => {
                    if(!jaSalvou) {
                        jaSalvou = true;
                        salvarEdicao();
                    }
                });

                function salvarEdicao() {
                    //Função usada para reaproveitar o Salvamenteo de varias formas
                    const texto = input.value.trim(); //Recupera o Texto presente no input
                    if (texto !== "") {
                        //Previne que o input nao esteja vazio
                        const novoSpan = document.createElement("span"); //Cria um novo span
                        novoSpan.textContent = texto; //O novo span recebe o valor presente no texto

                        if (li.contains(input)) {
                            li.replaceChild(novoSpan, input); // Troca o input pelo novo span
                            editar.innerHTML = '<img src="../Assets/edit_icon.svg" alt="Editar">'; //Troca o texto do botao para editar
                            editar.setAttribute("data-tooltip", "Editar");
                            editar.classList.remove("editing"); //Remove a classe editar
                            salvarTarefas();
                        }
                    }
                    setTimeout(() => {
                        jaSalvou = false; //Reseta para futuras edicoes
                    }, 0);
                }
            }

        } else {
            const input = li.querySelector("input[type= 'text']") as HTMLInputElement; //Pega o campo que esta sendo input dentro de um li
            if (input && input.value.trim() !== "") {
                //Garante que o input existe e que seu conteudo nao esta vazio
                spanTexto.textContent = input.value.trim(); //O texto recebe o valor novo do input
                li.replaceChild(spanTexto, input); //Troca o input pelo texto
                editar.innerHTML = '<img src="../Assets/edit_icon.svg" alt="Editar">';//Muda o Botao para Editar
                editar.classList.remove("editing")
                salvarTarefas(); //Salva a modificação no Local Storage
            }
        }
    })



    const botaoRemover = document.createElement("button"); // Cria um botao para remover a lista
    botaoRemover.innerHTML = '<img src="../Assets/delete_icon.svg" alt="Excluir">'; //Texto do Botao
    botaoRemover.setAttribute("data-tooltip", "Excluir")
    botaoRemover.addEventListener("click", (e) => {
        e.stopPropagation(); // nao deixa que o evento click se propague alem do objetivo de excluir a tarefa.
        li.remove(); //remover a li de qualquer lista
        salvarTarefas(); //salvar a tarefa no localStorage
    });

    checkbox.addEventListener("change", () => {
        //adicionando um evento no checkbox para mudar a classe css para o texto ficar riscado
        const checkado = checkbox.checked; //a variavel checkado recebe o valor boolean da checkbox (para facilitar a escrita e a leitura do codigo)
        li.classList.toggle("completed", checkado); //Adiciona a classe completed se checkado for true e remova se for false

        if (checkado) {
            listaTarefaConcluida.appendChild(li);
            editar.remove();//remove o botao editar
        } else {
            listaDeTarefa.appendChild(li);
            if (!li.contains(editar)) {
                //verifica se nao existe um botao editar
                li.insertBefore(editar, botaoRemover); //insere o botao editar antes do Remover
            }
        } //Aqui um item será movido de uma lista a outra dependendo do valor boolean do checkado

        salvarTarefas(); //salvar a tarefa no localStorage
    });


    li.appendChild(checkbox);
    li.appendChild(spanTexto);
    li.appendChild(editar);
    li.appendChild(botaoRemover);
    //adicionando em ordem especifica os itens presentes para a lista

    if(completed) {
        li.classList.add("completed"); //para assegurar que uma tarefa apareça na parte concluida ou nao.
        listaTarefaConcluida.appendChild(li); //Se completed for true a tarefa aparecerá diretamente na lista de tarefas concluidas
    } else {
        listaDeTarefa.appendChild(li); // se nao aparecera na lista de taefas pendentes
    }
}

//adiciona um evento na const botao ao clica-lo
botao.addEventListener("click", () => {
    const tarefa = receberItem.value.trim(); // pega o texto digitado no input e o trim() remove espaços em branco do inicio ao fim

    if(tarefa !== "") {
        //Verifica se o texto não esta vazio
        criarTarefa(tarefa); //Ativa a funcao criar tarefa e utiliza o texto adquirido na const tarefa e o usa como argumento para função
        receberItem.value = ""; //Limpa o campo do input
        salvarTarefas(); //salvar a tarefa no localStorage
    }
})

recuperarTarefas();
