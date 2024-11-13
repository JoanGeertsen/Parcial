let cafes = [];

//Función proximo de la teoría
let proximo = (function () {
    let numero = 0;
    return function () {
        numero++;
        return numero;
    };
})();

function actualziarTabla(tabla){
    const tablaResultados = document.getElementById('tabla-resultados').querySelector('tbody');

    tablaResultados.innerHTML = "";

    tabla.forEach((cafe) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
                    <td>${cafe.nombre}</td>
                    <td>${cafe.fecha}</td>
                    <td>${cafe.origen}</td>
                    <td><img src="img/editar.png" alt="Editar" onclick="editarEvento('${cafe.nombre}')" style="cursor: pointer;"></td>
                    <td><img src="img/eliminar.png" alt="Eliminar" onclick="eliminarEvento('${cafe.nombre}')" style="cursor: pointer;"></td>
                `;

    tablaResultados.appendChild(fila);
    });

    document.getElementById('cafe-form').reset();
}

function eliminarEvento(nombreEvento){    
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el café "${nombreEvento}"?`);
    
    if (confirmacion) {        
        const index = cafes.findIndex(evento => evento.nombre === nombreEvento);       
            cafes.splice(index, 1);

            alert(`Evento "${nombreEvento}" eliminado exitosamente.`);     
        
            actualziarTabla(cafes);
            actualizarEventosDestacados();
        } 
    else console.log("Eliminación cancelada.");
    
    document.getElementById("boton-enviar").style.display = "block";
    document.getElementById("boton-reset").style.display = "block";
    document.getElementById("boton-actualizar").style.display = "none";
    document.getElementById("boton-cancelar").style.display = "none";
    document.getElementById('tNombre').disabled = false;
  }

function editarEvento(nombreEvento){    
    console.log(`Editando evento ${nombreEvento}`);
    document.getElementById("boton-enviar").style.display = "none";
    document.getElementById("boton-reset").style.display = "none";
    document.getElementById("boton-actualizar").style.display = "block";
    document.getElementById("boton-cancelar").style.display = "block";

    const eventoAEditar = cafes.find(evento => evento.nombre === nombreEvento);

    //Setea los valores en el formulario
    document.getElementById('tNombre').value = eventoAEditar.nombre;
    document.getElementById('tNombre').disabled = true;
    document.getElementById(`${eventoAEditar.tipo}`).checked=true;
    document.getElementById("fechaTueste").value = eventoAEditar.fecha;
    document.getElementById("evento-direccion").value = eventoAEditar.direccion;
    document.getElementById("cbOrigen").value = eventoAEditar.ciudad;
    document.getElementById("evento-capacidad").value = eventoAEditar.capacidad;
    document.getElementById("chMolido").checked = eventoAEditar.gratuito;
    document.getElementById("nbPrecio").value = eventoAEditar.costo;
    document.getElementById("evento-puntuacion").value = eventoAEditar.valoracion;
    document.getElementById("tDescripcion").value = eventoAEditar.observaciones;

}

document.getElementById('boton-actualizar').addEventListener('click', function() {
    let nombreEvento = document.getElementById('tNombre').value;
    const index = cafes.findIndex(evento => evento.nombre === nombreEvento);
    cafes.splice(index, 1);

    agregarEvento();


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

function mensajeEvento(cafe){    
    alert(`
        El cafe ${cafe.nombre} se registró con éxito.`);  
}

document.getElementById('boton-enviar').addEventListener('click', agregarEvento);

function agregarEvento() {       
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

        mensajeEvento(cafe);

        actualziarTabla(cafes);       
    }        
};