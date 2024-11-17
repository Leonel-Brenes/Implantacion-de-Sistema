const pool = require('../config/databaseController');

module.exports = {
  // Obtener todos los registros de grupo_estudiantes
  obtenerTodosLosGruposEstudiantes: async () => {
    try {
      const result = await pool.query('SELECT * FROM grupo_estudiantes');
      return result;
    } catch (error) {
      console.error('Ocurrió un problema al consultar la lista de grupos de estudiantes:', error);
      throw error;
    }
  },

  // Obtener un registro de grupo_estudiantes por ID
  obtenerGrupoEstudiantePorId: async (idgrupoestudiante) => {
    try {
      const result = await pool.query('SELECT * FROM grupo_estudiantes WHERE idgrupoestudiante = ?', [idgrupoestudiante]);
      return result[0];
    } catch (error) {
      console.error('Ocurrió un problema al obtener el grupo de estudiante:', error);
      throw error;
    }
  },

  // Insertar un nuevo registro en grupo_estudiantes
  insertarGrupoEstudiante: async (idgrupo, idestudiante) => {
    try {
      const result = await pool.query(
        'INSERT INTO grupo_estudiantes (idgrupo, idestudiante) VALUES (?, ?)',
        [idgrupo, idestudiante]
      );
      return result.insertId; // Devuelve el ID del nuevo registro
    } catch (error) {
      console.error('Error al insertar el grupo de estudiante:', error);
      throw error;
    }
  },

  // Actualizar un registro en grupo_estudiantes
  actualizarGrupoEstudiante: async (idgrupoestudiante, idgrupo, idestudiante) => {
    try {
      const result = await pool.query(
        'UPDATE grupo_estudiantes SET idgrupo = ?, idestudiante = ? WHERE idgrupoestudiante = ?',
        [idgrupo, idestudiante, idgrupoestudiante]
      );
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error('Error al actualizar el grupo de estudiante:', error);
      throw error;
    }
  },

  // Eliminar un registro de grupo_estudiantes
  eliminarGrupoEstudiante: async (idgrupoestudiante) => {
    try {
      const result = await pool.query('DELETE FROM grupo_estudiantes WHERE idgrupoestudiante = ?', [idgrupoestudiante]);
      return result.affectedRows > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error('Error al eliminar el grupo de estudiante:', error);
      throw error;
    }
  }
};
