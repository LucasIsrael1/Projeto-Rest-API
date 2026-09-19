const url = 'http://localhost:3000/alunos';
let alunos;

// Get

const listaAlunos = document.getElementById('alunos');

async function carregarAlunos() {
    const resposta = await fetch(url)
    alunos = await resposta.json();
    listaAlunos.innerHTML = '';
    for (const aluno of alunos) {
        listaAlunos.innerHTML += `
            <div class="card">
                <h2>${aluno.nome} ${aluno.apelido}</h2>
                <p>Curso: ${aluno.idCurso}</p>
                <p>Ano: ${aluno.anoCurricular}</p>
                <p>
                    <button class="btn-editar" onclick="selecionarAluno('${aluno._id}')">Editar</button>
                    <button class="btn-excluir" onclick="excluirAluno('${aluno._id}')">Excluir</button>
                </p>
            </div>
        `
    }
}
document.addEventListener('DOMContentLoaded', carregarAlunos);

// Post

const formularioCriacao = document.getElementById('criar-aluno');

formularioCriacao.addEventListener('submit', async (event) => {
    event.preventDefault();
    const aluno = {
        nome: document.getElementById('criar-nome').value,
        apelido: document.getElementById('criar-apelido').value,
        idCurso: Number(document.getElementById('criar-curso').value),
        anoCurricular: Number(document.getElementById('criar-ano').value),
    };
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(aluno)
    });

    carregarAlunos();
});

// Put

const formularioEdicao = document.getElementById('editar-aluno');

let dadosEdicao = undefined;

function selecionarAluno(id) {
    dadosEdicao = alunos.find(aluno => aluno._id === id);
    if (dadosEdicao === undefined) return;

    formularioEdicao.hidden = false;

    document.getElementById('editar-nome').value = dadosEdicao.nome;
    document.getElementById('editar-apelido').value = dadosEdicao.apelido;
    document.getElementById('editar-curso').value = dadosEdicao.idCurso;
    document.getElementById('editar-ano').value = dadosEdicao.anoCurricular;
}

formularioEdicao.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (dadosEdicao === undefined) return;

    const aluno = {
        nome: document.getElementById('editar-nome').value,
        apelido: document.getElementById('editar-apelido').value,
        idCurso: Number(document.getElementById('editar-curso').value),
        anoCurricular: Number(document.getElementById('editar-ano').value),
    };
    await fetch(url + '/' + dadosEdicao._id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(aluno)
    });
    formularioEdicao.hidden = true;
    carregarAlunos();
});

// Delete

async function excluirAluno(id) {
    await fetch(url + '/' + id, {method: 'DELETE'});
    carregarAlunos();
}