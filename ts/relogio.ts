const relogio = document.getElementById("relogio") as HTMLElement;
const diaMes = document.getElementById("dia-mes") as HTMLElement;
const botaoAmPm = document.getElementById("am-pm") as HTMLButtonElement;
//Variaveis que recuperam o elemento html
const diasDaSemana = ['Domingo','Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
//As duas variaveis servem de apoio para converter o numero que vem o Date em Nome dos dias e meses
let formatoAmPm = false; //Serve para a troca da versao de 24h para AM/PM e vice e versa

tempoRolar();

//funcao que recupera as informações de data, dia, mes, entre outros
function atualizarRelogio() {
    const agora = new Date(); //cria uma const com o tipo Date
    const horas = agora.getHours(); //recupera a Hora atual, mas nao a torna string, pq sera modificada futuramente
    const minutos = agora.getMinutes().toString().padStart(2, "0"); //Recupera os minutos atuais e acrescentam um 0 na frente, mas limitando a 2 numeros
    const segundos = agora.getSeconds().toString().padStart(2, "0"); //Recupera os segundos atuais e acrescentam um 0 na frente, mas limitando a 2 numeros
    
    const diaDaSemana = agora.getDay(); //Recupera o dia da semana extenso Atual
    const diaDoMes = agora.getDate(); //Recupera o dia do mes numero Atual
    const mes = agora.getMonth(); //Recupera o mes Atual
    const ano = agora.getFullYear(); //Recupera o Ano Atual

    diaMes.textContent = `${diasDaSemana[diaDaSemana]}, ${diaDoMes} de ${meses[mes]} de ${ano}`; //Modifica o texto para sempre mostrar o dia, mes e ano atual

    if(!formatoAmPm){
        //Caso nao seja formato AM/PM ele mostra normalmente
        const hora24 = horas.toString().padStart(2, "0"); //Agora transforma ela em string e acrescenta um 0 quando necessitado
        relogio.textContent = `${hora24}:${minutos}:${segundos}`; // Coloca o texto no lugar
    
    } else {
        //Agora se formatoampm estiver true
        const hora12Num = horas % 12 || 12; //Divide as horas por 12 para que ela sempre mostre de 1 a 12
        const hora12 = hora12Num.toString().padStart(2, "0"); //transforma ela em string e acrescenta um 0 se preciso
        const periodo = horas >= 12 ? "PM" : "AM"; //dependendo da hora modifica para am e pm
        relogio.textContent = `${hora12}:${minutos}:${segundos} ${periodo}`; //coloca o texto no lugar
    }
}

//Funcao que ativa a outra função a cada segundo, sempre atualizando o horario com set Interval
function tempoRolar() {
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
}


//Botao que muda o relogio de AM/PM para 24h e vice e versa
botaoAmPm.addEventListener("click", () => {
    formatoAmPm = !formatoAmPm; //da o valor true ou false para o formatoampm
    if(formatoAmPm) {
        botaoAmPm.textContent = "Alternar para 24h"; //Muda o texto do botao de acordo com o modo do relogio
    }
    if(!formatoAmPm) {
        botaoAmPm.textContent = "Alternar para AM/PM"//Muda o texto do botao de acordo com o modo do relogio
    }
    //ativa as funções para se adequarem ao novo formato
    atualizarRelogio(); 
    atualizarListaAlarmes();
})


//ALARME

//Acessando elementos Html
const espacoConteudo = document.getElementById("espaco-conteudo") as HTMLElement;
const btnAlarme = document.getElementById("btn-alarme") as HTMLButtonElement;
const btnCronometro = document.getElementById("btn-cronometro") as HTMLButtonElement;
const btnTemporizador = document.getElementById("btn-temporizador") as HTMLButtonElement;
const alarmesDefinidos = document.getElementById("alarmes-definidos");


const somAlarme = new Audio("../assets/alarm.mp3"); //Acessando o som 

let intervaloTemporizadorId: ReturnType<typeof setInterval> | null = null; //intervalo pro temporizador deve ser null tbm para que ele possa para 
let tempoRestante = 0 //tempo para contagem regressiva do temporizador
let intervaloId: ReturnType<typeof setInterval> | null = null; //intervalo pro cronometro deve ser null tbm para que ele possa para 
let tempoDecorrido = 0; //tempo para contagem progressiva do cronometro
let alarmesAdicionados: string[] = []; //Array onde ficaram os alarmes salvos

recuperarAlarme();
atualizarListaAlarmes();


btnAlarme.addEventListener("click", () => {
    //quando o botao do alarme é clicado abre um novo espaco com conteudos
    espacoConteudo.innerHTML = `
    <h2>Adicionar Alarme:</h2>
    <div>
        <input type="time">
        <button id="btn-salvar-alarme">Salvar Alarme</button>
    </div>
    `

    const btnSalvarAlarme = document.getElementById("btn-salvar-alarme") as HTMLButtonElement;
    const valorInput = document.querySelector('input') as HTMLInputElement;
    //acessa elementos html

    btnSalvarAlarme.addEventListener("click", () => {
        //evento de click para o botao salvar alarme
        const alarme = valorInput.value; //acessa o valor posto no input
        if(alarme) {
            //se houver algo no input ele coloca na array e atualiza a lisata para mostrar la, salva no local storage e limpa o campo do input
            alarmesAdicionados.push(alarme);
            atualizarListaAlarmes();
            armazenarAlarme();
            valorInput.value = '';
        }
    })

})


function atualizarListaAlarmes() {
    //função para mostrar um alarme novo
    if(!alarmesDefinidos) return; //se nao tiver alarme volta

    alarmesDefinidos.innerHTML = ""; //limpa alarmes definidos

    const titulo = document.createElement("p"); //Cria um elemento p
    titulo.textContent = "Alarmes:"; //Acrescenta o titulo de alarme
    alarmesDefinidos.appendChild(titulo); //E coloca ele no alarme definido

    if(alarmesAdicionados.length === 0) {
        //Se a array nao tiver nada Acrescenta uma frase que diz que n tem nada e retorna
        const aviso = document.createElement("p");
        aviso.textContent = "Não há alarmes definidos.";
        alarmesDefinidos.appendChild(aviso);
        return;
    }

    alarmesAdicionados.forEach((alarme, index) => {
        //Cria uma div para cada alarme feito com o horario e o botao de excluir
        const divAlarme = document.createElement("div");
        divAlarme.textContent = formatarHorario(alarme);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", () => {
            //Cria um evento de excluir o alarme ao clicar naquela botao
            alarmesAdicionados.splice(index, 1);
            atualizarListaAlarmes();
            armazenarAlarme();
        });

        divAlarme.appendChild(btnExcluir);
        alarmesDefinidos.appendChild(divAlarme);
        //Colocam no html
    });
}

