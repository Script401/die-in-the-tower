var escJogBol = document.getElementById('esc-bol-jog')
var escJogOrg = 0
var escJog = 0
var vidJogBol = document.getElementById('vid-bol-jog')
var vidJogDoc = document.getElementById('vida-jogador')
var vidJogOrg = 100
var vidJogV = 500
var vidJog = 500

var escIniBol = document.getElementById('esc-bol-ini')
var escIniOrg = 0
var escIni = 0
var vidIniBol = document.getElementById('vid-bol-ini')
var vidIniDoc = document.getElementById('vida-inimigo')
var vidIniOrg = 100
var vidIniV = 500
var vidIni = 500

var permicao = true
var eneDoc = document.getElementById('energ')
var eneOrg = 3
var cartaId = 0
var cartaAtv = []
var iniTurnoAc = []
var cartas = ['Sprites/Batalha/Attack.png', 'Sprites/Batalha/defend.png']

function turnoJogador() {
    iniTurnoAc[0] = Math.floor(Math.random()*2)
    escJogOrg = 0
    permicao = false
    if (iniTurnoAc[0]==0) {
        iniTurnoAc[1] = Math.floor(Math.random()*15+10)
        document.getElementById('ini-acao').style.cssText = 'background-color: red;'
        document.getElementById('ini-acao').innerHTML = iniTurnoAc[1]
    } else if (iniTurnoAc[0]==1) {
        iniTurnoAc[1] = Math.floor(Math.random()*15+10)
        document.getElementById('ini-acao').style.cssText = 'background-color: blue;'
        document.getElementById('ini-acao').innerHTML = iniTurnoAc[1]
    } else {
        iniTurnoAc[1] = Math.floor(Math.random()*2) == 1 ? 'debuff' : 'buff'
        document.getElementById('ini-acao').style.cssText = 'background-color: green;'
        document.getElementById('ini-acao').innerHTML = iniTurnoAc[1]
    }
    addCarta()
    setTimeout(() => {
        addCarta()
        setTimeout(() => {
            addCarta()
            setTimeout(() => {
                addCarta()
                setTimeout(() => {
                    addCarta()
                    setTimeout(() => {
                        permicao = true
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}
function turnoInimigo() {
    eneOrg = 3
    escIniOrg = 0
    cartaAtv=[]
    if (iniTurnoAc[0]==0) {
        document.getElementById('inimigo').style.cssText += 'animation-duration: 1s;animation-name: attackInimigo;'
        setTimeout(() => {
            if (escJogOrg-iniTurnoAc[1] > 0) {
                escJogOrg -= iniTurnoAc[1]
            } else {
                vidJogOrg+=escJogOrg-iniTurnoAc[1]
                vidJogOrg < 0 ? vidJogOrg = 0 : 0
                escJogOrg = 0
            }
            document.getElementById('jogador').style.cssText += 'animation-duration: 1s;animation-name: attackInimigo;'
            document.getElementById('inimigo').style.cssText = 'width: 300px;height: 500px;'
            setTimeout(() => {
                document.getElementById('inimigo').style.cssText = 'margin-right: 0px;width: 300px;height: 500px;'
                setTimeout(() => {
                    turnoJogador()
                }, 500);
            }, 1000);
        }, 1000)
    } else if (iniTurnoAc[0]==1) {
        document.getElementById('esc-anim-ini').style.cssText += 'animation-duration: 1s;animation-name: escudoAnim;'
        setTimeout(() => {
            document.getElementById('esc-anim-ini').style.cssText = 'display: flex;align-items: center;justify-content: center;position: absolute;opacity: 0;'
            escIniOrg += iniTurnoAc[1]
            setTimeout(() => {
                turnoJogador()
            }, 500);
        }, 1000)
    } else {
    }
}
function addCarta() {
    let carta = document.createElement('img')
    let random = Math.floor(Math.random()*2)
    carta.id = 'carta'+cartaId
    carta.className = 'mao-carta'
    carta.src =cartas[random]
    cartaAtv.push('carta'+cartaId)
    cartaId++
    if (random==0) {
        carta.onclick = () => {
            if (permicao && eneOrg >= 1) {
                cartaAtv = cartaAtv.map((a)=>(a==String(carta.id)?null:a)).filter(n=>n)
                console.log(carta.id)
                console.log(cartaAtv)
                permicao = false
                carta.style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
                setTimeout(() => {
                    attack()
                    document.getElementById('mao').removeChild(carta)
                }, 500)
            }
        }
    } else if (random==1) {
        carta.onclick = () => {
            if (permicao && eneOrg >= 1) {
                cartaAtv = cartaAtv.map((a)=>(a==String(carta.id)?null:a)).filter(n=>n)
                console.log(carta.id)
                console.log(cartaAtv)
                permicao = false
                carta.style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
                setTimeout(() => {
                    defesa()
                    document.getElementById('mao').removeChild(carta)
                }, 500)
            }
        }
    }
    document.getElementById('compra-carta').style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;'
    setTimeout(() => {
        document.getElementById('mao').appendChild(carta)
        carta.style.cssText += 'animation-duration: 0.5s;animation-name: subirCarta;'
        document.getElementById('compra-carta').style.cssText = 'height: 150px;width: 100px;background-color: rgb(85, 138, 139);'
    }, 500)
}
function terminarTurno() {
    if (!permicao) return
    for (let i = 0; i < cartaAtv.length; i++) {
        document.getElementById(cartaAtv[i]).style.cssText += 'animation-duration: 0.5s;animation-name: descerCarta;position: relative;bottom: 60px;opacity: 0;'
        setTimeout(() => {
            document.getElementById('mao').removeChild(document.getElementById(cartaAtv[i]))
            i == cartaAtv.length-1 ? turnoInimigo() : 0
        }, 500);
    }
}
turnoJogador()

setInterval(() => {
    escJogOrg < escJog ? escJog-- : escJogOrg > escJog ? escJog++ : 0
    escJogBol.innerHTML = escJog
    escIniOrg < escIni ? escIni-- : escIniOrg > escIni ? escIni++ : 0
    escIniBol.innerHTML = escIni
}, 150);
setInterval(() => {
    vidJogV = Math.floor(vidJogOrg/100*500)
    vidIniV = Math.floor(vidIniOrg/100*500)
    vidJogV < vidJog ? vidJog-- : vidJogV > vidJog ? vidJog++ : 0
    vidJogDoc.style.width = `${vidJog}px`
    vidIniV < vidIni ? vidIni-- : vidIniV > vidIni ? vidIni++ : 0
    vidIniDoc.style.width = `${vidIni}px`
    vidJogBol.innerHTML = Math.floor(vidJog/500*100)
    vidIniBol.innerHTML = Math.floor(vidIni/500*100)
    eneDoc.innerHTML = eneOrg
}, 10);