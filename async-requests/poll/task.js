// Опрос
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

let pollId = null;

function loadPoll() {
    fetch('https://students.netoservices.ru/nestjs-backend/poll')
        .then(response => response.json())
        .then(data => {
            pollId = data.id;
            pollTitle.textContent = data.data.title;
            pollAnswers.innerHTML = '';

            // кнопки для каждого ответа
            data.data.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = 'poll__answer';
                button.textContent = answer;

                button.addEventListener('click', () => {
                    // Показываем диалоговое окно
                    alert('Спасибо, ваш голос засчитан!');
                    // Отправляем голос
                    sendVote(index);
                });

                pollAnswers.appendChild(button);
            });
        });
}

// Отправка голоса и получения результатов
function sendVote(answerIndex) {
    const data = `vote=${pollId}&answer=${answerIndex}`;

    // отправляем POST-запрос
    fetch('https://students.netoservices.ru/nestjs-backend/poll', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
            pollAnswers.innerHTML = '';

            // результаты
            showResults(data.stat);

            // Новый опрос через 3 сек - чтобы не нажимать кнопку обновления для след. вопроса
            setTimeout(() => {
                loadPoll();
            }, 3000);
        });
}

// Отображение результатов
function showResults(results) {
    const resultsTitle = document.createElement('div');
    resultsTitle.className = 'poll__title';
    resultsTitle.textContent = 'Результаты голосования:';
    pollAnswers.appendChild(resultsTitle);

    const totalVotes = results.reduce((sum, item) => sum + item.votes, 0);

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'poll__result';

        const percentage = totalVotes > 0 ? (result.votes / totalVotes * 100).toFixed(2) : 0;

        resultElement.textContent = `${result.answer}: ${percentage}%`;

        pollAnswers.appendChild(resultElement);
    });
}

loadPoll();
