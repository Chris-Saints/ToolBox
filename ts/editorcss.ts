const brilho = document.getElementById("slider-brilho") as HTMLInputElement;
const opacidade = document.getElementById("slider-opacidade") as HTMLInputElement;
const rotacao = document.getElementById("slider-rotacao") as HTMLInputElement;
const sombra = document.getElementById("slider-sombra") as HTMLInputElement;
const borda = document.getElementById("slider-borda") as HTMLInputElement;
const quadrado = document.getElementById("quadrado") as HTMLElement;
const borderRadius = document.getElementById("slider-border-radius") as HTMLInputElement;
const scale = document.getElementById("slider-scale") as HTMLInputElement;
const skewx = document.getElementById("slider-skewx") as HTMLInputElement;
const skewy = document.getElementById("slider-skewy") as HTMLInputElement;
const saturacao = document.getElementById("slider-saturacao") as HTMLInputElement;

const botaoVermelho = document.getElementById("vermelho") as HTMLButtonElement;
const botaoAzul = document.getElementById("azul") as HTMLButtonElement;
const botaoAmarelo = document.getElementById("amarelo") as HTMLButtonElement;
const botaoVerde = document.getElementById("verde") as HTMLButtonElement;
const botaoRoxo = document.getElementById("roxo") as HTMLButtonElement;
const botaoLaranja = document.getElementById("laranja") as HTMLButtonElement;
const botaoCinza = document.getElementById("cinza") as HTMLButtonElement;
const botaoBranco = document.getElementById("branco") as HTMLButtonElement;
const botaoPreto = document.getElementById("preto") as HTMLButtonElement;
const botaoRosa = document.getElementById("rosa") as HTMLButtonElement;


brilho.addEventListener("input", () => {
    const valor = brilho.value;
    quadrado.style.filter = `brightness(${valor})`;
});

opacidade.addEventListener("input", () => {
    const valor = opacidade.value;
    quadrado.style.opacity = `${valor}`;
});

rotacao.addEventListener("input", () => {
    const valor = rotacao.value;
    quadrado.style.transform = `rotate(${valor}deg)`;
});

sombra.addEventListener("input", () => {
    const valor = sombra.value;    
    quadrado.style.boxShadow = `0 0 20px ${valor}px rgba(0, 0, 0, 0.5)`;
});

borda.addEventListener("input", () => {
    const valor = borda.value;    
    quadrado.style.border = `solid ${valor}px #000000`;
});

borderRadius.addEventListener("input", () => {
    const valor = borderRadius.value;    
    quadrado.style.borderRadius = `${valor}%`;
});

scale.addEventListener("input", () => {
    const valor = scale.value;    
    quadrado.style.scale = `${valor}`;
});

skewx.addEventListener("input", () => {
    const valor = skewx.value;    
    quadrado.style.transform = `skewX(${valor}deg)`;
});

skewy.addEventListener("input", () => {
    const valor = skewy.value;    
    quadrado.style.transform = `skewY(${valor}deg)`;
});

saturacao.addEventListener("input", () => {
    const valor = saturacao.value;    
    quadrado.style.filter = `saturate(${valor}%) contrast(${valor}%)`;
});



botaoAmarelo.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `yellow`;
});

botaoVermelho.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `red`;
});

botaoVerde.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `green`;
});

botaoAzul.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `blue`;
});

botaoLaranja.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `orange`;
});

botaoPreto.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `black`;
});

botaoBranco.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `white`;
});

botaoCinza.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `gray`;
});

botaoRosa.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `pink`;
});

botaoRoxo.addEventListener("click", () =>{
    quadrado.style.backgroundColor = `purple`;
});