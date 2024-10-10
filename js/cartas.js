function attack() {
    document.getElementById('jogador').style.cssText += 'animation-duration: 1s;animation-name: attackJogador;'
    eneOrg-=1
    setTimeout(() => {
        if (escIniOrg-8 > 0) {
            escIniOrg -= 8
        } else {
            vidIniOrg += escIniOrg - 8
            vidIniOrg < 0 ? vidIniOrg = 0 : 0
            escIniOrg = 0
        }
        document.getElementById('inimigo').style.cssText += 'animation-duration: 1s;animation-name: attackJogador;'
        document.getElementById('jogador').style.cssText = 'width: 300px;height: 500px;'
        setTimeout(() => {
            document.getElementById('inimigo').style.cssText = 'margin-right: 0px;width: 300px;height: 500px;'
            permicao = true
        }, 1000);
    }, 1000)
}
function defesa() {
    eneOrg-=1
    document.getElementById('esc-anim').style.cssText += 'animation-duration: 1s;animation-name: escudoAnim;'
    setTimeout(() => {
        document.getElementById('esc-anim').style.cssText = 'display: flex;align-items: center;justify-content: center;position: absolute;opacity: 0;'
        escJogOrg += 7
        permicao = true
    }, 1000)
}