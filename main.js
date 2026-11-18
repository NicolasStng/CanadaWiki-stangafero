// Busca todos los elementos que se va a usar
const articulo = document.querySelector('main');
const listaIndice = document.querySelector('#indice-automatico');
const subtitulos = document.querySelectorAll('main section > h2');

const botonModo = document.querySelector('#boton-modo');
const botonesTamano = document.querySelectorAll('.boton-tamano');

const formulario = document.querySelector('#formulario-discusion');
const campoNombre = document.querySelector('#nombre-comentario');
const campoComentario = document.querySelector('#texto-comentario');
const contador = document.querySelector('#contador-caracteres');
const mensaje = document.querySelector('#mensaje-discusion');
const listaComentarios = document.querySelector('#lista-comentarios');

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

// Añade el contador de caracteres y valida el formulario de comentarios
campoComentario.addEventListener('input', function () {
  const usados = campoComentario.value.length;
  contador.textContent = `${usados} / 200`;
});

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  mensaje.textContent = '';
  mensaje.classList.remove('mensaje-error');
  campoNombre.classList.remove('campo-invalido');
  campoComentario.classList.remove('campo-invalido');

  const nombre = campoNombre.value.trim();
  const comentario = campoComentario.value.trim();

  if (nombre === '') {
    mensaje.textContent = 'Escribí tu nombre para comentar.';
    mensaje.classList.add('mensaje-error');
    campoNombre.classList.add('campo-invalido');
    return;
  }

  if (comentario.length < 10 || comentario.length > 200) {
    mensaje.textContent = 'El comentario debe tener entre 10 y 200 caracteres.';
    mensaje.classList.add('mensaje-error');
    campoComentario.classList.add('campo-invalido');
    return;
  }

  crearComentario(nombre, comentario);
  formulario.reset();
  contador.textContent = '0 / 200';
});

listaComentarios.addEventListener('click', function (evento) {
  if (evento.target.classList.contains('boton-borrar')) {
    evento.target.parentElement.remove();
  }
});

// Función que crea un comentario y lo agrega a la lista de comentarios
function crearComentario(nombre, comentario) {
  const elemento = document.createElement('li');

  const autor = document.createElement('strong');
  autor.textContent = nombre;

  const texto = document.createElement('p');
  texto.textContent = comentario;

  const borrar = document.createElement('button');
  borrar.type = 'button';
  borrar.classList.add('boton-borrar');
  borrar.textContent = 'Borrar';

  elemento.append(autor);
  elemento.append(texto);
  elemento.append(borrar);
  listaComentarios.append(elemento);
}
