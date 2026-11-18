// Busca todos los elementos que se va a usar
const articulo = document.querySelector('main');
const listaIndice = document.querySelector('#indice-automatico');
const subtitulos = document.querySelectorAll('main section > h2');

const botonModo = document.querySelector('#boton-modo');
const botonesTamano = document.querySelectorAll('.boton-tamano');

// Crea los enlaces del índice automático
subtitulos.forEach(function (subtitulo) {
  const elementoLista = document.createElement('li');
  const enlace = document.createElement('a');
  enlace.href = `#${subtitulo.id}`;
  enlace.textContent = subtitulo.textContent;

  elementoLista.append(enlace);
  listaIndice.append(elementoLista);
});

// Cambia a modo oscuro y modo claro
botonModo.addEventListener('click', function () {
  document.body.classList.toggle('modo-oscuro');

  if (document.body.classList.contains('modo-oscuro')) {
    botonModo.textContent = 'Modo claro';
  } else {
    botonModo.textContent = 'Modo oscuro';
  }
});

// Cambia el tamaño del texto marcando solamente el botón seleccionado
articulo.classList.add('texto-estandar');

botonesTamano.forEach(function (boton) {
  if (boton.getAttribute('data-tamano') === 'estandar') {
    boton.classList.add('seleccionado');
  }

  boton.addEventListener('click', function () {
    const tamanoElegido = boton.getAttribute('data-tamano');

    articulo.classList.remove('texto-pequeno');
    articulo.classList.remove('texto-estandar');
    articulo.classList.remove('texto-grande');
    articulo.classList.add(`texto-${tamanoElegido}`);

    botonesTamano.forEach(function (otroBoton) {
      if (otroBoton === boton) {
        otroBoton.classList.add('seleccionado');
        otroBoton.setAttribute('aria-pressed', 'true');
      } else {
        otroBoton.classList.remove('seleccionado');
        otroBoton.setAttribute('aria-pressed', 'false');
      }
    });
  });
});

// Permite plegar y desplegar las secciones del artículo
subtitulos.forEach(function (subtitulo) {
  subtitulo.addEventListener('click', function () {
    subtitulo.parentElement.classList.toggle('plegada');
  });
});