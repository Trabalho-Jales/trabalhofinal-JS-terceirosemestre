document.addEventListener('DOMContentLoaded', function () {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    if (!nomeUsuario) {
        window.location.href = '../../index.html';
    } else {
        document.getElementById('welcomeMessage').textContent = `Bem-vindo(a), ${nomeUsuario} à loja Ponto de Moda!`;
        carregarProdutos();
    }
});
function carregarProdutos() {
    const produtos = [
        { id: 1, nome: 'Camiseta Duff Beer Tradicional',precoOrigi: 95.50, preco: 25.50, imagem: '../img/produtos/1.png' },
        { id: 2, nome: 'Camiseta The Powerful Trio Tradicional',precoOrigi: 79.90 , preco: 25.50, imagem: '../img/produtos/2.png' },
        { id: 3, nome: 'Camiseta Wandinha Mood Tradicional',precoOrigi: 54.65 , preco: 25.50, imagem: '../img/produtos/3.png' },
        { id: 4, nome: 'Camiseta Pinguins Tradicional',precoOrigi: 92.00 , preco: 25.50, imagem: '../img/produtos/4.png' },
        { id: 5, nome: 'Camiseta Eevee Evolution Tradicional',precoOrigi:84.00 , preco: 25.50, imagem: '../img/produtos/5.png' },
        { id: 6, nome: 'Camiseta Dudu Burguer Tradicional',precoOrigi: 84.00 , preco: 25.50, imagem: '../img/produtos/6.png' },
        { id: 7, nome: 'Camiseta Love Hands Tradicional',precoOrigi: 75.00, preco: 25.50, imagem: '../img/produtos/7.png' },
        { id: 8, nome: 'Camiseta Brooklyn 1984 Tradicional',precoOrigi:83.00 , preco: 25.50, imagem: '../img/produtos/8.png' },
        { id: 9, nome: 'Camiseta Peace Among Worlds Tradicional',precoOrigi: 47.50 , preco: 25.50, imagem: '../img/produtos/9.png' },
        { id: 10, nome: 'Camiseta Caution Gremlins Tradicional',precoOrigi: 87.00 , preco: 25.50, imagem: '../img/produtos/10.png' },
        { id: 11, nome: 'Camiseta Pinguim Blinders Tradicional',precoOrigi: 29.00 , preco: 25.50, imagem: '../img/produtos/11.png' },
        { id: 12, nome: 'Camiseta The Dark Side Of The Bear Tradicional',precoOrigi: 37.50, preco: 25.50, imagem: '../img/produtos/12.png' },
        { id: 14, nome: 'Camiseta Jigsaw Tradicional',precoOrigi: 44.00, preco: 25.50, imagem: '../img/produtos/13.png' },
        { id: 15, nome: 'Camiseta Kratos Tradicional',precoOrigi: 165.00, preco: 25.50, imagem: '../img/produtos/14.png' },
        { id: 13, nome: 'Camiseta Berserk Tradicional',precoOrigi: 99.00, preco: 25.50, imagem: '../img/produtos/15.png' },
        { id: 16, nome: 'Camiseta Eurotreino Tradicional',precoOrigi: 92.00, preco: 25.50, imagem: '../img/produtos/16.png' },
        { id: 17, nome: 'Camiseta Penadinho Tradicional',precoOrigi: 87.56, preco: 25.50, imagem: '../img/produtos/17.png' },
        { id: 18, nome: 'Camiseta Kart Busted Tradicional',precoOrigi: 36.80, preco: 25.50, imagem: '../img/produtos/18.png' },
        { id: 19, nome: 'Camiseta Crazy Mario Tradicional',precoOrigi: 163.00 , preco: 25.50, imagem: '../img/produtos/19.png' },
        { id: 20, nome: 'Camiseta Waaazzzuuppp Tradicional',precoOrigi: 91.00 , preco: 25.50, imagem: '../img/produtos/20.png' },
    ];
    const listaProdutos = document.getElementById('listaProdutos');
    produtos.forEach(function (produto) {
        const itemProduto = document.createElement('div');
        itemProduto.classList.add('col-md-4', 'produto');
        // Estrutura do produto
        itemProduto.innerHTML = `
            <div class="card">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-desconto card-text"><s>R$${produto.precoOrigi.toFixed(2)}</s></p>
                    <p class="card-text">R$${produto.preco.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="comprarProduto(${produto.id}, '${produto.nome}', ${produto.preco})">Comprar</button>
                    <button class="btn btn-outline-danger" onclick="adicionarFavorito(${produto.id}, '${produto.nome}')">Favoritar</button>
                </div>
            </div>
        `;
        listaProdutos.appendChild(itemProduto);
    });
}
function comprarProduto(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(produto => produto.id === id);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`Produto "${nome}" adicionado ao carrinho!`);
    carregarCarrinho();
}
function carregaFavoritos() {
    const favContainer = document.getElementById('fav');
    if (favContainer) {
        let favoritos = JSON.parse(localStorage.getItem('fav')) || [];
        favContainer.innerHTML = '';
        favoritos.forEach(function (item) {
            const favItem = document.createElement('li');
            favItem.innerHTML = `${item.nome}`;
            const btnAddCarrinho = document.createElement("button");
            btnAddCarrinho.classList.add('btn-carrinho');
            btnAddCarrinho.innerText = "Comprar";
            btnAddCarrinho.addEventListener('click', function () {
                adicionarProdutoNoCarrinho(item.id, item.nome, item.preco);
                carregarCarrinho();
            });
            const botaoRemover = document.createElement('button');
            botaoRemover.innerHTML = 'Remover dos Favoritos';
            botaoRemover.classList.add('btn', 'btn-danger');
            botaoRemover.onclick = function () {
                removerFavoritos(item.id);
            };
            favItem.appendChild(btnAddCarrinho);
            favItem.appendChild(botaoRemover);
            favContainer.appendChild(favItem);
        });
    }
}
function adicionarFavorito(id, nome) {
    let favoritos = JSON.parse(localStorage.getItem('fav')) || [];
    const favoritoExistente = favoritos.find(favorito => favorito.id === id);

    if (favoritoExistente) {
        alert(`Produto "${nome}" já está nos favoritos!`);
    } else {
        favoritos.push({ id, nome, quantidade: 1 });
        localStorage.setItem('fav', JSON.stringify(favoritos));
        alert(`Produto "${nome}" adicionado aos favoritos!`);
        carregaFavoritos();
    }
}
// Função para sair e voltar ao login
function logout() {
    // Limpar o localStorage
    localStorage.removeItem('nomeUsuario');
    // Redirecionar para a página de login
    window.location.href = '../index.html';
}
