const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

// Ruta para mostrar el formulario de registro, accesible solo si no hay una sesión iniciada
router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup"); // Elimina la barra inicial
});

// Ruta para manejar el registro de usuario
router.post(
  "/signup",
  isNotLoggedIn,
  passport.authenticate("local.signup", {
    successRedirect: "/",        // Redirige al inicio en caso de éxito
    failureRedirect: "/auth/signup",  // Redirige al formulario en caso de error
    failureFlash: true           // Permite enviar mensajes flash a la vista
  })
);

// Ruta para mostrar el formulario de inicio de sesión, accesible solo si no hay una sesión iniciada
router.get("/signin", isNotLoggedIn, (req, res) => {
  res.render("auth/signin"); // Elimina la barra inicial
});

// Ruta para manejar el inicio de sesión de usuario
router.post("/signin", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/",       // Redirige al inicio en caso de éxito
    failureRedirect: "/auth/signin", // Redirige al formulario en caso de error
    failureFlash: true          // Permite enviar mensajes flash a la vista
  })(req, res, next);
});

// Ruta para cerrar sesión y redirigir al formulario de inicio de sesión
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/signin"); // Redirige correctamente al formulario de login
  });
});

module.exports = router;
