const pool = require('../config/databaseController');

module.exports = {
  // Obtener todos los grupos
  obtenerTodosLosGrupos: async () => {
    try {
      const result = await pool.query('SELECT * FROM grupos');
      return result;
    } catch (error) {
      console.error('Error al obtener los grupos:', error);
      throw error;
    }
  },

  // Obtener un grupo por su ID
  obtenerGrupoPorId: async (idgrupo) => {
    try {
      const result = await pool.query('SELECT * FROM grupos WHERE idgrupo = ?', [idgrupo]);
      return result[0];
    } catch (error) {
      console.error('Error al obtener el grupo:', error);
      throw error;
    }
  },

  // Insertar un nuevo grupo
  insertarGrupo: async (num_grupo, anio, ciclo, idmateria, idprofesor) => {
    try {
      const result = await pool.query(
        'INSERT INTO grupos (num_grupo, anio, ciclo, idmateria, idprofesor) VALUES (?, ?, ?, ?, ?)',
        [num_grupo, anio, ciclo, idmateria, idprofesor]
      );
      return result.insertId; // Devuelve el ID del nuevo grupo
    } catch (error) {
      console.error('Error al insertar el grupo:', error);
      throw error;
    }
  },

  // Actualizar un grupo
  actualizarGrupo: async (idgrupo, num_grupo, anio, ciclo, idmateria, idprofesor) => {
    try {
      const result = await pool.query(
        'UPDATE grupos SET num_grupo = ?, anio = ?, ciclo = ?, idmateria = ?, idprofesor = ? WHERE idgrupo = ?',
        [num_grupo, anio, ciclo, idmateria, idprofesor, idgrupo]
      );
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error('Error al actualizar el grupo:', error);
      throw error;
    }
  },

  // Eliminar un grupo
  eliminarGrupo: async (idgrupo) => {
    try {
      const result = await pool.query('DELETE FROM grupos WHERE idgrupo = ?', [idgrupo]);
      return result.affectedRows > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
      throw error;
    }
  },
  
  asignarGrupo: async(asignacion) => {
    try {
    const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ",
    asignacion);
    console.log('resultado: ', result)
    return result;
    } catch (error) {
    console.log('Ocurrio un problema al asignar el grupo', error);
    }
    }
  
};
