<?php
    session_start();
?>

<?php include_once 'myLib.php';?>

<?php 
    $username = $_POST["un"];
    $password = $_POST["pw"];
    $remember = $_POST["remember"];

    $_SESSION['username'] = $username;
    $_SESSION['password'] = $password;
    $_SESSION['remember'] = $remember;
?>

<?php
    echo checkLogin($username, $password);
?>