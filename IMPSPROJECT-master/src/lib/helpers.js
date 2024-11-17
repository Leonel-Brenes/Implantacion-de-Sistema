const bcrypt = require('bcryptjs');
const helpers = {};

// Función para encriptar contraseña
helpers.encryptPassword = async (password) => {
  // El número indica las veces que se debe cifrar; mayor número significa mayor seguridad pero mayor tiempo y recursos
  const salt = await bcrypt.genSalt(10); 
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// Función para comparar la contraseña ingresada con la almacenada
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
  }
};

module.exports = helpers;
