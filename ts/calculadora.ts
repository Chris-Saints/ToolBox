//@ts-ignore
import * as math from 'mathjs';
const { evaluate } = math;

const display = document.getElementById("display") as HTMLInputElement;
const numeros = document.querySelectorAll(".btn") as NodeListOf<HTMLButtonElement>;
const btnEqual = document.getElementById("btnEqual") as HTMLButtonElement;
const btnOp = document.querySelectorAll(".btn-op") as NodeListOf<HTMLButtonElement>;
const btnClear = document.getElementById("btnLimpar") as HTMLButtonElement;
const btnBackSpace = document.getElementById("btnBackspace") as HTMLButtonElement;
const btnPorcentagem = document.getElementById("btnPorcentagem") as HTMLButtonElement;
const btnPonto = document.getElementById("btnPonto") as HTMLButtonElement;
const btnSinal = document.getElementById("btnSinal") as HTMLButtonElement;
const btnParenteses = document.getElementById("btnParenteses") as HTMLButtonElement;
//Acessando os elemento HTML


const maxLength = 20; //Variavel que limita a quantidade caracteres no display


//ForEach faz o evento para cada numero clicado que tiver a mesma classe, pq os elementos HTML foram recuperados e colocados em uma variavel ficando como uma array e o foreach passa por cada elemento dando evento para quando for clicado
numeros.forEach(botao => {
    botao.addEventListener("click", () => {
        if (display.value === "Erro") return; //Retorne se display for erro e nao deixa fazer nada

        if (display.value.length < maxLength) {
            const expressao = display.value;
            const ultimoChar = expressao.slice(-1); // Pega o último caractere

            if (/[)\%]/.test(ultimoChar) && !/[+\-*/.]/.test(ultimoChar)) {
                display.value += "*";
            }
                const numero = botao.textContent ?? ""; //acessa o texto presente no botao e o operador de coalescencia nula ?? diz que se nao tiver nada no texto do botao, se isso for nulo ou undefined ele coloca "" no lugar
                display.value += numero;
            //se o comprimento do display for menor que o valor max:
        }
    });
});

btnOp.forEach(botao => {
    botao.addEventListener("click", () => {
        const ultimoChar = display.value.slice(-1); //Verifica o ultimo caracter do display
        if(display.value === "Erro") return;//Retorne se display for erro e nao deixa fazer nada
        const operador = botao.textContent ?? "";

        if (display.value === "" && (operador === "*" || operador === "/")) return; //Nao permite os clicar em * ou / se o display nao tiver nada

        if (display.value.slice(0, -1) === "" && /[+\-]/.test(ultimoChar) && (operador === "*" || operador === "/")) return; // nao permite clicar em * ou / se o caracter anterior for + ou - e eles forem os primeiros caracteres do display

        if(/[(]/.test(ultimoChar) && (operador === "*" || operador === "/")) return; //Se o ultimo caracter for ( e o botao clicado for * ou / retorne

        if(ultimoChar === "-" || ultimoChar === "*" || ultimoChar === "/" || ultimoChar === "+" ) {
            //se o ultimo caracter for um operador:
            display.value = display.value.slice(0, -1); //apague-o
            display.value += botao.innerHTML; //e substitua pelo clicado
        } else {
            display.value += botao.innerHTML; //se nao houver operador antes, apenas adicione
        }
    });
});



//Botao =
btnEqual.addEventListener("click", () => {
    const expressao = display.value;
    const resultado = evaluate(expressao);
    const equacao = display.value.trim(); //Apaga os espacos acidentais que possam ocorrer
    if(equacao === "") return; //Caso exista retorne

    const terminaComOperador = /[+\-*/.%]$/.test(equacao); //guarda o teste se o operador for o ultimo caracter
    const operadoresDuplicados = /[+\-*/.%]{2,}/.test(equacao); //guarda o teste de operadores multiplicados

    if(terminaComOperador || operadoresDuplicados){
        display.value = "Erro";
        return; //Se um dos dois testes for true ele mostra erro e retorna
    }
    
    display.value = String(resultado);
});

btnClear.addEventListener("click", () => {
    display.value = ""; //apaga o dsiplay
});

btnBackSpace.addEventListener("click", () => {
    if(display.value && display.value !== "Erro") {
        display.value = display.value.slice(0, -1);// se tiver algo do display e ele nao for erro ele apaga o ultimo caracter
    }
});

document.addEventListener("keydown", (backspace) => {
    if(backspace.key === "Backspace") {
        backspace.preventDefault();
        if(display.value && display.value !== "Erro") {
            display.value = display.value.slice(0, -1);// se tiver algo do display e ele nao for erro ele apaga o ultimo caracter mas com o botao backspace
        }
    }
});

btnPorcentagem.addEventListener("click", () => {
    const ultimoChar = display.value.slice(-2);
    if(display.value === "" || display.value === "Erro") return; //se for o primeiro ou se o display estiver com erro retorne

    if(display.value.includes("%")) {
        return;
    }

   const match = display.value.match(/(\d+\.?\d*)$/); // Número com possível ponto decimal no final
    if (match) {
        const numero = match[1]; //pega o numero
        const start = display.value.lastIndexOf(numero); //pega a posicao do numero capturado
        const antes = display.value.slice(0, start); //acessa o caracter anterior do numero capturado
        if(/[)]/.test(antes)) {
            //se o caracter anterior for ) coloque um * antes
            display.value = `${antes}*(${numero}/100)`;
        } else {
            //se nao coloque o numero normal
            display.value = `${antes}(${numero}/100)`;
        }
    }
});

