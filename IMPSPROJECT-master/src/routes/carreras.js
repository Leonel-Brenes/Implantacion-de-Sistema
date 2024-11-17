const express = require("express");
const router = express.Router();
const queries = require("../repositories/CarrerasRepository");
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todas las carreras
router.get("/", isLoggedIn, async (request, response) => {
  try {
    const carreras = await queries.obtenerTodasLasCarreras();
    response.render("carreras/listado", { carreras });
  } catch (error) {
    console.error("Error al obtener el listado de carreras:", error);
    request.flash('error', 'Error al obtener el listado de carreras');
    response.status(500).redirect("/carreras");
  }
});

// Endpoint para mostrar el formulario para agregar una nueva carrera
router.get("/agregar", isLoggedIn, (request, response) => {
  response.render("carreras/agregar");
});

// Endpoint para agregar una carrera
router.post("/agregar", isLoggedIn, async (request, response) => {
  const { idcarrera, carrera } = request.body;
  try {
    await queries.insertarCarrera(carrera);
    request.flash('success', 'Carrera agregada con éxito');
    response.redirect("/carreras");
  } catch (error) {
    console.error("Error al agregar carrera:", error);
    request.flash('error', 'Ocurrió un problema al agregar la carrera');
    response.status(500).redirect("/carreras");
  }
});

// Endpoint para mostrar el formulario para editar una carrera
router.get("/editar/:idcarrera", isLoggedIn, async (request, response) => {
  const { idcarrera } = request.params;
  try {
    const carrera = await queries.obtenerCarreraPorId(idcarrera);
    response.render("carreras/editar", carrera);
  } catch (error) {
    console.error("Error al obtener la carrera:", error);
    request.flash('error', 'Error al obtener la carrera');
    response.status(500).redirect("/carreras");
  }
});

// Endpoint para actualizar una carrera
router.post("/editar/:idcarrera", isLoggedIn, async (request, response) => {
  const { idcarrera } = request.params;
  const { carrera } = request.body;
  try {
    await queries.actualizarCarrera(idcarrera, carrera);
    request.flash('success', 'Carrera actualizada con éxito');
    response.redirect("/carreras");
  } catch (error) {
    console.error("Error al actualizar la carrera:", error);
    request.flash('error', 'Ocurrió un problema al actualizar la carrera');
    response.status(500).redirect("/carreras");
  }
});

// Endpoint para eliminar una carrera
router.get("/eliminar/:idcarrera", isLoggedIn, async (request, response) => {
  const { idcarrera } = request.params;
  try {
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado) {
      request.flash('success', 'Carrera eliminada con éxito');
    } else {
      request.flash('error', 'Ocurrió un problema al eliminar la carrera');
    }
    response.redirect("/carreras");
  } catch (error) {
    console.error("Error al eliminar la carrera:", error);
    request.flash('error', 'Ocurrió un problema al eliminar la carrera');
    response.status(500).redirect("/carreras");
  }
});

module.exports = router;
