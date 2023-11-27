function carregaFavoritos() {
    const favContainer = document.getElementById('fav');
    let favoritos = JSON.parse(localStorage.getItem('fav')) || [];

    favContainer.innerHTML = '';

    favoritos.forEach(function (item) {
        const favItem = document.createElement('li');
     favItem.innerHTML = `${item.nome} `;
        const botaoRemover = document.createElement('button');
        botaoRemover.innerHTML = 'Remover dos Favoritos';
        botaoRemover.classList.add('btn', 'btn-danger');
        botaoRemover.onclick = function () {
            removerFavoritos(item.id);
        };

        favItem.appendChild(botaoRemover);
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
