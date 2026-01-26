function elementView(element) {
    const rect = element.getBoundingClientRect();
    return ( // проверка на видимость
        rect.top >= 0 && // верхняя граница не выше окна
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && // нижняя граница не ниже
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function elementAppeared () {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => {
        if (elementView(element)) {
            element.classList.add('reveal_active');
        } else {
            element.classList.remove('reveal_active');
        }
    });
}

window.addEventListener('scroll', elementAppeared);
