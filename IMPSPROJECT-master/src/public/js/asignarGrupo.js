// Lista de registros temporales de estudiantes
let estudiantes = [];
let idgrupo;

// Función para agregar un estudiante a la tabla temporal
function agregarEstudiante(idgrupo) {
  // Verificar si se ha seleccionado un estudiante
  if ($("#estudiante").prop("selectedIndex") === 0) {
    alert("Debe seleccionar un estudiante");
    return;
  }

  // Validar si el estudiante ya existe en la lista
  if (validarEstudianteExiste()) {
    alert("El estudiante ya ha sido agregado.");
  } else {
    // Agregar el estudiante a la lista temporal
    estudiantes.push({
      idestudiante: $("#estudiante").val(),
      nombrecompleto: $("#estudiante option:selected").text().trim(),
      idgrupo: $("#idgrupo").val()
    });
    mostrarEstudiantes();
  }
}

// Función para mostrar los estudiantes en la tabla
function mostrarEstudiantes() {
  let contenido = $("#contenido_tabla");
  let data = $("#data");

  // Limpiar contenido de la tabla y los datos ocultos
  data.empty();
  contenido.empty();

  if (estudiantes.length > 0) {
    // Mostrar cada estudiante en la tabla
    for (let i = 0; i < estudiantes.length; i++) {
      contenido.append("<tr>");
      contenido.append("<td>" + estudiantes[i].idestudiante + "</td>");
      contenido.append("<td>" + estudiantes[i].nombrecompleto + "</td>");
      contenido.append("<td><a class='btn btn-danger' href='#' onclick='eliminarEstudiante(event," + i + ")'>Eliminar</a></td>");
      contenido.append("</tr>");

      // Agregar datos ocultos para enviar al controlador
      data.append("<input type='hidden' name='grupo_estudiantes[" + i + "][idgrupo]' value='" + estudiantes[i].idgrupo + "'/>");
      data.append("<input type='hidden' name='grupo_estudiantes[" + i + "][idestudiante]' value='" + estudiantes[i].idestudiante + "'/>");
    }
  } else {
    // Mostrar mensaje cuando no hay estudiantes
    contenido.append("<tr><td colspan='3' style='text-align: center'>No hay información.</td></tr>");
  }

  // Agregar siempre el idgrupo como dato oculto
  data.append("<input type='hidden' name='idgrupo' value='" + $("#idgrupo").val() + "'/>");
}

// Función para validar si un estudiante ya existe en la lista
function validarEstudianteExiste() {
  let existe = false;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].idestudiante === $("#estudiante").val()) {
      existe = true;
      break;
    }
  }
  return existe;
}

// Función para eliminar un estudiante de la tabla temporal
function eliminarEstudiante(event, index) {
  event.preventDefault();
  estudiantes.splice(index, 1); // Eliminar estudiante de la lista
  mostrarEstudiantes(); // Actualizar la tabla
}
