const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/databaseController');
const helpers = require('./helpers');

// Estrategia para iniciar sesión (Login)
passport.use('local.signin', new LocalStrategy({
  usernameField: 'user_name',
  passwordField: 'user_password',
  passReqToCallback: true
}, async (req, user_name, user_password, done) => {
  // Buscar el usuario en la base de datos
  const rows = await pool.query('SELECT * FROM user_login WHERE user_name = ?', [user_name]);
  if (rows.length > 0) {
    const user = rows[0];
    // Validar la contraseña
    const validPassword = await helpers.matchPassword(user_password, user.user_password);
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.user_name));
    } else {
      done(null, false, req.flash('error', 'Contraseña incorrecta'));
    }
  } else {
    done(null, false, req.flash('error', 'El nombre de usuario no existe'));
  }
}));

// Estrategia para el registro de usuario (Signup)
passport.use('local.signup', new LocalStrategy({
  usernameField: 'user_name',
  passwordField: 'user_password',
  passReqToCallback: true
}, async (req, user_name, user_password, done) => {
  const { user_email } = req.body;
  const newUser = {
    user_name,
    user_email,
    user_password: await helpers.encryptPassword(user_password) // Encriptar contraseña
  };

  // Insertar nuevo usuario en la base de datos
  const result = await pool.query('INSERT INTO user_login SET ? ', [newUser]);
  newUser.id = result.insertId;
  return done(null, newUser); // Continuar con el registro del usuario en la sesión
}));

// Serializar usuario (Guardar en sesión)
passport.serializeUser((usr, done) => {
  done(null, usr.id);
});

// Deserializar usuario (Recuperar usuario de sesión)
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM user_login WHERE id = ?', [id]);
  done(null, rows[0]);
});
