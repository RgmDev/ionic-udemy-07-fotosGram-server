import Server from "./classes/server";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import userRoutes from "./routes/usuario";
import postRoutes from "./routes/post";

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// File upload
server.app.use(fileUpload());

// CORS
server.app.use( cors({origin: true, credentials: true}));

// Rutas de mi aplicación
server.app.use('/user', userRoutes);
server.app.use('/post', postRoutes);

// conectar con BBDD
mongoose.connect('mongodb://localhost:27017/fotosgram', (err) => {
  if(err) {
    throw err;
  }
  console.log('database working');
})

server.start( () => {
  console.log(`Servidor corriendo en ${server.port}`);
});