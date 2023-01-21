/*
console.log("hola console");

const $d = document;


const mostrarMenu = (idMenu, classShow) => {
    $d.getElementById(idMenu).classList.add(classShow);
}

const ocultarMenu = (idMenu, classShow) => {
    $d.getElementById(idMenu).classList.remove(classShow);
}

$d.addEventListener('click', (e) => {
    //e.preventDefault();
    if (e.target.id == 'btn-menu'){
        console.log("click en el btn menu");
        mostrarMenu('navbar', 'navbar-show');
    }    
    if (e.target.id == 'btn-close' || e.target.id.includes('navbar_enlace')){
        console.log('click en el btn cerrar menu');        
        ocultarMenu('navbar', 'navbar-show');        
    }        
});

*/



/*
Primera parte:
Hacer una funcion que reciba dos valores del tipo 'number' como argumentos.
Tiene que controlar que sean del tipo 'number' y debe mostrar el error.
Tiene que incrementar el contador con el incremento pasados.
Tiene que retornar ese incremento.

Segunda parte:
Dado el array: precios = [98, 149, 34, 78, 255, 15]
Hacer un ciclo for e incremente todos los elementos con un valor fijo de 10
*/
function incrementar(contador, incremento){
    let resultado = null;
    resultado = contador + incremento;
    return resultado;
}



/*
Hacer una funcion que reciba dos valores como argumentos.
Tiene que controlar que sean del tipo 'number' y debe mostrar el error.
Tiene que devolver la division entre el primero y el segundo.
Si el segundo es igual a cero, no se puede hacer la division y debe mostrar el error.
Tiene que retornar el valor de dicha division.
*/
function dividir(dividendo, divisor){
    let resultado = null;
    if (typeof dividendo == 'number' && typeof divisor == 'number'){
        if (divisor !== 0){
            resultado = dividendo / divisor;
        }else{
            resultado = "El divisor debe ser distinto a cero";
        }
    }else{
        resultado = "Los valores deber ser del tipo 'numero'";
    }
    return resultado;
}

console.log(dividir(5, 2));
console.log(dividir(5, '2'));
console.log(dividir(5, 0));

const restar = (val1, val2) => {
    let resultado = val1 - val2;
    return resultado;
}

console.log(restar(100,10));