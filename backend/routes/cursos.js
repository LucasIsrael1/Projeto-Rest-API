const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Schema

const schema = new mongoose.Schema({
    nomeDoCurso: {type: String, required: true},
});
const cursos = mongoose.model('cursos', schema);

// Get

router.get('/', async (request, response) => {
    try {
        const lista = await cursos.find();
        response.json(lista);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

router.get('/:id', getCurso, async (request, response) => {
    try {
        response.json(response.curso);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

// Post

router.post('/', async (request, response) => {
    try {
        const curso = await (new cursos(request.body)).save();
        response.status(201).json(curso);
    } catch (error) {
        response.status(400).json({ erro: error.message });
    }
})

// Put

router.put('/:id', getCurso, async (request, response) => {
    try {
        response.curso.nomeDoCurso = request.body.nomeDoCurso;
        const cursoAtualizado = await response.curso.save();
        response.json(cursoAtualizado);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

// Delete

router.delete('/:id', getCurso, async (request, response) => {
    try {
        await response.curso.deleteOne();
        response.json(response.curso);
    } catch(error) {
        response.status(500).json({ erro: error.message });
    }
})

// Middleware

async function getCurso(request, response, next) {
    try {
        const curso = await cursos.findById(request.params.id);
        if (curso === null) return response.status(404).json({ erro: 'Curso não encontrado '});
        response.curso = curso;
        next();  
    } catch(error) {
        return response.status(500).json({ erro: error.message });
    }
}

module.exports = router;