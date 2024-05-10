<?php
if($_SERVER['REQUEST_METHOD'] == "GET"){
    try{
        $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "root", "");
    }
    catch(Exception $e)
    {
        $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "utente", "utente");
    }
    $stmt = $pdo->prepare('select ID_Carta, numero from carte where estratta = 0');
    $stmt->execute();
    $record = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(isset($record[0]['numero'])){
        echo $record[0]['numero'];

        $stmt = $pdo->prepare('update carte set estratta = 1 where ID_Carta = :id');
        $stmt->execute([':id'=>$record[0]['ID_Carta']]);
    }
    else{
        echo -1;
    }
}
?>