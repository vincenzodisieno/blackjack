<?php
    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $pass = $_POST['password'];
        try{
            $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "root", "");
        }
        catch(Exception $e)
        {
            $pdo = new PDO("mysql:host=localhost;dbname=blackjack", "utente", "utente");
        }
        $stmt = $pdo->prepare('SELECT COUNT(*) as count FROM utenti WHERE email = :email');
        $stmt->execute([':email'=>$email]);
        $record = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt2 = $pdo->prepare('SELECT COUNT(*) as count FROM utenti WHERE username = :username');
        $stmt2->execute([':username'=>$username]);
        $record2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        if($record[0]['count'] == 1 && $record2[0]['count'] == 1)
        {
            session_start();
            $_SESSION['erroremail'] = "Email già registrata";
            $_SESSION['errorusername'] = "Username già registrato";
            header("location: ../signup/signup.php");
            exit;
        }
        else if($record[0]['count'] == 1)
        {
            session_start();
            $_SESSION['erroremail'] = "Email già registrata";
            $_SESSION['username'] = $username;
            header("location: ../signup/signup.php");
            exit;
        }
        else if($record2[0]['count'] == 1)
        {
            session_start();
            $_SESSION['errorusername'] = "Username già registrato";
            $_SESSION['email'] = $email;
            $_SESSION['confirm-email'] = $email;
            header("location: ../signup/signup.php");
            exit;
        }
        else
        {
            $stmt = $pdo->prepare('INSERT INTO utenti(username, email, pass) VALUES(:username, :email, :pass)');
            $stmt->execute([':username'=>$username, ':email'=>$email, ':pass'=>$pass]);
            session_start();
            $_SESSION['successo'] = true;
            $_SESSION['utente'] = $username;
            $_SESSION['crediti'] = '500';
            header("location: ../index.php");
            exit;
        }
    }
    else
    {
        echo "errore nella richiesta";
    }
?>