setInterval(() => {
    //Aqui voce esta mandando ele a cada 1 segundo conferir se o horario do relogio bate com cada alarme salvo e se bater ele toca um som
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, "0");
    const minutos = agora.getMinutes().toString().padStart(2, "0");
    const horarioAtual = formatarHorario(`${horas}:${minutos}`);
    
    alarmesAdicionados.forEach(alarme => {
        const alarmeFormatado = formatarHorario(alarme);
        if (alarmeFormatado === horarioAtual) {
            somAlarme.play();
            setTimeout(() => {
                somAlarme.pause();
                somAlarme.currentTime = 0;
            }, 10000);
        }
    })
}, 1000);

function formatarHorario(horario24: string): string {
    //Cria uma funcao que recebe uma string e retorna uma string
    if(!formatoAmPm) return horario24;
    //Verifica se nao estamos no modo AM/PM. se nao estiver retorna o horario normalmente

    const [h, m] = horario24.split(":"); //Usa split para separar a string em duas ex. 13:40 vira h = 13 e m = 40
     const dataFake = new Date(); //Cria uma nova data do horario atual é usado apenas para formatar o horario corretamente
     dataFake.setHours(Number(h), Number(m)); //Define a hora e minuto da dataFake usando os valores estraidos transformando string em number
     return dataFake.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit", //força a exibicao de 2 digitos
        hour12: true, // força o formato am/pm
     });// retorna uma string formada com metodo toLocaleTimeString
}


function armazenarAlarme() {
    localStorage.setItem("alarmes", JSON.stringify(alarmesAdicionados));
}

function recuperarAlarme() {
    const alarmeBruto = localStorage.getItem("alarmes");
    if(alarmeBruto) {
        alarmesAdicionados = JSON.parse(alarmeBruto);
        atualizarListaAlarmes();
    }
}


//CRONOMETRO


