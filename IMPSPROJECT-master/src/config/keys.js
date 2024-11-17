require('dotenv').config();

module.exports ={
    //configurando objeto para inyectarlo en el pool de la conexion
    database: {
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT_DATABASE,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME
        
    }

}