<?php
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    try{
        $mysqli = new mysqli('localhost', 'utente', 'utente', 'blackjack');
    }
    catch(Exception $e)
    {
        $mysqli = new mysqli('localhost', 'root', '', 'blackjack');
    }
    $sql_count = 'SELECT COUNT(*) AS count FROM carte WHERE estratta = 0;';
    $result = $mysqli->query($sql_count);
    $row = $result->fetch_assoc();
    echo $row['count'];
}
?>