const url = 'https://projeto-rest-api.onrender.com/cursos';
let cursos;

// Get

const listaCursos = document.getElementById('cursos');

async function carregarCursos() {
    const resposta = await fetch(url)
    cursos = await resposta.json();
    listaCursos.innerHTML = '';
    for (const curso of cursos) {
        listaCursos.innerHTML += `
            <div class="card">
                <h2>${curso.nomeDoCurso}</h2>
                <p>
                    <button class="btn-editar" onclick="selecionarCurso('${curso._id}')">Editar</button>
                    <button class="btn-excluir" onclick="excluirCurso('${curso._id}')">Excluir</button>
                </p>
            </div>
        `
    }
}
document.addEventListener('DOMContentLoaded', carregarCursos);

// Post

const formularioCriacao = document.getElementById('criar-curso');

formularioCriacao.addEventListener('submit', async (event) => {
    event.preventDefault();
    const curso = {
        nomeDoCurso: document.getElementById('criar-nome').value,
    };
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(curso)
    });

    carregarCursos();
});

// Put

const formularioEdicao = document.getElementById('editar-curso');

let dadosEdicao = undefined;

function selecionarCurso(id) {
    dadosEdicao = cursos.find(curso => curso._id === id);
    if (dadosEdicao === undefined) return;

    formularioEdicao.hidden = false;

    document.getElementById('editar-nome').value = dadosEdicao.nomeDoCurso;
}

formularioEdicao.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (dadosEdicao === undefined) return;

    const curso = {
        nomeDoCurso: document.getElementById('editar-nome').value,
    };
    await fetch(url + '/' + dadosEdicao._id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(curso)
    });
    formularioEdicao.hidden = true;
    carregarCursos();
});

// Delete

async function excluirCurso(id) {
    await fetch(url + '/' + id, {method: 'DELETE'});
    carregarCursos();
}