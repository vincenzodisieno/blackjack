let carte = [
    'assodicuori.png', 'duedicuori.png', 'tredicuori.png', 'quattrodicuori.png', 'cinquedicuori.png', 'seidicuori.png',
    'settedicuori.png', 'ottodicuori.png', 'novedicuori.png', 'diecidicuori.png', 'jackdicuori.png', 'reginadicuori.png', 'redicuori.png',
    'assodiquadri.png', 'duediquadri.png', 'trediquadri.png', 'quattrodiquadri.png', 'cinquediquadri.png', 'seidiquadri.png',
    'settediquadri.png', 'ottodiquadri.png', 'novediquadri.png', 'diecidiquadri.png', 'jackdiquadri.png', 'reginadiquadri.png', 'rediquadri.png',
    'assodifiori.png', 'duedifiori.png', 'tredifiori.png', 'quattrodifiori.png', 'cinquedifiori.png', 'seidifiori.png',
    'settedifiori.png', 'ottodifiori.png', 'novedifiori.png', 'diecidifiori.png', 'jackdifiori.png', 'reginadifiori.png', 'redifiori.png',
    'assodipicche.png', 'duedipicche.png', 'tredipicche.png', 'quattrodipicche.png', 'cinquedipicche.png', 'seidipicche.png',
    'settedipicche.png', 'ottodipicche.png', 'novedipicche.png', 'diecidipicche.png', 'jackdipicche.png', 'reginadipicche.png', 'redipicche.png',
  ];
  
const punteggi = [
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
  ];
  
let creditiSpan = document.getElementById("creditiSpan");
let puntataP = document.getElementById('puntataP')
let puntataSpan = document.getElementById("puntataSpan");
let puntataTotale = document.getElementById('divP')
let effettuapuntata = document.getElementById('divP1')

let cento = document.getElementById("100");
let cinquanta = document.getElementById("50");
let venticinque = document.getElementById("25");
let cinque = document.getElementById("5");

let gioca = document.getElementById('gioca')
let fichesdiv = document.getElementById('fiches')
let header = document.getElementById('header')
let gioco = document.getElementById('gioco')
gioco.style.display = 'none'
let divesterno = document.getElementById('divEsterno')
let divplayer = document.getElementById('divplayer0')
let divdealer = document.getElementById('divdealer')
let puntataIniziale = document.getElementById('puntataPlayer0')
let punteggioIniziale = document.getElementById('punteggioPlayer0')
let punteggioInizialeDealer = document.getElementById('punteggioDealer')

let raddoppia = document.getElementById('raddoppia')
let split = document.getElementById('split')
let stai = document.getElementById('stai')
let pescacarta = document.getElementById('carta')

let vittoria = document.getElementById('vittoria')
vittoria.style.display = 'none'
let vincitaSpan = document.getElementById('vincita')
let vittoriasconfitta = document.getElementById('vittoriasconfitta')
let attesa = document.getElementById('attesa')
attesa.style.display = 'none'

let crediti = creditiSpan.innerHTML
let puntata = 0
let fiches = []
let assoplayer
let assodealer
let assodealer2
let cartedealer
let carteplayer
let playercorrente
let players
let rnd
let punteggiodealer
let spanpunteggiodealer
let punteggioplayer
let spanpunteggioplayer
let puntate
let raddoppiato
let blackjack
let vincita
let divsplayer
let sballato
let ultimacarta
let usadelay = false

gioca.style.display = 'none'

let xhr = new XMLHttpRequest()

ControlloCrediti()

