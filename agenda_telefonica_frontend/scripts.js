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


