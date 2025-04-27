const config = {
    nomeProfissional: "Lorena Gomes Teixeira",
    numeroWhatsApp: "+5511956939871",
    linkInstagram: "[Link para o seu Instagram]",
    linkEbookGratis: "[Link para Download do Ebook]",
    linkCompraEbook: "[Link para Compra do Ebook]",
    videoApresentacaoYouTube: "7OQB_yDyWbY", // Apenas o ID, ex: abcdef123
    imagemProfissional: "imgs/perfil_redondo.png",
    imagemEbook1: "imgs/imgs/Screenshot_20250418_095825_Chrome.jpg",
    imagemEbookPago: "imgs/ebook-pago.png",
}

function apareceMenu(){
    var navItem = document.getElementsByTagName("nav")[0];
    var sitNav = navItem.style.display
    if(sitNav == 'none'|| sitNav == false){
        navItem.style.display = 'block'
    }else{
        navItem.style.display = 'none'
    }
}