// Dados dos produtos
const products = [
    { id: 1, name: 'Produto 1', price: 19.99, image: 'product1.jpg' },
    // Adicione mais produtos conforme necessário
];

// Função para obter os produtos do Local Storage
function getProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
}

// Função para salvar os produtos no Local Storage
function saveProductsToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Função para renderizar os produtos na página
function renderProducts() {
    const productList = document.getElementById('product-list');

    // Obter produtos do Local Storage
    const storedProducts = getProductsFromLocalStorage();

    // Se houver produtos no Local Storage, use-os; caso contrário, use os produtos padrão
    const currentProducts = storedProducts.length > 0 ? storedProducts : products;

    currentProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('col-md-4', 'product');

        // Estrutura do produto
        productItem.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Preço: $${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="buyProduct(${product.id}, '${product.name}', ${product.price})">Comprar</button>
                    <button class="btn btn-danger" onclick="addToFavorites(${product.id}, '${product.name}')">Favorito</button>
                </div>
            </div>
        `;

        productList.appendChild(productItem);
    });
}

// Função para lidar com a ação de compra
window.buyProduct = function (productId, productName, price) {
    addProductToCart(productId, productName, price);
    renderCart();
    alert(`Produto "${productName}" adicionado ao carrinho!`);
};

// Função para lidar com a adição aos favoritos
window.addToFavorites = function (productId, productName) {
    addProductToFavorites(productId, productName);
    renderFavorites();
    alert(`Produto "${productName}" adicionado aos favoritos!`);
};

function addProductToCart(productId, productName, price) {
    const cartItem = { id: productId, name: productName, price: price.toFixed(2) };
    let cart = getCartFromLocalStorage();
    cart.push(cartItem);
    saveCartToLocalStorage(cart);
}

function addProductToFavorites(productId, productName) {
    const favoritesItem = { id: productId, name: productName };
    let favorites = getFavoritesFromLocalStorage();
    favorites.push(favoritesItem);
    saveFavoritesToLocalStorage(favorites);
}

function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getFavoritesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderCart() {
    const cartList = document.getElementById('cart-list');

    if (!cartList) {
        console.error('Elemento do carrinho não encontrado.');
        return;
    }

    // Limpar a lista antes de renderizar novamente
    cartList.innerHTML = '';

    // Adicionar cada item do carrinho à lista
    const cart = getCartFromLocalStorage();
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(cartItem);
    });
}

function renderFavorites() {
    const favoritesList = document.getElementById('fav-list');
    const favorites = getFavoritesFromLocalStorage();

    // Limpar a lista antes de renderizar novamente
    favoritesList.innerHTML = '';

    // Adicionar cada item aos favoritos à lista
    favorites.forEach(item => {
        const favoritesItem = document.createElement('li');
        favoritesItem.textContent = item.name;
        favoritesList.appendChild(favoritesItem);
    });
}

// Chama a função para renderizar os produtos na página
renderProducts();

// Chama as funções de renderização para carrinho e favoritos
renderCart();
renderFavorites();
