document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nomeUsuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;
    // Verificar se ambos os campos estão preenchidos
    if (nomeUsuario && senha) {
      // Salvar o nome de usuário no localStorage
      localStorage.setItem('nomeUsuario', nomeUsuario);
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