function Puntata(imageValue) {  //aggiorno la puntata del giocatore
    gioca.style.display = 'inline'
    fiches.push(imageValue);

    crediti -= imageValue
    puntata += imageValue
    creditiSpan.innerHTML = crediti;
    puntataSpan.innerHTML = puntata

    ControlloCrediti()
}
function ControlloCrediti(){    //controllo che abbia abbastanza crediti da poter giocare la fiches
    if(crediti<100)
    {
         cento.src = '../images/fiches100bw.png'
         cento.style.pointerEvents = 'none'
    }
    if(crediti<50)
    {
         cinquanta.src = '../images/fiches50bw.png'
         cinquanta.style.pointerEvents = 'none'
    }
    if(crediti<25)
    {
         venticinque.src = '../images/fiches25bw.png'
         venticinque.style.pointerEvents = 'none'
    }
    if(crediti<5)
    {
         cinque.src = '../images/fiches5bw.png'
         cinque.style.pointerEvents = 'none'
    }
}
function Ritorna(){ //cancella l'ultima fiches aggiunta (freccetta)
    if(fiches.length > 0){
        let ultimaPuntata = fiches.pop()
        crediti += ultimaPuntata
        puntata -= ultimaPuntata
        creditiSpan.innerHTML = crediti
        puntataSpan.innerHTML = puntata

        if(crediti>=100)
        {
            cento.src = '../images/fiches100.png'
            cento.style.pointerEvents = 'auto'
        }
        if(crediti>=50)
        {
            cinquanta.src = '../images/fiches50.png'
            cinquanta.style.pointerEvents = 'auto'
        }
        if(crediti>=25)
        {
            venticinque.src = '../images/fiches25.png'
            venticinque.style.pointerEvents = 'auto'
        }
        if(crediti>=5)
        {
            cinque.src = '../images/fiches5.png'
            cinque.style.pointerEvents = 'auto'
        }
        if(puntata == 0){
            gioca.style.display = 'none'
        }
    }
}
async function Gioca(){ //funzione iniziale che da inizio al gioco

    attesa.style.display = 'none'
    fichesdiv.style.display = 'none'
    gioca.style.display = 'none'
    puntataTotale.style.display = 'none'
    effettuapuntata.style.display = 'none'
    gioco.style.display = 'inline'

    assoplayer = [[false, false]]
    assodealer = false
    assodealer2 = false
    cartedealer = []
    carteplayer = [[]]
    players = 1
    playercorrente = 0
    punteggiodealer = 0
    punteggioplayer = [0]
    puntate = [puntataIniziale]
    spanpunteggioplayer = [punteggioIniziale]
    spanpunteggiodealer = punteggioInizialeDealer
    raddoppiato = false
    blackjack = [false]
    vincita = 0
    divsplayer = [divplayer]
    sballato = [false]
    ultimacarta = 0

    await StampaCarta(0)
    await StampaCarta(1)
    await StampaCarta(1)
}
async function Estrai(player){  //prende l'ultima carta dal database
    let carta
    do {
        await new Promise(resolve => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", '../backend/ottienicarta.php', true);
            xhr.onload = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    carta = xhr.response
                    resolve();
                }
            };
            xhr.send();
        })
        if(carta != -1){
            //await new Promise(resolve => setTimeout(resolve, 500));
            break
        }

        attesa.style.display = 'inline'
        await new Promise(resolve => setTimeout(resolve, 500));
    } while (carta == -1);
    attesa.style.display = 'none'

    // carta = Math.floor(Math.random() * 52)
    // usadelay = true

    if(carta % 13 == 0 && player){
        if(assoplayer[playercorrente][0]){
            assoplayer[playercorrente][1] = true
        }
        else{
            assoplayer[playercorrente][0] = true
        }
    }
    else if(carta % 13 == 0){
        if(assodealer){
            assodealer2 = true
        }
        else{
            assodealer = true
        }
    }
    return carta
}
async function StampaCarta(player){ //stampa la carta a schermo e aggiorna tutte le variabili
    let carta = await Estrai(player)
    let nuovacarta = document.createElement('img')
    nuovacarta.src = '../images/' + carte[carta]
    nuovacarta.classList.add('carta')

    if(player){
        let numcarte = carteplayer[playercorrente].length
        if(numcarte == 0){
            divplayer.insertBefore(nuovacarta, divplayer.firstChild)
            puntate[0].innerHTML = puntata
            punteggioplayer[playercorrente] += punteggi[carta]
            spanpunteggioplayer[0].innerHTML = punteggioplayer[0]
            ultimacarta = nuovacarta
        }
        else{
            nuovacarta.style.position = 'absolute'
            let offsetx = 35 * numcarte
            let offsety = -12 * numcarte
            nuovacarta.style.top = 0
            nuovacarta.style.left = 0
            nuovacarta.style.transform = 'translate(' + offsetx + '%,' + offsety + '%)'
            carteplayer[playercorrente][numcarte - 1].insertAdjacentElement('afterend', nuovacarta)

            if(assoplayer[playercorrente][0] && punteggioplayer[playercorrente] + punteggi[carta] > 21){
                punteggioplayer[playercorrente] -= 10
                if(assoplayer[playercorrente][1]){
                    assoplayer[playercorrente][1] = false
                }
                else{
                    assoplayer[playercorrente][0] = false
                }
            }

            nuovacarta.classList.add('blinking-image')
            ultimacarta.classList.remove('blinking-image')
            ultimacarta = nuovacarta

            punteggioplayer[playercorrente] += punteggi[carta]
            spanpunteggioplayer[playercorrente].innerHTML = punteggioplayer[playercorrente]
        }
        carteplayer[playercorrente].push(nuovacarta)

        raddoppia.style.pointerEvents = 'none'
        split.style.pointerEvents = 'none'
        if(carteplayer[playercorrente].length == 2){
            if(crediti >= parseInt(puntate[playercorrente].innerHTML)){
                raddoppia.style.pointerEvents = 'auto'
                if(punteggi[carte.indexOf(carteplayer[playercorrente][0].src.split('/').pop())] == punteggi[carta]){
                    split.style.pointerEvents = 'auto'
                }
            }
            if(punteggioplayer[playercorrente] == 21){
                blackjack[playercorrente] = true
            }
        }
        Controllo('player')
    }
    else{
        let numcarte = cartedealer.length
        if(numcarte == 0){
            divdealer.appendChild(nuovacarta)
            punteggiodealer = punteggi[carta]
            spanpunteggiodealer.innerHTML = punteggi[carta]
        }
        else{
            nuovacarta.style.position = 'absolute'
            let offsetx = -35 * numcarte
            let offsety = 12 * numcarte
            nuovacarta.style.bottom = 0
            nuovacarta.style.right = 0
            nuovacarta.style.transform = 'translate(' + offsetx + '%,' + offsety + '%)'
            cartedealer[numcarte - 1].insertAdjacentElement('afterend', nuovacarta)

            if(assodealer && punteggiodealer + punteggi[carta] > 21){    
                punteggiodealer -= 10
                if(assodealer2){
                    assodealer2 = false
                }
                else{
                    assodealer = false
                }   
            }

            punteggiodealer += punteggi[carta]
            spanpunteggiodealer.innerHTML = punteggiodealer
        }
        cartedealer.push(nuovacarta)
    }
}
async function Stai(){  //passa al player successivo
    if(!raddoppiato){
        playercorrente++
        if(playercorrente == players){
            Dealer()
        }
        else{
            await StampaCarta(1)
        }
    }
}
async function Raddoppia(){ //viene distribuita un ultima carta e passa al player successivo
    puntate[playercorrente].innerHTML = puntata * 2
    crediti -= puntata
    creditiSpan.innerHTML = crediti
    raddoppiato = true
    await StampaCarta(1)
    raddoppiato = false
    playercorrente++
    if(playercorrente == players){
        Dealer()
    }
    else{
        await StampaCarta(1)
    }
}
async function Split(){ //crea nuovo giocatore e modifica lo schermo
    players++

    let nuovodiv = divsplayer[playercorrente].cloneNode(true)
    
    nuovodiv.id = 'divplayer' + (players - 1)
    let p1 = nuovodiv.querySelector('#puntataPlayer' + playercorrente)
    let p2 = nuovodiv.querySelector('#punteggioPlayer' + playercorrente)

    p1.id = 'puntataPlayer' + (players - 1)
    p2.id = 'punteggioPlayer' + (players - 1)

    divesterno.insertBefore(nuovodiv, divesterno.firstChild)
    
    puntate.push(p1)
    punteggioplayer.push(0)
    spanpunteggioplayer.push(p2)
    blackjack.push(false)
    sballato.push(false)
    divsplayer.push(nuovodiv)
    assoplayer.push([false, false])

    crediti -= puntata
    creditiSpan.innerHTML = crediti

    carteplayer.push([nuovodiv.querySelectorAll('img')[0]])
    carteplayer[playercorrente].pop()

    nuovodiv.querySelectorAll('img')[0].src = nuovodiv.querySelectorAll('img')[1].src
    nuovodiv.querySelectorAll('img')[1].remove()
    divsplayer[playercorrente].querySelectorAll('img')[1].remove()

    punteggioplayer[playercorrente] = punteggi[carte.indexOf(carteplayer[playercorrente][0].src.split('/').pop())]
    punteggioplayer[players - 1] = punteggi[carte.indexOf(carteplayer[players - 1][0].src.split('/').pop())]
    spanpunteggioplayer[playercorrente].innerHTML = punteggioplayer[playercorrente]
    spanpunteggioplayer[players - 1].innerHTML = punteggioplayer[players - 1]
    
    await StampaCarta(1)
}
async function Dealer() {  //pesca tutte le carte del dealer
    ultimacarta.classList.remove('blinking-image')
    let flag = false
    for (let i in blackjack) {
        if(blackjack[i] == false && sballato[i] == false){
            flag = true
        }
    }

    if(usadelay){
        await new Promise(resolve => setTimeout(resolve, 30))
    }
    await StampaCarta(0)
    if(flag){
        while (punteggiodealer < 17) {
            if(usadelay){
                await new Promise(resolve => setTimeout(resolve, 30))
            }
            await StampaCarta(0)
        }
    }
    Controllo('vittoria');
}
async function Controllo(controllo){  //controllo quanto ho vinto o perso
    if(controllo == 'vittoria'){
        raddoppia.style.display = 'none'
        stai.style.display = 'none'
        split.style.display = 'none'
        pescacarta.style.display = 'none'
        let moltiplicatore
        let soldispesi = 0
        for (let i in punteggioplayer){
            moltiplicatore = 2
            console.log(puntate[i].innerHTML)
            soldispesi += parseInt(puntate[i].innerHTML)
            if(punteggioplayer[i] > 21){
            }
            else if(punteggiodealer > 21){
                if(blackjack[i]){
                    moltiplicatore = 2.5
                }
                vincita += parseInt(puntate[i].innerHTML) * moltiplicatore
            }
            else if(punteggioplayer[i] > punteggiodealer){
                if(blackjack[i]){
                    moltiplicatore = 2.5
                }
                vincita += parseInt(puntate[i].innerHTML) * moltiplicatore
            }
            else if(punteggioplayer[i] < punteggiodealer){
            }
            else{
                vincita += parseInt(puntate[i].innerHTML)
            }
        }

        if(soldispesi < vincita){
            vittoriasconfitta.innerHTML = 'Hai vinto!'
            vincitaSpan.innerHTML = (vincita - soldispesi)
        }
        else if(soldispesi > vincita){
            vittoriasconfitta.innerHTML = 'Hai perso!'
            vincitaSpan.innerHTML = (soldispesi - vincita)
        }
        else{
            vittoriasconfitta.innerHTML = 'Pareggio!'
            vincitaSpan.innerHTML = 0
        }
        vittoria.style.display = 'inline'
        crediti += vincita
        creditiSpan.innerHTML = crediti

        xhr.open("GET", '../backend/aggiornasaldo.php?saldo=' + crediti, false)
        xhr.send()
    }
    else if(controllo == 'player'){
        if(punteggioplayer[playercorrente] > 21){
            sballato[playercorrente] = true
            Stai()
        }
        else if(blackjack[playercorrente]){
            Stai()
        }
    }
}
function NuovaPartita(){
    window.location.reload()
}