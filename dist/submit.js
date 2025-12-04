"use strict";
const contatoSubmit = document.getElementById("submitForm");
const inputnome = document.getElementById("nome");
const inputMensagem = document.getElementById("mensagem");
contatoSubmit.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = inputnome.value;
    const mensagem = inputMensagem.value;
    const destino = "christianpicoli18@gmail.com";
    const assunto = encodeURIComponent(`Mensagem de ${nome}`);
    const corpo = encodeURIComponent(mensagem);
    const mailtoLink = `mailto:${destino}?subject=${assunto}&body=${corpo}`;
    window.location.href = mailtoLink;
});
