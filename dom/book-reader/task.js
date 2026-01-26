document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    const fontSize = document.querySelector('.book__control_font-size');
    const color = document.querySelector('.book__control_color');
    const background = document.querySelector('.book__control_background');

    fontSize.addEventListener('click', function(fs) {
        fs.preventDefault();
        const target = fs.target;

        if (!target.classList.contains('font-size')) return;

        this.querySelectorAll('.font-size').forEach(btn => {
            btn.classList.remove('font-size_active');
        });
        target.classList.add('font-size_active');

        book.classList.remove('book_fs-small', 'book_fs-big');

        if (target.dataset.size === 'small') {
            book.classList.add('book_fs-small')
        } else if (target.dataset.size === 'big') {
            book.classList.add('book_fs-big')
        }
    });

    // Цвет текста
    if (color) {
        color.addEventListener('click', function(cl) {
            cl.preventDefault();
            const target = cl.target;

            if (!target.classList.contains('color')) return;

            this.querySelectorAll('.color').forEach(btn => {
                btn.classList.remove('color_active');
            });
            target.classList.add('color_active');

            book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');

            const textColor = target.dataset.textColor;
            if (textColor) {
                book.classList.add(`book_color-${textColor}`);
            }
        });
    }

    // Цвет фона
    if (background) {
        background.addEventListener('click', function(bg) {
            bg.preventDefault();
            const target = bg.target;

            if (!target.classList.contains('color')) return;

            this.querySelectorAll('.color').forEach(btn => {
                btn.classList.remove('color_active');
            });
            target.classList.add('color_active');

            book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');

            const bgColor = target.dataset.bgColor;
            if (bgColor) {
                book.classList.add(`book_bg-${bgColor}`);
            }
        });
    }
});
