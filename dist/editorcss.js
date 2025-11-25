"use strict";
const brilho = document.getElementById("slider-brilho");
const opacidade = document.getElementById("slider-opacidade");
const rotacao = document.getElementById("slider-rotacao");
const sombra = document.getElementById("slider-sombra");
const borda = document.getElementById("slider-borda");
const quadrado = document.getElementById("quadrado");
const borderRadius = document.getElementById("slider-border-radius");
const scale = document.getElementById("slider-scale");
const skewx = document.getElementById("slider-skewx");
const skewy = document.getElementById("slider-skewy");
const saturacao = document.getElementById("slider-saturacao");
const botaoVermelho = document.getElementById("vermelho");
const botaoAzul = document.getElementById("azul");
const botaoAmarelo = document.getElementById("amarelo");
const botaoVerde = document.getElementById("verde");
const botaoRoxo = document.getElementById("roxo");
const botaoLaranja = document.getElementById("laranja");
const botaoCinza = document.getElementById("cinza");
const botaoBranco = document.getElementById("branco");
const botaoPreto = document.getElementById("preto");
const botaoRosa = document.getElementById("rosa");
brilho.addEventListener("input", () => {
    const valor = brilho.value;
    quadrado.style.filter = `brightness(${valor})`;
});
opacidade.addEventListener("input", () => {
    const valor = opacidade.value;
    quadrado.style.opacity = `${valor}`;
});
rotacao.addEventListener("input", () => {
    const valor = rotacao.value;
    quadrado.style.transform = `rotate(${valor}deg)`;
});
sombra.addEventListener("input", () => {
    const valor = sombra.value;
    quadrado.style.boxShadow = `0 0 20px ${valor}px rgba(0, 0, 0, 0.5)`;
});
borda.addEventListener("input", () => {
    const valor = borda.value;
    quadrado.style.border = `solid ${valor}px #000000`;
});
borderRadius.addEventListener("input", () => {
    const valor = borderRadius.value;
    quadrado.style.borderRadius = `${valor}%`;
});
scale.addEventListener("input", () => {
    const valor = scale.value;
    quadrado.style.scale = `${valor}`;
});
skewx.addEventListener("input", () => {
    const valor = skewx.value;
    quadrado.style.transform = `skewX(${valor}deg)`;
});
skewy.addEventListener("input", () => {
    const valor = skewy.value;
    quadrado.style.transform = `skewY(${valor}deg)`;
});
saturacao.addEventListener("input", () => {
    const valor = saturacao.value;
    quadrado.style.filter = `saturate(${valor}%) contrast(${valor}%)`;
});
botaoAmarelo.addEventListener("click", () => {
    quadrado.style.backgroundColor = `yellow`;
});
botaoVermelho.addEventListener("click", () => {
    quadrado.style.backgroundColor = `red`;
});
botaoVerde.addEventListener("click", () => {
    quadrado.style.backgroundColor = `green`;
});
botaoAzul.addEventListener("click", () => {
    quadrado.style.backgroundColor = `blue`;
});
botaoLaranja.addEventListener("click", () => {
    quadrado.style.backgroundColor = `orange`;
});
botaoPreto.addEventListener("click", () => {
    quadrado.style.backgroundColor = `black`;
});
botaoBranco.addEventListener("click", () => {
    quadrado.style.backgroundColor = `white`;
});
botaoCinza.addEventListener("click", () => {
    quadrado.style.backgroundColor = `gray`;
});
botaoRosa.addEventListener("click", () => {
    quadrado.style.backgroundColor = `pink`;
});
botaoRoxo.addEventListener("click", () => {
    quadrado.style.backgroundColor = `purple`;
});
