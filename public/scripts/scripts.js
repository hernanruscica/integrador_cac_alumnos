console.log("desde public/scripts.js")
const $d = document;
let contraseniasCorrectas = null;


$d.addEventListener("keyup", (e) => {
    if (e.target.id == "contrasenia2" || e.target.id == "contrasenia"){
        let contrasenia = $d.getElementById("contrasenia");
        let contrasenia2 =  $d.getElementById("contrasenia2");
        if (contrasenia.value == contrasenia2.value){
            //formulario__campo__error-oculto
            contrasenia.nextElementSibling.classList.add('formulario__campo__error-oculto');
            contrasenia2.nextElementSibling.classList.add('formulario__campo__error-oculto');
            contraseniasCorrectas = true;
            console.log("contraseñas iguales");
        }else{
            contrasenia.nextElementSibling.classList.remove('formulario__campo__error-oculto');
            contrasenia2.nextElementSibling.classList.remove('formulario__campo__error-oculto');
            console.log("contraseñas distintas");
            contraseniasCorrectas = false;
        }        
    }
})
$d.addEventListener("submit", (e)=> {
    e.preventDefault();
    if (contraseniasCorrectas == true){
        e.target.submit();
    }
})