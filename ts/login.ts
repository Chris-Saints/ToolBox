import { validarEmail, mostrarSenha } from "./util.js";

const formLogin = document.getElementById("form-login") as HTMLFormElement;
const inputEmail = document.getElementById("email-login") as HTMLInputElement;
const inputSenha = document.getElementById("password-login") as HTMLInputElement;
const btnOlhos = document.getElementById("btn-olhos-login") as HTMLButtonElement;
const areaLogada = document.getElementById("area-logada") as HTMLElement;
const usuarioLogado = document.getElementById("usuario-logado") as HTMLElement;
const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement;
const btnMostrarLogin = document.getElementById("para-login")!;
const btnMostraCadastro = document.getElementById("para-cadastro")!;
const formCadastro = document.getElementById("form-cadastro")!;

const emailSalvo =JSON.parse(localStorage.getItem("usuarioLogado") || "null");


btnMostrarLogin.addEventListener("click", () => mostrarFomularios(false));


btnMostraCadastro.addEventListener("click", () => mostrarFomularios(true));

function mostrarFomularios(mostrarCadastro: boolean) {
    if(mostrarCadastro) {

        formCadastro.classList.remove("hidden");
        formLogin.classList.add("hidden");

        formLogin.querySelectorAll("[required]").forEach(input => {
            input.removeAttribute("required");
        });

        formCadastro.querySelectorAll("input").forEach(input => {
            if (input.id !== "") input.setAttribute("required", "");
        });
    } else {
        
        formLogin.classList.remove("hidden");
        formCadastro.classList.add("hidden");

        formCadastro.querySelectorAll("[required]").forEach(input => {
            input.removeAttribute("required");
        });

        formLogin.querySelectorAll("input").forEach(input => {
            if (input.id !== "") input.setAttribute("required", "");
        });
    }
}



if(emailSalvo) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find((u: { email: string }) => u.email === emailSalvo);

    if(usuario) {
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
    const usuarioEncontrado = usuarios.find((user: {email: string, senha: string}) => user.email === email);

    if(!validarEmail(email)) {
        inputEmail.setCustomValidity("Digite um e-mail válido.");
        inputEmail.reportValidity();
        return;
    } else {
        inputEmail.setCustomValidity("");
    }

    if (senha.length < 6) {
        inputSenha.setCustomValidity("A senha deve ter no mínimo 6 caracteres.");
        inputSenha.reportValidity();
        return;
    } else {
        inputSenha.setCustomValidity("");
    }

    if (!usuarioEncontrado) {
        inputEmail.setCustomValidity("E-mail não cadastrado.");
        inputEmail.reportValidity();
        return;
    } else {
        inputEmail.setCustomValidity("");
    }

    if (usuarioEncontrado.senha !== senha) {
        inputSenha.setCustomValidity("Senha incorreta.");
        inputSenha.reportValidity();
        return;
    } else {
        inputSenha.setCustomValidity("");
    }

    if(usuarioEncontrado){
        formLogin.classList.add("hidden");
        areaLogada.classList.remove("hidden");
        usuarioLogado.textContent = usuarioEncontrado.nome;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado.email));
    } else {
        alert("E-mail ou senha incorretos.");
    }
}