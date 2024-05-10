<?php
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET['numero'])){
            try{
                $mysqli = new mysqli('localhost', 'utente', 'utente', 'blackjack');
            }
            catch(Exception $e)
            {
                $mysqli = new mysqli('localhost', 'root', '', 'blackjack');
            }

            $numero = $_GET['numero'];
            $sql_insert = 'INSERT INTO carte (numero) VALUES (' . $numero . ');';
            $mysqli->query($sql_insert);
            
            if($mysqli->affected_rows > 0) {
                $sql_count = 'SELECT COUNT(*) AS count FROM carte WHERE estratta = 0;';
                $result = $mysqli->query($sql_count);
                $row = $result->fetch_assoc();
                echo $row['count'];
            } else {
                echo 'Errore durante l\'inserimento della carta.';
            }
        }
    }
?>