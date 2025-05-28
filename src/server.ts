import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

async function connectDB() {

  try {
      await db.authenticate();
      db.sync();
      console.log(colors.bgGreen.bold( 'Connection to the database has been established successfully.'));
  } catch (error) {
      console.log(colors.bgRed.white( 'Error connecting to the database:'));
  } 
}

// Conectar a la base de datos
connectDB();

// Instanciar express
const server = express();

//Leer Datos de Formulario
server.use(express.json());

//Rutas
server.use('/api/products', router );


export default server;
