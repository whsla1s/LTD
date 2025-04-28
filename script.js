function mostrarTela(id) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => tela.classList.remove('ativa'));

    const telaSelecionada = document.getElementById(id);
    if (telaSelecionada) {
        telaSelecionada.classList.add('ativa');
    }
}
