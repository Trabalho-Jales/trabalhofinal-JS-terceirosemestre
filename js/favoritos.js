function carregaFavoritos() {
    const favContainer = document.getElementById('fav');
    let favoritos = JSON.parse(localStorage.getItem('fav')) || [];

    favContainer.innerHTML = '';

    favoritos.forEach(function (item) {
        const favItem = document.createElement('li');
        favItem.innerHTML = `
            <span>${item.nome}</span>
            <button class="btn btn-danger" onclick="removerFavoritos(${item.id})">Remover dos Favoritos</button>
        `;
        favContainer.appendChild(favItem);
    });
}
function removerFavoritos(idProduto) {
    let favoritos = JSON.parse(localStorage.getItem('fav')) || [];
    favoritos = favoritos.filter(item => item.id !== idProduto);
    localStorage.setItem('fav', JSON.stringify(favoritos));
    carregaFavoritos();
}
document.addEventListener('DOMContentLoaded', function () {
    carregaFavoritos();
});
function logout() {
    localStorage.removeItem('nomeUsuario');
    window.location.href = '../index.html';
}
