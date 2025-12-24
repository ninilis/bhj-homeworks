// Игра «Убей кротов»
function getHole(index) {
    return document.getElementById('hole' + index);
}

const winCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

function resetGame() {
    winCounter.textContent = 0;
    lostCounter.textContent = 0;
}

function game() {
    const win = parseInt(winCounter.textContent);
    const lost = parseInt(lostCounter.textContent);

    if (win === 10) {
        alert('Вайяя какая победа! Кроты-хомяки побеждены!');
        resetGame();
    } else if (lost === 5) {
        alert ('Поражение :( Кроты оказались зрячее')
        resetGame();
    }
}

// 9 лунок
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);

    hole.onclick = function () {
        if(this.className.includes('hole_has-mole')) {
            // попадание
            let win = parseInt(winCounter.textContent);
            winCounter.textContent = win + 1;
        } else { // промах
            let lost = parseInt(lostCounter.textContent);
            lostCounter.textContent = lost + 1;
        }
        game()
    }
}
