const botaoTema = document.getElementById("botao-tema") as HTMLButtonElement; //Adquiri o botao que vai mudar o tema
const body = document.body; //Recebe o body que será mudado
const iconCabecalho = document.querySelector(".cabecalho__imagem") as HTMLImageElement;
const iconPrincipal = document.querySelector(".titulo__imagem") as HTMLImageElement;
const gitEscuro = document.getElementById("gitimg") as HTMLImageElement;
const instaEscuro = document.getElementById("instaimg") as HTMLImageElement;
const LinkEscuro = document.getElementById("linkimg") as HTMLImageElement;
const lampada = document.getElementById("lampada") as HTMLImageElement;

if(botaoTema) {
    botaoTema.addEventListener("click", () => {
        //adiciona um evento no botao quando clicado
        const temaEscuroAtivo = body.classList.toggle("tema-escuro");//Acrescenta uma classe Css ao body

        lampada.src = temaEscuroAtivo
        ? "../Assets/light_mode.svg"
        : "../Assets/dark_mode.svg";

        iconCabecalho.src = temaEscuroAtivo
        ? "../Assets/SimboloAmarelo.svg"
        : "../Assets/SimboloAzul.svg";

        if(iconPrincipal) {
            iconPrincipal.src = temaEscuroAtivo
            ? "../Assets/SimboloAmarelo.svg"
            : "../Assets/SimboloAzul.svg";
        }

        gitEscuro.src = temaEscuroAtivo
        ? "../Assets/github-escuro.svg"
        : "../Assets/Github Negative.svg";

        instaEscuro.src = temaEscuroAtivo
        ? "../Assets/instagram-escuro.svg"
        : "../Assets/Instagram Negative.svg";

        LinkEscuro.src = temaEscuroAtivo
        ? "../Assets/linkedin-escuro.svg"
        : "../Assets/Linkedin Negative.svg";
        
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
        lampada.src = "../Assets/light_mode.svg";// Altera o texto do botão
        iconCabecalho.src = "../Assets/SimboloAmarelo.svg";
        if(iconPrincipal) {
            iconPrincipal.src = "../Assets/SimboloAmarelo.svg";
        }
        gitEscuro.src = "../Assets/github-escuro.svg";
        instaEscuro.src = "../Assets/instagram-escuro.svg";
        LinkEscuro.src = "../Assets/linkedin-escuro.svg";
    } else {
        if (lampada) {
            lampada.src = "../Assets/dark_mode.svg"; // Se não houver tema salvo, o botão é configurado para mudar para o tema escuro
        }
        if(iconPrincipal) {
            iconPrincipal.src = "../Assets/SimboloAzul.svg";
        }
        iconCabecalho.src = "../Assets/SimboloAzul.svg";
    }
});
