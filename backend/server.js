const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

const rotaAlunos = require('./routes/alunos');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/alunos', rotaAlunos);

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
const bd = mongoose.connection;
bd.on('error', (error) => console.error(error));
bd.once('open', () => console.log('Conectado à base de dados'));

app.listen(3000, () => console.log('Servidor inicializado'));