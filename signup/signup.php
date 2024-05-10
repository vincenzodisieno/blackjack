<!DOCTYPE html>
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap" rel="stylesheet">

    <link href="../style.css" rel="stylesheet">
    <title>Signup</title>
</head>
<body>
    <div class="signup-container">
        <h1 style="color:white">Signup</h1>

        <form action="../backend/signupdb.php" method="post" onsubmit="return validateForm()">

            <span style="display:inline; color: red; float:right;margin-right:40px;" id="user-error"><?php session_start(); if(isset($_SESSION['errorusername'])) { echo $_SESSION['errorusername']; unset($_SESSION['errorusername']); } ?></span>
            <input class="text" type="text" id="username" name="username" placeholder="Username" oninput="validateUsername()" value=<?php if(isset($_SESSION['username'])) { echo $_SESSION['username']; unset($_SESSION['username']); } ?>>

            <span style="display:inline; color: red; float:right;margin-right:40px;" id="email-error"><?php if(isset($_SESSION['erroremail'])) { echo $_SESSION['erroremail']; unset($_SESSION['erroremail']); } ?></span>
            <input class="text" type="text" id="email" name="email" placeholder="Email" oninput="validateEmail()" value=<?php if(isset($_SESSION['email'])) { echo $_SESSION['email']; unset($_SESSION['email']); } ?>>

            <span style="display:inline; color: red; float:right;margin-right:40px;" id="email-confirm-error"></span>
            <input class="text" type="text" id="confirm-email" name="confirm-email" placeholder="Confirm Email" oninput="validateEmail()" value=<?php if(isset($_SESSION['confirm-email'])) { echo $_SESSION['confirm-email']; unset($_SESSION['confirm-email']); } ?>>

            <span style="display:inline; color: red; float:right;margin-right:40px;" id="password-error"></span>
            <div class="password-container">
                <input class="password" type="password" id="password" name="password" placeholder="Password"  oninput="validatePassword()">
                <img class="password-icon" src="../images/occhioAperto.png" alt="" id="occhioAperto"><img class="password-icon" src="../images/occhioChiuso.png" alt="" id="occhioChiuso">
            </div>

            <span style="display:inline; color: red; float:right;margin-right:40px;" id="password-confirm-error"></span>
            <div class="password-container">
                <input class="password" type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" oninput="validatePassword()">
                <img class="password-icon" src="../images/occhioAperto.png" alt="" id="occhioAperto2"><img class="password-icon" src="../images/occhioChiuso.png" alt="" id="occhioChiuso2">
            </div>
            
            <input type="submit" value="Signup">
            <a href="../login/login.php">Sei già registrato? Accedi!</a>
        </form>
    </div>

    <script src="signup.js"></script>
</body>
</html>