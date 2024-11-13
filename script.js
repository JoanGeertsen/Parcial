let cafes = [];

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

    // Limpiar el contenido previo de la tabla
    tablaResultados.innerHTML = "";

    tabla.forEach((cafe) => {
        const fila = document.createElement('tr');

        // Crear celda para el nombre del café
        const nombreCelda = document.createElement('td');
        const nombreTexto = document.createTextNode(cafe.nombre);
        nombreCelda.appendChild(nombreTexto);
        fila.appendChild(nombreCelda);

        // Crear celda para la fecha
        const fechaCelda = document.createElement('td');
        const fechaTexto = document.createTextNode(cafe.fecha);
        fechaCelda.appendChild(fechaTexto);
        fila.appendChild(fechaCelda);

        // Crear celda para el origen
        const origenCelda = document.createElement('td');
        const origenTexto = document.createTextNode(cafe.origen);
        origenCelda.appendChild(origenTexto);
        fila.appendChild(origenCelda);

        // Crear celda para el botón de editar
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

        // Crear celda para el botón de eliminar
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

        // Agregar la fila completa a la tabla
        tablaResultados.appendChild(fila);
    });

    // Resetear el formulario después de actualizar la tabla
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

document.getElementById('boton-cancelar').addEventListener('click', function() {
    document.getElementById("boton-enviar").style.display = "block";
    document.getElementById("boton-reset").style.display = "block";
    document.getElementById("boton-actualizar").style.display = "none";
    document.getElementById("boton-cancelar").style.display = "none";
    document.getElementById('tNombre').disabled = false;

    document.getElementById('cafe-form').reset();
});

function mensajeCafe(cafe){    
    alert(`
        El cafe ${cafe.nombre} se registró con éxito.`);  
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
    

    // Validaciones
    if (!cafeNombre || !cafeTueste || !fechaTueste ) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    // Verifica si ya existe un cafe con el mismo nombre
    if (cafes.some(cafe => cafe.nombre === cafeNombre)) {
        alert("El nombre del café ya está registrado.");
    }
    
    else
    {
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