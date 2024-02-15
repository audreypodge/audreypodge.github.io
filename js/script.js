document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const images = [];
    for (let i = 1; i <= 10; i++) {
        images.push(`assets/p${i}.jpg`, `assets/p${i}.jpg`); // Duplicate each image for pairing
    }

    // Shuffle images
    images.sort(() => Math.random() - 0.5);

    images.forEach(imageSrc => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = "Memory Game Image";
        cardBack.appendChild(img);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        board.appendChild(card);

        card.addEventListener('click', () => {
            card.classList.add('flipped');
            checkForMatch();
        });
    });

    let flippedCards = [];
    let matchesFound = 0;

    function checkForMatch() {
        flippedCards = document.querySelectorAll('.flipped:not(.match)');
        if (flippedCards.length === 2) {
            const img1 = flippedCards[0].querySelector('img').src;
            const img2 = flippedCards[1].querySelector('img').src;
            if (img1 === img2) {
                flippedCards.forEach(card => card.classList.add('match'));
                matchesFound += 1;
                if (matchesFound === 10) { // Assuming there are 10 pairs
                    setTimeout(() => {
                        alert('Congratulations! You found all matches!');
                        showSurpriseLink();
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove('flipped'));
                }, 1000);
            }
        }
    }
    
    function showSurpriseLink() {
        const board = document.getElementById('game-board');
        board.innerHTML = '<p>Congratulations! <a href="../assets/dog1.jpg" target="_blank">Click here</a> to receive your prize!</p>';
        board.style.display = 'flex';
        board.style.flexDirection = 'column';
        board.style.alignItems = 'center';
        board.style.justifyContent = 'center';
        board.style.height = '200px';
    }
    
});