const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); // Motor de plantillas Handlebars
const path = require('path');
const flash = require('connect-flash'); // Para mensajes en la sesión
const session = require('express-session'); // Para manejar sesiones
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport'); // Autenticación
require('dotenv').config(); // Variables de entorno

// Inicialización de la aplicación
const app = express();
const { database } = require('./config/keys');
require('./lib/passportConfig'); // Configuración de autenticación de passport

// Ajustes del servidor
app.set('port', process.env.PORT || 4500);
app.set('views', path.join(__dirname, 'views')); // Ruta de vistas

// Configuración del motor de plantillas Handlebars con helpers
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'), // Ruta de los layouts
  partialsDir: path.join(app.get('views'), 'partials'), // Vistas parciales
  extname: '.hbs',
  helpers: {
    ifCond: function (v1, v2, options) {
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    },
    ...require('./lib/handlebars')
  }
}));
app.set('view engine', '.hbs'); // Motor de plantillas

// Middlewares
app.use(session({
  secret: process.env.SESSION_KEY, // Clave secreta de la sesión
  resave: false, // No renueva la sesión
  saveUninitialized: false, // No crea una sesión nueva
  store: new MySQLStore(database) // Guarda la sesión en la base de datos
}));
app.use(flash());
app.use(morgan('dev')); // Middleware para visualizar requests
app.use(express.urlencoded({ extended: false })); // Procesa datos de formularios
app.use(passport.initialize()); // Inicia passport
app.use(passport.session()); // Guarda los datos de autenticación

// Variables globales
app.use((request, response, next) => {
  app.locals.success = request.flash('success');
  app.locals.error = request.flash('error');
  app.locals.user = request.user; // Manejo global del usuario
  next(); // Continúa la ejecución
});

// Configuración de rutas
app.use('/', require('./routes'));
app.use('/', require('./routes/authentication')); 
app.use('/estudiantes', require('./routes/estudiantes'));
app.use('/carreras', require('./routes/carreras'));
app.use('/materias', require('./routes/materias'));
app.use('/profesores', require('./routes/profesores'));
app.use('/grupos', require('./routes/grupos'));
app.use('/grupo_estudiantes', require('./routes/grupo_estudiantes'));

// Archivos públicos (accesibles por el navegador)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto:', app.get('port'));
});