btnCronometro.addEventListener("click", () => {
    //Adiciona elementos hmtl no hmtl
    espacoConteudo.innerHTML = `
    <div>
        <p id="display"></p>
    </div>
    <div>
        <button id="btn-iniciar">Iniciar</button>
        <button id="btn-pausar">Pausar</button>
        <button id="btn-resetar">Resetar</button>
    </div>
    `

    const display = document.getElementById("display") as HTMLElement
    const btnIniciar = document.getElementById("btn-iniciar") as HTMLButtonElement;
    const btnPausar = document.getElementById("btn-pausar") as HTMLButtonElement;
    const btnResetar = document.getElementById("btn-resetar") as HTMLButtonElement;
    //Acessa os elementos html
    btnPausar.classList.add("esconder-botao");
    btnResetar.classList.add("esconder-botao");

    display.innerHTML = formatarTempo(tempoDecorrido); //coloca conteudo no hmtl

    btnIniciar.addEventListener("click", iniciarCronometro); //evento de click
    btnPausar.addEventListener("click", pausarCronometro); //evento de click
    btnResetar.addEventListener("click", () => {
        //Evento de click para resetar, pausa, zera e atualiza o texto
        btnIniciar.classList.remove("esconder-botao");
        btnPausar.classList.add("esconder-botao");
        btnResetar.classList.add("esconder-botao");
        pausarCronometro();
        tempoDecorrido = 0;
        display.innerHTML = formatarTempo(tempoDecorrido);
    })

    function iniciarCronometro() {
        if (intervaloId === null) {
            //se intervalo estiver null ele aciona, se estiver ja correndo com algum valor nao aciona, impede clicar varias vezes e comecar um set Interval varias vezes
            btnIniciar.classList.add("esconder-botao");
            btnPausar.classList.remove("esconder-botao");
            btnResetar.classList.remove("esconder-botao");
            intervaloId = setInterval(() => {
                tempoDecorrido += 1;
                display.innerHTML = formatarTempo(tempoDecorrido);
                //A cada segundo atualiza o texto com mais 1

            }, 1000);
        }
    }

    function pausarCronometro() {
        if (intervaloId !== null) {
            //causa o setInterval iniciado
            btnIniciar.classList.remove("esconder-botao");
            btnPausar.classList.add("esconder-botao");
            clearInterval(intervaloId);
            intervaloId = null;
        }
    }

    function formatarTempo(segundosTotais: number): string {
        //converte o tempo decorrido em formato de horas
        const horas = Math.floor(segundosTotais / 3600);
        const minutos = Math.floor((segundosTotais % 3600)/ 60);
        const segundos = segundosTotais % 60;

        const h = String(horas).padStart(2, "0");
        const m = String(minutos).padStart(2, "0");
        const s = String(segundos).padStart(2, "0");
        return `${h}:${m}:${s}`
    }
})


//TEMPORIZADOR


