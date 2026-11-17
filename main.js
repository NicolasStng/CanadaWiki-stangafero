// Busca una sola vez todos los elementos que se va a usar
const articulo = document.querySelector('main');
const listaIndice = document.querySelector('#indice-automatico');
const subtitulos = document.querySelectorAll('main section > h2');

// Crea los enlaces del índice automático
subtitulos.forEach(function (subtitulo) {
  const elementoLista = document.createElement('li');
  const enlace = document.createElement('a');
  enlace.href = `#${subtitulo.id}`;
  enlace.textContent = subtitulo.textContent;

  elementoLista.append(enlace);
  listaIndice.append(elementoLista);
});