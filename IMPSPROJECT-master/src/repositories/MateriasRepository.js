const pool = require('../config/databaseController');

module.exports = {
  // Obtener todas las materias
  obtenerTodasLasMaterias: async () => {
    try {
      const result = await pool.query('SELECT * FROM materias');
      return result;
    } catch (error) {
      console.error('Error al obtener las materias:', error);
      throw error;
    }
  },

  // Obtener una materia por su ID
  obtenerMateriaPorId: async (idmateria) => {
    try {
      const result = await pool.query('SELECT * FROM materias WHERE idmateria = ?', [idmateria]);
      return result[0];
    } catch (error) {
      console.error('Error al obtener la materia:', error);
      throw error;
    }
  },

  // Insertar una nueva materia
  insertarMateria: async (materia) => {
    try {
      const result = await pool.query(
        'INSERT INTO materias (materia) VALUES (?)',
        [materia]
      );
      return result.insertId; // Devuelve el ID de la nueva materia
    } catch (error) {
      console.error('Error al insertar la materia:', error);
      throw error;
    }
  },

  // Actualizar una materia existente
  actualizarMateria: async (idmateria, materia) => {
    try {
      const result = await pool.query(
        'UPDATE materias SET materia = ? WHERE idmateria = ?',
        [materia, idmateria]
      );
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error('Error al actualizar la materia:', error);
      throw error;
    }
  },

  // Eliminar una materia
  eliminarMateria: async (idmateria) => {
    try {
      const result = await pool.query('DELETE FROM materias WHERE idmateria = ?', [idmateria]);
      return result.affectedRows > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
      throw error;
    }
  }
};
