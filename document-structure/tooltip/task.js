// Всплывающая подсказка
const elements = document.querySelectorAll('.has-tooltip');

elements.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();

        // Удаляем старую активную подсказку (уровень сложности #1) В один момент времени должна показываться только одна подсказка
        const tooltip = document.querySelector('.tooltip_active');
        if (tooltip) {
            tooltip.remove()
        }

        if (element.dataset.tooltipActive === 'true') {
            element.dataset.tooltipActive = 'false';
            return;
        }

        const tooltipClue = document.createElement('div');
        tooltipClue.className = 'tooltip tooltip_active';
        tooltipClue.textContent = element.title;

        // Добавляем в DOM, чтобы получить реальные размеры
        document.body.appendChild(tooltipClue);

        const rect = element.getBoundingClientRect();
        const position = element.dataset.position || 'bottom';

        // Устанавливаем позицию в зависимости от data-position (уровень сложности #2)
        /* Добавьте подсказке дополнительный атрибут data-position для настройки места появления подсказки:
        top - над текстом
        left - слева от текста
        right - справа от текста
        bottom - снизу от текста*/
        switch (position) {
            case 'top':
                tooltipClue.style.top = (rect.top - tooltipClue.offsetHeight) + 'px';
                tooltipClue.style.left = rect.left + 'px';
                break;
            case 'left':
                tooltipClue.style.top = rect.top + 'px';
                tooltipClue.style.left = (rect.left - tooltipClue.offsetWidth) + 'px';
                break;
            case 'right':
                tooltipClue.style.top = rect.top + 'px';
                tooltipClue.style.left = rect.right + 'px';
                break;
            case 'bottom':
            default:
                tooltipClue.style.top = rect.bottom + 'px';
                tooltipClue.style.left = rect.left + 'px';
                break;
        }

        tooltipClue.addEventListener('click', (close) => {
            close.stopPropagation();
            tooltipClue.remove();
            element.dataset.tooltipActive = 'false';
        });

        element.dataset.tooltipActive = 'true';
    });
});
