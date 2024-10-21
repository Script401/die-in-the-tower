function attack() {
    document.getElementById('jogador').style.cssText += 'animation-duration: 1s;animation-name: attackJogador;'
    eneOrg--
    setTimeout(() => {
        let atac = 8 - enfJog + aprJog
        atac <= 0 ? atac = 1 : 0
        if (escIniOrg - atac > 0) {
            escIniOrg -= atac
        } else {
            vidIniOrg += escIniOrg - atac
            vidIniOrg < 0 ? vidIniOrg = 0 : 0
            escIniOrg = 0
        }
        document.getElementById('inimigo').style.cssText += 'animation-duration: 1s;animation-name: attackJogador;'
        document.getElementById('jogador').style.cssText = 'width: 300px;height: 500px;'
        setTimeout(() => {
            document.getElementById('inimigo').style.cssText = 'margin-right: 0px;width: 600px;height: 500px;'
            permicao = true
        }, 1000);
    }, 1000)
}
function defesa() {
    eneOrg--
    document.getElementById('esc-anim').style.cssText += 'animation-duration: 1s;animation-name: escudoAnim;'
    setTimeout(() => {
        document.getElementById('esc-anim').style.cssText = 'display: flex;align-items: center;justify-content: center;position: absolute;opacity: 0;'
        escJogOrg += 7
        permicao = true
    }, 1000)
}
function aprimorar() {
    eneOrg--
    document.getElementById('apr-anim').style.cssText += 'animation-duration: 1s;animation-name: aprimorarAnim;'
    setTimeout(() => {
        document.getElementById('apr-anim').style.cssText = 'position: absolute;opacity: 0;'
        aprJog += 2
        permicao = true
    }, 1000)
}
function enfraquecer() {
    eneOrg--
    document.getElementById('enf-anim').style.cssText += 'animation-duration: 1s;animation-name: enfraquecerAnim;'
    setTimeout(() => {
        document.getElementById('enf-anim').style.cssText = 'position: absolute;filter: hue-rotate(275deg);opacity: 0;'
        enfIni += 3
        permicao = true
    }, 1000)
}