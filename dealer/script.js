const URL = "https://teachablemachine.withgoogle.com/models/7fK6B4Bku/";

const carte = [
    'asso di cuori', 'due di cuori', 'tre di cuori', 'quattro di cuori', 'cinque di cuori',
    'sei di cuori', 'sette di cuori', 'otto di cuori', 'nove di cuori', 'dieci di cuori',
    'jack di cuori', 'regina di cuori', 're di cuori',

    'asso di quadri', 'due di quadri', 'tre di quadri', 'quattro di quadri', 'cinque di quadri',
    'sei di quadri', 'sette di quadri', 'otto di quadri', 'nove di quadri', 'dieci di quadri',
    'jack di quadri', 'regina di quadri', 're di quadri',

    'asso di fiori', 'due di fiori', 'tre di fiori', 'quattro di fiori', 'cinque di fiori',
    'sei di fiori', 'sette di fiori', 'otto di fiori', 'nove di fiori', 'dieci di fiori',
    'jack di fiori', 'regina di fiori', 're di fiori',

    'asso di picche', 'due di picche', 'tre di picche', 'quattro di picche', 'cinque di picche',
    'sei di picche', 'sette di picche', 'otto di picche', 'nove di picche', 'dieci di picche',
    'jack di picche', 'regina di picche', 're di picche'
];

let model, webcam, labelContainer, maxPredictions;
let classCounts = {};
const select = document.getElementById("select");

async function init() { //funzione che viene chiamata quando si clicca il pulsante inizia a registrare
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);  //carico il modello
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(400, 400, flip);    //attivo la webcam
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);             //richiede immagini in loop

    document.getElementById("webcam-container").appendChild(webcam.canvas); //stampo le classi a schermo
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
        classCounts[i] = 0; // Inizializza il conteggio per ogni classe a 0
    }

    setInterval(carteRimanenti, 2000);  //ogni due secondi stampa le carte rimanenti a schermo
    document.getElementById("inizio").disabled = true;
}

async function loop() { //funzione che viene chiamata per ogni frame della webcam
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {  //funzione che riconosce la carta a schermo
    const prediction = await model.predict(webcam.canvas);
    let highestProbability = -1;
    let predictedIndex = -1;

    for (let i = 0; i < maxPredictions; i++) {  //trova la carta piu probabile
        const probability = prediction[i].probability;
        if (probability > highestProbability) {
            highestProbability = probability;
            predictedIndex = i;
        }
    }

    if (predictedIndex !== -1 && predictedIndex !== 52) { //se e stata trovata una carta
        const predictedCard = carte[predictedIndex];
        document.getElementById("car").innerText = `${predictedCard}`;
    }
    else{
        document.getElementById("car").innerText = `Niente`;
    }

    for (let i = 0; i < maxPredictions; i++) {  //aggiorna le probabilita sullo schermo
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;

        if (prediction[i].probability > 0.9) {  //se l'ia e sicura del 90% per 45 volte di fila invia la carta
            classCounts[i]++;
            if (classCounts[i] === 45) {
                sendData(carte.indexOf(prediction[i].className));
            }
        } else {
            classCounts[i] = 0; // Azzera il conteggio se la probabilità è inferiore alla soglia
        }
    }
}

function OverrideSendData(){
    sendData(select.options[select.selectedIndex].value)
}

function sendData(index) {  //invia la carta al database
    console.log(index)
    if (index !== -1) {
        const xhr = new XMLHttpRequest();
        const url = `../backend/aggiungicarta.php?numero=${index}`; // Passa l'indice della classe nell'array
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                cambiaColoreSfondo(index)
                displayRemainingCards(parseInt(xhr.responseText));
                console.log('Dati inviati con successo.');
                resetCounts(); // Reimposta il conteggio dopo l'invio dei dati
            }
        }
        xhr.send();
    }
}

function carteRimanenti(){  //ottiene il numero di carte rimamenti nel database
    const xhr = new XMLHttpRequest();
    const url = '../backend/carterimanenti.php';
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            displayRemainingCards(parseInt(xhr.responseText));
            console.log('Carte rimanenti ricevuti');
        }
    }
    xhr.send();
}

function displayRemainingCards(count) { //mostra il numero di carte rimanenti nel database
    const message = `Carte estratte rimanenti: ${count}`;
    document.getElementById("remaining-cards").innerHTML = message;
}

function resetCounts() {    //resetta tutti i counts
    for (let i = 0; i < maxPredictions; i++) {
        classCounts[i] = 0;
    }
}

let ultimocolore = ''
function cambiaColoreSfondo(carta) {    //stampa a schermo l'ultima carta e cambia il colore per rendere piu chiaro
    var colori = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#888888"];
  
    var div = document.getElementById('r');
  
    // Genera un indice random per selezionare un colore dal array
    do{
        var indiceRandom = Math.floor(Math.random() * colori.length);
    }while(ultimocolore == indiceRandom)
  
    ultimocolore = indiceRandom

    // Imposta il colore di sfondo del div con il colore selezionato
    div.style.backgroundColor = colori[indiceRandom];
    document.getElementById('c').innerHTML = carte[carta]
}