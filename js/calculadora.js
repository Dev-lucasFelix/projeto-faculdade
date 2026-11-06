"use strict";

const formImc = document.querySelector("#form-imc");
const formCreatina = document.querySelector("#form-creatina");
const resultadoImc = document.querySelector("#resultado-imc");
const resultadoCreatina = document.querySelector("#resultado-creatina");

function mostrarResultado(elemento, titulo, mensagem, erro = false) {
    elemento.innerHTML = "";
    elemento.classList.toggle("erro", erro);

    const destaque = document.createElement("strong");
    destaque.textContent = titulo;
    elemento.append(destaque, document.createTextNode(mensagem));
    elemento.hidden = false;
}

function obterNumeroValido(input, minimo, maximo) {
    const valor = Number(input.value);

    if (!input.value || !Number.isFinite(valor) || valor < minimo || valor > maximo) {
        return null;
    }

    return valor;
}

formImc.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const peso = obterNumeroValido(formImc.elements.peso, 1, 500);
    const alturaEmCm = obterNumeroValido(formImc.elements.altura, 50, 250);

    if (peso === null || alturaEmCm === null) {
        mostrarResultado(resultadoImc, "Confira os dados", "Informe um peso entre 1 e 500 kg e uma altura entre 50 e 250 cm.", true);
        return;
    }

    const alturaEmMetros = alturaEmCm / 100;
    const imc = peso / (alturaEmMetros * alturaEmMetros);
    let classificacao;

    if (imc < 18.5) {
        classificacao = "abaixo do peso";
    } else if (imc < 25) {
        classificacao = "na faixa de peso considerada adequada";
    } else if (imc < 30) {
        classificacao = "com sobrepeso";
    } else if (imc < 35) {
        classificacao = "com obesidade grau I";
    } else if (imc < 40) {
        classificacao = "com obesidade grau II";
    } else {
        classificacao = "com obesidade grau III";
    }

    mostrarResultado(resultadoImc, `Seu IMC é ${imc.toFixed(1).replace(".", ",")}`, `A referência para adultos indica resultado ${classificacao}. O IMC é apenas um indicador e não considera todos os aspectos da saúde.`);
});

formCreatina.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const peso = obterNumeroValido(formCreatina.elements.peso, 1, 500);

    if (peso === null) {
        mostrarResultado(resultadoCreatina, "Confira o peso", "Informe um peso entre 1 e 500 kg.", true);
        return;
    }

    const doseDiaria = peso * 0.03;
    mostrarResultado(resultadoCreatina, `Estimativa: ${doseDiaria.toFixed(1).replace(".", ",")} g por dia`, "Cálculo de referência baseado em 0,03 g por kg de peso corporal. Confirme a dose apropriada com um profissional de saúde.");
});
