const contatoSubmit = document.getElementById("formulario") as HTMLFormElement;
const inputnome =  document.getElementById("nome") as HTMLInputElement;
const inputMensagem = document.getElementById("mensagem") as HTMLTextAreaElement;

contatoSubmit.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = input.value;
    const mensagem = inputMensagem.value

    const destino = "christianpicoli18@gmail.com"
    const assunto = encodeURIComponent(`Mensagem de ${nome}`);
    const corpo = encodeURIComponent(mensagem);

    const mailtoLink = `mailto:${destino}?subject=${assunto}&body=${corpo}`;

    window.location.href = mailtoLink
})