btnPonto.addEventListener("click", () => {
    if(display.value === "Erro") return;

    const expressao = display.value;
    const match = expressao.match(/(\d+\.?\d*)$/); //recupera um num inteiro ou decimal
    const ultimochar = expressao.slice(-1); //acessa o ultimo caracter da expressao
    const numero = match?.[1] || ""; //numero
    const numeroJaTemPonto = numero.includes("."); // se ja tem um ponto no numero

    if(numeroJaTemPonto) return; //se ja tem um ponto retorne

    if(/[+\-*/(]/.test(ultimochar)) {
        //se tiver algumas dessas operacoes antes coloque 0.
        display.value += "0.";
    } else if(ultimochar === ")") {
        //se for um parenteses fechado coloque *0.
        display.value += "*0.";
    } else if(ultimochar === ""){
        //se o ultimo caracter for "" 0.
        display.value += "0.";
    } else {
        //se nao coloque um ponto
        display.value += ".";
    }  
});

btnSinal.addEventListener("click", () => {
    const expressao = display.value;

    // Caso especial: clicar para remover "((-"
    if (expressao.endsWith("((-")) {
        //se a expressao acaba com ((- apague e coloque (
        display.value = expressao.slice(0, -2);
        return;
    }

    // Caso especial: clicar logo após "(" → adicionar "(-"
    if (expressao.endsWith("(")) {
        //se a expressao acaba com ( acrescente (-
        display.value += "(-";
        return;
    }

    // Caso: número dentro de parênteses com ou sem sinal
    const matchParentesado = expressao.match(/(\(-?-?\d+\.?\d*)$/);
    if (matchParentesado) {
        const numeroAtual = matchParentesado[1]; //recupera o numero com os parametros
        const antes = expressao.slice(0, -numeroAtual.length); //recupera o caracter anterior
        const dentro = numeroAtual.slice(1); // acessa o numero dentro do parenteses
        const ehNegativo = dentro.startsWith("-");//caso o numero comece com -

        // Alterna entre "((-n" e "(n"
        display.value = ehNegativo
            ? antes + "" + dentro.slice(1)
            : antes + "((-" + dentro; // se existir um numero dentro do parenteses muda o que vem entre ele e o parenteses olocando (-
        return;
    }

    // Caso: número normal no final da expressão
    const matchNumeroNormal = expressao.match(/(-?\d+\.?\d*)$/);
    if (matchNumeroNormal) {
        const numero = matchNumeroNormal[1];
        const index = expressao.lastIndexOf(numero);
        const antes = expressao.slice(0, index);

        if (numero.startsWith("-")) {
            display.value = antes + numero.slice(1);
        } else {
            const ultimoCharAntes = antes.slice(-1);
            if (/[+\-*/(]/.test(ultimoCharAntes)) {
                display.value = antes + "(-" + numero;
            } else if(antes === "") {
                display.value = antes + `-${numero}`;
            }
            //faz a mesma coisa que o caso anterior, mas agora com nuemro fora dos parenteses que forem os ultimos da equacao
        }
        return;
    }
});

btnParenteses.addEventListener("click", () => {
    const ultimochar = display.value.slice(-1);
    if(display.value === "Erro" || ultimochar === ".") return;
    
    const expressao = display.value;
    const ultimoNum = expressao.match(/[\d)\%]$/)?.[0] || ""; //verifica o ultimo caracter
    const abertos = (expressao.match(/\(/g) || []).length; //Verifica a quantidade de parenteses abertos gaurdados no array
    const fechados = (expressao.match(/\)/g) || []).length; //Verifica a quantidade de parenteses fechados gaurdados no array
    

    if(abertos > fechados && /[\d)]/.test(ultimoNum)){
        //se o numero de parenteses abertos é maior q o de fechados entao feche
        display.value += ")";
    } else {
         if(/[\d)]/.test(ultimoNum)) {
            //se nao se existir um parenteses fechado antes, abra um com * antes
            display.value += "*(";
        } else {
            //se nao abra um novo parenteses
            display.value += "(";
        }
    }
});
