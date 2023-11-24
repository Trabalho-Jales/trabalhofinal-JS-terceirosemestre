document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obter o nome de usuário e senha do formulário
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Verificar se ambos os campos estão preenchidos
      if (username && password) {
        // Salvar o nome de usuário no localStorage
        localStorage.setItem('username', username);
  
        // Exibir a mensagem de redirecionamento usando um alert Bootstrap
        document.getElementById('redirectAlert').classList.remove('d-none');
  
        setTimeout(function() {
          window.location.href = './html/produtos.html';
        }, 1000);
      } else {
        // Exibir uma mensagem de erro se algum campo estiver vazio
        alert('Por favor, preencha ambos os campos.');
      }
    });
  });
  