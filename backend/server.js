const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const rotaAlunos = require('./routes/alunos');
const rotaCursos = require('./routes/cursos');

const swaggerSpec = require("./docs/docs");

const app = express();

app.use(express.json());
app.use(cors());
app.use('/alunos', rotaAlunos);
app.use('/cursos', rotaCursos);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
const bd = mongoose.connection;
bd.on('error', (error) => console.error(error));
bd.once('open', () => console.log('Conectado à base de dados'));

app.listen(3000, () => console.log('Servidor inicializado'));