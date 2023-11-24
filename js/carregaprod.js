// Dados dos produtos
const produtos = [
    { id: 1, nome: 'Produto 1', preco: 19.99, imagem: '../img/produtos/c1.jpg' },
    // Adicione mais produtos conforme necessário
];

// Função para obter os produtos do Local Storage
function adicionarLocalStorage() {
    const noCarrinho = localStorage.getItem('produtos');
    return noCarrinho ? JSON.parse(noCarrinho) : [];
}

// Função para salvar os produtos no Local Storage
function salvarLocalStorage(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Função para renderizar os produtos na página
function carregarProdutos() {
    const listaProdutos = document.getElementById('product-list');

    // Obter produtos do Local Storage
    const noCarrinho = adicionarLocalStorage();

    // Se houver produtos no Local Storage
    const produtoAdicionado = noCarrinho.length > 0 ? noCarrinho : produtos;

    produtoAdicionado.forEach(produto => {
        const cardProd = document.createElement('div');
        cardProd.classList.add('col-md-4', 'produto');

        // Estrutura do produto
        cardProd.innerHTML = `
            <div class="card">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">Preço: $${produto.preco.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="buyProduct(${produto.id}, '${produto.nome}', ${produto.preco})">Comprar</button>
                    <button class="btn btn-danger" onclick="addToFavorites(${produto.id}, '${produto.nome}')">Favorito</button>
                </div>
            </div>
        `;

        listaProdutos.appendChild(cardProd);
    });
}

// Função para lidar com a ação de compra
window.addCarrinho = function (produtoId, produtoNome, preco) {
    addProdutoCarrinho(produtoId, produtoNome, preco);
    carregaCarrinho();
    alert(`Produto "${produtoNome}" adicionado ao carrinho!`);
};

// Função para lidar com a adição aos favoritos
window.addFavoritos = function (produtoId, produtoNome) {
    addProdutoFavoritos(produtoId, produtoNome);
    carregaFavoritos();
    alert(`Produto "${produtoNome}" adicionado aos favoritos!`);
};

function addProdutoCarrinho(produtoId, produtoNome, preco) {
    const prodCarrinho = { id: produtoId, nome: produtoNome, preco: preco.toFixed(2) };
    let carrinho = getCarrinhoLocalStorage();
    carrinho.push(prodCarrinho);
    salvarCarrinhoLocalStorage(carrinho);
}

function addProdutoFavoritos(produtoId, produtoName) {
    const produtosFav = { id: produtoId, nome: produtoName };
    let fav = getFavoritosLocalStorage();
    fav.push(produtosFav);
    salvarFavoritosLocalStorage(fav);
}

function getCarrinhoLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function salvarCarrinhoLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getFavoritosLocalStorage() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function salvarFavoritosLocalStorage(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function carregaCarrinho() {
    const listaCarrinho = document.getElementById('cart-list');

    if (!listaCarrinho) {
        console.error('Elemento do carrinho não encontrado.');
        return;
    }

    // Limpar a lista antes de renderizar novamente
    listaCarrinho.innerHTML = '';

    // Adicionar cada item do carrinho à lista
    const cart = getCarrinhoLocalStorage();
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.nome} - $${item.preco}`;
        cartList.appendChild(cartItem);
    });
}

function carregaFavoritos() {
    const favoritesList = document.getElementById('fav-list');
    const favorites = getFavoritesFromLocalStorage();

    // Limpar a lista antes de renderizar novamente
    favoritesList.innerHTML = '';

    // Adicionar cada item aos favoritos à lista
    favorites.forEach(item => {
        const favoritesItem = document.createElement('li');
        favoritesItem.textContent = item.nome;
        favoritesList.appendChild(favoritesItem);
    });
}

// Chama a função para renderizar os produtos na página
carregarProdutos();

// Chama as funções de renderização para carrinho e favoritos
carregaCarrinho();
carregaFavoritos();
