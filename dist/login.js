import { validarEmail, mostrarSenha } from "./util.js";
const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email-login");
const inputSenha = document.getElementById("password-login");
const btnOlhos = document.getElementById("btn-olhos-login");
const areaLogada = document.getElementById("area-logada");
const usuarioLogado = document.getElementById("usuario-logado");
const btnLogout = document.getElementById("btn-logout");
const btnMostrarLogin = document.getElementById("para-login");
const btnMostraCadastro = document.getElementById("para-cadastro");
const formCadastro = document.getElementById("form-cadastro");
const emailSalvo = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
btnMostrarLogin.addEventListener("click", () => mostrarFomularios(false));
btnMostraCadastro.addEventListener("click", () => mostrarFomularios(true));
function mostrarFomularios(mostrarCadastro) {
    if (mostrarCadastro) {
        formCadastro.classList.remove("hidden");
        formLogin.classList.add("hidden");
        formLogin.querySelectorAll("[required]").forEach(input => {
            input.removeAttribute("required");
        });
        formCadastro.querySelectorAll("input").forEach(input => {
            if (input.id !== "")
                input.setAttribute("required", "");
        });
    }
    else {
        formLogin.classList.remove("hidden");
        formCadastro.classList.add("hidden");
        formCadastro.querySelectorAll("[required]").forEach(input => {
            input.removeAttribute("required");
        });
        formLogin.querySelectorAll("input").forEach(input => {
            if (input.id !== "")
                input.setAttribute("required", "");
        });
    }
}
if (emailSalvo) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find((u) => u.email === emailSalvo);
    if (usuario) {
        formLogin.classList.add("hidden");
        areaLogada.classList.remove("hidden");
        usuarioLogado.textContent = usuario.nome;
    }
}
btnOlhos.addEventListener("click", () => {
    mostrarSenha(inputSenha, btnOlhos);
});
btnLogout.addEventListener("click", () => {
    areaLogada.classList.add("hidden");
    formLogin.classList.remove("hidden");
    localStorage.removeItem("usuarioLogado");
});
formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    tentarLogin();
});
function tentarLogin() {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value;
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuarios.find((user) => user.email === email);
    if (!validarEmail(email)) {
        inputEmail.setCustomValidity("Digite um e-mail válido.");
        inputEmail.reportValidity();
        return;
    }
    else {
        inputEmail.setCustomValidity("");
    }
    if (senha.length < 6) {
        inputSenha.setCustomValidity("A senha deve ter no mínimo 6 caracteres.");
        inputSenha.reportValidity();
        return;
    }
    else {
        inputSenha.setCustomValidity("");
    }
    if (!usuarioEncontrado) {
        inputEmail.setCustomValidity("E-mail não cadastrado.");
        inputEmail.reportValidity();
        return;
    }
    else {
        inputEmail.setCustomValidity("");
    }
    if (usuarioEncontrado.senha !== senha) {
        inputSenha.setCustomValidity("Senha incorreta.");
        inputSenha.reportValidity();
        return;
    }
    else {
        inputSenha.setCustomValidity("");
    }
    if (usuarioEncontrado) {
        formLogin.classList.add("hidden");
        areaLogada.classList.remove("hidden");
        usuarioLogado.textContent = usuarioEncontrado.nome;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado.email));
    }
    else {
        alert("E-mail ou senha incorretos.");
    }
}
