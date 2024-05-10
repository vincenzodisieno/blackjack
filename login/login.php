<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap" rel="stylesheet">

    <link href="../style.css" rel="stylesheet"> 
    <title>Log In</title>  
</head>
<body>
    <div class="login-container">
        <h1 style="color:white; display:inline">LOGIN:</h1><br>

        <form action="../backend/logindb.php" method="post" onsubmit="return validateForm()">
            <span style="display:inline; color: red; float:right;margin-right:40px;" id="error-email"><?php session_start(); if(isset($_SESSION['erroremail'])) { echo $_SESSION['erroremail']; unset($_SESSION['erroremail']); } ?></span>
            <input class="text" type="text" id="email" name="email" placeholder="Email" oninput="validateEmail()" value=<?php if(isset($_SESSION['email'])) { echo $_SESSION['email']; unset($_SESSION['email']); } ?>>
            <span style="display:inline; color: red; float:right;margin-right:40px;" id="error-password"><?php if(isset($_SESSION['errorpassword'])) { echo $_SESSION['errorpassword']; unset($_SESSION['errorpassword']); } ?></span>
            <div class="password-container">
                <input class="password" type="password" id="password" name="password" placeholder="Password" oninput="validatePassword()">
                <img class="password-icon" src="../images/occhioAperto.png" alt="" id="occhioAperto"><img class="password-icon" src="../images/occhioChiuso.png" alt="" id="occhioChiuso">
            </div>
            <input type="submit" value="Log In">
            <a href="../signup/signup.php">Non hai in account? Registrati!</a>
        </form>
    </div>
    
    <script src="login.js"></script>
</body>
</html>
