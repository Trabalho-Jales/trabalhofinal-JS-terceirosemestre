// Função para carregar os favoritos na página
function loadFavorites() {
    const favContainer = document.getElementById('fav');
    let favorites = JSON.parse(localStorage.getItem('fav')) || [];

    // Limpar o conteúdo atual dos favoritos
    favContainer.innerHTML = '';

    // Adicionar produtos dos favoritos aos favoritos HTML
    favorites.forEach(function (item) {
        const favItem = document.createElement('li');
        favItem.innerHTML = `${item.name}`;

        // Adicionar botão de remoção
        const removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remover dos Favoritos';
        removeButton.classList.add('btn', 'btn-danger');
        removeButton.onclick = function () {
            removeFromFavorites(item.id);
        };

        favItem.appendChild(removeButton);
        favContainer.appendChild(favItem);
    });
}

// Função para adicionar um item aos favoritos
function addFav(productId, productName) {
    let favorites = JSON.parse(localStorage.getItem('fav')) || [];

    // Verificar se o produto já está nos favoritos
    const existingFavorite = favorites.find(item => item.id === productId);

    if (!existingFavorite) {
        // Adicionar o produto aos favoritos
        favorites.push({ id: productId, name: productName });

        // Salvar os favoritos de volta no localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Recarregar os favoritos na página
        loadFavorites();
    }
}

// Função para remover um item dos favoritos
function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('fav')) || [];

    // Filtrar o item a ser removido dos favoritos
    favorites = favorites.filter(item => item.id !== productId);

    // Salvar os favoritos de volta no localStorage
    localStorage.setItem('fav', JSON.stringify(favorites));

    // Recarregar os favoritos na página
    loadFavorites();
}

// Outras funções relacionadas aos favoritos podem ser adicionadas conforme necessário

// Exemplo: Função para limpar completamente os favoritos
function clearFavorites() {
    localStorage.removeItem('favorites');
    loadFavorites();
}

// Carregar os favoritos ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    loadFavorites();
});
