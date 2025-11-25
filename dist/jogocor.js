"use strict";
const btnGerarCor = document.getElementById("gerar-cor");
const btnUm = document.getElementById("btnOpUm");
const btnDois = document.getElementById("btnOpDois");
const btnTres = document.getElementById("btnOpTres");
const btnQuatro = document.getElementById("btnOpQuatro");
const btnCinco = document.getElementById("btnOpCinco");
const displayCor = document.getElementById("display-cor");
const displayMensagem = document.getElementById("display-mensagem");
const botoes = document.querySelectorAll('.btn');
let tentativas = 0;
iniciarJogo();
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        if (tentativas >= 3)
            return;
        const correta = botao.dataset.correta === "true";
        if (correta) {
            displayMensagem.textContent = "Você acertou!";
            botoes.forEach(b => {
                if (b.dataset.correta !== "true") {
                    b.disabled = true;
                }
            });
        }
        else {
            displayMensagem.textContent = "Você errou!";
            botao.disabled = true;
            tentativas++;
            if (tentativas >= 3) {
                botoes.forEach(b => {
                    if (b.dataset.correta !== "true") {
                        b.disabled = true;
                    }
                    else {
                        b.classList.add("cor-certa");
                    }
                });
            }
        }
    });
});
btnGerarCor.addEventListener("click", iniciarJogo);
function iniciarJogo() {
    const corCerta = gerarCorAleatoria();
    const cores = gerarOpcoes(corCerta, 5);
    displayCor.innerHTML = corCerta;
    cores.forEach((cor, i) => {
        const botao = botoes[i];
        botao.style.backgroundColor = cor;
        botao.disabled = false;
        botao.dataset.correta = (cor === corCerta).toString();
    });
    displayMensagem.textContent = "";
    tentativas = 0;
    botoes.forEach(botao => {
        botao.classList.remove("cor-certa");
    });
}
function gerarCorAleatoria() {
    return String(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
}
function gerarOpcoes(corCerta, quantidade) {
    const opcoes = [];
    opcoes.push(corCerta);
    while (opcoes.length < quantidade) {
        const corAleatoria = gerarCorAleatoria();
        if (!opcoes.includes(corAleatoria)) {
            opcoes.push(corAleatoria);
        }
    }
    return opcoes.sort(() => Math.random() - 0.5);
}
