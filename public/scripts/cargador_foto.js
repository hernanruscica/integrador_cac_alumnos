console.log("desde cargador_foto");
const $d = document;



//Carga la foto de perfil en la vista previa
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