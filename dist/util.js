export function gerarSenhaAleatoria(tamanho) {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"; //Cria uma variavel com todos os caracteres 
    let senha = ""; //Cria uma let que vai guardar multiplas senhas aleatorias
    for (let i = 0; i < tamanho; i++) {
        //Enquanto i for menor que o tamanho ele vai fazer:
        const index = Math.floor(Math.random() * caracteres.length); //cria uma variavel que vai acessar algum caracter baseado no index dele
        senha += caracteres[index]; //Que vai ser concatenado em uma string final
    }
    return senha;
}
export function avaliarSenha(senha) {
    const avaliacaoMinus = /[a-z]/.test(senha);
    const avaliacaoMaius = /[A-Z]/.test(senha);
    const avaliacaoSimbolos = /[^a-zA-Z0-9]/.test(senha);
    const avaliacaoNumeros = /[0-9]/.test(senha);
    if (senha.length >= 8 && avaliacaoMinus && avaliacaoNumeros && avaliacaoMaius && avaliacaoSimbolos) {
        return "Forte";
    }
    else if (senha.length <= 6 && (avaliacaoMinus && avaliacaoNumeros) || (avaliacaoMaius && avaliacaoSimbolos)) {
        return "Média";
    }
    else {
        return "Fraca";
    }
}
export function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}
export function mostrarSenha(input, botao) {
    if (input.type === "password") {
        input.type = "text";
        botao.textContent = "fechar";
    }
    else {
        input.type = "password";
        botao.textContent = "Abrir";
    }
}
