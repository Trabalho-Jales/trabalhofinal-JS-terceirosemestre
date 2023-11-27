document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const nomeUsuario = document.getElementById('username').value;
      const senha = document.getElementById('password').value;
  
      // Verificar se ambos os campos estão preenchidos
      if (nomeUsuario && senha) {
        localStorage.setItem('nomeUsuario', nomeUsuario);
        document.getElementById('redirectAlert').classList.remove('d-none');
  
        setTimeout(function() {
          window.location.href = './produtos.html';
        }, 1000);
      } else {
        alert('Por favor, preencha ambos os campos.');
      }
    });
  });
  