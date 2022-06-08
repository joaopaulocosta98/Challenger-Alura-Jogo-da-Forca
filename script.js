/* VARIAVEIS E CONSTANTES*/
var wordsAdded = ["JAVASCRIPT", "HTML", "ALURA", "CSS", "NODE", "FRAMEWORK", "JAVA", "GIT", "WINDOWS", "MAC", "INTERNET", "TCP", "DNS", "HTTP", "LINUX", "BOOTSTRAP", "FRONTEND", "BACKEND"];
const tentativas = 6;

/* VARIAVEIS DE CONTROLE */
var secretWord = "";
var tentativasRestantes = tentativas;
var listaDinamica = [];

/* SELETORES */
const btnStart = document.getElementById("btnStart");
const btnAddWords = document.getElementById("btnAddWord");
const btnCancelGame = document.getElementById("btnCancelGame");
const btnSave = document.getElementById("btnSave");
const btnCancelAdd = document.getElementById("btnCancelAdd");
const btnNewGame = document.getElementById("btnNewGame");
const homePage = document.getElementById("homePage");
const addPage = document.getElementById("addPage");
const gamePage = document.getElementById("gamePage");
const inputWordToAdd = document.getElementById('textInput');
const palavraSecreta = document.getElementById("palavra-secreta");
const forca = document.getElementById("forca");


/* PRINCIPAL */

btnStart.addEventListener("click", () => {
    console.log("Jogo iniciado...");
    initGamePage();
    newGame();
    
});

btnCancelGame.addEventListener("click", () => {
    initHomePage();
});

btnAddWords.addEventListener("click", () => {
    console.log("Adicionando palavras a lista...");
    initAddPage();
});

btnSaveWord.addEventListener("click", () => {
    var wordToAdd = inputWordToAdd.value.toUpperCase();
    var status = false;
    for (let i = 0; i < wordToAdd.length; i++){
        if (wordToAdd[i] == " ") {
            status = true;
        }
    }
    if (wordToAdd.length > 8 || status == true) {
        alert("A palavra está fora das especificações!!!");
        inputWordToAdd.value = " ";
    }
    else {
        inputWordToAdd.value = " ";
        wordsAdded.push(wordToAdd);
        initGamePage();
    }
})

btnCancelAdd.addEventListener("click", () => {
    initHomePage();
});

btnNewGame.addEventListener("click", () => {
    newGame();
})

/* FUNÇÕES */

function initGamePage() {
    gamePage.classList.remove("invisible");
    homePage.classList.add("invisible");
    addPage.classList.add("invisible");
}

function initAddPage() {
    gamePage.classList.add("invisible");
    homePage.classList.add("invisible");
    addPage.classList.remove("invisible");
}

function initHomePage() {
    gamePage.classList.add("invisible");
    homePage.classList.remove("invisible");
    addPage.classList.add("invisible");
}

function choosingWord(wordsAdded) {
    let index = [Math.floor(Math.random() * wordsAdded.length)];
    return wordsAdded[index];
}

function newGame() {
    tentativasRestantes = tentativas;                         // Reseta tentativas
    secretWord = choosingWord(wordsAdded);                    // Sorteia nova palavra
    console.log("A palavra secreta é: " + secretWord);
    for (let i = 0; i < listaDinamica.length; i++){           // Reinicia listaDinamica
        listaDinamica[i] = undefined;
    }
    putWordsOnTheScreen();                                    // Coloca traços na tela
    loadingImagesHangedMan(tentativas);                       // Reseta a forca   
    
    var teclas = document.querySelectorAll(".teclas button"); // Reinicia teclado
    teclas.forEach(tecla => {                               
        tecla.classList.remove('LetraPressionada');
        tecla.disabled = false;
    })
}

function checkLetterTyped(letter) {
    document.getElementById(`tecla-${letter}`).disabled = true;
    if (tentativasRestantes > 0) {
        addStyleLetter(`tecla-${letter}`);
        compareLists(letter);
        putWordsOnTheScreen();
    }      
    
}

function addStyleLetter(id) {
    var elementDiv = document.getElementById(id);
    elementDiv.classList.add("LetraPressionada");
}

function putWordsOnTheScreen() {
    palavraSecreta.innerHTML = "";
    for (let i = 0; i < secretWord.length; i++) {
        if (listaDinamica[i] == undefined) {
            listaDinamica[i] = "&nbsp";
            palavraSecreta.innerHTML = palavraSecreta.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>";
        }
        else {
            palavraSecreta.innerHTML = palavraSecreta.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>";
        }
    }
}

function compareLists(letter) {
    const position = secretWord.indexOf(letter);
    if (position < 0) {
        tentativasRestantes--;   
        loadingImagesHangedMan(tentativasRestantes);
        if (tentativasRestantes === 0) {
            let messageBody = `Voce perdeu! A palavra secreta era: <br><strong>${secretWord}</strong>`;
            let messageTitle = "Não foi desta vez :(";
            var teclas = document.querySelectorAll(".teclas button");
            teclas.forEach(tecla => {                                   // Desabilita teclado
                tecla.disabled = true;
            })
            openModal(messageBody, messageTitle);
        }
    }
    else {
        for (let i = 0; i < secretWord.length; i++){
            if (secretWord[i] == letter) {
                listaDinamica[i] = letter;
            }
        }
    }

    let victory = true;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] != listaDinamica[i]) {
            victory = false;
        }
    }

    if (victory) {
        let messageBody = "Parabéns, vamos dificultar na próxima.";
        let messageTitle = "Uhuuuuuuul, você acertou!";
        openModal(messageBody, messageTitle);
        tentativasRestantes = 0;
        var teclas = document.querySelectorAll(".teclas button"); 
        teclas.forEach(tecla => {                                   // Desabilita teclado
            tecla.disabled = true;
        })
    }
}

function loadingImagesHangedMan(tentativasRestantes) {
    switch (tentativasRestantes) {
        case 5:
            forca.style.backgroundImage = "url('img/forca01.png')";
            break;
        case 4:
            forca.style.backgroundImage = "url('img/forca02.png')";
            break;
        case 3:
            forca.style.backgroundImage = "url('img/forca03.png')";
            break;
        case 2:
            forca.style.backgroundImage = "url('img/forca04.png')";
            break;
        case 1:
            forca.style.backgroundImage = "url('img/forca05.png')";
            break;
        case 0:
            forca.style.backgroundImage = "url('img/forca06.png')";
            break;
        default:
            forca.style.backgroundImage = "url('img/forca.png')";
    }
}

function openModal(messageBody, messageTitle) {
    let modalBody = document.getElementById("messageModal");
    let modalTitle = document.getElementById("exampleModalLabel");
    modalBody.innerHTML = messageBody;
    modalTitle.innerText = messageTitle;
    $("#myModal").modal({
        show: true
    });
}