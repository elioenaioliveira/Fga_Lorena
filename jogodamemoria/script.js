const memoryGame = document.querySelector('.memory-game');
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Array com os nomes dos arquivos de imagem dos animais (certifique-se de ter essas imagens na mesma pasta ou ajuste os caminhos)
const animais = [
    'cao.png',
    'gato.png',
    'elefante.png',
    'leao.png'
];

// Duplica o array de animais para ter os pares
const dadosCartas = [...animais, ...animais];

// Função para embaralhar as cartas
function embaralharCartas() {
    dadosCartas.sort(() => Math.random() - 0.5);
}

// Função para criar as cartas no HTML
function criarCartas() {
    dadosCartas.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.animal = animal;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        const img = document.createElement('img');
        img.src = `imagens/${animal}`; // Assumindo que as imagens estão em uma pasta chamada 'imagens'
        img.alt = animal;
        backFace.appendChild(img);

        card.appendChild(frontFace);
        card.appendChild(backFace);
        memoryGame.appendChild(card);

        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Primeiro clique
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segundo clique
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

embaralharCartas();
criarCartas();