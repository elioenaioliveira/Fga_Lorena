// ===============================================
// LÓGICA DA ÁREA DO PACIENTE (VERSÃO ROBUSTA)
// ===============================================

// -----------------------------------------------
// 1. BANCO DE DADOS DE CONTEÚDO
// -----------------------------------------------
const conteudoPorTipo = {
    'A': {
        exercicios: [
            { id: 'X', titulo: 'Exercício de Foco e Atenção' },
            { id: 'Y', titulo: 'Técnica de Respiração' },
            { id: 'Z', titulo: 'Organização de Tarefas' }
        ],
        atividades: [
            { titulo: 'Atividade 1: Quebra-cabeça de Lógica' },
            { titulo: 'Atividade 3: Jogo da Memória' },
            { titulo: 'Atividade 5: Planejamento Semanal' }
        ]
    },
    'B': {
        exercicios: [
            { id: 'K', titulo: 'Exercício de Articulação Labial' },
            { id: 'L', titulo: 'Vibração de Língua' },
            { id: 'O', titulo: 'Fortalecimento da Bochecha' }
        ],
        atividades: [
            { titulo: 'Atividade 2: Leitura em Voz Alta' },
            { titulo: 'Atividade 4: Repetição de Fonemas' },
            { titulo: 'Atividade 6: Trava-línguas' }
        ]
    }
};

// -----------------------------------------------
// 2. FUNÇÕES DA PÁGINA DE LOGIN
// -----------------------------------------------
async function handleLogin(event) {
    event.preventDefault();
    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;
    const errorElement = document.getElementById('login-error');
    errorElement.textContent = '';

    try {
        const response = await fetch('dados_pacientes.csv');
        if (!response.ok) { throw new Error('Não foi possível carregar os dados dos pacientes.'); }

        // --- MELHORIA 1: Limpa caracteres invisíveis (BOM) do início do arquivo ---
        const csvData = (await response.text()).replace(/^\uFEFF/, '');
        
        const linhas = csvData.trim().split('\n');
        
        // --- MELHORIA 2: Limpa espaços em branco dos nomes das colunas (cabeçalho) ---
        const cabecalho = linhas.shift().split(',').map(h => h.trim());

        let pacienteEncontrado = null;
        for (const linha of linhas) {
            // --- MELHORIA 3: Limpa espaços em branco de cada dado lido ---
            const dados = linha.split(',').map(d => d.trim());
            
            const paciente = {};
            // Cria o objeto paciente de forma segura
            cabecalho.forEach((key, index) => {
                paciente[key] = dados[index];
            });

            if (paciente.usuario === usuarioInput && paciente.senha === senhaInput) {
                pacienteEncontrado = paciente;
                break;
            }
        }

        if (pacienteEncontrado) {
            // --- FERRAMENTA DE DEPURAÇÃO: Mostra o que foi encontrado no console ---
            console.log('Paciente encontrado:', pacienteEncontrado);

            sessionStorage.setItem('pacienteLogado', JSON.stringify(pacienteEncontrado));
            window.location.href = 'paciente.html';
        } else {
            errorElement.textContent = 'Usuário ou senha inválidos.';
        }
    } catch (error) {
        console.error('Erro no login:', error);
        errorElement.textContent = 'Ocorreu um erro. Tente novamente.';
    }
}

// -----------------------------------------------
// 3. FUNÇÕES DA PÁGINA DO PACIENTE (sem alterações)
// -----------------------------------------------
function iniciarPaginaPaciente() {
    let dadosPaciente = null;
    try {
        dadosPaciente = JSON.parse(sessionStorage.getItem('pacienteLogado'));
    } catch (error) {
        console.error("Erro ao ler dados do paciente:", error);
        window.location.href = 'login.html';
        return;
    }
    if (!dadosPaciente) {
        // Se, por algum motivo, não houver dados, redireciona para o login
        window.location.href = 'login.html';
        return;
    };

    document.getElementById('nome-paciente').textContent = dadosPaciente.nome_completo;
    document.getElementById('foto-paciente').src = dadosPaciente.imagem;

    document.querySelectorAll('.paciente-nav-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.paciente-nav-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const tipoConteudo = button.getAttribute('data-content');
            renderizarConteudo(tipoConteudo, dadosPaciente.tipo);
        });
    });

    document.getElementById('logout-button').addEventListener('click', handleLogout);
}

function renderizarConteudo(tipoConteudo, tipoPaciente) {
    const container = document.getElementById('conteudo-dinamico');
    container.innerHTML = '';
    const dados = conteudoPorTipo[tipoPaciente];
    if (!dados) {
        container.innerHTML = '<p>Nenhum conteúdo encontrado para este perfil.</p>';
        return;
    }
    if (tipoConteudo === 'exercicios') {
        const divGrid = document.createElement('div');
        divGrid.className = 'video-grid';
        dados.exercicios.forEach(ex => {
            divGrid.innerHTML += `
                <div class="video-item">
                    <iframe src="https://www.youtube.com/embed/${ex.id}" allowfullscreen></iframe>
                    <p>${ex.titulo}</p>
                </div>
            `;
        });
        container.appendChild(divGrid);
    } else if (tipoConteudo === 'atividades') {
        const divLista = document.createElement('div');
        divLista.className = 'atividade-list';
        dados.atividades.forEach(atv => {
            divLista.innerHTML += `
                <div class="atividade-card">
                    <h3>${atv.titulo}</h3>
                    <p>Descrição da atividade pode vir aqui...</p>
                    <button class="button">Iniciar</button>
                </div>
            `;
        });
        container.appendChild(divLista);
    }
}

function handleLogout() {
    sessionStorage.removeItem('pacienteLogado');
    window.location.href = 'login.html';
}

// -----------------------------------------------
// 4. INICIALIZAÇÃO (sem alterações)
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', handleLogin);
    }
    if (document.body.classList.contains('paciente-page-body')) {
        iniciarPaginaPaciente();
    }
});