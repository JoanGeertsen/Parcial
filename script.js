let cafes = [];

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mensaje-error").style.display = "none";
});

//Función proximo de la teoría
let proximo = (function () {
    let numero = 0;
    return function () {
        numero++;
        return numero;
    };
})();

function actualizarTabla(tabla) {
    const tablaResultados = document.getElementById('tabla-resultados').querySelector('tbody');

    // Limpia el contenido de la tabla
    tablaResultados.innerHTML = "";

    tabla.forEach((cafe) => {
        const fila = document.createElement('tr');

        // Crea celda para el nombre del café
        const nombreCelda = document.createElement('td');
        const nombreTexto = document.createTextNode(cafe.nombre);
        nombreCelda.appendChild(nombreTexto);
        fila.appendChild(nombreCelda);

        // Crea una celda para la fecha
        const fechaCelda = document.createElement('td');
        const fechaTexto = document.createTextNode(cafe.fecha);
        fechaCelda.appendChild(fechaTexto);
        fila.appendChild(fechaCelda);

        // Crea una celda para el tueste
        const tuesteCelda = document.createElement('td');
        const tuesteTexto = document.createTextNode(cafe.tueste);
        tuesteCelda.appendChild(tuesteTexto);
        fila.appendChild(tuesteCelda);

        // Crea una celda para el origen
        const origenCelda = document.createElement('td');
        const origenTexto = document.createTextNode(cafe.origen);
        origenCelda.appendChild(origenTexto);
        fila.appendChild(origenCelda);

        // Crea una celda para el botón de editar
        const editarCelda = document.createElement('td');
        const editarImagen = document.createElement('img');
        editarImagen.src = "img/editar.png";
        editarImagen.alt = "Editar";
        editarImagen.style.cursor = "pointer";
        editarImagen.onclick = function() {
            editarCafe(cafe.nombre);
        };
        editarCelda.appendChild(editarImagen);
        fila.appendChild(editarCelda);

        // Crea una celda para el botón de eliminar
        const eliminarCelda = document.createElement('td');
        const eliminarImagen = document.createElement('img');
        eliminarImagen.src = "img/eliminar.png";
        eliminarImagen.alt = "Eliminar";
        eliminarImagen.style.cursor = "pointer";
        eliminarImagen.onclick = function() {
            eliminarCafe(cafe.nombre);
        };
        eliminarCelda.appendChild(eliminarImagen);
        fila.appendChild(eliminarCelda);

        // Agrega la fila completa a la tabla
        tablaResultados.appendChild(fila);
    });

    // Resetea el formulario 
    document.getElementById('cafe-form').reset();
}


