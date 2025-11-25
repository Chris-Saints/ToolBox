const btnGerarCor = document.getElementById("gerar-cor") as HTMLButtonElement;
const btnUm = document.getElementById("btnOpUm") as HTMLButtonElement;
const btnDois = document.getElementById("btnOpDois") as HTMLButtonElement;
const btnTres = document.getElementById("btnOpTres") as HTMLButtonElement;
const btnQuatro = document.getElementById("btnOpQuatro") as HTMLButtonElement;
const btnCinco = document.getElementById("btnOpCinco") as HTMLButtonElement;
const displayCor = document.getElementById("display-cor") as HTMLElement;
const displayMensagem = document.getElementById("display-mensagem") as HTMLElement;
const botoes = document.querySelectorAll<HTMLButtonElement>('.btn');

let tentativas = 0;

iniciarJogo();

botoes.forEach(botao => {
    botao.addEventListener("click", () => {

        if(tentativas >= 3) return;

        const correta = botao.dataset.correta === "true";

        if(correta) {
            displayMensagem.textContent = "Você acertou!"

            botoes.forEach(b => {
                if(b.dataset.correta !== "true") {
                    b.disabled = true;
                }
            });
            
        } else {
            displayMensagem.textContent = "Você errou!"
            botao.disabled = true;
            tentativas++;
            if(tentativas >= 3) {
                botoes.forEach(b => {
                    if(b.dataset.correta !== "true") {
                        b.disabled = true;
                    } else {
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
    const cores: string[] = gerarOpcoes(corCerta, 5);

    displayCor.innerHTML = corCerta;

    cores.forEach((cor, i) => {
        const botao = botoes[i];
        botao.style.backgroundColor = cor;
        botao.disabled = false;
        botao.dataset.correta = (cor === corCerta).toString();
    });

    displayMensagem.textContent = ""
    tentativas = 0;

    botoes.forEach(botao => {
        botao.classList.remove("cor-certa");
    });
}

function gerarCorAleatoria(): string {
    return String(`rgb(${Math.floor(Math.random()* 256)}, ${Math.floor(Math.random()* 256)}, ${Math.floor(Math.random()* 256)})`)
}

function gerarOpcoes(corCerta:string, quantidade: number): string[] {
    const opcoes: string[] = [];
    opcoes.push(corCerta);

    while(opcoes.length < quantidade) {
        const corAleatoria = gerarCorAleatoria();
        if (!opcoes.includes(corAleatoria)) {
            opcoes.push(corAleatoria);
        }
    }

    return opcoes.sort(() => Math.random() - 0.5);
}