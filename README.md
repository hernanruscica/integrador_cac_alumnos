# Trabajo Practico integrador FullStack con Node.js

## Codo a Codo 2022

<p>
Aplicación web hecha con Node.js
</p>
<p>
<a href="https://agenda-cac.onrender.com" target = "_blank">Prueba Online</a> [render.com]
 
Esta es una pequeña aplicación web, con funcionalidades básicas que le permiten administrar una agenda de contactos.
<ul>
    <li>
        Podra registrarse en la aplicación para poder usarla y tener sus contactos personales guardados en su agenda.
    </li>
    <li>
        Restablecer la contraseña en el caso de olvido u otro motivo.
    </li>
    <li>
        <strong>Agregar</strong> un nuevo contacto, con sus correspondientes datos como: nombres, apellidos, teléfono, correo y una foto.
    </li>
    <li>
        <strong>Ver</strong> un contacto de la agenda y copiar los datos.
    </li>
    <li>
        <strong>Editar</strong> un contacto, para corregir un error o actualizar los datos.
    </li>
    <li>
        <strong>Eliminar</strong> algun contacto, si es necesario. 
    </li>
    <li>
        <strong>Buscar</strong> en la agenda por nombre y/o apellido.
    </li>   
</ul>      
</p>    
<p>
    Este proyecto está creado como muestra de trabajo práctico integrador de los conceptos aprendidos en el curso de <strong>Codo A Codo 4.0</strong> edición 2022.
</p>
<p>
    En dicho curso se enseña el Desarrollo Web Fullstack, orientado a Javascript. Se vé tanto el frontend como backend.
    El frontend con lenguajes como <strong>HTML5</strong>, <strong>CSS</strong>, <strong>Bootstrap</strong> y <strong>JavaScript</strong><br>
    El backend con el manejo de base de datos <strong>Mysql</strong> y <strong>NODE.JS</strong>
</p>
<p>    
    A rasgos generales, esta app es un <strong>CRUD</strong> basico con una base de datos <strong>mysql</strong>, con dos tablas, una de usuarios y otra, de contactos.
    Usa <strong>node.js y express</strong> para el backend, alojado en <a href="http://www.render.com" target="_blanck">https://www.render.com <i class="fa-solid fa-arrow-up-right-from-square"></i></a>, 
    la base de datos está alojada en otro servidor propio, junto con la imagenes.
</p>
<p>    
    La arquitectura usada es <strong>MVC</strong>, tiene separados los modelos, las vistas y los controladores en diferentes directorios. 
    Los modulos a su vez, estan divididos segun se ocupan del manejo de los <strong>usuarios</strong> y los que manejan a los <strong>contactos</strong>.<br>
</p>
<p>    
    Para mejorar la seguridad, usa el modulo <strong>bdcrypt</strong> para encriptar la contraseña de los usuarios en la base de datos.
    Tiene una funcionalidad de <strong>restrablecimiento de contraseña</strong>, con la cual el usuario recibe a traves del módulo <strong>nodemailer</strong> un correo con un enlace para poder cambiarla.<br>
</p>
<p>    
    Para poder entender más como funciona y como la desarrollé pueden visitar su repositorio en github 
    <a href="https://github.com/hernanruscica/integrador_cac_alumnos" target="_blanck"> repositorio en github <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
</p>
