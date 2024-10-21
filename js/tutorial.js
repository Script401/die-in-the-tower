let currentGridIndex = 0;
const grids = document.querySelectorAll('[class^="grid-tutorial"]');
const subtitulo = document.getElementById('subtitulo-tutorial');

function atualizarSubtitulo() {
    if (currentGridIndex >= 2) {
        subtitulo.textContent = 'MECÂNICAS';
    } else {
        subtitulo.textContent = 'CARTAS';
    }
}

function avancar() {
    if (currentGridIndex < grids.length - 1) {
        const gridAtual = grids[currentGridIndex];
        const proximoGrid = grids[currentGridIndex + 1];

        gridAtual.classList.remove('entrarDireita', 'entrarEsquerda');
        gridAtual.classList.add('sairEsquerda');

        gridAtual.addEventListener('animationend', () => {
            gridAtual.classList.add('hidden');
            gridAtual.classList.remove('sairEsquerda');
        }, { once: true });

        proximoGrid.classList.remove('hidden');
        proximoGrid.classList.add('entrarDireita');

        proximoGrid.addEventListener('animationend', () => {
            proximoGrid.classList.remove('entrarDireita');
        }, { once: true });

        currentGridIndex++;
        atualizarBotoes();
        atualizarSubtitulo();
    }
}

function voltar() {
    if (currentGridIndex > 0) {
        const gridAtual = grids[currentGridIndex];
        const gridAnterior = grids[currentGridIndex - 1];

        gridAtual.classList.add('sairDireita');

        gridAtual.addEventListener('animationend', () => {
            gridAtual.classList.add('hidden');
            gridAtual.classList.remove('sairDireita');
        }, { once: true });

        gridAnterior.classList.remove('hidden');
        gridAnterior.classList.add('entrarEsquerda');

        gridAnterior.addEventListener('animationend', () => {
            gridAnterior.classList.remove('entrarEsquerda'); // Resetar a animação
        }, { once: true });

        currentGridIndex--;
        atualizarBotoes();
        atualizarSubtitulo();
    }
}

function atualizarBotoes() {
    const voltarButton = document.getElementById('button-voltar');
    const avancarButton = document.getElementById('button-avancar');
    const iniciarJogoButton = document.getElementById('botao-iniciar-jogo');

    voltarButton.classList.toggle('hidden', currentGridIndex === 0);
    avancarButton.classList.toggle('hidden', currentGridIndex === grids.length - 1);
    iniciarJogoButton.classList.toggle('hidden', currentGridIndex !== grids.length - 1);
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarBotoes();
    atualizarSubtitulo();
});
