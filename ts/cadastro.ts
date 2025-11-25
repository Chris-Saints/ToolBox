import { gerarSenhaAleatoria, avaliarSenha, validarEmail, mostrarSenha } from "./util.js";

const form = document.getElementById("form-cadastro") as HTMLFormElement;
const inputNome = document.getElementById("nome") as HTMLInputElement;
const inputEmail = document.getElementById("email-cad") as HTMLInputElement;
const inputSenha = document.getElementById("password") as HTMLInputElement;
const inputValSenha = document.getElementById("confirm-password") as HTMLInputElement;
const btnOlhos = document.getElementById("btn-olhos") as HTMLButtonElement;
const btnOlhosVal = document.getElementById("btn-olhos-val") as HTMLButtonElement;
const btnAleatoria = document.getElementById("btn-senha-aleatoria") as HTMLButtonElement;
const forcaSenha = document.getElementById("forca-senha") as HTMLElement;



inputSenha.addEventListener("input", () => {
    const forca = avaliarSenha(inputSenha.value);
    forcaSenha.textContent = `Senha ${forca}`;
});

btnOlhos.addEventListener("click", () => {
    mostrarSenha(inputSenha, btnOlhos);
});

btnOlhosVal.addEventListener("click", () => {
    mostrarSenha(inputValSenha, btnOlhosVal);
});

btnAleatoria.addEventListener("click", () => {
    const novaSenha = gerarSenhaAleatoria(12);
    inputSenha.value = novaSenha;
    inputValSenha.value = novaSenha;
});


function validarFormulario() {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); //Evita recarregar a pagina
        //Recupera os valores dos inputs
        const email = inputEmail.value;
        const senha = inputSenha.value;
        const valSenha = inputValSenha.value;


        //Validação do email
        if(!validarEmail(email)) {
            inputEmail.setCustomValidity("Digite um e-mail válido.");//Define a mensagem de validação
            inputEmail.reportValidity();//Mostra a mensagem
            return;
        } else {
            inputEmail.setCustomValidity(""); //Limpa o erro anterior
        }



        //Validação da senha comparando com confirmar senha2
        if(senha !== valSenha) {
            inputValSenha.setCustomValidity("As senhas não coincidem."); //Define a mensagem de validação
            inputValSenha.reportValidity(); //Mostra a mensagem
            return
        } else {
            inputValSenha.setCustomValidity(""); //Limpa o erro anterior
        }

        //Validação do tamanho da senha
        if(senha.length < 6) {
            inputSenha.setCustomValidity("A senha deve ter no minimo 6 caracteres."); //Define a mensagem de validação
            inputSenha.reportValidity(); //Mostra a mensagem
            return
        } else {
            inputSenha.setCustomValidity(""); //Limpa o erro anterior
        }

        const salvarUsuario = JSON.parse(localStorage.getItem("usuarios") || "[]");

        const emailJaCadastrado = salvarUsuario.some((user: { email: string}) => user.email === inputEmail.value);

        if(emailJaCadastrado) {
            inputEmail.setCustomValidity("Este e-mail já está cadastrado.");
            inputEmail.reportValidity();
            return;
        } else {
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

validarFormulario()