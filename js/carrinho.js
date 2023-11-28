
function removerProduto(idProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.id !== idProduto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// Função para remover se a quantidade for zero na quantidade
function removerZero(idProduto, quantidadeAtual) {
    if (quantidadeAtual > 1) {
        atualizarQuantidade(idProduto, quantidadeAtual - 1);
    } else {
        const confirmarRemocao = confirm("Tem certeza que deseja remover o produto?");
        if (confirmarRemocao) {
            removerProduto(idProduto);
        }
    }
}

// Função para carregar o carrinho na página
function carregarCarrinho() {
    const containerCarrinho = document.getElementById('carrinho');
    if (containerCarrinho) {
        const containerTotal = document.getElementById('total');
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        containerCarrinho.innerHTML = '';
        carrinho.forEach(function (item) {
            const produtoCarrinho = document.createElement('li');
            const quantidadeProduto = document.createElement('div');
            // Adicionar botões "+" e "-"
            const botaoMais = document.createElement('button');
            botaoMais.innerHTML = '+';
            botaoMais.classList.add('btn', 'btn-primary', 'btn-quantidade');
            botaoMais.onclick = function () {
                atualizarQuantidade(item.id, item.quantidade + 1);
            };
            const botaoMenos = document.createElement('button');
            botaoMenos.innerHTML = '-';
            botaoMenos.classList.add('btn', 'btn-primary', 'btn-quantidade');
            botaoMenos.onclick = function () {
                removerZero(item.id, item.quantidade);
            };
            quantidadeProduto.appendChild(botaoMenos);
            quantidadeProduto.appendChild(document.createTextNode(` ${item.quantidade} `));
            quantidadeProduto.appendChild(botaoMais);
            produtoCarrinho.innerHTML = `${item.nome} - Preço unitário: R$`;
            if (item.preco !== undefined && !isNaN(item.preco)) {
                produtoCarrinho.innerHTML += `${item.preco.toFixed(2)}`;
            } else {
                produtoCarrinho.innerHTML += 'Preço indisponível';
            }
            produtoCarrinho.appendChild(quantidadeProduto);
            // Adicionar botão de remoção
            const botaoRemover = document.createElement('button');
            botaoRemover.innerHTML = 'Remover do Carrinho';
            botaoRemover.classList.add('btn', 'btn-danger');
            botaoRemover.onclick = function () {
                removerProduto(item.id);
            };
            produtoCarrinho.appendChild(botaoRemover);
            containerCarrinho.appendChild(produtoCarrinho);
        });
        // Adicionar o total do carrinho
        const total = calcularTotal(carrinho);
        containerTotal.textContent = total.toFixed(2);
    }
}
// Função para calcular o total do carrinho
function calcularTotal(carrinho) {
    return carrinho.reduce((total, item) => {
        if (item.preco !== undefined && !isNaN(item.preco)) {
            return total + item.preco * item.quantidade;
        } else {
            return total;
        }
    }, 0);
}
function atualizarQuantidade(idProduto, novaQuantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoAtualizar = carrinho.find(item => item.id === idProduto);
    if (produtoAtualizar) {
        produtoAtualizar.quantidade = novaQuantidade;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    carregarCarrinho();
});
//funçao alerta finaliza compra
function finalizarCompra() {
    alert("Obrigado por comprar conosco! Você será redirecionado após clicar em ok");
    window.location.href = './produtos.html';
}
// Função para fazer logout e voltar para a página de login
function logout() {
    // Limpar o localStorage
    localStorage.removeItem('nomeUsuario');
    // Redirecionar para a página de login
    window.location.href = '../index.html';
}