btnTemporizador.addEventListener("click", () => {
    espacoConteudo.innerHTML = `
    <div id="espaco-display"></div>
    <section class="container__temporizador">
        <div class="grupo-input-tempo">
            <input type="number" id="input-horas" placeholder="hh" min="0">
            <span>:</span>
            <input type="number" id="input-minutos" placeholder="mm" min="0" max="59">
            <span>:</span>
            <input type="number" id="input-segundos" placeholder="ss" min="0" max="59">
        </div>
        <div>
            <button id="btn-iniciar">Iniciar</button>
            <button id="btn-pausar">Pausar</button>
            <button id="btn-resetar">Resetar</button>
        </div>
    </section>
    <div>
        <button id="btn-hora">1:00:00</button>
        <button id="btn-meia-hora">30:00</button>
        <button id="btn-dez-min">10:00</button>
    </div>
    `
    //Acrecenta elementos hmtl no codigo

    const espacoDisplay = document.getElementById("espaco-display") as HTMLElement;
    const btnIniciar = document.getElementById("btn-iniciar") as HTMLButtonElement;
    const btnPausar = document.getElementById("btn-pausar") as HTMLButtonElement;
    const btnResetar = document.getElementById("btn-resetar") as HTMLButtonElement;
    const btnDezMin = document.getElementById("btn-dez-min") as HTMLButtonElement;
    const btnUmaHora = document.getElementById("btn-hora") as HTMLButtonElement;
    const btnMeiaHora = document.getElementById("btn-meia-hora") as HTMLButtonElement;
    const inputHoras = document.getElementById("input-horas") as HTMLInputElement;
    const inputMinutos = document.getElementById("input-minutos") as HTMLInputElement;
    const inputSegundos = document.getElementById("input-segundos") as HTMLInputElement;
    //Acessa elementos html

    btnPausar.classList.add("esconder-botao");
    btnResetar.classList.add("esconder-botao");


    btnIniciar.addEventListener("click", iniciarTemporizador); //evento de click
    btnPausar.addEventListener("click", pausarTemporizador); // evento de click
    btnResetar.addEventListener("click", () => {
        pausarTemporizador();
        tempoRestante = 0;
        espacoDisplay.innerHTML = atualizarDisplayTemporizador(tempoRestante);
        btnIniciar.classList.remove("esconder-botao");
        btnPausar.classList.add("esconder-botao");
        btnResetar.classList.add("esconder-botao");
    }); //FAz a mesma coisa q o do cronometro

    btnUmaHora.addEventListener("click", () => {
        tempoRestante = converterStringTempo("1:00:00");
        espacoDisplay.innerHTML = atualizarDisplayTemporizador(tempoRestante);
    }); //evento de click para colocar um tempo pre disposto 

    btnMeiaHora.addEventListener("click", () => {
        tempoRestante = converterStringTempo("30:00");
        espacoDisplay.innerHTML = atualizarDisplayTemporizador(tempoRestante);
    });//evento de click para colocar um tempo pre disposto

    btnDezMin.addEventListener("click", () => {
        tempoRestante = converterStringTempo("10:00"); //Converte a string em number e faz o tempo restante receber esse valor
        espacoDisplay.innerHTML = atualizarDisplayTemporizador(tempoRestante); //atualiza o display com o novo valor do tempo restante
    });//evento de click para colocar um tempo pre disposto


    function iniciarTemporizador() {
        if (tempoRestante === 0) {
            //converte os numeros e para formato de relogio
            const horas = parseInt(inputHoras.value) || 0;
            const minutos = parseInt(inputMinutos.value) || 0;
            const segundos = parseInt(inputSegundos.value) || 0;

            tempoRestante = (horas * 3600) + (minutos * 60) + segundos;

            espacoDisplay.innerHTML = atualizarDisplayTemporizador(tempoRestante); //ataualiza o texto do display

            inputHoras.value = ''; //Limpa os inputs
            inputMinutos.value = '';//Limpa os inputs
            inputSegundos.value = '';//Limpa os inputs
            btnIniciar.classList.add("esconder-botao");
        }

        if (intervaloTemporizadorId === null && tempoRestante > 0) {
            //aqui é para quando o tempos estiver correndo e voce pausar, é uma condicao para continuar o tempo pausado
            btnIniciar.classList.add("esconder-botao");
            btnPausar.classList.remove("esconder-botao");
            btnResetar.classList.remove("esconder-botao");

            intervaloTemporizadorId = setInterval(() => {
                tempoRestante -= 1; //diminui o numero
                espacoDisplay.innerHTML = atualizarDisplayTemporizador(tempoRestante); //atualiza o texto do display

                if(tempoRestante <= 0) {
                    clearInterval(intervaloTemporizadorId!);
                    intervaloTemporizadorId = null;
                    somAlarme.play();
                    btnIniciar.classList.remove("esconder-botao");
                    btnPausar.classList.add("esconder-botao");
                    btnResetar.classList.add("esconder-botao");
                    setTimeout(() => {
                        somAlarme.pause();
                        somAlarme.currentTime = 0;
                    }, 10000);

                }
                //Finaliza o contador quando chegar ao zero
            }, 1000);
        }
    }

    //Funcao para atualizar o texto do display
    function atualizarDisplayTemporizador(segundosTotais: number): string{
        
        const horas = Math.floor(segundosTotais / 3600);
        const minutos = Math.floor((segundosTotais % 3600)/ 60);
        const segundos = segundosTotais % 60;

        const h = String(horas).padStart(2, "0");
        const m = String(minutos).padStart(2, "0");
        const s = String(segundos).padStart(2, "0");
        return `${h}:${m}:${s}`
    }

    //funcao para pausar o temporizador
    function pausarTemporizador() {
        if (intervaloTemporizadorId !== null) {
            clearInterval(intervaloTemporizadorId);
            intervaloTemporizadorId = null;
            btnIniciar.classList.remove("esconder-botao");
            btnPausar.classList.add("esconder-botao");
        }
    }

    //funcao para converter o conteudo dos botoes pre dispostos para colocar no display
    function converterStringTempo(tempo: string): number {
        const partes = tempo.split(":").map(part => parseInt(part));

        if(partes.length === 3) {
            const [horas, minutos, segundos] = partes;
            return horas * 3600 + minutos * 60 + segundos;
        }
        if(partes.length === 2) {
            const [minutos, segundos] = partes;
            return minutos * 60 + segundos;
        } else {
            return 0
        }
    }
})