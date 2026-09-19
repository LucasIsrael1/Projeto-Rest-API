const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Schema

const schema = new mongoose.Schema({
    nome: {type: String, required: true},
    apelido: {type: String, required: true},
    idCurso: {type: Number, required: true},
    anoCurricular: {type: Number, required: true},
});
const alunos = mongoose.model('alunos', schema);

// Get

router.get('/', async (request, response) => {
    try {
        const lista = await alunos.find();
        response.json(lista);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

router.get('/:id', getAluno, async (request, response) => {
    try {
        response.json(response.aluno);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

// Post

router.post('/', async (request, response) => {
    try {
        const aluno = await (new alunos(request.body)).save();
        response.status(201).json(aluno);
    } catch (error) {
        response.status(400).json({ erro: error.message });
    }
})

// Put

router.put('/:id', getAluno, async (request, response) => {
    try {
        response.aluno.nome = request.body.nome;
        response.aluno.apelido = request.body.apelido;
        response.aluno.idCurso = request.body.idCurso;
        response.aluno.anoCurricular = request.body.anoCurricular;
        const alunoAtualizado = await response.aluno.save();
        response.json(alunoAtualizado);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

// Delete

router.delete('/:id', getAluno, async (request, response) => {
    try {
        await response.aluno.deleteOne();
        response.json(response.aluno);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

// Middleware

async function getAluno(request, response, next) {
    try {
        const aluno = await alunos.findById(request.params.id);
        if (aluno === null) return response.status(404).json({ erro: 'Aluno não encontrado '});
        response.aluno = aluno;
        next();  
    } catch(error) {
        return response.status(500).json({ erro: error.message });
    }
}

module.exports = router;