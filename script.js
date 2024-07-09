//Seleciona elementos do DOM e armazena referências a eles em variáveis
//Armazenando referências a elementos específicos do DOM em variáveis para que possam ser manipulados no script
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let novojogoBtn = document.getElementById("novo-jogo");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("mensagem");

//Definindo um array para determinar as combinações vencedoras
//Cada sub-array representa uma combinação de índices que, se preenchidos por um jogador, resultam em uma vitória.
let winningPattern = [
    [0, 1, 2], 
    [0, 3, 6], 
    [2, 5, 8], 
    [6, 7, 8], 
    [3, 4, 5], 
    [1, 4, 7], 
    [0, 4, 8], 
    [2, 4, 6]
];

//O jogador 'X' joga primeiro, 'xTurn' controla de quem é a vez, no caso do 'X'
// count é um contador para contar o número de jogadas feitas
let xTurn = true;
let count = 0;

//Desativar todos os botões, quando desativados os botões não podem ser clicados e o popup é mostrado
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //Ativar popup
    popupRef.classList.remove("hide");
}

//Ativar todos os botões para o novo jovo e para reiniciar jogo
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //desativar popup
    popupRef.classList.add("hide");
};

//Funcão é chamada quando um jogador ganha, a função desativa os botões
//Exibindo a mensagem de vitória
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F601; <br> X Venceu!";
    }else {
        msgRef.innerHTML = "&#x1F601; <br> O Venceu!";
    }
};

//Função de empate, ela desativa todos os botões e exibe a mensagem de empate
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F605; <br> EMPATOU!";
};

//Função para novo jogo, ao clicar no botão novo jogo a contagem é redefinida e ativa os botões
novojogoBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
//Reiniciar jogo, ao clicar em reiniciar é redefinindo a contagem e ativação dos botões.
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});



//Lógica da vitória, esta função verifica após cada jogada se há uma combinação vencedora
//Conforme foi estabelecido lá no array as possíveis combinações de vitória
const winChecker = () => {
    //Pecorre todos os padrões de vitória
    for(let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];
        //Verifica se os elementos estão preenchidos
        //Se 3 elementos vazios forem iguais
        if(element1 != "" && (element2 != "") && (element3 != "")){
            if(element1 == element2 && element2 == element3){
                //Se todos os 3 botões tiverem o mesmo valor, passa o valor para a função de vencedor
                winFunction(element1);
            }
        }
    }
};

//Exibir X/O ao clicar, ao clicar altera entre 'X' e 'O'
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //Exibe X
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;
            //Exibe O
            element.innerText = "O";
            element.disabled = true;
        }
        //Incrementa a contagem em cada clique
        //Verifica se o jogo terminou em empate após 9 jogadas
        count += 1;
        if (count == 9){
            drawFunction();
        }
        //Verifica a vitória em cada clique
        winChecker(); 
    });
});

//Ativar os botões e desativar o pop-up no carregamento da página
window.onload = enableButtons;
