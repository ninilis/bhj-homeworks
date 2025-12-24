// Игра-кликер Повышенный уровень сложности
const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');
const clickerSpeed = document.getElementById('clicker__speed');

let Big = false; // флаг для отслеживания

let lastClick = Date.now();
let currenSpeed = 0;

function speed() {
    const now = Date.now(); // мс
    const delta = (now - lastClick) / 1000; // сек
    if (delta > 0) {
        currenSpeed = 1 / delta;
        clickerSpeed.textContent = currenSpeed.toFixed(2);
    }
    lastClick = now;
}

cookie.onclick = function() {
    let currentCount = parseInt(clickerCounter.textContent);
    clickerCounter.textContent = currentCount + 1;

    speed()

    if(Big) {
        cookie.width = 200;
    } else {
        cookie.width = 250;
    }
    Big = !Big
}
