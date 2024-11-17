const express = require("express");
const router = express.Router();
const queries = require("../repositories/EstudianteRepository");
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los estudiantes
router.get("/", isLoggedIn, async (request, response) => {
  try {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render("estudiantes/listado", { estudiantes });
  } catch (error) {
    console.error("Error al obtener el listado de estudiantes:", error);
    request.flash('error', 'Error al obtener el listado de estudiantes');
    response.redirect("/estudiantes");
  }
});

// Endpoint para mostrar el formulario para agregar un nuevo estudiante
router.get("/agregar", isLoggedIn, (request, response) => {
  response.render("estudiantes/agregar");
});

// Endpoint para agregar un estudiante
router.post("/agregar", isLoggedIn, async (request, response) => {
  const { nombre, apellido, email, idcarrera, usuario } = request.body;
  try {
    await queries.insertarEstudiante(nombre, apellido, email, idcarrera, usuario);
    request.flash('success', 'Estudiante agregado con éxito');
    response.redirect("/estudiantes");
  } catch (error) {
    console.error("Error al agregar estudiante:", error);
    request.flash('error', 'Ocurrió un problema al agregar el estudiante');
    response.redirect("/estudiantes");
  }
});

// Endpoint para mostrar el formulario para editar un estudiante
router.get("/editar/:idestudiante", isLoggedIn, async (request, response) => {
  const { idestudiante } = request.params;
  try {
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
    response.render("estudiantes/editar", estudiante);
  } catch (error) {
    console.error("Error al obtener el estudiante:", error);
    request.flash('error', 'Error al obtener el estudiante');
    response.redirect("/estudiantes");
  }
});

// Endpoint para actualizar un estudiante
router.post("/editar/:idestudiante", isLoggedIn, async (request, response) => {
  const { idestudiante } = request.params;
  const { nombre, apellido, email, idcarrera, usuario } = request.body;
  try {
    await queries.actualizarEstudiante(idestudiante, nombre, apellido, email, idcarrera, usuario);
    request.flash('success', 'Estudiante actualizado con éxito');
    response.redirect("/estudiantes");
  } catch (error) {
    console.error("Error al actualizar el estudiante:", error);
    request.flash('error', 'Ocurrió un problema al actualizar el estudiante');
    response.redirect("/estudiantes");
  }
});

// Endpoint para eliminar un estudiante
router.get("/eliminar/:idestudiante", isLoggedIn, async (request, response) => {
  const { idestudiante } = request.params;
  try {
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado) {
      request.flash('success', 'Estudiante eliminado con éxito');
    } else {
      request.flash('error', 'No se pudo eliminar el estudiante');
    }
    response.redirect("/estudiantes");
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error);
    request.flash('error', 'Ocurrió un problema al eliminar el estudiante');
    response.redirect("/estudiantes");
  }
});

module.exports = router;
