const express = require("express");
const router = express.Router();
const queries = require("../repositories/GruposRepository");
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los grupos
router.get("/", isLoggedIn, async (request, response) => {
  try {
    const grupos = await queries.obtenerTodosLosGrupos();
    response.render("grupos/listado", { grupos });
  } catch (error) {
    console.error("Error al obtener los grupos:", error);
    request.flash("error", "Error al obtener los grupos");
    response.redirect("/grupos");
  }
});

// Endpoint para mostrar el formulario para agregar un nuevo grupo
router.get("/agregar", isLoggedIn, (request, response) => {
  response.render("grupos/agregar");
});

// Endpoint para agregar un nuevo grupo
router.post("/agregar", isLoggedIn, async (request, response) => {
  const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
  try {
    await queries.insertarGrupo(num_grupo, anio, ciclo, idmateria, idprofesor);
    request.flash("success", "Grupo agregado con éxito");
    response.redirect("/grupos");
  } catch (error) {
    console.error("Error al agregar el grupo:", error);
    request.flash("error", "Ocurrió un problema al agregar el grupo");
    response.redirect("/grupos");
  }
});

// Endpoint para mostrar el formulario para editar un grupo
router.get("/editar/:idgrupo", isLoggedIn, async (request, response) => {
  const { idgrupo } = request.params;
  try {
    const grupo = await queries.obtenerGrupoPorId(idgrupo);
    response.render("grupos/editar", grupo);
  } catch (error) {
    console.error("Error al obtener el grupo:", error);
    request.flash("error", "Error al obtener el grupo");
    response.redirect("/grupos");
  }
});

// Endpoint para actualizar un grupo
router.post("/editar/:idgrupo", isLoggedIn, async (request, response) => {
  const { idgrupo } = request.params;
  const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
  try {
    await queries.actualizarGrupo(idgrupo, num_grupo, anio, ciclo, idmateria, idprofesor);
    request.flash("success", "Grupo actualizado con éxito");
    response.redirect("/grupos");
  } catch (error) {
    console.error("Error al actualizar el grupo:", error);
    request.flash("error", "Ocurrió un problema al actualizar el grupo");
    response.redirect("/grupos");
  }
});

// Endpoint para eliminar un grupo
router.get("/eliminar/:idgrupo", isLoggedIn, async (request, response) => {
  const { idgrupo } = request.params;
  try {
    const resultado = await queries.eliminarGrupo(idgrupo);
    if (resultado) {
      request.flash("success", "Grupo eliminado con éxito");
    } else {
      request.flash("error", "No se pudo eliminar el grupo");
    }
    response.redirect("/grupos");
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
    request.flash("error", "Ocurrió un problema al eliminar el grupo");
    response.redirect("/grupos");
  }
});

module.exports = router;
