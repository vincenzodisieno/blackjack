document.getElementById('amount').addEventListener('keydown', function(e) {
    e.preventDefault(); // Impedisce l'input nella casella di testo
});


// Ottieni la casella di testo
var amountInput = document.getElementById('amount');

// Aggiungi un ascoltatore per l'evento input
amountInput.addEventListener('input', function() {
    // Se il valore è inferiore a 0, imposta il valore a 0
    if (parseInt(this.value) < 0) {
        this.value = 0;
    }
});


// Ottieni la casella di testo
var amountInput = document.getElementById('amount');

// Aggiungi un ascoltatore per l'evento input
amountInput.addEventListener('input', function() {
    // Se il valore è maggiore di 500, imposta il valore a 500
    if (parseInt(this.value) > 500) {
        this.value = 500;
    }
});



var pulsante = document.getElementById("ricarica");
pulsante.addEventListener("click", function(){
    console.log('a')
    let xhr = new XMLHttpRequest()
    xhr.open("GET", '../backend/aggiungisaldo.php?saldo=' + amountInput.value, false)
    xhr.send()
    window.location.href = '../index.php'
});
