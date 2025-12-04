"use strict";
const botaoTema = document.getElementById("botao-tema"); //Adquiri o botao que vai mudar o tema
const body = document.body; //Recebe o body que será mudado
const iconCabecalho = document.querySelector(".cabecalho__imagem");
const iconPrincipal = document.querySelector(".titulo__imagem");
const gitEscuro = document.getElementById("gitimg");
const instaEscuro = document.getElementById("instaimg");
const LinkEscuro = document.getElementById("linkimg");
const lampada = document.getElementById("lampada");
if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        //adiciona um evento no botao quando clicado
        const temaEscuroAtivo = body.classList.toggle("tema-escuro"); //Acrescenta uma classe Css ao body
        lampada.src = temaEscuroAtivo
            ? "../Assets/light_mode.svg"
            : "../Assets/dark_mode.svg";
        if (iconCabecalho) {
            iconCabecalho.src = temaEscuroAtivo
                ? "../Assets/SimboloAmarelo.svg"
                : "../Assets/SimboloAzul.svg";
        }
        if (iconPrincipal) {
            iconPrincipal.src = temaEscuroAtivo
                ? "../Assets/SimboloAmarelo.svg"
                : "../Assets/SimboloAzul.svg";
        }
        gitEscuro.src = temaEscuroAtivo
            ? "../Assets/github-mark.png"
            : "../Assets/github-mark-white.svg";
        instaEscuro.src = temaEscuroAtivo
            ? "../Assets/Instagram_Glyph_Black.svg"
            : "../Assets/Instagram_Glyph_White.svg";
        LinkEscuro.src = temaEscuroAtivo
            ? "../Assets/InBug-Black.png"
            : "../Assets/InBug-White.png";
        localStorage.setItem("tema", temaEscuroAtivo ? "escuro" : "claro"); //Salva a informação do Tema
    });
}
//Adiciona um evento na janela que quando a pagina abrir irá acessar a informação salva e executa-la
const temaSalvo = localStorage.getItem("tema");
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body; //Recebe o body que será mudado
    //Adiciona um evento na janela que quando a pagina abrir irá acessar a informação salva e executa-la
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "escuro") {
        body.classList.add("tema-escuro"); // Adiciona a classe do tema escuro
        if (lampada) {
            lampada.src = "../Assets/light_mode.svg"; // Altera o texto do botão
        }
        if (iconCabecalho) {
            iconCabecalho.src = "../Assets/SimboloAmarelo.svg";
        }
        if (iconPrincipal) {
            iconPrincipal.src = "../Assets/SimboloAmarelo.svg";
        }
        gitEscuro.src = "../Assets/github-mark.png";
        instaEscuro.src = "../Assets/Instagram_Glyph_Black.svg";
        LinkEscuro.src = "../Assets/InBug-Black.png";
    }
    else {
        if (lampada) {
            lampada.src = "../Assets/dark_mode.svg"; // Se não houver tema salvo, o botão é configurado para mudar para o tema escuro
        }
        if (iconPrincipal) {
            iconPrincipal.src = "../Assets/SimboloAzul.svg";
        }
        iconCabecalho.src = "../Assets/SimboloAzul.svg";
    }
});
