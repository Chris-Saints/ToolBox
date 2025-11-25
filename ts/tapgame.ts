const jogar = document.getElementById("jogar") as HTMLButtonElement; //Recebe o elemento do botao jogar
const cronometro = document.getElementById("cronometro") as HTMLElement; // Recebe o elemento que sera o cronometro
const novoJogo = document.getElementById("novo-jogo") as HTMLButtonElement; //Recebe o elemento do botao novo jogo
const ParagrafoContador = document.createElement("p") as HTMLElement; //Recebe o proprio paragrafo onde o contador vai aparecer
const div = document.getElementById("div__contador") as HTMLElement; //Recebe o elemento da div onde vai ficar o contador
let jogoAtivo = false; // Para que controle a contagem das teclas e voce nao possa apertar antes do jogo começar
const teclasPressionadas = new Set<string>(); //Cria a variavel que vai guardar a tecla apertada para que ela nao conte ao segura-la
let contador = 0; //Cria a varivel que vai contar os clicks
const melhorRecordeElemento = document.getElementById("melhor-recorde") as HTMLElement; //Pega o elemento html que fica o recorde
const recordeComparativo = Number(melhorRecordeElemento?.textContent);//Transfoma ele em number para poder comparar futuramente
//Abaixo sao variaveis acessando o elemento html das conquistas
const conquistaUm = document.getElementById("conquista-um") as HTMLParagraphElement;
const conquistaDois = document.getElementById("conquista-dois") as HTMLParagraphElement;
const conquistaTres = document.getElementById("conquista-tres") as HTMLParagraphElement;
const conquistaQuatro = document.getElementById("conquista-quatro") as HTMLParagraphElement;
const conquistaCinco = document.getElementById("conquista-cinco") as HTMLParagraphElement;

const itemUm = document.getElementById("item-um") as HTMLParagraphElement;
const itemDois = document.getElementById("item-dois") as HTMLParagraphElement;
const itemTres = document.getElementById("item-tres") as HTMLParagraphElement;
const itemQuatro = document.getElementById("item-quatro") as HTMLParagraphElement;
const itemCinco = document.getElementById("item-cinco") as HTMLParagraphElement;

recuperarContador(); //Recupera os dados quando inicia a  pagina

novoJogo.disabled = true; //Faz o botao de novo jogo nao ser clicavel




//É o evento que escuta o click do botao 
document.addEventListener("keydown", (event) => {
    if((event.key === "a" || event.key === "A" || event.key === "D" || event.key === "d") && !teclasPressionadas.has(event.key)) {
        teclasPressionadas.add(event.key);
        contarTecla(event);
    }
    //Se a tecla clicada for um a ou b e ela nao estiver dentro da variavel teclas Pressionadas entao salve ela la e execute a funcao contar tecla
});



//É o evento que escuta o soltar do botao pressionado
document.addEventListener("keyup", (event) => {
   teclasPressionadas.delete(event.key);
   //Retira o botao pressionado da variavel salva para poder pressiona-lo novamente 
});



div.appendChild(ParagrafoContador); //Adiciano o contador na sua div
div.classList.add("escondido"); //Adiciona a classe para esconder ele
cronometro.classList.add("escondido"); //Adiciona a classe para esconder o cronometro





