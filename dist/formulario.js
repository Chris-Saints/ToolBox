"use strict";
const form = document.querySelector("form");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("password");
const inputValSenha = document.getElementById("confirm-password");
const btnOlhos = document.getElementById("btn-olhos");
const btnOlhosVal = document.getElementById("btn-olhos-val");
const btnSubmit = document.getElementById("btn-submit");
const btnAleatoria = document.getElementById("btn-senha-aleatoria");
const forcaSenha = document.getElementById("forca-senha");
const dicaCaracter = document.getElementById("dica-caracter");
const dicaMaiuscula = document.getElementById("dica-maiuscula");
const dicaMinuscula = document.getElementById("dica-minuscula");
const dicaNumero = document.getElementById("dica-numero");
const dicaSimbolo = document.getElementById("dica-simbolo");
inputSenha.addEventListener("input", () => {
    avaliarSenha(inputSenha.value);
});
btnOlhos.addEventListener("click", () => {
    const tipoAtual = inputSenha.type;
    inputSenha.type = tipoAtual === "password" ? "text" : "password";
    ;
    btnOlhos.textContent = tipoAtual === "password" ? "Fechar" : "Abrir";
});
btnOlhosVal.addEventListener("click", () => {
    const tipoAtualVal = inputValSenha.type;
    inputValSenha.type = tipoAtualVal === "password" ? "text" : "password";
    btnOlhosVal.textContent = tipoAtualVal === "password" ? "Fechar" : "Abrir";
});
btnAleatoria.addEventListener("click", () => {
    const novaSenha = gerarSenhaAleatoria(12);
    inputSenha.value = novaSenha;
    inputValSenha.value = novaSenha;
});
function gerarSenhaAleatoria(tamanho) {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"; //Cria uma variavel com todos os caracteres 
    let senha = ""; //Cria uma let que vai guardar multiplas senhas aleatorias
    for (let i = 0; i < tamanho; i++) {
        //Enquanto i for menor que o tamanho ele vai fazer:
        const index = Math.floor(Math.random() * caracteres.length); //cria uma variavel que vai acessar algum caracter baseado no index dele
        senha += caracteres[index]; //Que vai ser concatenado em uma string final
    }
    return senha;
}
function avaliarSenha(senha) {
    senha = inputSenha.value;
    const avaliacaoMinus = /[a-z]/.test(senha);
    const avaliacaoMaius = /[A-Z]/.test(senha);
    const avaliacaoSimbolos = /[^a-zA-Z0-9]/.test(senha);
    const avaliacaoNumeros = /[0-9]/.test(senha);
    if (senha.length >= 8 && avaliacaoMinus && avaliacaoNumeros && avaliacaoMaius && avaliacaoSimbolos) {
        forcaSenha.innerHTML = "Senha Forte";
    }
    else if (senha.length <= 6 && (avaliacaoMinus && avaliacaoNumeros) || (avaliacaoMaius && avaliacaoSimbolos)) {
        forcaSenha.innerHTML = "Senha Média";
    }
    else {
        forcaSenha.innerHTML = "Senha Fraca";
    }
}
function validarFormulario() {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); //Evita recarregar a pagina
        //Recupera os valores dos inputs
        const nome = inputNome.value;
        const email = inputEmail.value;
        const senha = inputSenha.value;
        const valSenha = inputValSenha.value;
        const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //especifica oq tem q estar no campo do email sem caracteres e espacos/ @ / sem caracteres e espaco/ . / sem caracteres e espaco. caracteres = sinais + = - )...
        //Validação do email
        if (!padraoEmail.test(email)) {
            inputEmail.setCustomValidity("Digite um e-mail válido."); //Define a mensagem de validação
            inputEmail.reportValidity(); //Mostra a mensagem
            return;
        }
        else {
            inputEmail.setCustomValidity(""); //Limpa o erro anterior
        }
        //Validação da senha comparando com confirmar senha2
        if (senha !== valSenha) {
            inputValSenha.setCustomValidity("As senhas não coincidem."); //Define a mensagem de validação
            inputValSenha.reportValidity(); //Mostra a mensagem
            return;
        }
        else {
            inputValSenha.setCustomValidity(""); //Limpa o erro anterior
        }
        //Validação do tamanho da senha
        if (senha.length < 6) {
            inputSenha.setCustomValidity("A senha deve ter no minimo 6 caracteres."); //Define a mensagem de validação
            inputSenha.reportValidity(); //Mostra a mensagem
            return;
        }
        else {
            inputSenha.setCustomValidity(""); //Limpa o erro anterior
        }
        const salvarUsuario = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const emailJaCadastrado = salvarUsuario.some((user) => user.email === inputEmail.value);
        if (emailJaCadastrado) {
            inputEmail.setCustomValidity("Este e-mail já está cadastrado.");
            inputEmail.reportValidity();
            return;
        }
        else {
            inputEmail.setCustomValidity("");
        }
        const usuario = {
            nome: inputNome.value,
            email: inputEmail.value,
            senha: inputSenha.value
        };
        salvarUsuario.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(salvarUsuario));
        form.reset();
        alert(`Cadastro concluído com sucesso`);
    });
}
validarFormulario();
