const express = require("express");
const router = express.Router();
const queries = require("../repositories/GrupoEstudiantesRepository");
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los grupos de estudiantes
router.get("/", isLoggedIn, async (request, response) => {
  try {
    const grupoEstudiantes = await queries.obtenerTodosLosGruposEstudiantes();
    response.render("grupo_estudiantes/listado", { grupoEstudiantes });
  } catch (error) {
    console.error("Error al obtener los grupos de estudiantes:", error);
    request.flash("error", "Error al obtener los grupos de estudiantes");
    response.redirect("/grupo_estudiantes");
  }
});

// Endpoint para mostrar el formulario para agregar un nuevo grupo de estudiante
router.get("/agregar", isLoggedIn, (request, response) => {
  response.render("grupo_estudiantes/agregar");
});

// Endpoint para agregar un grupo de estudiante
router.post("/agregar", isLoggedIn, async (request, response) => {
  const { idgrupo, idestudiante } = request.body;
  try {
    await queries.insertarGrupoEstudiante(idgrupo, idestudiante);
    request.flash("success", "Grupo de estudiante agregado con éxito");
    response.redirect("/grupo_estudiantes");
  } catch (error) {
    console.error("Error al agregar el grupo de estudiante:", error);
    request.flash("error", "Ocurrió un problema al agregar el grupo de estudiante");
    response.redirect("/grupo_estudiantes");
  }
});

// Endpoint para mostrar el formulario para editar un grupo de estudiante
router.get("/editar/:idgrupoestudiante", isLoggedIn, async (request, response) => {
  const { idgrupoestudiante } = request.params;
  try {
    const grupoEstudiante = await queries.obtenerGrupoEstudiantePorId(idgrupoestudiante);
    response.render("grupo_estudiantes/editar", grupoEstudiante);
  } catch (error) {
    console.error("Error al obtener el grupo de estudiante:", error);
    request.flash("error", "Error al obtener el grupo de estudiante");
    response.redirect("/grupo_estudiantes");
  }
});

// Endpoint para actualizar un grupo de estudiante
router.post("/editar/:idgrupoestudiante", isLoggedIn, async (request, response) => {
  const { idgrupoestudiante } = request.params;
  const { idgrupo, idestudiante } = request.body;
  try {
    await queries.actualizarGrupoEstudiante(idgrupoestudiante, idgrupo, idestudiante);
    request.flash("success", "Grupo de estudiante actualizado con éxito");
    response.redirect("/grupo_estudiantes");
  } catch (error) {
    console.error("Error al actualizar el grupo de estudiante:", error);
    request.flash("error", "Ocurrió un problema al actualizar el grupo de estudiante");
    response.redirect("/grupo_estudiantes");
  }
});

// Endpoint para eliminar un grupo de estudiante
router.get("/eliminar/:idgrupoestudiante", isLoggedIn, async (request, response) => {
  const { idgrupoestudiante } = request.params;
  try {
    const resultado = await queries.eliminarGrupoEstudiante(idgrupoestudiante);
    if (resultado) {
      request.flash("success", "Grupo de estudiante eliminado con éxito");
    } else {
      request.flash("error", "No se pudo eliminar el grupo de estudiante");
    }
    response.redirect("/grupo_estudiantes");
  } catch (error) {
    console.error("Error al eliminar el grupo de estudiante:", error);
    request.flash("error", "Ocurrió un problema al eliminar el grupo de estudiante");
    response.redirect("/grupo_estudiantes");
  }
});

module.exports = router;
