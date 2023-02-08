console.log("desde acciones_botones.js script");
const $d = document;

const copiarEnMemoria = (value) => {        
    navigator.clipboard.writeText(value)
        .then(() => {
        console.log(`Text copied to clipboard... ${value}`)
    })
        .catch(err => {
        console.log('Something went wrong', err);
    })
}

//acciones de los botones en cada tarjeta individual
$d.addEventListener('click', (e) => {    
    let accion = null;
    let id = null;
    let contacto = null;

        if (e.target.matches(".contactos-tarjeta__titulo__botones__btn")) {
            console.log(`boton clickeado\naccion: ${e.target.id} - id: ${e.target.dataset.id}`);
            accion = e.target.id;
            id = e.target.dataset.id;
        }
        if (e.target.matches(".contactos-tarjeta__titulo__botones__btn i")) {
            console.log(`boton clickeado\naccion: ${e.target.parentElement.id} - id: ${e.target.parentElement.dataset.id}`);
            accion = e.target.parentElement.id;
            id = e.target.parentElement.dataset.id;
        }
        if (e.target.matches(".contactos-tarjeta__titulo__botones__btn span")){
            console.log(`boton clickeado\naccion: ${e.target.parentElement.id} - id: ${e.target.parentElement.dataset.id}`);
            accion = e.target.parentElement.id;
            id = e.target.parentElement.dataset.id;
        }     
        if (e.target.id == 'eliminar_contacto'){
            console.log(`eliminando contacto`);
            accion = 'eliminar_contacto';
            id = e.target.dataset.id;
        }       
        if(accion == "eliminar_contacto"){
            console.log(`Eliminando el elemento con id: ${id}`); 
            let query = `#name${id}`;
            contacto = $d.querySelector(query).innerHTML;            
            Swal.fire({
                title: 'Eliminar contacto.',
                text: `Confirma la eliminación de ${contacto} de la agenda ? Esta acción no se puede deshacer`,
                icon: 'warning',                   
                showDenyButton: true,                               
                confirmButtonText: 'Eliminar',
                confirmButtonColor: '#FF0000',
                denyButtonText: 'Conservar',
                denyButtonColor: '#28DC25'

            }).then((result) => {
                if (result.value) {
                    fetch(`/contactos/eliminar/${id}`, { method: 'DELETE' })
                    .then(response => {
                        // manejar respuesta exitosa    
                        Swal.fire({
                            title: 'Contacto eliminado !',
                            text: 'Se eliminó al contacto con exito.',
                            icon: 'info',
                            confirmButtonText: 'Entendido'
                        }).then((result) => { 
                            if (result.value){
                                //location.reload();    
                                window.location.href = '/contactos/todos' ;    
                            }
                        }); 
                    })
                    .catch(error => {
                        // manejar error
                        console.log("error al borrar el elemento");
                    });
                }
            })            
        }
        if(accion == "ver_contacto"){
            console.log(`Mostrando el elemento con id: ${id}`); 
            window.location.href = `/contactos/ver/${id}`;   
        };
        if (e.target.id == 'btn-copiar'){
            let value = e.target.dataset.value;
            copiarEnMemoria(value);
            Swal.fire({
                title: 'Información copiada !',
                text: `${value} copiado en memoria.`,
                icon: 'info',
                confirmButtonText: 'Entendido'
            })
            console.log(`copiando ${value} en memoria`);
        }
    
});
