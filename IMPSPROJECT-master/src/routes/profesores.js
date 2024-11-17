const express = require("express");
const router = express.Router();
const queries = require("../repositories/ProfesoresRepository");
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los profesores
router.get("/", isLoggedIn, async (request, response) => {
  try {
    const profesores = await queries.obtenerTodosLosProfesores();
    response.render("profesores/listado", { profesores });
  } catch (error) {
    console.error("Error al obtener los profesores:", error);
    request.flash("error", "Error al obtener los profesores");
    response.redirect("/profesores");
  }
});

// Endpoint para mostrar el formulario para agregar un nuevo profesor
router.get("/agregar", isLoggedIn, (request, response) => {
  response.render("profesores/agregar");
});

// Endpoint para agregar un nuevo profesor
router.post("/agregar", isLoggedIn, async (request, response) => {
  const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
  try {
    await queries.insertarProfesor(nombre, apellido, fecha_nacimiento, profesion, genero, email);
    request.flash("success", "Profesor agregado con éxito");
    response.redirect("/profesores");
  } catch (error) {
    console.error("Error al agregar el profesor:", error);
    request.flash("error", "Ocurrió un problema al agregar el profesor");
    response.redirect("/profesores");
  }
});

// Endpoint para mostrar el formulario para editar un profesor
router.get("/editar/:idprofesor", isLoggedIn, async (request, response) => {
  const { idprofesor } = request.params;
  try {
    const profesor = await queries.obtenerProfesorPorId(idprofesor);
    response.render("profesores/editar", profesor);
  } catch (error) {
    console.error("Error al obtener el profesor:", error);
    request.flash("error", "Error al obtener el profesor");
    response.redirect("/profesores");
  }
});

// Endpoint para actualizar un profesor
router.post("/editar/:idprofesor", isLoggedIn, async (request, response) => {
  const { idprofesor } = request.params;
  const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
  try {
    await queries.actualizarProfesor(idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email);
    request.flash("success", "Profesor actualizado con éxito");
    response.redirect("/profesores");
  } catch (error) {
    console.error("Error al actualizar el profesor:", error);
    request.flash("error", "Ocurrió un problema al actualizar el profesor");
    response.redirect("/profesores");
  }
});

// Endpoint para eliminar un profesor
router.get("/eliminar/:idprofesor", isLoggedIn, async (request, response) => {
  const { idprofesor } = request.params;
  try {
    const resultado = await queries.eliminarProfesor(idprofesor);
    if (resultado) {
      request.flash("success", "Profesor eliminado con éxito");
    } else {
      request.flash("error", "No se pudo eliminar el profesor");
    }
    response.redirect("/profesores");
  } catch (error) {
    console.error("Error al eliminar el profesor:", error);
    request.flash("error", "Ocurrió un problema al eliminar el profesor");
    response.redirect("/profesores");
  }
});

module.exports = router;
