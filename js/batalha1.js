var escJogBol = document.getElementById('esc-bol-jog')
var escJogOrg = 0
var escJog = 0
var vidJogBol = document.getElementById('vid-bol-jog')
var vidJogDoc = document.getElementById('vida-jogador')
var vidJogOrg = 100
var vidJogV = 500
var vidJog = 500
var aprJogDoc = document.getElementById('apr-bol-jog')
var enfJogDoc = document.getElementById('enf-bol-jog')
var aprJog = 0
var enfJog = 0

var escIniBol = document.getElementById('esc-bol-ini')
var escIniOrg = 0
var escIni = 0
var vidIniBol = document.getElementById('vid-bol-ini')
var vidIniDoc = document.getElementById('vida-inimigo')
var vidIniOrg = 100
var vidIniV = 500
var vidIni = 500
var aprIniDoc = document.getElementById('apr-bol-ini')
var enfIniDoc = document.getElementById('enf-bol-ini')
var aprIni = 0
var enfIni = 0

var permicao = false
var eneDoc = document.getElementById('energ')
var eneOrg = 3
var cartaId = 0
var cartaAtv = []
var cartaAtvNum = []
var iniTurnoAc = []
var cartas = ['Sprites/Batalha/attack-carta.png', 'Sprites/Batalha/defend-carta.png', 'Sprites/Batalha/aprimorar-carta.png', 'Sprites/Batalha/enfraquecer-carta.png']
var compra = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3]
var descarte = []
var addC = 0
var derVit = false

