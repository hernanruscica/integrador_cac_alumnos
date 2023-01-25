console.log("desde contactos script");
const $d = document;


$d.addEventListener('click', (e) => {    
        if (e.target.matches(".contactos-tarjeta__titulo__botones__btn")) {
            console.log(`boton clickeado\naccion: ${e.target.id} - id: ${e.target.dataset.id}`);
        }
        if (e.target.matches(".contactos-tarjeta__titulo__botones__btn i")) {
            console.log(`boton clickeado\naccion: ${e.target.parentElement.id} - id: ${e.target.parentElement.dataset.id}`);
        }
        if (e.target.matches(".contactos-tarjeta__titulo__botones__btn span")){
            console.log(`boton clickeado\naccion: ${e.target.parentElement.id} - id: ${e.target.parentElement.dataset.id}`);
        }            
    
})

$d.addEventListener('change', function(event) {
    var target = event.target;
    if (target.id == "foto-perfil") {
      var preview = $d.getElementById('preview');
      var file = target.files[0];
      var reader = new FileReader();
  
      reader.addEventListener("load", function () {
        preview.src = reader.result;
      }, false);
  
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  });