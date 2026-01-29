// Dados dos preços
const precos = {
    'precoPlateiaA': 50.00,
    'precoPlateiaB': 70.00,
    'precoCamarote': 100.00,
    'precoFriza': 150.00,
    'precoNobreza': 310.00 
};

// Dados dos nomes
const nomes = {
    'plateiaA': 'Plateia A',
    'plateiaB': 'Plateia B',
    'camarote': 'Camarote',
    'friza': 'Friza',
    'nobreza': 'Nobreza'
};

// Mapeamento de turnos
const turnos = {
    'manha': 'Manhã',
    'tarde': 'Tarde',
    'noite': 'Noite'
};

// Função para gerar o comprovante (chamada em index.html)
function gerarComprovante() {
    const cpf = document.getElementById('cpf').value;
    const turno = document.getElementById('turno').value;
    const ingressosSelecionados = document.querySelectorAll('input[name="ingresso"]:checked');
    const quantidade = parseInt(document.getElementById('quantidade').value) || 1;
    
    // Validação: CPF preenchido
    if (!cpf) {
        alert('Por favor, digite seu CPF');
        return;
    }

    // Validação: Ingresso selecionado
    if (ingressosSelecionados.length === 0) {
        alert('Por favor, selecione pelo menos um tipo de ingresso');
        return;
    }

    let total = 0;
    let ingressosHTML = '';

    // Calcula total e monta HTML
    ingressosSelecionados.forEach((ingresso) => {
        const tipo = ingresso.value;
        let nome, preco;

        if (tipo === 'plateiaA') {
            nome = nomes.plateiaA;
            preco = precos.precoPlateiaA;
        } else if (tipo === 'plateiaB') {
            nome = nomes.plateiaB;
            preco = precos.precoPlateiaB;
        } else if (tipo === 'camarote') {
            nome = nomes.camarote;
            preco = precos.precoCamarote;
        } else if (tipo === 'friza') {
            nome = nomes.friza;
            preco = precos.precoFriza;
        } else if (tipo === 'nobreza') {
            nome = nomes.nobreza;
            preco = precos.precoNobreza;
        } else {
            nome = nomes.plateiaA;
            preco = precos.precoPlateiaA;
        }

        const subtotal = preco * quantidade;
        total += subtotal;
        ingressosHTML += `<div class="info-comprovante">${nome} x ${quantidade} = R$ ${subtotal.toFixed(2)}</div>`;
    });

    // Guarda os dados no localStorage
    const comprovanteDados = {
        cpf: cpf,
        turno: turnos[turno],
        ingressos: ingressosHTML,
        total: total.toFixed(2)
    };
    
    localStorage.setItem('comprovante', JSON.stringify(comprovanteDados));
    
    // Redireciona para página de comprovante
    window.location.href = 'comprovante.html';
}

// Função para carregar o comprovante (chamada em comprovante.html)
function carregarComprovante() {
    const dados = localStorage.getItem('comprovante');
    
    if (dados) {
        const comprovante = JSON.parse(dados);
        
        document.getElementById('cpf-comprovante').textContent = comprovante.cpf;
        document.getElementById('turno-comprovante').textContent = comprovante.turno;
        document.getElementById('ingressos-comprovante').innerHTML = comprovante.ingressos;
        document.getElementById('total-comprovante').textContent = comprovante.total;
    }
}

// Executa ao carregar a página
window.addEventListener('load', function() {
    // Se estiver na página de comprovante, carrega os dados
    if (document.getElementById('comprovante')) {
        carregarComprovante();
    }
});