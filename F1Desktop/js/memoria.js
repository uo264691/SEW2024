class Memoria {
    constructor() {
        this.elements = [
            { element: 'RedBull', source: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg' },
            { element: 'RedBull', source: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg' },
            { element: 'McLaren', source: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg' },
            { element: 'McLaren', source: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg' },
            { element: 'Alpine', source: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg' },
            { element: 'Alpine', source: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg' },
            { element: 'AstonMartin', source: 'https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg' },
            { element: 'AstonMartin', source: 'https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg' },
            { element: 'Ferrari', source: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg' },
            { element: 'Ferrari', source: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg' },
            { element: 'Mercedes', source: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg' },
            { element: 'Mercedes', source: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg' },
        ];

        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        this.elements.sort(() => Math.random() - 0.5);
    }


    createElements() {
        const tablero = document.querySelector('main section');

        const titulo = document.createElement('h3');
        titulo.textContent = 'Juego de Memoria';
        tablero.appendChild(titulo);

        this.elements.forEach(item => {
            const card = document.createElement('article');
            card.setAttribute('data-element', item.element);
            card.innerHTML = `
                <h4>Tarjeta de memoria</h4>
                <img src="${item.source}" alt="${item.element}">
            `;
            tablero.appendChild(card);
        });
    }

    addEventListeners() {
        document.querySelectorAll('main section article').forEach(card => {
            card.addEventListener('click', this.flipCard.bind(this, card));
        });
    }

    flipCard(card) {
        if (this.lockBoard || card === this.firstCard || card.getAttribute("data-state") === 'revealed') return;

        card.style.transform = 'rotateY(180deg)';
        card.setAttribute('data-state', 'flip');

        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = card;
            return;
        }

        this.secondCard = card;
        this.checkForMatch();
    }

    checkForMatch() {
        const isMatch = this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element");
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');
        this.resetBoard();
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.style.transform = '';
            this.secondCard.style.transform = '';
            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Memoria();
});
