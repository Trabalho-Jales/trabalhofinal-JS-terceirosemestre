// carrinho.js

// Função para carregar o carrinho na página
function loadCart() {
    const cartContainer = document.getElementById('cart');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Limpar o conteúdo atual do carrinho
    cartContainer.innerHTML = '';

    // Adicionar produtos do carrinho ao carrinho HTML
    cart.forEach(function (item) {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.name} - Quantidade: ${item.quantity} - Subtotal: R$${(item.price * item.quantity).toFixed(2)}`;
        
        // Adicionar botão de remoção
        const removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remover do Carrinho';
        removeButton.classList.add('btn', 'btn-danger');
        removeButton.onclick = function () {
            removeFromCart(item.id);
        };

        cartItem.appendChild(removeButton);
        cartContainer.appendChild(cartItem);
    });

    // Adicionar o total do carrinho
    const total = calculateTotal(cart);
    const totalItem = document.createElement('li');
    totalItem.innerHTML = `Total do Carrinho: R$${total.toFixed(2)}`;
    cartContainer.appendChild(totalItem);
}

// Função para calcular o total do carrinho
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Função para remover um item do carrinho
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar o item a ser removido do carrinho
    cart = cart.filter(item => item.id !== productId);

    // Salvar o carrinho de volta no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Recarregar o carrinho na página
    loadCart();
}

// Outras funções relacionadas ao carrinho podem ser adicionadas conforme necessário

// Exemplo: Função para limpar completamente o carrinho
function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

// Carregar o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    loadCart();
});
