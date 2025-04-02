let cart = [];

function toggleCart() {
    document.querySelector('.cart-overlay').classList.toggle('active');
    updateCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        let productElement = event.target.closest('.product');
        let product = {
            id: productElement.dataset.id,
            name: productElement.dataset.name,
            price: parseInt(productElement.dataset.price),
            image: productElement.dataset.image,
            quantity: 1
        };
        
        let existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
        updateCart();
    });
});

function updateCart() {
    let cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(product => {
        total += product.price * product.quantity;
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${product.image}" width="50">
            <p>${product.name}</p>
            <p>${product.quantity} x ${product.price.toLocaleString()}VNĐ</p>
            <button onclick="removeFromCart('${product.id}')">X</button>
        `;
        cartContainer.appendChild(itemElement);
    });
    document.querySelector('.total').textContent = `Tổng: ${total.toLocaleString()}VNĐ`;
    document.querySelector('.cart-btn').textContent = `Giỏ hàng (${cart.length}) ${total.toLocaleString()}VNĐ`;
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    updateCart();
}
