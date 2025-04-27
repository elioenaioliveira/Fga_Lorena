// =================================================================
// ARQUIVO DE CONFIGURAÇÃO CENTRAL
// Altere os dados aqui para atualizar o site inteiro.
// =================================================================

const config = {
    // --- DADOS PRINCIPAIS ---
    nomeProfissional: "Lorena Gomes Teixeira",
    numeroWhatsApp: "5519997662818", // Formato: 55 (código país) + DDD + número
    
    // --- LINKS ---
    linkInstagram: "https://www.instagram.com/lorenacarioca",
    videoApresentacaoYouTube: "7OQB_yDyWbY", // Apenas o ID do vídeo. Ex: 7OQB_yDyWbY
    
    // --- IMAGENS (verifique se os caminhos estão corretos) ---
    imagemProfissional: "imgs/perfil_redondo.png",
    imagemEbook1: "imgs/Screenshot_20250418_095825_Chrome.jpg", // CORREÇÃO: Removido 'imgs/' duplicado
    imagemEbook2: "https://m.media-amazon.com/images/I/611wopNC5LL._AC_UF1000,1000_QL80_.jpg",
};


// =================================================================
// FUNÇÃO PARA PREENCHER O CONTEÚDO DO SITE
// Esta função lê os dados do 'config' e atualiza o HTML.
// =================================================================

function preencherConteudo() {
    
    // Atualiza o título da página e textos com o nome do profissional
    document.querySelectorAll('[data-config="nomeProfissional"]').forEach(element => {
        // Se for o <title> da página, atualiza o título
        if (element.tagName === 'TITLE') {
            element.textContent = `Fonoaudiologia | ${config.nomeProfissional}`;
        } else {
            // Senão, insere o nome no texto
            element.textContent = config.nomeProfissional;
        }
    });

    // Configura o link do Instagram
    const linkInsta = document.querySelector('a[href*="instagram.com"]');
    if (linkInsta) {
        linkInsta.href = config.linkInstagram;
    }

    // Configura a imagem de perfil
    const imgPerfil = document.getElementById('imagemPERFIL');
    if(imgPerfil) {
        imgPerfil.src = config.imagemProfissional;
    }
    
    // Configura links do WhatsApp dinamicamente
    const numeroWhatsAppFormatado = config.numeroWhatsApp.replace(/\D/g, ''); // Garante que não há caracteres não-numéricos

    document.querySelectorAll('[data-config-whatsapp="true"]').forEach(element => {
        const textoAgendamento = encodeURIComponent(`Olá, gostaria de agendar uma avaliação com ${config.nomeProfissional}.`);
        element.href = `https://wa.me/${numeroWhatsAppFormatado}?text=${textoAgendamento}`;
    });

    document.querySelectorAll('[data-config-whatsapp-atividade]').forEach(element => {
        const atividadeNome = element.getAttribute('data-config-whatsapp-atividade');
        const textoCompraAtividade = encodeURIComponent(`Olá, gostaria de informações sobre a "${atividadeNome}".`);
        element.href = `https://wa.me/${numeroWhatsAppFormatado}?text=${textoCompraAtividade}`;
    });
    
    // CORREÇÃO CRÍTICA: Configura o vídeo de apresentação do YouTube com o link correto
    document.querySelectorAll('[data-config-youtube="videoApresentacaoYouTube"]').forEach(element => {
        if (config.videoApresentacaoYouTube) {
            element.src = `https://www.youtube.com/embed/${config.videoApresentacaoYouTube}`;
        }
    });
}

// =================================================================
// EXECUTA A FUNÇÃO QUANDO A PÁGINA É CARREGADA
// =================================================================
window.onload = preencherConteudo;