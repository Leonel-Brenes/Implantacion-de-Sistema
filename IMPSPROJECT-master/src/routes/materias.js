const express = require("express");
const router = express.Router();
const queries = require("../repositories/MateriasRepository");
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todas las materias
router.get("/", isLoggedIn, async (request, response) => {
  try {
    const materias = await queries.obtenerTodasLasMaterias();
    response.render("materias/listado", { materias });
  } catch (error) {
    console.error("Error al obtener las materias:", error);
    request.flash("error", "Error al obtener las materias");
    response.redirect("/materias");
  }
});

// Endpoint para mostrar el formulario para agregar una nueva materia
router.get("/agregar", isLoggedIn, (request, response) => {
  response.render("materias/agregar");
});

// Endpoint para agregar una nueva materia
router.post("/agregar", isLoggedIn, async (request, response) => {
  const { materia } = request.body;
  try {
    await queries.insertarMateria(materia);
    request.flash("success", "Materia agregada con éxito");
    response.redirect("/materias");
  } catch (error) {
    console.error("Error al agregar la materia:", error);
    request.flash("error", "Ocurrió un problema al agregar la materia");
    response.redirect("/materias");
  }
});

// Endpoint para mostrar el formulario para editar una materia
router.get("/editar/:idmateria", isLoggedIn, async (request, response) => {
  const { idmateria } = request.params;
  try {
    const materia = await queries.obtenerMateriaPorId(idmateria);
    response.render("materias/editar", materia);
  } catch (error) {
    console.error("Error al obtener la materia:", error);
    request.flash("error", "Error al obtener la materia");
    response.redirect("/materias");
  }
});

// Endpoint para actualizar una materia
router.post("/editar/:idmateria", isLoggedIn, async (request, response) => {
  const { idmateria } = request.params;
  const { materia } = request.body;
  try {
    await queries.actualizarMateria(idmateria, materia);
    request.flash("success", "Materia actualizada con éxito");
    response.redirect("/materias");
  } catch (error) {
    console.error("Error al actualizar la materia:", error);
    request.flash("error", "Ocurrió un problema al actualizar la materia");
    response.redirect("/materias");
  }
});

// Endpoint para eliminar una materia
router.get("/eliminar/:idmateria", isLoggedIn, async (request, response) => {
  const { idmateria } = request.params;
  try {
    const resultado = await queries.eliminarMateria(idmateria);
    if (resultado) {
      request.flash("success", "Materia eliminada con éxito");
    } else {
      request.flash("error", "No se pudo eliminar la materia");
    }
    response.redirect("/materias");
  } catch (error) {
    console.error("Error al eliminar la materia:", error);
    request.flash("error", "Ocurrió un problema al eliminar la materia");
    response.redirect("/materias");
  }
});

module.exports = router;
