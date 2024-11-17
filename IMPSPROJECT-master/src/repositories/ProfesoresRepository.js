const pool = require('../config/databaseController');

module.exports = {
  // Obtener todos los profesores
  obtenerTodosLosProfesores: async () => {
    try {
      const result = await pool.query('SELECT * FROM profesores');
      return result;
    } catch (error) {
      console.error('Error al obtener los profesores:', error);
      throw error;
    }
  },

  // Obtener un profesor por su ID
  obtenerProfesorPorId: async (idprofesor) => {
    try {
      const result = await pool.query('SELECT * FROM profesores WHERE idprofesor = ?', [idprofesor]);
      return result[0];
    } catch (error) {
      console.error('Error al obtener el profesor:', error);
      throw error;
    }
  },

  // Insertar un nuevo profesor
  insertarProfesor: async (nombre, apellido, fecha_nacimiento, profesion, genero, email) => {
    try {
      const result = await pool.query(
        'INSERT INTO profesores (nombre, apellido, fecha_nacimiento, profesion, genero, email) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, fecha_nacimiento, profesion, genero, email]
      );
      return result.insertId; // Devuelve el ID del nuevo profesor
    } catch (error) {
      console.error('Error al insertar el profesor:', error);
      throw error;
    }
  },

  // Actualizar un profesor
  actualizarProfesor: async (idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email) => {
    try {
      const result = await pool.query(
        'UPDATE profesores SET nombre = ?, apellido = ?, fecha_nacimiento = ?, profesion = ?, genero = ?, email = ? WHERE idprofesor = ?',
        [nombre, apellido, fecha_nacimiento, profesion, genero, email, idprofesor]
      );
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error('Error al actualizar el profesor:', error);
      throw error;
    }
  },

  // Eliminar un profesor
  eliminarProfesor: async (idprofesor) => {
    try {
      const result = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
      return result.affectedRows > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error('Error al eliminar el profesor:', error);
      throw error;
    }
  }
};
