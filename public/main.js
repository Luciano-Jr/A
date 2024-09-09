// Função para buscar dados do Firebase
async function carregarDados() {
  const response = await fetch('/dados');
  const dados = await response.json();

  const lista = document.getElementById('dados-lista');
  lista.innerHTML = '';

  dados.forEach(item => {
    const li = document.createElement('li');
    li.textContent = JSON.stringify(item);
    lista.appendChild(li);
  });
}

// Carregar dados quando a página é carregada
window.onload = carregarDados;
