<?php
    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $email = $_POST['email'];
        $pass = $_POST['password'];
        try{
            $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "root", "");
        }
        catch(Exception $e)
        {
            $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "utente", "utente");
        }
        $stmt = $pdo->prepare('SELECT username, email, pass, crediti FROM utenti WHERE email = :email AND pass = :pass');
        $stmt->execute([':email'=>$email, ':pass'=>$pass]);
        $record = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($record[0]['email'] == $email && $record[0]['pass'] == $pass)
        {
            session_start();
            $_SESSION['successo'] = true;
            $_SESSION['utente'] = $record[0]['username'];
            $_SESSION['crediti'] = $record[0]['crediti'];
            header("location: ../index.php");
            exit;
        }
        else
        {
            $stmt = $pdo->prepare('SELECT COUNT(*) as count FROM utenti WHERE email = :email');
            $stmt->execute([':email'=>$email]);
            $record = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($record[0]['count'] == 1)
            {
                session_start();
                $_SESSION['errorpassword'] = "Password errata";
                $_SESSION['email'] = $email;
                header("location: ../login/login.php");
                exit;
            }
            else
            {
                session_start();
                $_SESSION['erroremail'] = "Email non registrata";
                header("location: ../login/login.php");
                exit;
            }
        }
    }
    else
    {
        echo "errore nella richiesta";
    }
?>