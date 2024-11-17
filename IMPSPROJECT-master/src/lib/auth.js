module.exports = {
    // Verifica si existe sesión
    isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) { // Método de passport que verifica si hay un usuario autenticado
        return next();
      }
      return res.redirect('/signin'); // Si no hay usuario autenticado, redirige a la pantalla de login
    },
  
    // Verifica si no existe sesión
    isNotLoggedIn(req, res, next) {
      if (!req.isAuthenticated()) { // Método de passport que devuelve true si no hay usuario autenticado
        return next();
      }
      return res.redirect('/'); // Si hay usuario autenticado, redirige a la página principal
    }
  };
  