function eliminarCafe(nombreCafe){    
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el café "${nombreCafe}"?`);
    
    if (confirmacion) {        
        const index = cafes.findIndex(cafe => cafe.nombre === nombreCafe);       
            cafes.splice(index, 1);

            alert(`Café "${nombreCafe}" eliminado exitosamente.`);     
        
            actualizarTabla(cafes);           
        } 
    else console.log("Eliminación cancelada.");
    
    document.getElementById("boton-enviar").style.display = "block";
    document.getElementById("boton-reset").style.display = "block";
    document.getElementById("boton-actualizar").style.display = "none";
    document.getElementById("boton-cancelar").style.display = "none";
    document.getElementById('tNombre').disabled = false;
  }

function editarCafe(nombreCafe){    
    console.log(`Editando cafe ${nombreCafe}`);
    document.getElementById("boton-enviar").style.display = "none";
    document.getElementById("boton-reset").style.display = "none";
    document.getElementById("boton-actualizar").style.display = "block";
    document.getElementById("boton-cancelar").style.display = "block";

    const cafeAEditar = cafes.find(cafe => cafe.nombre === nombreCafe);

    //Setea los valores en el formulario
    document.getElementById('tNombre').value = cafeAEditar.nombre;
    document.getElementById('tNombre').disabled = true;
    document.getElementById(`rb${cafeAEditar.tueste}`).checked=true;
    document.getElementById("fechaTueste").value = cafeAEditar.fecha;   
    document.getElementById("cbOrigen").value = cafeAEditar.origen;  
    document.getElementById("chMolido").checked = cafeAEditar.molido;
    document.getElementById("nbPrecio").value = cafeAEditar.precio;   
    document.getElementById("tDescripcion").value = cafeAEditar.descripcion;

}

document.getElementById('boton-actualizar').addEventListener('click', function() {
    let nombreCafe = document.getElementById('tNombre').value;
    const index = cafes.findIndex(cafe => cafe.nombre === nombreCafe);
    cafes.splice(index, 1);

    agregarCafe();


    document.getElementById("boton-enviar").style.display = "block";
    document.getElementById("boton-reset").style.display = "block";
    document.getElementById("boton-actualizar").style.display = "none";
    document.getElementById("boton-cancelar").style.display = "none";
    document.getElementById('tNombre').disabled = false;
});

document.getElementById('boton-reset').addEventListener('click', function(){
    borrarError();
});

document.getElementById('boton-cancelar').addEventListener('click', function() {
    document.getElementById("boton-enviar").style.display = "block";
    document.getElementById("boton-reset").style.display = "block";
    document.getElementById("boton-actualizar").style.display = "none";
    document.getElementById("boton-cancelar").style.display = "none";
    document.getElementById('tNombre').disabled = false;

    borrarError();
    document.getElementById('cafe-form').reset();
});

function mensajeCafe(cafe){    
    alert(`
        El cafe ${cafe.nombre} se registró con éxito.`);  
}

function setearError(mensaje, campo) {
        borrarError();    
        const divError = document.getElementById('mensaje-error'); 
    
        const parrafoError = document.createElement('p');    
        parrafoError.textContent = mensaje;     
        divError.appendChild(parrafoError); 

        document.getElementById(campo).style.border = "2px solid red";    

        divError.style.display = 'block';    
    }
    
    function borrarError() {   
         const divError = document.getElementById('mensaje-error');     
         divError.innerHTML = "";    
         divError.style.display = 'none';
         
         document.getElementById('tNombre').style.border = "2px solid #b2650b";
         document.getElementById('fechaTueste').style.border = "2px solid #b2650b";
    }



document.getElementById('boton-enviar').addEventListener('click', agregarCafe);

function agregarCafe() {       
    const cafeNombre = document.getElementById('tNombre').value;
    const cafeTueste = document.querySelector('input[name="nivelTueste"]:checked');
    const fechaTueste = document.getElementById('fechaTueste').value;    
    const origen = document.getElementById('cbOrigen').value;  
    const molido = document.getElementById('chMolido').checked;
    const cafePrecio = document.getElementById('nbPrecio').value;  
    const descripcion = document.getElementById('tDescripcion').value;
    

    // Valida que el nombre tenga un mínimo de 2 caracteres y que no tenfa caracteres especiales
    if (!/^[a-zA-Z\s]{2,}$/.test(cafeNombre)) {       
        setearError("Mínimo 2 caracteres. No se admiten caracteres especiales.", "tNombre");
        return;
    }

    //Valida que la fecha de tueste no sea una fecha futura
    if (!fechaTueste || new Date(fechaTueste) > new Date()) {       
        setearError("Ingresar una fecha no futura", "fechaTueste");
        return;
    }



    // Verifica si ya existe un cafe con el mismo nombre
    if (cafes.some(cafe => cafe.nombre === cafeNombre)) {
        setearError("El nombre del café ya está registrado.", "tNombre");
    }
    
    else
    {
        borrarError();
         // Crea el objeto cafe
         const cafe = {
            numero: proximo(),
            nombre: cafeNombre,
            tueste: cafeTueste.value,
            fecha: fechaTueste,            
            origen: origen,          
            molido: molido,
            precio: cafePrecio,           
            descripcion: descripcion
         };
    
        cafes.push(cafe); console.log("Cafe creado");

        mensajeCafe(cafe);

        actualizarTabla(cafes);       
    }        
};