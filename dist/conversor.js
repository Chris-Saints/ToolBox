"use strict";
const input = document.getElementById("input");
const selectorDe = document.getElementById("converter-de");
const selectorPara = document.getElementById("converter-para");
const bntConverter = document.getElementById("converter-botao");
const displayResul = document.getElementById("display");
bntConverter.addEventListener("click", () => {
    const valor = parseFloat(input.value);
    if (isNaN(valor))
        return;
    const resultado = converter(valor, selectorDe.value, selectorPara.value);
    displayResul.textContent = resultado.toString();
});
function converter(valor, de, para) {
    const larguraW = window.innerWidth;
    const alturaH = window.innerHeight;
    //Conversor Distancia
    if ((de === "km" && para === "hm") || (de === "hm" && para === "dam") || (de === "dam" && para === "m") || (de === "m" && para === "dm") || (de === "dm" && para === "cm") || (de === "cm" && para === "mm")) {
        return valor * 10;
    }
    if ((de === "mm" && para === "cm") || (de === "cm" && para === "dm") || (de === "dm" && para === "m") || (de === "m" && para === "dam") || (de === "dam" && para === "hm") || (de === "hm" && para === "km")) {
        return valor / 10;
    }
    if ((de === "km" && para === "dam") || (de === "hm" && para === "m") || (de === "dam" && para === "dm") || (de === "m" && para === "cm") || (de === "dm" && para === "mm")) {
        return valor * 100;
    }
    if ((de === "mm" && para === "dm") || (de === "cm" && para === "m") || (de === "dm" && para === "dam") || (de === "m" && para === "hm") || (de === "dam" && para === "km")) {
        return valor / 100;
    }
    if ((de === "km" && para === "m") || (de === "hm" && para === "dm") || (de === "dam" && para === "cm") || (de === "m" && para === "mm")) {
        return valor * 1000;
    }
    if ((de === "mm" && para === "m") || (de === "cm" && para === "dam") || (de === "dm" && para === "hm") || (de === "m" && para === "km")) {
        return valor / 1000;
    }
    if ((de === "km" && para === "dm") || (de === "hm" && para === "cm") || (de === "dam" && para === "mm")) {
        return valor * 10000;
    }
    if ((de === "mm" && para === "dam") || (de === "cm" && para === "hm") || (de === "dm" && para === "km")) {
        return valor / 10000;
    }
    if ((de === "km" && para === "cm") || (de === "hm" && para === "mm")) {
        return valor * 100000;
    }
    if ((de === "mm" && para === "hm") || (de === "cm" && para === "km")) {
        return valor / 100000;
    }
    if ((de === "km" && para === "mm")) {
        return valor * 1000000;
    }
    if ((de === "mm" && para === "km")) {
        return valor / 1000000;
    }
    //Conversor Temperatura
    if ((de === "celsius" && para === "kelvin")) {
        return (valor * 9 / 5) + 32;
    }
    if ((de === "celsius" && para === "fahrenheit")) {
        return valor + 273.15;
    }
    if ((de === "kelvin" && para === "celsius")) {
        return valor - 273.15;
    }
    if ((de === "kelvin" && para === "fahrenheit")) {
        return (valor - 273.15) * 9 / 5 + 32;
    }
    if ((de === "fahrenheit" && para === "celsius")) {
        return (valor - 32) * 5 / 9;
    }
    if ((de === "fahrenheit" && para === "kelvin")) {
        return (valor - 32) * 5 / 9 + 273.15;
    }
    //Conversor Tempo
    if ((de === "dia" && para === "hr")) {
        return valor * 24;
    }
    if ((de === "dia" && para === "min")) {
        return valor * 1440;
    }
    if ((de === "dia" && para === "seg")) {
        return valor * 8400;
    }
    if ((de === "hr" && para === "dia")) {
        return valor / 24;
    }
    if ((de === "hr" && para === "seg")) {
        return valor * 120;
    }
    if ((de === "min" && para === "dia")) {
        return valor / 1440;
    }
    if ((de === "seg" && para === "dia")) {
        return valor / 8400;
    }
    if ((de === "seg" && para === "hr")) {
        return valor / 120;
    }
    if ((de === "hr" && para === "min") || (de === "min" && para === "seg")) {
        return valor * 60;
    }
    if ((de === "min" && para === "hr") || (de === "seg" && para === "min")) {
        return valor / 60;
    }
    //Conversor CSS
    if ((de === "px" && para === "em") || (de === "px" && para === "rem")) {
        return valor / 16;
    }
    if ((de === "em" && para === "px") || (de === "rem" && para === "px")) {
        return valor * 16;
    }
    if (de === "px" && para === "vw") {
        return (valor / larguraW) * 100;
    }
    if (de === "px" && para === "vh") {
        return (valor / alturaH) * 100;
    }
    if (de === "vh" && para === "px") {
        return valor * (alturaH / 100);
    }
    if (de === "vw" && para === "px") {
        return valor * (larguraW / 100);
    }
    if ((de === "vh" && para === "em") || (de === "vh" && para === "rem")) {
        return 16 * (valor * (alturaH / 100));
    }
    if ((de === "vw" && para === "em") || (de === "vw" && para === "rem")) {
        return 16 * (valor * (larguraW / 100));
    }
    if ((de === "em" && para === "vw") || (de === "rem" && para === "vw")) {
        return ((valor / 16) / larguraW) * 100;
    }
    if ((de === "em" && para === "vh") || (de === "rem" && para === "vh")) {
        return ((valor / 16) / alturaH) * 100;
    }
    if (de === para) {
        return valor;
    }
    return 0;
}