//adiciona uma serie de eventos quando o botao jogar for clicado
jogar.addEventListener("click", () => {
    cronometro.textContent = "00:00:05"; //Modifica o texto do cronometro para ser o standard
    contador = 0; //Zera o contador
    jogar.classList.add("escondido"); //Adiciona a classe para esconder o bortao jogar e no lugar colocar o contador
    div.classList.remove("escondido"); //Remove a classe
    cronometro.classList.remove("escondido"); //Remove a classe para o cronometro aparecer
    ParagrafoContador.textContent = "| " + contador + " |"; //Adiciona o texto para o contador
    let tempoJogo = 30; //tempo do jogo
    let contagemTresSeg = 5; //Tempo prejogo e 5 segundos

    //Primeiro um pre tempo para o jogador se preparar
    const contagemRegressiva = setInterval(() => {
        contagemTresSeg-- ;//diminui 1 segundo
        cronometro.textContent = "00:00:0" + contagemTresSeg; //Modifica o texto do cronometro para aparecer a contagem regressiva

        if(contagemTresSeg < 0) {
            // se contagem = 0 faz essas coisas
            clearInterval(contagemRegressiva);  // para a contagem
            cronometro.textContent = "00:00:30" // set o texto standart
            iniciarJogo(); //inicia a função do jogo
        }
    }, 1000); //A cada 1 segundo


    function iniciarJogo() {
        jogoAtivo = true; //Ativa o jogo para que agora seja possivel pressionar as teclas
        cronometro.textContent = "00:00:" + tempoJogo;

        const tempoRegressivo = setInterval(() => {
            tempoJogo--; //diminui 1 a cada segundo
            if(tempoJogo <= 9) {
                cronometro.textContent = "00:00:0" + tempoJogo; //muda o texto do cronometro
            } else {
                cronometro.textContent = "00:00:" + tempoJogo; //muda o texto do cronometro
            }
            cronometro.classList.remove("escondido"); //Faz ele aparecer


            if(tempoJogo === 0 && jogoAtivo) {
                //Se o tempo for 0 e o jogo estiver ativo faça:
                clearInterval(tempoRegressivo);//Pare de Contar

                jogoAtivo = false; // torna o jogo false parando o evento de pressionar as teclas
                novoJogo.disabled = false; //Faz ele ser clicavel
                cronometro.textContent = "00:00:00";
                
                if(contador > recordeComparativo) {
                    //verifica se o contador alcançado é maior que o valor salvo para salvar e recuperar
                    armazenarContador();
                    recuperarContador(); 
                }
            }
        }, 1000); // a cada 1 segundo
    }    
})

//funçao contar tecla com evento de keyboard
function contarTecla(event: KeyboardEvent) {
    if(!jogoAtivo) {
        return //se o jogo for false ele nao funciona
    }
    contador++; //Aumenta 1 no contador a cada tecla pressionada
    ParagrafoContador.textContent = "| " + contador + " |"; //atualiza o contador cada vez que for clicado

}




novoJogo.addEventListener("click", () => {
    jogar.classList.remove("escondido"); //mostra o botao jogar
    div.classList.add("escondido"); // esconde o contador
    cronometro.classList.add("escondido"); //Esconde cronometro
    novoJogo.disabled = true; //Retorna ele a nao ser clicavel 
});



//Salva a informacao do contador no local storage
function armazenarContador(): void {
    const recordeRecuperado = localStorage.getItem("recorde");
    if(!recordeRecuperado) {
        return
    }
    const recorde = JSON.parse(recordeRecuperado);
    if(recorde > contador) {
        return
    } else {
        localStorage.setItem("recorde", JSON.stringify(contador));
    }
}



//funcao para puxar a informacao do contador salvo no local storage
function recuperarContador(): void {
    const recordeRecuperado = localStorage.getItem("recorde");
    if(!recordeRecuperado) {
        return // verifica se ha algo no local storage, se nao houver nada acontece
    }
    //transforma a informacao recuperada no valor anterior
    const recorde = JSON.parse(recordeRecuperado);
    
    melhorRecordeElemento.textContent = recorde; //Recupera o ultimo recorde salvo e salva ele 
    conquistas();
}

// Funcao que verifica as conquistas
function conquistas() {
    const recordeComparativo = Number(melhorRecordeElemento.textContent);
    const trofeuUm = Number(conquistaUm.textContent);
    const trofeuDois = Number(conquistaDois.textContent);
    const trofeuTres = Number(conquistaTres.textContent);
    const trofeuQuatro = Number(conquistaQuatro.textContent);
    const trofeuCinco = Number(conquistaCinco.textContent);
    //consts transformando o texto das variaveis em number

    //comparando o texto com o recorde recuperado para verificar a conquista.
    if(recordeComparativo >= trofeuUm ) {
        itemUm.classList.add("brilho");
    } 

    if(recordeComparativo >= trofeuDois ) {
        itemDois.classList.add("brilho");
    }

    if(recordeComparativo >= trofeuTres ) {
        itemTres.classList.add("brilho");
    }

    if(recordeComparativo >= trofeuQuatro ) {
        itemQuatro.classList.add("brilho");
    }

    if(recordeComparativo >= trofeuCinco ) {
        itemCinco.classList.add("brilho");
    } 
}