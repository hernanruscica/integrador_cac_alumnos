console.log("desde acciones_botones.js script");
const $d = document;

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
        if(accion == "eliminar_contacto"){
            console.log(`Eliminando el elemento con id: ${id}`); 
            let query = `#name${id}`;
            contacto = $d.querySelector(query).innerHTML;            
            Swal.fire({
                title: 'Eliminación de contacto.',
                text: `Confirma la eliminacion de ${contacto} de la agenda?. Esta acción no se puede deshacer`,
                icon: 'warning',   
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro!'
            }).then((result) => {
                if (result.value) {
                    fetch(`/contactos/eliminar/${id}`, { method: 'DELETE' })
                    .then(response => {
                        // manejar respuesta exitosa    
                        Swal.fire({
                            title: 'Contacto eliminado !',
                            text: 'La eliminación del contacto fue exitosa.',
                            icon: 'info',
                            confirmButtonText: 'ok'
                        }).then((result) => { 
                            if (result.value){
                                location.reload();         
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
        }
    
});
