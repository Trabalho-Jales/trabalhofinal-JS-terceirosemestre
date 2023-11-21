// carrinho.js
const cartList = document.getElementById('cart-list');

// Função para adicionar produto ao carrinho
function addToCart(productName, price) {
    if (cartList) {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${productName} - $${price.toFixed(2)}`;
        cartList.appendChild(cartItem);
    } else {
        console.error('Elemento do carrinho não encontrado.');
    }
}

// Função para renderizar o carrinho
function renderCart() {
    // Limpa a lista antes de renderizar novamente
    cartList.innerHTML = '';

    // Adiciona cada item do carrinho à lista
    const cart = getCartFromLocalStorage();
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(cartItem);
    });
}

// Função para obter os produtos do Local Storage
function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Chama a função para renderizar o carrinho
renderCart();
