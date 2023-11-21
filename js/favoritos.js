const favoritesList = document.getElementById('fav-list');

function addToFavorites(productName) {
    const favoritesItem = document.createElement('li');
    favoritesItem.textContent = productName;
    favoritesList.appendChild(favoritesItem);
}
