document.addEventListener('DOMContentLoaded', function () {
  // Verificar se o usuário está autenticado
  const username = localStorage.getItem('username');

  if (!username) {
      // Se o usuário não estiver autenticado, redirecionar para a página de login
      window.location.href = '../../index.html';
  } else {
      // Se o usuário estiver autenticado, exibir a página de produtos
    document.getElementById('welcomeMessage').textContent = `Bem-vindo, ${username} à loja Ponto de Moda!`;
      carregaProdutos();
  }
});

function carregaProdutos() {
  // Array de objetos de produtos
  const products = [
      { id: 1, name: 'Produto 1', price: 10.00, image: '../img/produtos/1.png' },
      { id: 2, name: 'Produto 2', price: 20.00, image: '../img/produtos/2.png' },
      { id: 3, name: 'Produto 3', price: 30.00, image: '../img/produtos/3.png' },
      { id: 4, name: 'Produto 4', price: 40.00, image: '../img/produtos/4.png' },
      { id: 5, name: 'Produto 5', price: 50.00, image: '../img/produtos/5.png' },
      { id: 6, name: 'Produto 6', price: 60.00, image: '../img/produtos/6.png' },
      { id: 7, name: 'Produto 7', price: 70.00, image: '../img/produtos/7.png' },
      { id: 8, name: 'Produto 8', price: 80.00, image: '../img/produtos/8.png' },
      { id: 9, name: 'Produto 9', price: 90.00, image: '../img/produtos/9.png' },
      { id: 10, name: 'Produto 10', price: 100.00, image: '../img/produtos/10.png' },
      { id: 11, name: 'Produto 11', price: 110.00, image: '../img/produtos/11.png' },
      { id: 12, name: 'Produto 12', price: 120.00, image: '../img/produtos/12.png' },
      { id: 14, name: 'Produto 14', price: 140.00, image: '../img/produtos/13.png' },
      { id: 15, name: 'Produto 15', price: 150.00, image: '../img/produtos/14.png' },
      { id: 13, name: 'Produto 13', price: 130.00, image: '../img/produtos/15.png' },
      { id: 16, name: 'Produto 16', price: 160.00, image: '../img/produtos/16.png' },
      { id: 17, name: 'Produto 17', price: 170.00, image: '../img/produtos/17.png' },
      { id: 18, name: 'Produto 18', price: 180.00, image: '../img/produtos/18.png' },
      { id: 19, name: 'Produto 19', price: 190.00, image: '../img/produtos/19.png' },
      { id: 20, name: 'Produto 20', price: 200.00, image: '../img/produtos/20.png' },
      
  ];

  const productList = document.getElementById('listaProdutos');

  // Adicionar produtos dinamicamente à lista usando o estilo fornecido
  products.forEach(function (product) {
      const productItem = document.createElement('div');
      productItem.classList.add('col-md-4', 'product');

      // Estrutura do produto
      productItem.innerHTML = `
          <div class="card">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">Preço: R$${product.price.toFixed(2)}</p>
                  <button class="btn btn-primary" onclick="buyProduct(${product.id}, '${product.name}', ${product.price})">Comprar</button>
                  <button class="btn btn-danger" onclick="addFav(${product.id}, '${product.name}')">Favorito</button>
              </div>
          </div>
      `;

      productList.appendChild(productItem);
  });
}

function buyProduct(id, name, price) {
  // Verificar se o carrinho já está no localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verificar se o produto já está no carrinho
  const existingProduct = cart.find(product => product.id === id);

  if (existingProduct) {
      // Se o produto já estiver no carrinho, incrementar a quantidade
      existingProduct.quantity++;
  } else {
      // Se o produto não estiver no carrinho, adicioná-lo
      cart.push({ id, name, price, quantity: 1 });
  }

  // Salvar o carrinho de volta no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Exibir mensagem de sucesso (você pode ajustar isso conforme necessário)
  alert(`Produto "${name}" adicionado ao carrinho!`);
}

function addFav(id, name){
    // Verificar se o carrinho de favoritos já está no localStorage
    let fav = JSON.parse(localStorage.getItem('fav')) || [];
    // Verificar se o produto já está no carrinho de favoritos
    const existingFav = fav.find(fav => fav.id === id);
    if (existingFav) {
        // Se o produto já estiver no carrinho de favoritos, incrementar
        existingFav.quantity++;
    } else {
            // Se o produto não estiver no carrinho de favoritos, adicioná-lo
        fav.push({ id, name, quantity: 1 });
        }
        // Salvar o carrinho de favoritos de volta no localStorage
        localStorage.setItem('fav', JSON.stringify(fav));
        // Exibir mensagem de sucesso (você pode ajustar isso conforme necessário)
        alert(`Produto "${name}" adicionado aos favoritos!`);
}
//Função para sair e voltar ao login
function logout() {
  // Limpar o localStorage
  localStorage.removeItem('username');

  // Redirecionar para a página de login
  window.location.href = '../index.html';
}
