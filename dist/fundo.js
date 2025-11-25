"use strict";
const bodyCor = document.body;
const footerCor = document.querySelector("footer");
const headerCor = document.querySelector("header");
const botaoAleatorio = document.getElementById("botao-fundo");
const botaoResetar = document.getElementById("resetar-fundo");
//Acima são codigos para recuperar os elementos HTML salvando nas variaveis para que possa ser modificado
botaoAleatorio.addEventListener("click", () => {
    mudarCor();
    salvarFundoAleatorio();
});
//Acrescenta um evento ao clicar que é a função mudarCor()
function mudarCor() {
    const cor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const corSecundaria = "#" + Math.floor(Math.random() * 16777215).toString(16); //Salvas duas variaveis que fazem um nome aleatorio um para o body e outro para o footer e o header
    bodyCor.style.backgroundColor = cor;
    headerCor.style.backgroundColor = corSecundaria;
    footerCor.style.backgroundColor = corSecundaria;
    //acrescenta o valor das variaveis aleatorias mudando diretamente no background dos elementos no css
}
;
const temaStorage = localStorage.getItem("tema"); //Acessa a informação salva no local Storage do Tema presente
//Cria um evento para o botao resetar que é voltar para cor padrão de fundo dependendo do valor salvo no local storage do Tema
botaoResetar.addEventListener("click", () => {
    if (temaStorage) {
        bodyCor.style.backgroundColor = "var(--cor-fundo)";
        headerCor.style.backgroundColor = "var(--cor-primaria)";
        footerCor.style.backgroundColor = "var(--cor-primaria)";
    }
    salvarFundoAleatorio();
});
//função que vai salvar os valores das cores modificadas ou nao
function salvarFundoAleatorio() {
    const pai = {
        fundo: bodyCor.style.backgroundColor,
        cabecalho: headerCor.style.backgroundColor,
        rodape: footerCor.style.backgroundColor,
    }; // Criando uma variavel pai para armazenar o valor das cores.
    localStorage.setItem("fundo", JSON.stringify(pai)); //colocando a variavel no local storage transformando ela em string
}
//acessando a variavel no Local Storage
function acessarFundo() {
    const fundo = localStorage.getItem("fundo"); //Criando a variavel para receber o valor em string
    if (fundo) {
        const fundoRecuperado = JSON.parse(fundo);
        bodyCor.style.backgroundColor = fundoRecuperado.fundo;
        headerCor.style.backgroundColor = fundoRecuperado.cabecalho;
        footerCor.style.backgroundColor = fundoRecuperado.rodape;
    }
    ; //e se tiver algo converte os valores aos valores antigos e faz eles virarem os valores padrao do site
}
//Adiciona o evendo que quando abrir a janela desse site a funcao que acessa as informaçoes é executada
window.addEventListener("DOMContentLoaded", () => {
    acessarFundo();
});
