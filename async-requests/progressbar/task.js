// Загрузка больших файлов
const progress = document.getElementById('progress');
const form = document.getElementById('form');
const fileInput = document.getElementById('file');
const fileNameSpan = document.querySelector('.input__wrapper-desc');

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameSpan.textContent = fileInput.files[0].name;
    } else {
        fileNameSpan.textContent = 'Имя файла...';
    }
});

// Обработка отправки формы
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
        alert('Выберите файл для загрузки');
        return;
    }

    const formData = new FormData(form);

    // XMLHttpRequest для отслеживания прогресса
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            // Вычисляем прогресс от 0 до 1
            const percentComplete = event.loaded / event.total;
            progress.value = percentComplete;
        }
    });

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
});