console.log('Ta olhando aqui porque?') //Quem ler é brocha
function turnoJogador() {
    iniTurnoAc[0] = Math.floor(Math.random()*4)
    escJogOrg = 0
    aprJog - 1 < 0 ? 0 : aprJog--
    enfJog - 1 < 0 ? 0 : enfJog--
    aprIni - 1 < 0 ? 0 : aprIni--
    enfIni - 1 < 0 ? 0 : enfIni--
    permicao = false
    if (iniTurnoAc[0] == 0) {
        iniTurnoAc[1] = Math.floor(Math.random()*15+13)
        document.getElementById('ini-acao').style.cssText = 'background-color: red;'
        document.getElementById('ini-acao').innerHTML = iniTurnoAc[1]
    } else if (iniTurnoAc[0] == 1) {
        iniTurnoAc[1] = Math.floor(Math.random()*15+17)
        document.getElementById('ini-acao').style.cssText = 'background-color: blue;'
        document.getElementById('ini-acao').innerHTML = iniTurnoAc[1]
    } else if (iniTurnoAc[0] == 2) {
        iniTurnoAc[1] = ['buff', Math.floor(Math.random()*4+4)]
        document.getElementById('ini-acao').style.cssText = 'background-color: green;'
        document.getElementById('ini-acao').innerHTML = iniTurnoAc[1][0]
    } else if (iniTurnoAc[0] == 3) {
        iniTurnoAc[1] = ['debuff 1', Math.floor(Math.random()*4+5)]
        document.getElementById('ini-acao').style.cssText = 'background-color: green;'
        document.getElementById('ini-acao').innerHTML = iniTurnoAc[1][0]
    }
    addC = 5
    addCartaAuxiliar()
}
function addCartaAuxiliar() {
    if (compra.length == 0) {
        let verDescarte = descarte
        descarte = []
        document.getElementById('descarte-carta').style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;'
        setTimeout(() => {
            document.getElementById('descarte-carta').style.cssText = 'height: 150px;width: 100px;'
            document.getElementById('compra-carta').style.cssText += 'animation-duration: 0.5s;animation-name: subirCarta;'
            compra = verDescarte
            setTimeout(() => {
                document.getElementById('compra-carta').style.cssText = 'height: 150px;width: 100px;'
                setTimeout(() => {
                    addCartaAuxiliar()
                }, 500);
            }, 500)
        }, 500)
        return
    }
    if (!(addC > 0)) {
        permicao = true
        return
    }
    addC--
    addCarta()
    setTimeout(() => {
        addCartaAuxiliar()
    }, 1000);
}
function turnoInimigo() {
    eneOrg = 3
    escIniOrg = 0
    cartaAtv = []
    cartaAtvNum = []
    if (iniTurnoAc[0] == 0) {
        document.getElementById('inimigo').style.cssText += 'animation-duration: 1s;animation-name: attackInimigo;'
        setTimeout(() => {
            iniTurnoAc[1] += aprIni - enfIni
            iniTurnoAc[1] <= 0 ? iniTurnoAc[1] = 1 : 0
            if (escJogOrg - iniTurnoAc[1] > 0) {
                escJogOrg -= iniTurnoAc[1]
            } else {
                vidJogOrg += escJogOrg - iniTurnoAc[1]
                vidJogOrg < 0 ? vidJogOrg = 0 : 0
                escJogOrg = 0
            }
            document.getElementById('jogador').style.cssText += 'animation-duration: 1s;animation-name: attackInimigo;'
            document.getElementById('inimigo').style.cssText = 'width: 300px;height: 500px;'
            setTimeout(() => {
                document.getElementById('inimigo').style.cssText = 'margin-right: 0px;width: 300px;height: 500px;'
                setTimeout(() => {
                    vidJogOrg <= 0 || vidIniOrg <= 0 ? 0 : turnoJogador()
                }, 500);
            }, 1000);
        }, 1000)
    } else if (iniTurnoAc[0] == 1) {
        document.getElementById('esc-anim-ini').style.cssText += 'animation-duration: 1s;animation-name: escudoAnim;'
        setTimeout(() => {
            document.getElementById('esc-anim-ini').style.cssText = 'display: flex;align-items: center;justify-content: center;position: absolute;opacity: 0;'
            escIniOrg += iniTurnoAc[1]
            setTimeout(() => {
                vidJogOrg <= 0 || vidIniOrg <= 0 ? 0 : turnoJogador()
            }, 500);
        }, 1000)
    } else if (iniTurnoAc[0] == 2) {
        document.getElementById('apr-anim-ini').style.cssText += 'animation-duration: 1s;animation-name: aprimorarAnim;'
        setTimeout(() => {
            document.getElementById('apr-anim-ini').style.cssText = 'position: absolute;opacity: 0;'
            aprIni += iniTurnoAc[1][1]
            setTimeout(() => {
                vidJogOrg <= 0 || vidIniOrg <= 0 ? 0 : turnoJogador()
            }, 500);
        }, 1000)
    } else if (iniTurnoAc[0] == 3) {
        document.getElementById('enf-anim-ini').style.cssText += 'animation-duration: 1s;animation-name: enfraquecerAnim;'
        setTimeout(() => {
            document.getElementById('enf-anim-ini').style.cssText = 'position: absolute;filter: hue-rotate(275deg);opacity: 0;'
            enfJog += iniTurnoAc[1][1]
            setTimeout(() => {
                vidJogOrg <= 0 || vidIniOrg <= 0 ? 0 : turnoJogador()
            }, 500);
        }, 1000)
    }
}
function addCartaAuxiliar() {
    if (compra.length == 0) {
        let verDescarte = descarte
        descarte = []
        document.getElementById('descarte-carta').style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;'
        setTimeout(() => {
            document.getElementById('descarte-carta').style.cssText = 'height: 150px;width: 100px;'
            document.getElementById('compra-carta').style.cssText += 'animation-duration: 0.5s;animation-name: subirCarta;'
            compra = verDescarte
            setTimeout(() => {
                document.getElementById('compra-carta').style.cssText = 'height: 150px;width: 100px;'
                setTimeout(() => {
                    addCartaAuxiliar()
                }, 500);
            }, 500)
        }, 500)
        return
    }
    if (!(addC > 0)) {
        permicao = true
        return
    }
    addC--
    addCarta()
    setTimeout(() => {
        addCartaAuxiliar()
    }, 1000);
}
function addCarta() {
    let carta = document.createElement('img')
    let random = Math.floor(Math.random()*compra.length)
    let random2 = compra[random]
    compra.splice(random, 1)
    cartaAtvNum.push(random2)
    carta.id = 'carta'+cartaId
    carta.className = 'mao-carta'
    carta.src = cartas[random2]
    cartaAtv.push('carta'+cartaId)
    cartaId++
    if (random2 == 0) {
        carta.onclick = () => {
            if (permicao && eneOrg >= 1) {
                cartaAtv.splice(cartaAtv.indexOf(carta.id), 1)
                permicao = false
                carta.style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
                setTimeout(() => {
                    usarCarta(random2)
                    attack()
                    document.getElementById('mao').removeChild(carta)
                }, 500)
            }
        }
    } else if (random2 == 1) {
        carta.onclick = () => {
            if (permicao && eneOrg >= 1) {
                cartaAtv.splice(cartaAtv.indexOf(carta.id), 1)
                permicao = false
                carta.style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
                setTimeout(() => {
                    usarCarta(random2)
                    defesa()
                    document.getElementById('mao').removeChild(carta)
                }, 500)
            }
        }
    } else if (random2 == 2) {
        carta.onclick = () => {
            if (permicao && eneOrg >= 1) {
                cartaAtv.splice(cartaAtv.indexOf(carta.id), 1)
                permicao = false
                carta.style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
                setTimeout(() => {
                    usarCarta(random2)
                    aprimorar()
                    document.getElementById('mao').removeChild(carta)
                }, 500)
            }
        }
    } else if (random2 == 3) {
        carta.onclick = () => {
            if (permicao && eneOrg >= 1) {
                cartaAtv.splice(cartaAtv.indexOf(carta.id), 1)
                permicao = false
                carta.style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
                setTimeout(() => {
                    usarCarta(random2)
                    enfraquecer()
                    document.getElementById('mao').removeChild(carta)
                }, 500)
            }
        }
    }
    document.getElementById('compra-carta').style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;'
    setTimeout(() => {
        document.getElementById('mao').appendChild(carta)
        carta.style.cssText += 'animation-duration: 0.5s;animation-name: subirCarta;'
        document.getElementById('compra-carta').style.cssText = 'height: 150px;width: 100px;'
    }, 500)
}
function usarCarta(random2) {
    document.getElementById('descarte-carta').style.cssText += 'animation-duration: 0.5s;animation-name: subirCarta;'
    setTimeout(() => {
        document.getElementById('descarte-carta').style.cssText = 'height: 150px;width: 100px;'
        cartaAtvNum.splice(cartaAtvNum.indexOf(random2), 1)
        descarte.push(random2)
    }, 500);
}
function terminarTurno() {
    if (!permicao) return
    permicao = false
    for (let i = 0; i < cartaAtv.length; i++) {
        document.getElementById('descarte-carta').style.cssText += 'animation-duration: 0.5s;animation-name: subirCarta;'
        descarte.push(cartaAtvNum[i])
        document.getElementById(cartaAtv[i]).style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
        setTimeout(() => {
            document.getElementById('descarte-carta').style.cssText = 'height: 150px;width: 100px;'
            document.getElementById('mao').removeChild(document.getElementById(cartaAtv[i]))
            i == cartaAtv.length-1 ? turnoInimigo() : 0
        }, 500);
    }
}
function derrota() {
    if (derVit) return
    document.getElementById('derVit').style.cssText = 'position: absolute;width: 100vw;height: 100vh;background-color: black;opacity: 0.4;animation-duration: 1s;animation-name: derVit2;'
    document.getElementById('derrota1').style.cssText = 'position: absolute;overflow: hidden;width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center;animation-duration: 1s;animation-name: derVit1;'
}
function vitoria() {
    if (derVit) return
    document.getElementById('derVit').style.cssText = 'position: absolute;width: 100vw;height: 100vh;background-color: black;opacity: 0.4;animation-duration: 1s;animation-name: derVit2;'
    document.getElementById('vitoria1').style.cssText = 'position: absolute;overflow: hidden;width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center;animation-duration: 1s;animation-name: derVit1;'
}

