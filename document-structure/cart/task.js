// Корзина товаров
// +/- количества товаров
document.querySelectorAll('.product__quantity-control').forEach(control => {
    control.addEventListener('click', (event) => {
        const controls = event.currentTarget.closest('.product__quantity-controls');
        const valueElement = controls.querySelector('.product__quantity-value');
        let value = parseInt(valueElement.textContent);

        if (event.currentTarget.classList.contains('product__quantity-control_dec')) {
            if (value > 1) { //не меньше 1
                value--;
            }
        } else if (event.currentTarget.classList.contains('product__quantity-control_inc')) {
            value++;
        }

        valueElement.textContent = value;
    });
});

// Повышенный уровень сложности 1 - удаление товаров из корзины
function updateCart() {
    const cart = document.querySelector('.cart');
    const cartTitle = document.querySelector('.cart__title');
    const cartProducts = document.querySelector('.cart__products');
    const hasProducts = cartProducts.children.length > 0;

    if (hasProducts) {
        cart.style.display = 'block';
        cartTitle.style.display = 'block';
    } else {
        cart.style.display = 'none';
        cartTitle.style.display = 'none';
    }
}

// Повышенный уровень сложности 2 - анимация перемещения
function animate(productImage, productId, quantity) {
    const flyingImage = document.createElement('img');
    flyingImage.src = productImage;
    flyingImage.className = 'product-flying';

    // стартовая позиция
    const product = document.querySelector(`.product[data-id="${productId}"] .product__image`);
    const productRect = product.getBoundingClientRect();
    flyingImage.style.left = productRect.left + 'px';
    flyingImage.style.top = productRect.top + 'px';

    document.body.appendChild(flyingImage);

    // находим целевой товар в корзине
    const cartProducts = document.querySelector('.cart__products');
    const targetProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

    if (targetProduct) {
        const targetRect = targetProduct.getBoundingClientRect();
        const targetLeft = targetRect.left + targetRect.width / 2;
        const targetTop = targetRect.top + targetRect.height / 2;

        // Анимация
        setTimeout(() => {
            flyingImage.style.left = (targetLeft - 10) + 'px';
            flyingImage.style.top = (targetTop - 10) + 'px';
            flyingImage.style.width = '20px';
            flyingImage.style.height = '20px';
            flyingImage.style.opacity = '0.5';
        }, 10);
    }

    setTimeout(() => {
        flyingImage.remove();
    }, 510);
}


// Повышенный уровень сложности 3 - сохранение в localStorage
function saveCart() {
    const cartProducts = document.querySelectorAll('.cart__product');
    const cartData = [];

    cartProducts.forEach(product => {
        const productId = product.dataset.id;
        const productImage = product.querySelector('.cart__product-image').src;
        const productCount = parseInt(product.querySelector('.cart__product-count').textContent);

        cartData.push({
            id: productId,
            image: productImage,
            count: productCount
        });
    });

    localStorage.setItem('cart', JSON.stringify(cartData));
}

function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    savedCart.forEach(item => {
        const cart = document.querySelector('.cart__products');
        const existingProduct = cart.querySelector(`.cart__product[data-id="${item.id}"]`);

        if (existingProduct) {
            const countElement = existingProduct.querySelector('.cart__product-count');
            const currentCount = parseInt(countElement.textContent);
            countElement.textContent = currentCount + item.count;
        } else {
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = item.id;

            const image = document.createElement('img');
            image.className = 'cart__product-image';
            image.src = item.image;

            const count = document.createElement('div');
            count.className = 'cart__product-count';
            count.textContent = item.count;

            const removeBtn = document.createElement('div');
            removeBtn.className = 'cart__product-remove';
            removeBtn.textContent = '×';

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cartProduct.remove();
                updateCart();
                saveCart();
            });

            cartProduct.appendChild(image);
            cartProduct.appendChild(count);
            cartProduct.appendChild(removeBtn);
            cart.appendChild(cartProduct);
        }
    });

    updateCart();
}

// Добавления в корзину
document.querySelectorAll('.product__add').forEach(addButton => {
    addButton.addEventListener('click', (event) => {
        const product = event.currentTarget.closest('.product');
        const productId = product.dataset.id;
        const productImage = product.querySelector('.product__image').src;
        const quantity = parseInt(product.querySelector('.product__quantity-value').textContent);

        // Ищем товар в корзине
        const cart = document.querySelector('.cart__products');
        const existingProduct = cart.querySelector(`.cart__product[data-id="${productId}"]`);

        if (existingProduct) {
            // если товар уже есть - увеличиваем количество
            const countElement = existingProduct.querySelector('.cart__product-count');
            const currentCount = parseInt(countElement.textContent);
            countElement.textContent = currentCount + quantity;

            animate(productImage, productId, quantity);
        } else {
            // если товара нет - создаем новый элемент
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = productId;

            const image = document.createElement('img');
            image.className = 'cart__product-image';
            image.src = productImage;

            const count = document.createElement('div');
            count.className = 'cart__product-count';
            count.textContent = quantity;

            // Кнопка удаления
            const removeBtn = document.createElement('div');
            removeBtn.className = 'cart__product-remove';
            removeBtn.textContent = '×';

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cartProduct.remove();
                updateCart();
                saveCart();
            });

            cartProduct.appendChild(image);
            cartProduct.appendChild(count);
            cartProduct.appendChild(removeBtn);
            cart.appendChild(cartProduct);

            setTimeout(() => {
                animate(productImage, productId, quantity);
            }, 10);
        }

        updateCart();
        saveCart();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});
