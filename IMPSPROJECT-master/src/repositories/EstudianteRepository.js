const pool = require('../config/databaseController');
const { v4: uuidv4 } = require('uuid'); // Importa la función para generar UUID

function generarIdPersonalizado() {
  const uuid = uuidv4().replace(/-/g, ''); // Genera un UUID y elimina los guiones
  const customId = uuid.slice(0, 12); // Toma solo los primeros 12 caracteres
  return customId;
}

module.exports = {
  // Consulta para obtener todos los estudiantes
  obtenerTodosLosEstudiantes: async () => {
    try {
      const result = await pool.query('SELECT * FROM estudiantes');
      return result;
    } catch (error) {
      console.error('Ocurrió un problema al consultar la lista de estudiantes:', error);
    }
  },

  // Consulta para obtener un estudiante por su ID
  obtenerEstudiantePorId: async (idestudiante) => {
    try {
      const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
      return result[0]; // Devuelve el primer (y único) estudiante encontrado
    } catch (error) {
      console.error('Ocurrió un problema al obtener el estudiante:', error);
    }
  },

  generarIdPersonalizado: () => {
    const uuid = uuidv4(); // Genera un UUID
    const customId = uuid.split('-').slice(0, 3).join('-'); // Formato "xxxx-xxxx-xxxx"
    return customId;
  },

  // Insertar un nuevo estudiante
  insertarEstudiante: async (nombre, apellido, email, idcarrera, usuario) => {
    const idestudiante = generarIdPersonalizado(); // Llama a la función directamente
    try {
      const result = await pool.query(
        'INSERT INTO estudiantes (idestudiante, nombre, apellido, email, idcarrera, usuario) VALUES (?, ?, ?, ?, ?, ?)',
        [idestudiante, nombre, apellido, email, idcarrera, usuario]
      );
      return idestudiante; // Devuelve el ID del nuevo estudiante
    } catch (error) {
      console.error('Error al insertar el estudiante:', error);
      throw error;
    }
  },

  // Actualizar un estudiante existente
  actualizarEstudiante: async (idestudiante, nombre, apellido, email, idcarrera, usuario) => {
    try {
      const result = await pool.query(
        'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?',
        [nombre, apellido, email, idcarrera, usuario, idestudiante]
      );
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error('Error al actualizar el estudiante:', error);
    }
  },

  // Eliminar un estudiante
  eliminarEstudiante: async (idestudiante) => {
    try {
      const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  }
};
