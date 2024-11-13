# Trabajo Práctico: JavaScript y DOM – Set

Este proyecto consiste en una página web interactiva que permite registrar, gestionar y visualizar eventos de manera dinámica utilizando JavaScript y manipulaciones del DOM. Los datos de los eventos se almacenan en un arreglo de objetos, permitiendo un acceso rápido y eficiente.

## Funcionalidades

### Registro de Eventos

La página permite el registro de diferentes eventos ingresando los siguientes datos:
- **Nombre del Evento**: Título o nombre descriptivo del evento.
- **Tipo de Evento**: Selección entre las opciones disponibles (concierto, exposición o feria) mediante radio buttons.
- **Fecha del Evento**: Campo para ingresar la fecha en la que se llevará a cabo o ha ocurrido el evento.
- **Dirección**: Dirección del lugar donde se llevará a cabo el evento.
- **Ciudad**: Selección de la ciudad entre opciones predefinidas en un combobox.
- **Capacidad del Evento**: Número máximo de asistentes permitidos.
- **Evento Gratuito**: Checkbox para indicar si el evento es gratuito.
- **Costo de Entrada**: Precio de la entrada si el evento no es gratuito.
- **Valoración del Evento**: Sistema de puntuación en una escala de 1 a 5.
- **Observaciones**: Campo de texto para anotaciones adicionales sobre el evento.

### Funcionalidades Principales

#### Botones

1. **Cargar**:
   - **Validación de Datos**: Valida que los campos requeridos estén completos y que el nombre del evento no esté registrado previamente.
   - **Registro de Evento**: Si pasa la validación, el evento se guarda en el arreglo de objetos y se le asigna un número único.
   - **Confirmación**: Muestra un mensaje con los datos del evento registrado.
   - **Actualización de Listado**: Refresca la tabla en la sección de listado.

2. **Actualizar**:
   - **Visible solo en edición**: Permite modificar los datos de un evento ya registrado.
   - **Validación**: Sigue las mismas reglas de validación que el botón "Cargar".
   - **Deshabilitación de Cargar**: Al editar, se oculta el botón "Cargar" para evitar duplicaciones.

### Sección de Listado

En la sección de listado se presenta una tabla que muestra los eventos registrados, incluyendo:
- Nombre del evento
- Fecha del evento
- Ciudad donde se llevará a cabo

Además, cada fila cuenta con dos botones para:
- **Editar**: Permite cargar los datos del evento en el formulario, habilitando el botón "Actualizar" y ocultando "Cargar".
- **Eliminar**: Solicita confirmación para eliminar el evento, y en caso de aceptación, actualiza la tabla y muestra un mensaje de confirmación.

### Filtros de Búsqueda

La página incluye un sistema de filtros que permite buscar eventos de acuerdo a:
- **Texto**: Campo de texto para especificar el criterio de búsqueda.
- **Opciones de Filtro**: Se puede seleccionar entre las opciones "Que comience con", "Que finalice con" o "Contenga".
- **Botón Filtrar**: Al hacer clic, actualiza la tabla de eventos mostrando solo los que cumplen con el criterio seleccionado. Esta función utiliza `filter` en el arreglo de eventos.

### Funcionalidad Adicional

Se ha agregado una sección extra con una funcionalidad adicional no especificada en los requisitos originales. Esta lista los eventos ordenados que tan próxima sea la fecha.

## Tecnologías Utilizadas

- **HTML**: Estructura de la página y elementos del formulario.
- **CSS**: Estilos y diseño de la interfaz de usuario.
- **JavaScript**: Manipulación del DOM, validación de formularios, almacenamiento de datos en el arreglo y gestión de eventos.

## Cómo Usar

1. Clonar el repositorio.
   ```bash
   git clone https://github.com/JoanGeertsen/TF_EventosJS-DOM-SET
