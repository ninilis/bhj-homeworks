// Таймер обратного отсчёта
const timerElement = document.getElementById('timer');
let timerStart = parseInt(timerElement.textContent);

function updateTimer() {
    timerStart = timerStart - 1
    timerElement.textContent = timerStart;

    if (timerStart <= 0) {
        clearInterval(timerInterval);
        alert('Вы победили в конкурсе №1!');
    }
}
const timerInterval = setInterval(updateTimer, 1000);


// Повышенный уровень сложности #1 (Вопрос - можно ли использовать библиотеки? Тут ручной ввод функции)
function formatTime(sec) {
    const hours = Math.floor(sec / 3600); // округл.вниз
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60; // остаток
    const formatHours = hours.toString().padStart(2, '0');
    const formatMinutes = minutes.toString().padStart(2, '0');
    const formatSeconds = seconds.toString().padStart(2, '0');
    return formatHours + ':' + formatMinutes + ':' + formatSeconds;
}

const timerElement2 = document.getElementById('timer2');
let timerStart2 = parseInt(timerElement2.textContent);
timerElement2.textContent = formatTime(timerStart2);

function updateTimer2() {
    timerStart2 = timerStart2 - 1
    timerElement2.textContent = timerStart2;
    timerElement2.textContent = formatTime(timerStart2);

    if (timerStart2 <= 0) {
        clearInterval(timerInterval2);
        alert('Вы победили в конкурсе №2!');

        // Повышенный уровень сложности #2
        const link = document.createElement('a'); //скрыт.ссылка с атрибутом а
        link.href = 'http://hello.kitty/file.zip';
        link.download = 'kitty.zip';
        link.target = '_blank';

        link.style.display = 'none'; //невидимая ссылка
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
const timerInterval2 = setInterval(updateTimer2, 1000);
