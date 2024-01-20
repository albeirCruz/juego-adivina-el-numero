let numeroSecreto;
let intentos;
let numerosGenerados = [];
let numeroMaximo = 10;

//para asosciar texto a etiquetas
function asosiarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

/*
    genera un numero secreto y verifica que no hay sido generado en un turno anterior, si ya alcanzo el numero maximo activa el boton de volver a jugar y reinicia todo
*/
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (numerosGenerados.length === numeroMaximo) {
        asosiarTextoElemento('p', `Numero maximo de juegos alcanzado`);
        numerosGenerados = [];
        nuevoJuegoDisplayInline();
    } else {

        if (numerosGenerados.includes(numeroGenerado)) {

            return generarNumeroSecreto();
        } else {

            numerosGenerados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function limpiar() {
    document.querySelector('#numeroUsuario').value = "";
    return;
}

/*
    compara el numero ingresado por usuario y el numero secreto
*/
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('numeroUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {

        asosiarTextoElemento('p', `Felicidades acertaste el numero secreto: ${numeroSecreto} en ${intentos == 1 ? ' vez' : ' veces'}`);
        document.querySelector('#reiniciar').removeAttribute('disabled');
    } else {

        if (numeroDeUsuario < numeroSecreto) {

            asosiarTextoElemento('p', "El numero secreto es mayor.");
        } else {

            asosiarTextoElemento('p', "El numero secreto es menor.");
        }

        intentos++;
        limpiar();
    }
    return;
}

//establece las condiciones iniciales del juego
function condicionesIniciales() {

    asosiarTextoElemento('h1', "Juego Adivina el Numero Secreto");
    asosiarTextoElemento('p', `Indica un numero entre 1 y ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    console.log(numeroSecreto);
    intentos = 1;
    limpiar();
    return;
}

//bloquea boton de reinicio, nuevo juego
function reiniciarJuego() {

    limpiar();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    return;
}

/*
    se construyen dos funciones, la primera desparece el boton de volver a juegar, y la segunda desaparece los botones intentar y nuevo juego cuando se alcanza el numero maximo
*/
function nuevoJuegoDisplayNone() {
    document.getElementById('reiniciar').style.display = 'inline';
    document.getElementById('intentar').style.display ='inline';
    document.getElementById('nuevoJuego').style.display = 'none';
}

function nuevoJuegoDisplayInline() {
    document.getElementById('reiniciar').style.display = 'none';
    document.getElementById('intentar').style.display ='none';
    document.getElementById('nuevoJuego').style.display = 'inline';
}

//se agrega funcionalidad para tercer boton de nuevo juego
function nuevoJuego() {
    condicionesIniciales();
    nuevoJuegoDisplayNone();
    return;
}

condicionesIniciales();