setInterval(() => {
    escJogOrg < escJog ? escJog-- : escJogOrg > escJog ? escJog++ : 0
    escJogBol.innerHTML = escJog
    escIniOrg < escIni ? escIni-- : escIniOrg > escIni ? escIni++ : 0
    escIniBol.innerHTML = escIni
}, 150);
var load = setInterval(() => {
    vidJogV = Math.floor(vidJogOrg/100*500)
    vidIniV = Math.floor(vidIniOrg/100*500)

    vidJogV < vidJog ? escJogOrg == escJog ? vidJog-- : 0 : vidJogV > vidJog ? escJogOrg == escJog ? vidJog++ : 0 : 0
    vidJogDoc.style.width = `${vidJog}px`
    vidIniV < vidIni ? escIniOrg == escIni ? vidIni-- : 0 : vidIniV > vidIni ? escIniOrg == escIni ? vidIni++ : 0 : 0
    vidIniDoc.style.width = `${vidIni}px`

    vidJogBol.innerHTML = Math.floor(vidJog/500*100)
    vidIniBol.innerHTML = Math.floor(vidIni/500*100)
    eneDoc.innerHTML = eneOrg

    aprIniDoc.innerHTML = aprIni
    aprJogDoc.innerHTML = aprJog
    enfIniDoc.innerHTML = enfIni
    enfJogDoc.innerHTML = enfJog

    document.getElementById('compra').innerHTML = compra.length
    document.getElementById('descarte').innerHTML = descarte.length

    vidIniOrg <= 0 || vidJogOrg <= 0 ? permicao = false : 0

    if (vidJog <= 0) {
        permicao = false
        derrota()
        derVit = true
        setTimeout(() => {
            clearInterval(load)
        }, 500);
    }
    if (vidIni <= 0) {
        permicao = false
        vitoria()
        derVit = true
        setTimeout(() => {
            clearInterval(load)
        }, 500);
    }
}, 20);

turnoJogador()