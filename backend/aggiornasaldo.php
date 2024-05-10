<?php
    if($_SERVER['REQUEST_METHOD'] == "GET")
    {
        session_start();
        $saldo = $_GET['saldo'];
        try{
            $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "root", "");
        }
        catch(Exception)
        {
            $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "utente", "utente");
        }
        $stmt = $pdo->prepare('UPDATE utenti SET crediti = :crediti WHERE username = :username');
        $stmt->execute([':crediti'=>$saldo, ':username'=>$_SESSION['utente']]);
        $stmt = $pdo->prepare('SELECT crediti FROM utenti WHERE username = :username');
        $stmt->execute([':username'=>$_SESSION['utente']]);
        $record = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $_SESSION['crediti'] = $record[0]['crediti'];
        echo 'successo';
    }
    else
    {
        echo "errore nella richiesta";
    }
?>