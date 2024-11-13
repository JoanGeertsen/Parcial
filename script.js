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

    tabla.forEach((evento, i) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
                    <td>${evento.nombre}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.ciudad}</td>
                    <td><img src="recursos/editar.png" alt="Editar" onclick="editarEvento('${evento.nombre}')" style="cursor: pointer;"></td>
                    <td><img src="recursos/eliminar.png" alt="Eliminar" onclick="eliminarEvento('${evento.nombre}')" style="cursor: pointer;"></td>
                `;

    tablaResultados.appendChild(fila);
    });

    document.getElementById('evento-form').reset();
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

function mensajeEvento(evento){    
    alert(`
        Evento ${evento.nombre} registrado con éxito.
        Detalles:
        Número: ${evento.numero}
        Tipo: ${evento.tipo}
        Fecha: ${evento.fecha}
        Dirección: ${evento.direccion}
        Ciudad: ${evento.ciudad}
        Capacidad: ${evento.capacidad}
        Gratuito: ${evento.gratuito ? 'Sí' : 'No'}
        Costo: ${evento.costo}
        Valoración: ${evento.valoracion}
        Observaciones: ${evento.observaciones}`);  
}

document.getElementById('boton-enviar').addEventListener('click', agregarEvento);

function agregarEvento() {    
    const eventoNombre = document.getElementById('tNombre').value;
    const tipoEvento = document.querySelector('input[name="nivelTueste"]:checked');
    const fechaEvento = document.getElementById('fechaTueste').value;
    const direccion = document.getElementById('evento-direccion').value;
    const ciudad = document.getElementById('cbOrigen').value;
    const capacidad = document.getElementById('evento-capacidad').value;
    const gratuito = document.getElementById('chMolido').checked;
    const costoEntrada = document.getElementById('nbPrecio').value;
    const valoracion = document.getElementById('evento-puntuacion').value;
    const observaciones = document.getElementById('tDescripcion').value;

    

    // Validaciones
    if (!eventoNombre || !tipoEvento || !fechaEvento || !direccion || !capacidad || !valoracion) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    // Verifica si ya existe un evento con el mismo nombre
    if (cafes.some(evento => evento.nombre === eventoNombre)) {
        alert("El nombre del evento ya está registrado.");
    }
    
    else
    {
         // Crea el objeto del evento
         const cafe = {
            numero: proximo(),
            nombre: eventoNombre,
            tipo: tipoEvento.value,
            fecha: fechaEvento,
            direccion: direccion,
            ciudad: ciudad,
            capacidad: capacidad,
            gratuito: gratuito,
            costo: gratuito ? 'Gratuito' : costoEntrada,
            valoracion: valoracion,
            observaciones: observaciones
         };
    
        cafes.push(cafe); console.log("Evento creado");

        mensajeEvento(cafe);

        actualziarTabla(cafes);
        actualizarEventosDestacados();
    }        
};

const valorPuntuacion = document.getElementById('valorPuntuacion');
const inputPuntuacion = document.getElementById('evento-puntuacion');

inputPuntuacion.addEventListener('input', function() {
    valorPuntuacion.textContent = inputPuntuacion.value;
});

document.getElementById('contieneBtn').addEventListener('click', function() {    
    let inputText = document.getElementById("textoFiltro").value;
    const eventosEncontrados = cafes.filter(e => e.nombre.toLowerCase().includes(inputText.toLowerCase()));

    actualziarTabla(eventosEncontrados);
});

document.getElementById('comienzaBtn').addEventListener('click', function() {    
    let inputText = document.getElementById("textoFiltro").value;
    const eventosEncontrados = cafes.filter(e => new RegExp(`^${inputText}`, 'i').test(e.nombre));

    actualziarTabla(eventosEncontrados);
});

document.getElementById('finalizaBtn').addEventListener('click', function() {    
    let inputText = document.getElementById("textoFiltro").value;
    const eventosEncontrados = cafes.filter(e => new RegExp(`${inputText}$`, 'i').test(e.nombre));

    actualziarTabla(eventosEncontrados);
});

function actualizarEventosDestacados() {
    let cartelera = document.getElementsByClassName("eventos-grid")[0];
    let ultimosEventos = cafes.slice(-3);

    cartelera.innerHTML = ""; 

    ultimosEventos.forEach(evento => {
        let articulo = document.createElement('article');
        articulo.classList.add("evento");    
        
        articulo.innerHTML = `
            <h3>${evento.nombre}</h3>
            <p>Fecha: ${evento.fecha}</p>
            <p>Ciudad: ${evento.ciudad}</p>
            <a href="#cafes" class="btn">Ver más</a>
        `;

        cartelera.appendChild(articulo); 
    });

    // Muestra u oculta el elemento dummy según el número de eventos
    if (cafes.length > 0)    
        document.getElementById("dummy").style.display = "none";
    else
    {
        let articulo = document.createElement('article');
        articulo.classList.add("evento");
        articulo.id = "dummy";
        
        articulo.innerHTML = `            
            <p>Aún no hay eventos registrados</p>
            <a href="#formulario" class="btn">Registrar</a>
        `;

        cartelera.appendChild(articulo);
    }        
};


