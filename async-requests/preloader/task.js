// Загрузка
const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

// Функция для загрузки данных
function loadCurrencyData() {
    // лоадер
    loader.classList.add('loader_active');

    // запрос
    fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {

            itemsContainer.innerHTML = '';

            const valutes = data.response.Valute;

            // элементы для каждой валюты
            for (const key in valutes) {
                if (valutes.hasOwnProperty(key)) {
                    const valute = valutes[key];

                    // контейнер для валюты
                    const item = document.createElement('div');
                    item.className = 'item';

                    // код валюты
                    const code = document.createElement('div');
                    code.className = 'item__code';
                    code.textContent = valute.CharCode;

                    // значение
                    const value = document.createElement('div');
                    value.className = 'item__value';
                    value.textContent = valute.Value.toFixed(4);

                    // валюта
                    const currency = document.createElement('div');
                    currency.className = 'item__currency';
                    currency.textContent = 'руб.';

                    // добавляем элементы
                    item.appendChild(code);
                    item.appendChild(value);
                    item.appendChild(currency);
                    itemsContainer.appendChild(item);
                }
            }

            // Скрываем лоадер
            loader.classList.remove('loader_active');

            // localStorage
            localStorage.setItem('currencyData', JSON.stringify(data));
            localStorage.setItem('currencyTimestamp', Date.now());
        })
        .catch(error => {
            console.error('Ошибка:', error);
            loader.classList.remove('loader_active');
        });
}

// Проверяем, есть ли сохраненные данные
const savedData = localStorage.getItem('currencyData');
const savedTime = localStorage.getItem('currencyTimestamp');
const currentTime = Date.now();

// сохраненные данные и им меньше 5 минут
if (savedData && savedTime && (currentTime - savedTime < 300000)) {
    const data = JSON.parse(savedData);
    const valutes = data.response.Valute;

    for (const key in valutes) {
        if (valutes.hasOwnProperty(key)) {
            const valute = valutes[key];

            const item = document.createElement('div');
            item.className = 'item';

            const code = document.createElement('div');
            code.className = 'item__code';
            code.textContent = valute.CharCode;

            const value = document.createElement('div');
            value.className = 'item__value';
            value.textContent = valute.Value.toFixed(4);

            const currency = document.createElement('div');
            currency.className = 'item__currency';
            currency.textContent = 'руб.';

            item.appendChild(code);
            item.appendChild(value);
            item.appendChild(currency);
            itemsContainer.appendChild(item);
        }
    }

    loadCurrencyData();
} else {
    loadCurrencyData();
}
