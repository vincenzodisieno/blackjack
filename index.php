<!DOCTYPE html>
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap" rel="stylesheet">
    <link href="/game/style.css" rel="stylesheet">

    <title>Blackjack</title>

</head>
<body>
    <?php
        session_start();
        if(!isset($_SESSION['successo']))
        {
            header("location: ../login/login.php");
        }
    ?>

    <h1>Blackjack</h1>

    <div class="container" id="header">
        <p>Saldo: <span id="creditiSpan"><?php if(isset($_SESSION['crediti'])) { echo $_SESSION['crediti']; }; ?></span>
        <a href="/ricarica/ricarica.html"><img src="/images/ricarica.png"></a></p>
        <p class="right"><a href="/backend/logout.php">Logout</a></p>
        <p class="right">Benvenuto: <?php if(isset($_SESSION['utente'])) { echo $_SESSION['utente']; }; ?></p>
    </div>

    <input type="button" id="gioca" value="Gioca" onclick="Gioca()"/>

    <div class="effettuapuntata" id="divP1">
        <p class="puntata">Effettua la tua puntata!</p>
    </div>
    <div class="puntata" id="divP">
        <p class="puntata" id="puntataP">Puntata totale: <span id="puntataSpan">0</span></p>
    </div>

    <div class="fiches" id="fiches">
        <img class="fiches" id="5" src="/images/fiches5.png" alt="5" onclick="Puntata(5)">
        <img class="fiches" id="25" src="/images/fiches25.png" alt="25" onclick="Puntata(25)">
        <img class="fiches" id="50" src="/images/fiches50.png" alt="50" onclick="Puntata(50)">
        <img class="fiches" id="100" src="/images/fiches100.png" alt="100" onclick="Puntata(100)">
        <img class="freccia" src="/images/freccia.png"  alt="Arrow Back" onclick="Ritorna()">
    </div>

    <div id="gioco">

        <div class="divEsterno marginbottom">
            <div class="divAzioni">
                <input type="button" id="carta" value="Carta" class="azioni" onclick="StampaCarta(1)">
            </div>
            <div class="divAzioni">
                <input type="button" id="stai" value="Stai" class="azioni" onclick="Stai()">
            </div>
            <div class="divInterno" id="divdealer">
                <p class="center">Punteggio: <span id="punteggioDealer"></span></p>
            </div>
            <div class="divAzioni">
                <input type="button" id="raddoppia" value="Raddoppia" class="azioni" onclick="Raddoppia()">
            </div>
            <div class="divAzioni">
                <input type="button" id="split" value="Split" class="azioni" onclick="Split()">
            </div>
        </div>

        <div class="divEsterno" id="divEsterno">
            <div class="divInterno" id="divplayer0">
                <p class="center">Puntata: <span id="puntataPlayer0"></span></p>
                <p class="center">Punteggio: <span id="punteggioPlayer0"></span></p>
            </div>
        </div>

    </div>

    <div id="vittoria">
        <p id="vittoriasconfitta"></p>
        <p><span id="vincita"></span>€</p>
        <input type="button" value="Nuova partita" id="nuova" onclick="NuovaPartita()">
    </div>

    <div id="attesa">
        <p id="attesa-carte">Il dealer sta estraendo le carte, attendi</p>
    </div>
    
    <script src="/game/script.js"></script>
</body>
</html>